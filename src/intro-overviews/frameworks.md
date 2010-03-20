Frameworks
==========
Frameworks are collections of code that can be thought of and loaded as a single unit. They
can depend on each other (though not circularly).

SproutCore has several frameworks. For instance:

  - Runtime
  - Foundation
  - Desktop

Desktop requires Foundation, which requires Runtime.

Frameworks are basically just folders inside a "frameworks" folder. The frameworks folder can be inside
an app's folder, or inside another framework's folder. They are just like apps in many ways; for instance, 
they can have a resources folder (or english.lproj, if that's your thing). They will recursively include
every JavaScript file inside of them, and every CSS or image file inside their resource directories.

Using Frameworks
================
SC's build tools cannot magically tell when you want to use a framework. Putting a framework in your
"frameworks" directory is not enough. That just puts the framework in a place available to SproutCore's
build tools.

To actually reference them, you have to edit your Buildfile(s).

Buildfiles (which need high-level documentation themselves) give build configuration to a project or app.
For instance, they can tell SproutCore which frameworks are required by which applications.

Here's an example entry that "requires" a couple SproutCore frameworks:

    #ruby
    config :all, :required => [:sproutcore, :"sproutcore/animation"]

This code is actually Ruby code. The command "config" takes multiple arguments: the first is what to configure—
in this case, everything—and following that is a set of key+value arguments for the individual settings.

Now, your app probably will require SproutCore's runtime, foundation, and desktop frameworks.
As you might have noticed, you do **not** have to specify these in your Buildfile.
Why?

Because somewhere, buried in SproutCore's own master Buildfile, is something which equates to the following:

    #ruby
    config :all, :required => [:runtime, :foundation, :desktop]

Since you are requiring the "sproutcore" framework, which already requires these, you have no need to
require them yourself. Only "sproutcore/animation" must be required manually, because it is an optional
framework.