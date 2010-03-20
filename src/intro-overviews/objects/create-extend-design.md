Create, Extend, Design
======================

SC.Object has two functions you will want to be familiar with:

- `#js:SC.Object.create()`
- `#js:SC.Object.extend()`

Creating Objects
----------------
`#js:SC.Object.create` creates an instance of a SproutCore object. For instance, you can
call it to create an object:

    #js
    var myObject = SC.Object.create();

You can also set settings on (or, more accurately, extend from) an object while
creating an instance of it:

    #js
    var myObject = SC.Object.create({ x: 55, y: 123 });
    myObject.get("x"); // === 55

`#js:SC.Object` is a base class; the `#js:.create` function is on subclasses of SC.Object
as well:

    #js
    var myObject = MyObjectType.create({ someSetting: "abcdefg" });

Extending Objects
-----------------
You subclass `#js:SC.Object` by _extending_ it. The process of extending an object is simple;
in fact, it is exactly like extending it when creating, except that the result is not an instance,
but a class:

    #js
    var MyObjectType = SC.Object.extend({
      x: 7, y: 42,
      xAndYAreSame: function() {
        // as discussed in other guides, use "get"; this allows subclasses that override
        // with computed properties, observers, and such, to get their word in.
        if (this.get("x") === this.get("y")) return YES;
        return NO;
      }.property("x", "y").cacheable()
    });
    
    var myObject1 = MyObjectType.create();
    myObject1.get("xAndYAreSame"); // -> NO
    myObject1.set("y", 7);
    myObject1.get("xAndYAreSame"); // -> YES
    
    var myObject2 = MyObjectType.create({x: 42});
    myObject2.get("xAndYAreSame"); // -> YES


Designing Views
---------------
For various reasons, when you are designing the final implementation of a view–for instance,
in your main\_page.js file–you should use `#js:.design` rather than `#js:.extend`.

The two are, in essence, equivalent, but `#js:.design` adds hooks for SproutCore's eventual view
designer.

