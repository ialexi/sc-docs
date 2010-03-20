Renderers
=========
Renderers are a new feature in SproutCore 1.1.

With renderers, it is possible to extract rendering logic out of a view and into
themes.

Notes:

- Default implementations of renderers for standard SproutCore controls should be in 
  empty\_theme.

- Eventually, all SC controls should have their rendering logic in renderers.

Using Renderers
===============
On the view side, you use renderers by implementing two functions:

- `#js:createRenderer: function(theme) {`
- `#js:updateRenderer: function(renderer) {`


Creating Renderers
------------------
The first function creates a renderer. The current theme for the view is passed for
convenience (because most often, renderers come from the theme).

Here's an example `#js:createRenderer` implementation (from SC.ButtonView):

    #js
    createRenderer: function(theme) {
      return theme.button();
    }

You have the option to set settings–you can even put them in the constructor call for
most renderers:

    #js
    return theme.button({ title: "Test" });

However, since you will usually re-set these settings whenever the view updates, and since
the function that re-sets these settings is called immediately following `#js:createRenderer`
anyway, it usually makes more sense to put the setting code in `#js:updateRenderer` instead.

Updating Renderers
------------------
`#js:updateRenderer` does roughly what it sounds like: it updates settings in the renderer.
Note that it does not trigger an update to the actual layer; it merely updates the renderer's
state with the most recent settings. Whenever the view needs an update, it calls the view's
updateRenderer method, and then tells the renderer to update its layer.

Here's an example updateRenderer method (again, from `#js:SC.ButtonView`):

    #js
    updateRenderer: function(r) {
      var toolTip = this.get("toolTip");
      if (toolTip && this.get("localize")) toolTip = toolTip.loc();

      r.attr({
        toolTip: toolTip,
        isAnchor: this.get("tagName") === 'a',
        href: this.get("href"),
        isDefault: this.get('isDefault'),
        isCancel: this.get('isCancel'),
        icon: this.get('icon'),
        supportFocusRing: this.get("supportFocusRing"),

        title: this.get("displayTitle"),
        escapeHTML: this.get("escapeHTML"),
        needsEllipsis: this.get("needsEllipsis"),

        oldButtonTheme: this.get("oldButtonTheme")
      });
    },

As you can see, it merely sets settings using the renderer's `#js:attr` method.


Creating Renderers
==================
Renderers are quite simple. They have many functions, but you only need to implement two:

- `#js:render: function(context)`: performs initial rendering to a renderContext
- `#js:update: function()`: updates an already-rendered layer.

In addition, you must register the renderer with a theme.

