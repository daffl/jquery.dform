load('steal/rhino/rhino.js');
steal.overwrite = true;
load('documentjs/documentjs.js');


DocumentJS('src', {
	markdown : ['readme.md', 'markdown'],
	out : 'docs'
});