const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const imagemin = require('metalsmith-imagemin');
const index = require('metalsmith-index');

Metalsmith(__dirname)
	.metadata({
		sitename: 'thatlittlegit',
		siteurl: 'https://thatlittlegit.tk',
		description: 'thatlittlegit\'s website',
		generatorname: 'Metalsmith'
	})
	.source('.')
	.ignore('metalsmith.js')
	.ignore('node_modules')
	.ignore('.git')
	.destination('./built')
	.clean(true)
	.use(index({
		'code': {
			format: path => `<p><a href="${path}">${path}</a></p>`,
			filename: 'index.html'
		}
	}))
	.use(markdown({
		highlight(code, lang) {
			return lang ? require('highlight.js').highlight(lang, code, false).value : code;
		}
	}))
	.use(layouts({
		directory: '.',
		default: 'template.hbs',
		pattern: '*.html'
	}))
	.use(imagemin())
	.build(err => {
		if (err) throw err
	});
