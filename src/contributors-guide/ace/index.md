Ace 2.0 Contributors' Guide
===========================

Ace 2.0 is a work-in-progress. You may contribute by (in ascending order of difficulty, 
and how helpful it would be :):

- Creating art for unthemed controls
- Creating CSS to theme controls
- Creating renderers in addition to CSS

Where is it?
------------
Currently, it is in SproutCore's [ialexi/master](http://github.com/sproutit/sproutcore/tree/ialexi/master)
branch (my branch); I believe it will be merged into SC master soon.

Specifically, the theme is at [themes/sc_ace](http://github.com/sproutit/sproutcore/tree/ialexi/master/themes/sc_ace/).

Creating Art
------------
You should usually create artwork by duplicating an existing PSD; this way,
you'll get the layer styles and colors from the existing PSDs.

Creating CSS
------------
Note that Ace is compiled using [Chance](http://github.com/ialexi/Chance.git),
which sprites images and helps compile CSS. Look at some of the existing files
to see how it works. I need to make a writeup (or copy 
[Colin's excellent one](http://colincodes.tumblr.com/post/442873949/sproutcore-chance)).


Creating Renderers
------------------
Unfortunately, to properly theme some controls, their actual DOM needs to change;
for instance, ButtonView's renderer in sc-empty (and ButtonView's rendering code
before renderers) put elements inside each other:

	<a><span><label>The Label</label></span></a>

This meant that semitransparent borders did not work very well, as they'd overlap
each other. To fix this, Ace has its own renderer that renders something more like this:

	<a>
		<span class='left'></span>
		<span class='middle'></span>
		<span class='right'></span>
		<label>The Label</label></a>
	</a>

All of SproutCore's controls should eventually be converted to use renderers. Please
help by doing so–even if you only make a renderer for empty\_theme.

Renderer documentation:

- [SC.Renderer Class Overview](../../class-overviews/Renderer.html)
- [SC.Renderer Reference](../../reference/symbols/SC.Renderer.html#constructor)
- [Case: Segmented Renderer](example-renderer.html)
