load('steal/rhino/rhino.js');
steal.overwrite = true;

steal('steal/build/pluginify').then(function(s)
{
	var version = '0.1.4';
	s.build.pluginify('build',
	{
		out : 'jquery.dform-' + version + '.min.js',
		'nojquery' : 1,
		'compress' : 1
	});
});