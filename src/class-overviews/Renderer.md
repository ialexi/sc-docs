Renderers
=========
Renderers are a new feature in SproutCore 1.1.

Instead of handling rendering in a single render function, rendering should be handled
in two distinct steps: rendering and updating. Right now, firstTime is used for this,
but that allows some unnecessary conflating of rendering and updating that does not
make sense and will only cause trouble.

