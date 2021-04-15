const uncss = require('postcss-uncss')({
	html: ['public/**/*.html'],
	ignore: [
		'.show', '.hide',
		'.bg-dark', '.bg-transparent',
		'.fade', '.collapse', '.collapsing',
		/.*data-aos.*/
	]
})

module.exports = {
	map: false,
	plugins: [
		require('autoprefixer'),
		...process.env.HUGO_ENVIRONMENT === 'production'
			? [uncss]
			: []
	]
}
