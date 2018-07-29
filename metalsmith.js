const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const imagemin = require('metalsmith-imagemin');
const index = require('metalsmith-index');
const collections = require('metalsmith-collections');
const renamer = require('metalsmith-renamer');
const feed = require('metalsmith-feed');

Metalsmith(__dirname)
	.metadata({
		sitename: 'thatlittlegit',
		siteurl: 'https://thatlittlegit.tk',
		description: 'thatlittlegit\'s website',
		generatorname: 'Metalsmith',
		title: 'index page' // all pages have a title except for index pages, so use this as a fallback.
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
	.use(collections({
		posts: {
			pattern: 'blog/*.md',
			sortBy: 'date',
			reverse: true
		}
	}))
	.use(markdown({
		highlight(code, lang) {
			return lang ? require('highlight.js').highlight(lang, code, false).value : code;
		}
	}))
	.use(feed({
		collection: 'posts',
		site_url: 'https://thatlittlegit.tk',
		title: 'thatlittlegit\'s blog'
	}))
	.use(layouts({
		default: 'index.hbs',
		pattern: '**/*.html'
	}))
	.use(renamer({
		blogmd: {
			pattern: 'blog/*.html',
			rename: x => x === 'index.html' ? `./${x}` : `${x.replace('html', 'md')}/index.html`
		},
		rss: {
			pattern: 'rss.xml',
			rename: x => 'blog/feed.xml'
		}
	}))
	.use(imagemin())
	.build(err => {
		if (err) throw err
	});
