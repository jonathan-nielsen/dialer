$(() => {
	const uri = 'https://amber-chipmunk-3528.twil.io/capability-token'

	const $buttonCall = $('.button.call');
	const $buttonHangup = $('.button.hangup');
	const $client = $('.client');
	const $controls = $('.controls');
	const $devices = $('.devices');
	const $indicators = $('.indicators');
	const $output = $('.output');
	const $refreshDevices = $('.refresh-devices');
	const $ringtoneDevices = $('.device.ringtone');
	const $speakerDevices = $('.device.speaker');
	const $volumeInput = $('.volume.input');
	const $volumeOutput = $('.volume.output');
	const number = $('.number')[0];

	console.log(`Requesting capability token at "${uri}"...`);
	$.getJSON(uri).then(data => {
		console.log(`Got a token: ${data.token}`);

		console.log('Setting up Twilio.Device...');
		Twilio.Device.setup(data.token);

		Twilio.Device.ready(device => {
			console.log('Twilio.Device Ready!');
			$controls.show();
		});

		Twilio.Device.error(error => {
			console.log('Twilio.Device Error: ' + error.message);
		});

		Twilio.Device.connect(conn => {
			console.log('Successfully established call!');
			$buttonCall.hide();
			$buttonHangup.show();

			$indicators.show();
			bindIndicators(conn);
		});

		Twilio.Device.disconnect(conn => {
			console.log('Call ended.');
			$buttonCall.show();
			$buttonHangup.hide();

			$indicators.hide();
		});

		Twilio.Device.incoming(conn => {
			console.log('Incoming connection from ' + conn.parameters.From);

			const archEnemyPhoneNumber = '+12093373517';

			if (conn.parameters.From === archEnemyPhoneNumber) {
				conn.reject();
				console.log('It\'s your nemesis. Rejected call.');
			} else {
				conn.accept();
			}
		});

		$client.html(data.identity);

		Twilio.Device.audio.on('deviceChange', refreshAllDevices);

		if (Twilio.Device.audio.isSelectionSupported) {
			$output.show();
		}
	}).fail(function() {
		console.log('Could not get a token from server!');
	});

	$buttonCall.click(() => {
		console.log(`Calling ${number.value}...`);
		Twilio.Device.connect({ To: number.value });
	});

	$buttonHangup.click(() => {
		console.log('Hanging up...');
		Twilio.Device.disconnectAll();
	});

	$refreshDevices.click(() => {
		console.log('Refreshing devices.');
		navigator.mediaDevices.getUserMedia({ audio: true }).then(refreshAllDevices);
	});

	$speakerDevices.on('change', () => {
		console.log('Speaker devices changed...');
		const selectedDevices = [].slice.call($speakerDevices.children())
			.filter(node => node.selected)
			.map(node => node.getAttribute('data-id'));

		Twilio.Device.audio.speakerDevices.set(selectedDevices);
	});

	$ringtoneDevices.on('change', () => {
		console.log('Ringtone devices changed...');
		const selectedDevices = [].slice.call($ringtoneDevices.children())
			.filter(node => node.selected)
			.map(node => node.getAttribute('data-id'));

		Twilio.Device.audio.ringtoneDevices.set(selectedDevices);
	});

	function bindIndicators(conn) {
		conn.volume((volumeInput, volumeOutput) => {
			styleVolumeBars(volumeInput, $volumeInput);
			styleVolumeBars(volumeOutput, $volumeOutput);
		});
	}

	function refreshAllDevices() {
		refreshDevices($speakerDevices, Twilio.Device.audio.speakerDevices.get());
		refreshDevices($ringtoneDevices, Twilio.Device.audio.ringtoneDevices.get());
	}
});

function styleVolumeBars(volume, $el) {
	const classes = { high: 'high', medium: 'medium', low: 'low' };
	let volumeClass = classes.high;

	if (volume < .50) {
		volumeClass = classes.low;
	} else if (volume < .75) {
		volumeClass = classes.medium;
	}

	$el.css('width', Math.floor(volume * 300))
		.removeClass(classes.high)
		.removeClass(classes.medium)
		.removeClass(classes.low)
		.addClass(volumeClass);
}

function refreshDevices($el, devices) {
	$el.html('');

	Twilio.Device.audio.availableOutputDevices.forEach(function(device, id) {
		let isActive = (devices.size === 0 && id === 'default');

		devices.forEach(device => {
			isActive = device.deviceId === id;
		});

		const option = document.createElement('option');
		option.label = device.label;
		option.setAttribute('data-id', id);

		if (isActive) {
			option.setAttribute('selected', 'selected');
		}

		$el.append(option);
	});
}
