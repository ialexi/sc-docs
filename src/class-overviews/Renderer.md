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
---------------
On the view side, you use renderers by implementing two functions:

- `#js:createRenderer: function(theme) {`
- `#js:updateRenderer: function(renderer) {`

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
------------------
Renderers are quite simple.
