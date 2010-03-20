Loading
=======

SproutCore apps are not magical.

CSS
---
Any CSS files in your app's resources directory, or any subdirectory therein, will be loaded.
Any image files in the resources directory will be put in with the rest of the files when the
app is built.

JavaScript
----------
So, how does it know what JS files to load? Simple: it loads them all. Any JS file
you have in your application's folder structure will be loaded.

So, no problems, right? For the most part, this just works.

As long as any code referencing something declared in another file runs at run-time, rather than load-time,
everything will work. However, if the code runs at load-time, problems could occur because of the order in
which the JS is loaded. If you try to use My.SpecialView before it has been declared, there will be trouble.

But what if you subclass SC.View, creating My.SpecialView in one file (perhaps in views/my_special.js),
and then try to call My.SpecialView.design() to create an instance in your resources/main_page.js file? 
Well, you might run into trouble.

How to fix? Add a require() statement to the top of your main_page.js:

    require("views/my_special.js");

This will tell SproutCore's build tools that views/my_special.js needs to be included in the combined JS
_before_ main_page.js.

And that's it!

Frameworks
==========
Frameworks are loaded as defined in Buildfiles. For more on frameworks, see "Frameworks".

Cross-framework Requires
------------------------
Sometimes, I wonder, how do I make sure that file in framework X loads before this file in my app?

Not a concern. Why? Because if my app requires framework X, the entire framework X will be loaded _before_
my app anyway. Unfortunately, I forget this from time to time.


Load-time vs. Run-time
======================
If you think about JavaScript for a bit, you'll be able to tell what is load-time and what is run-time.

Let's take a look at the following code:

    // ==========================================================================
    // Project:   MyApp - mainPage
    // Copyright: ©2010 My Company, Inc.
    // ==========================================================================
    /*globals MyApp */
    require("views/view");
    
    // mainPage is created immediately
    MyApp.mainPage = SC.Page.design({
      
      // this code—SC.MainPage.design—that subclasses SC.MainPane, is run right now, at load time.
      // however, mainPane is not actually _instantiated_ until runtime; see the Pages Class Overview.
      mainPane: SC.MainPane.design({
        
        myView: MyApp.View.design({ // this does not create an object, it subclasses one.
          // but, again, the subclassing itself runs at load time, so we need MyApp.View to be declared.
        }),
        
        myOtherView: SC.LabelView.design({
          valueBinding: "MyApp.controller", // this won't be processed until the object is created
          
          // this function is created at load time
          somethingWeird: function() {
            // but isn't run until it is called. At run time.
            var x = MyApp.SomeOtherView.create();
          }
        })
      })

    });
