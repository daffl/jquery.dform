load('steal/rhino/rhino.js');
steal.overwrite = true;

steal('steal/build/pluginify').then(function(s)
{
	var version = '0.2.0';
	print('Building version ' + version);
	s.build.pluginify('build',
	{
		out : 'dist/jquery.dform-' + version + '.min.js',
		'nojquery' : 1,
		'compress' : 1
	});
});