Renderers are created by extending the Renderer class (or another renderer):

    #js
     // you will probably have a theme.js file for your theme. Make sure it loads
     // first (see docs on Loading)
    require("theme");
    
    // now, extend the renderer
    SC.EmptyTheme.renderers.Panel = SC.Renderer.extend({

Rendering
---------
The `#js:render` function should render to a supplied context. It is much like a the old way
of rendering, via a `#js:render(context, firstTime)` function, except that there is no firstTime
argument (as it is guaranteed to be the first time).

Here is an example render function (from the default Panel renderer):

    #js
    render: function(context) {
      if (this.contentProvider) this.contentProvider.renderContent(context);
      context.push(
        "<div class='middle'></div>",
        "<div class='top-left-edge'></div>",
        "<div class='top-edge'></div>",
        "<div class='top-right-edge'></div>",
        "<div class='right-edge'></div>",
        "<div class='bottom-right-edge'></div>",
        "<div class='bottom-edge'></div>",
        "<div class='bottom-left-edge'></div>",
        "<div class='left-edge'></div>"
      );
    },

### Content Providers
You may have noticed contentProvider. This is a property that the view automatically sets
(using .attr like everything else–SproutCore is not voodoo or anything). While technically,
assuming a view created this renderer, the property will be the view itself, you should only
ever use two functions on it (the contentProvider functions). If you don't, you'll be in trouble,
because it is very wrong.

Content providers, like renderers, have two functions:

- `#js:renderContent(context)`: renders content (such as child views) to the context
- `#js:updateContent()`: updates content (such as child views)

Updating
--------
You usually update renderers using CoreQuery. From the renderer, you can call `#js:this.$()`
just like you might on views.

For instance, the Control renderer (a renderer used by controls, including Button renderer),
has an update function like the following:

    #js
    update: function() {
      this.$().setClass(this.calculateClasses()).addClass(this.controlSize);
    }

Like any object, you can define your own methods; the Control renderer defines calculateClasses
because both render and update share the same logic for calculating the classes for the view.


Composite Renderers
===================
Renderers may use other renderers. Things become slightly trickier, but overall, they are still
very simple.

For instance, ButtonView is a composite renderer. To create the sub-renderers, it implements an init
method:

    #js
    init: function(settings) {
      this._controlRenderer = this.theme.control();
      this._titleRenderer = this.theme.title();
      
      // the following line is needed to pass on settings supplied to the constructor.
      this.attr(settings);
    },

What about setting settings? Renderers don't have createRenderer and updateRenderer methods like
views do. However, that doesn't stop you from adding some. As I write this tutorial, I realize
that I indeed _should_ have added some to the Button renderer (instead, I put the logic once each
in the render and update methods, duplicating code unnecessarily–tsk tsk):

    #js
    updateControlRenderer: function() {
      this._controlRenderer.attr({
        isEnabled: this.isEnabled,
        isActive: this.isActive,
        isSelected: this.isSelected,
        controlSize: this.controlSize
      });
    },
    
    updateTitleRenderer: function() {
      this._titleRenderer.attr({
        title: this.title,
        icon: this.icon,
        needsEllipsis: this.needsEllipsis,
        escapeHTML: this.escapeHTML
      });
    }

Later, the Button render and update functions call (or, rather, _should_ call, ahem) these functions, and then
calls the render and update methods on the sub-renderers:

    #js
    render: function(context) {
      this.updateControlRenderer();
      this.updateTitleRenderer();
      
      // render the conttrol renderer
      this._controlRenderer.render(context);
      
      // ... snip ...
      
      // neat trick: pushes the content rendering code into another function so that other
      // themes can easily subclass Button renderer and only implement that bit:
      this.renderContents(context);
    },
    
    renderContents: function(context) {
      // render inner html 
      context = context.push("<span class='sc-button-inner'>");

      /* Render title */
      this._titleRenderer.render(context);

      context.push("</span>") ;
      
      /// ... snip ...
    },
    
    update: function() {
      this.updateControlRenderer();
      this.updateTitleRenderer();

      // do actual updating
      this._controlRenderer.update();
      
      // ... snip ...
    },
    
    updateContents: function() {
      this._titleRenderer.update();
    }

Nice and simple and easy.

### The Catch
There is a catch. It's a tiny one, and easy to get around. The sub-renderers need to know
when a layer is available. So, you implement these two methods:

- `#js:didAttachLayer: function(layerOrLayerProvider)`
- `#js:didDetachLayer: function()`

You don't have to call the argument `#js:layerOrLayerProvider`; I merely want to emphasize
that the supplied object is not necessarily a layer; it may instead be a layer provider (usually
a view, but renderers should _not_ know a thing about views, so forget that piece of trivia).

Layer providers are able to provide a layer through the use of a `#js:getLayer` method. Don't worry,
you don't need to know the mechanics: renderers abstract all of this for you.

What you _do_ need to do is pass on this layer or layer provider (whichever it is) to the sub-renderers:

    #js
    didAttachLayer: function(layer){
      this._titleRenderer.attachLayer(layer);
      this._controlRenderer.attachLayer(layer);
    },

    didDetachLayer: function() {
      this._titleRenderer.detachLayer();
      this._controlRenderer.detachLayer();
    }

Notice that you are not calling `#js:didAttachLayer` or `#js:didDetachLayer` on the sub-renderers;
you are calling `#js:attachLayer` and `#js:detachLayer`; these, in turn, will eventually call
`#js:didAttachLayer` and `#js:didDetachLayer`.

