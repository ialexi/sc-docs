SproutCore Design Patterns
==========================
SproutCore is built on some consistent design and naming patterns that are used
throughout the framework. If you learn these design patterns, you will more easily
understand how SproutCore classes are meant to be used. Further, incorporating these
patterns into your own app can make _it_ better as well.

MVC
----
The overarching pattern behind SproutCore is MVC. See the
[SproutCore Architecture Overview](architecture-overview.html) for more information on MVC.

Booleans
---------
- **isFoo** – used to designate a boolean flag property that represents a state
  of the object. Usually, these can change over the lifetime of the object; for instance,
  isVisible, isReady. However, they can be constant identifiers to allow other classes
  to know the class responds to a certain API; for instance: `#js:isScrollable`.
- **canFoo** - used to designate a boolean flag property that enables or disables a feature.
  Usually this is set when an object is first instantiated and does not change. For example,
  `#js:canScrollHorizontal`, `#js:canReorderContent`.
- **hasFoo** - used to designate a boolean flag property that indicates whether a given component
  is available or not, often used to describe aggregate relationships; for instance, `#js:hasVerticalScroller`,
  `#js:hasVisibleChildren`.

Observers
-----------
Observers are methods that are called whenever a particular property changes.
The most common type of observer is a local observer, which is a method on an object
called whenever a property on the same object instance changes.

Observers usually end in the phrase "DidChange", suffixed after the name of the property
it observes. For example: `#js:contentDidChange`, `#js:valueDidChange`. If a single
observer is called for several different properties, you could name it something like
`#js:relatedValuesDidChange`.

Sometimes you may need to call an observer directly. This should not happen often, but
is OK if needed. Perhaps, though, it may be better then to separate the logic for the
observer out into a separate function and have both the observer and the other function
call that new function.

Bindings
---------
Bindings connect the properties on two objects together. Whenever one property changes,
the other property will be updated with the same (or, optionally, a transformed) value.

Bindings are mostly used to connect views to controllers and controllers to other
controllers. You should rarely use bindings for your models or to connect views to
other views; instead, use observers.

Delegates
----------
We generally like to keep the number of classes in your application down when possible.
Too many classes encourages over-engineering.
Instead, you "delegate" fine-grained control of an object to another object
using delegates.

You can often set a "delegate" on SproutCore objects and the object will hen call
your delegate at key points in its operation to get permission to perform certain
operations or to give you a chance to override the default behavior.

Whenever you want to slightly tweak the behavior of a SproutCore class–especially a view–
check the documentation for the existence of a delegate class. If one exists, you can make
a controller a delegate and then implement the delegate methods on the controller.

When designing your own application, consider making views more generic so that they can be
reused. Implement application-specific business logic as delegates on your controller.

Singletons
----------
A singleton is a one-off object that you define, with its own methods and properties, that
will only exist one time in your application. Most controllers are singletons.

In most other languages, you create a singleton by defining a custom subclass and then instantiating
that class one time in your app. JavaScript allows you to add functions to objects like any other
property, so creating a singleton is much simpler. Just do 
`#js:myObject = SC.Object.create({ property: foo, method: function() { ... } });`

Mixins
-------
A mixin is a static hash of methods and properties that can be added to an object or class. You
usually use mixins to define a set of common methods that you want several different classes
to share without having them inherit from the same parent class.

Mixins are a great way to use "aspect-oriented" programming techniques to build your
classes. When you extent or create an object, you can name one or more mixins.

If you define initMixin, it will be called when the object is created. For views, you can also
define renderMixin, createRendererMixin, or updateRendererMixin, allowing you to change the
rendering behavior from within a mixin.

If you are defining a generic view or other object and you need other objects it depends on
to implement certain methods, you should define a mixin with default implementations of all of
the methods. This way, other objects can simply apply the mixin and override only the functions
they care about.

Protocols
----------
An informal protocol is simply a set of methods that another object may call on your object if
you implement the protocol. Unlike mixins, protocols are not actually included in production apps;
you only define them for documentaiton purposes.

Protocols are often used when you want an object to primarily respond to many different methods
but you don't want the object to have to define each and every one. Default responder actions are
a good example, as is the drag and drop API.

Actions/Responders
-------------------
Actions are high-level, application-specific events in your application. Usually, they
are generated by views or by your data source. Actions are **not** usually low-level
events generated by the browser such as mouseDown or keyDown–those are events.

For example, when you click on a button, the browser will send a mouseDown event
which will be routed to the button. The button may in turn be configured to send
an action called "openPanel."

Whenever an action occurs in your app, it can be tricky to decide what code should
run in response to the action. SproutCore uses the Responder pattern to handle this.

In SproutCore, you can have a _responder context_. A context can receive actions.

Each context has a _first responder_. Whenever you send an action to a context, it will
check the first responder to see if it implements a method with a corresponding name.
The first responder may also have a _next responder_. If the first responder does not implement
the method, the context will check the next responder; if the next responder does not implement
the method, then the next responder's next responder will be checked, and so on until it finds
either a responder that _does_ implement the method or a responder with no next responder.

If a responder _does_ implement the method, but returns NO, it is treated as if it did not
implement the method.

If it gets to the end of the responder chain and the action is not handled, the responder
context will try a defaultResponder; if that is another responderContext, then the action
will be sent down _that_ context's responder chain.

All views in your SC app comprise of one responder chain. Each pane is its own responder context.

You can also make your app namespace (or anything else you'd like) a responder context (it will
be one if you make it extend from SC.Application). You can then use Responders to represent
states by setting the first responder for the application. All you have to do to connect the
panes to your App's context is set their `#js:defaultResponder` property to the app itself.

One of the biggest advantages to this design pattern is that, when an action occurs in your
app that you did not plan for, it will fail in very obvious ways (i.e. the action will not
be handled). This leads to very reliable code. In fact, this pattern is often used in
mission-critical software because of its known reliability.


Design Patterns Still Needing Documentation
--------------------------------------------
- Computed Properties
- Enumerables
- Value and Content properties
- Configurable Keys
- RunLoop and Deferred Execution


