load('steal/rhino/rhino.js');
steal.overwrite = true;
load('documentjs/documentjs.js');


DocumentJS('src', {
	markdown : ['readme.md', 'changelog.md', 'license.md'],
	out : 'docs'
});