# Writing a Computed Property
Imagine we have an object that represents a contact.  It has two properties, `#js:firstName` and `#js:lastName`.

    #js
    contact = SC.Object.create({
      firstName: "Charles",
      lastName: "Jolley"
    });

Let's say we have an `#js:SC.LabelView` that we want to bind to this object, but we want it to display the person's full name.
We can write a special kind of method, called a computed property, that does just that.

To create a computed property, first define the method as you would normally:

    #js
    fullName: function() {
      return "%@ %@".fmt(this.get('firstName'), this.get('lastName'));
    }

Next, tell SproutCore to treat it like a property instead of a method by appending a `#js:property()` declaration at the end:

    #js
    fullName: function() {
      return "%@ %@".fmt(this.get('firstName'), this.get('lastName'));
    }.property()
 

Now, instead of calling `#js:contact.fullName()`, use `#js:contact.get('fullName')`, and SproutCore will automatically call the method for you and return the result.

So far we've added support for `#js:get()`, but what if we want to allow changing a computed property?
  
# Setting Support

 

When you call `#js:set()` on a computed property, it passes two arguments to the method: `#js:key`,
the name of the property that is changing, and `#js:value`, the new value you should save to your object.
`#js:value` will be undefined if `#js:get()` is used, so you can use this parameter to distinguish between the 
two kinds of calls.

Even when setting a new value, it's important to return from the method as though `#js:get()` was used. 
SproutCore can cache this return value to improve the performance of your application, as we discuss below.

To add support for writing to a computed property, there are just a few changes we need to make to the example above.

    #js
    fullName: function(key, value) {
      if (value !== undefined) {
        var parts = value.split(' ');
        this.beginPropertyChanges()
          .set('firstName', parts[0])
          .set('lastName', parts[1])
        .endPropertyChanges();
      }
      return "%@ %@".fmt(this.get('firstName'), this.get('lastName'));
    }.property()

Improving Performance with Cacheable Computed Properties
========================================================
Computed properties are very useful, but if they are processor- or memory-intensive, it can be wasteful 
to run the same function over and over again to generate the same data.  SproutCore has the concept of a *cacheable*
computed property: that is, a computed property that is run once and its return value cached for future use.

Take the following example, which is a non-cached computed property.

    #js
    factorial: function() {
      SC.Logger.log('Calculating factorial...');
      var n = 5, result = 1, idx;
      for (idx = 2; idx < n; idx++) {
        result *= idx;
      }
      return result;
    }.property()

If we run the following in the console:

    #js
    > contact.get('factorial');
      Calculating factorial...
      120
    > contact.get('factorial'); 
      Calculating factorial...
      120

You can see that every time we request the computed property, our function is being executed.  
Since this value will never change, it makes sense to append a `#js:cacheable()` declaration to the property: 

    #js
    factorial: function() {
      SC.Logger.log('Calculating factorial...');
      var n = 5, result = 1, idx;
      for (idx = 2; idx < n; idx++) {
        result *= idx;
      }
      return result;
    }.property().cacheable() // < cacheable!
 

Repeating the commands in the console yields these results:

    #js
    > contact.get('factorial');
      Calculating factorial...
      120
    > contact.get('factorial');
      120
 
As you can see, the function is only run once, and its return value is saved for successive calls.  
Using cacheable() can seriously improve the performance of your application.  The one downside, of course, 
is that if any values that the computed property relies on change, we may be getting stale data back.  
Fortunately, we are able to define dependent properties that will let SproutCore know when the cache is no longer valid.

Invalidating Cacheable Properties with Dependent Properties
============================================================
Let us turn our attention back to the first example from the beginning of the section.  Recall that the `#js:fullName` 
computed property is crafted from two other properties: `#js:firstName` and `#js:lastName`. 
Any properties that your computed property relies on are called *dependent properties*.  
Note that dependent properties may be standard properties, or computed themselves.

 If we were to make the `#js:fullName` property cacheable, then change one of its dependent properties, 
the computed property and the dependent property would get out-of-sync.  For example:

    contact = SC.Object.create({
      // Standard, non-computed properties
      firstName: "Charles",
      lastName: "Jolley",
      
      // Cacheable computed property
      
      fullName: function(key, value) {
        if (value !== undefined) {
          var parts = value.split(' ') ;
          this.beginPropertyChanges()
            .set('firstName', parts[0])
            .set('lastName', parts[1])
          .endPropertyChanges() ;
        }
        return "%@ %@".fmt(this.get('firstName'), this.get('lastName')); 
      }.property().cacheable()
    });
 
    > contact.get('fullName')
    Charles Jolley
    > contact.set('lastName', 'Darwin')
    > contact.get('fullName')
    Charles Jolley

Obviously, this is not the result we were looking for.  There are two ways to let SproutCore know that the cached value is no longer valid:

 

1.  Manually notify SproutCore by calling `#js:contact.notifyPropertyChange('fullName')`, or, preferably,

2.  Tell SproutCore that `#js:firstName` and `#js:lastName` are dependent properties.


For Example:
 
    #js
    fullName: function(key, value) {
      if (value !== undefined) {
        var parts = value.split(' ') ;
        this.beginPropertyChanges()
          .set('firstName', parts[0])
          .set('lastName', parts[1])
        .endPropertyChanges() ;
      }
      return "%@ %@".fmt(this.get('firstName'), this.get('lastName')); 
    }.property('firstName', 'lastName').cacheable()
 

Now we get the result we were looking for:

    #js
    > contact.get('fullName')
    Charles Jolley
    > contact.set('lastName', 'Darwin')
    > contact.get('fullName')
    Charles Darwin

 

Once your dependent properties (or _keys_) are registered, any time they change,
the computed property's cache will be invalidated. Additionally, any bindings or observers you've set
up to monitor your computed property will also be changed.

Keep in mind that your dependent properties can themselves have dependent properties; you really see the magic
of SproutCore when you update one property and five other computed properties, as well as the views to which you've
bound them, all update without any effort on your part.
