SC.Animatable
=============

SC.Animatable is very low-level animation code that has a very high-level API. I hope to
eventually split it into separate low-level and high-level parts. For now, though, you
are stuck with the high-level API. Thankfully, that high-level API, being high-level,
is really easy.

Adding the Framework
--------------------
SC.Animatable lives in SproutCore's "animation" framework. This framework is _opt-in_, so you
have to explicitly include it. If you've never included another framework before, then you can
just replace the ":required => :sproutcore" in your Buildfile with the following. If you
_have_ included another framework before, you'll probably understand what the following
means and be able to do the same thing:

    :required => [:sproutcore, :"sproutcore/animation"]

For more, see "Frameworks" in the introduction overviews.


How it works
============
Roughly:

- You mix in SC.Animatable
- You set up transitions
- You call adjust() or set("layout")
- IT'S ALIVE!

Some rough reference docs for SC.Animatable are here:
http://create.tpsitulsa.com/static/docs/symbols/SC.Animatable.html

Mixing It In
------------
Mixing things in is easy—just add the mixin into your design or extend call:

    view: SC.View.design(SC.Animatable, {
      // my usual settings here
    })

Setting up transitions
----------------------
To set up transitions, you define a "transitions" hash on the view:

    view: SC.View.design(SC.Animatable, {
      transitions: {
        "left": .25, // left should animate for .25 seconds
        "top": {
          duration: .25,
          timing: SC.Animatable.TRANSITION_EASE_IN_OUT
        }
      },
      // my usual settings here
    })


Callbacks
---------
Callbacks are a bit tricky. Why? Because they require a "target" for the callback. If you want a controller to
be called, that's fine:

    transitions: {
      "left": {
        duration: .25,
        action: "someAction",
        target: MyApp.Controller // will call someAction on MyApp.Controller
      }
    }

But if you need to call an action on some non-singleton, things will be trickier: you need the transition to reference
"this", but "this" is not available at load-time, when the transitions hash is loaded in JavaScript.

Instead, you'll have to set up that particular transition in init:

    init: function() {
      sc_super(); // call original init
      this.transitions.left = {
        duration: .25,
        action: "someAction",
        target: this
      };
    }
