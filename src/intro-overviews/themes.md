Themes
======
SproutCore's themes have been growing more mature. A [new default theme](../contributors-guide/ace/index.html)
is being worked on.

Themes are much like [frameworks](frameworks.html)–they even reside in folders like frameworks, except that,
instead of being held in a "frameworks" directory, they are held in a "themes" directory. Note: frameworks
can have themes. 

At the moment, themes are made up of a few main things:

- **CSS.**
- **Images.**
- **JavaScript Theme File.**
- **Renderers.** See [Renderers](../class-overviews/renderer.md)

Theme File
----------
Theme files are simple files which define properties for a theme.
It is highly recommended that themes have one; however, if the themes
are legacy themes that have no class names of their own, then a theme
file is likely not necessary, even if it still is recommended.

Here is the theme file for the empty theme:

	#js
	// create the theme
	SC.EmptyTheme = SC.Theme.extend({
	  // add a class name just for the theme
	  classNames: ["sc-empty"]
	});
    
    // Register the theme.
	SC.Theme.register("sc-empty", SC.EmptyTheme);

That is all that is required.

CSS
---
Your CSS is just that: CSS. However, it is recommended you use the class names
you defined in the original theme.

For example, if your theme has class names `#js:['my-theme','darker']`, your
CSS should probably look something like this:

	.sc-button-view.regular-size.my-theme.darker .inner {
		/* blah */
	}

Optimally, you should use a tool like [Chance](http://github.com/ialexi/Chance.git) that
will compile your CSS for SproutCore; then you'd make CSS like this:

	@view(sc-button-view.regular-size) .inner {
		/* blah */
	}

And it would automatically add the theme name, etc., as required.


Renderers
---------
Themes often contain [renderers](../class-overviews/renderer.html). Just like 
[frameworks](../intro-overviews/loading.html), they may contain JavaScript

Extending Themes
----------------
There are two parts to extending themes:

- Including the base theme in the Buildfile
- Extending the JS theme

In most cases, you will extend a theme; even if you are starting "from scratch",
you will likely extend SproutCore's empty\_theme.

Your Buildfile would likely have a `#ruby:required =>` statement like the following,
which is from the [new Ace theme](../contributors-guide/ace/index.html):

	#ruby
	config :all, :required => [:"sproutcore/empty_theme"]

Then, you'd extend `#js:SC.EmptyTheme` in your theme file (again, ):

	#js
	// extend SC.EmptyTheme
	SC.AceTheme = SC.EmptyTheme.extend({
	  // optional properties
	  name: "Ace",
	  description: "Coolness.",
	  
	  // you should include some class names
	  classNames: ["ace", "light"]
	});
	
	// register the theme
	SC.Theme.register("sc-ace", SC.AceTheme);

	// until SC build tools automatically do this, the following line sets the default prototype.
	// This is a hack; use it only until the build tools are able to handle it automatically
	SC.Pane.prototype.theme = "sc-ace";
