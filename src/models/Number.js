import mongoose from 'mongoose';
// import debug from 'debug';

// const log = debug('models:number');

const schema = new mongoose.Schema({
	firstName: { index: true, type: String, trim: true },
	lastName: { index: true, type: String, trim: true },
	number: {
		index: true,
		match: [/^07[0-9]{8}$/, 'is invalid'],
		required: [true, 'can\'t be blank'],
		trim: true,
		type: String,
		unique: true,
	},
	dialed: { type: Number, default: 0 },
	dialedTs: Date,
}, { timestamps: true });

export default mongoose.model('Number', schema);
