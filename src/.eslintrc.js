module.exports = {
	'env': {
		'es6': true,
		'commonjs': true,
	},
	'globals': {
		'global': true,
		'process': true,
		'console': true,
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'sourceType': 'module',
		'ecmaVersion': 2017
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'max-len': [
			'error',
			{
				'code': 120,
				'comments': 120,
				'tabWidth': 2
			}
		],
		'quote-props': [
			'error',
			'as-needed'
		],
		'object-shorthand': 'error',
		'no-new-object': 'error',
		'no-var': 'error',
		'no-const-assign': 'error',
		'prefer-const': 'error',
		'prefer-destructuring': 'error',
		'array-callback-return': 'error',
		'no-array-constructor': 'error',
		'no-plusplus': 'error',
		'no-console': 'error',
	}
};
