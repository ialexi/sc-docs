Pages
=====
Pages are not what you might expect them to be based on their name. They do not represent
a page like an HTML page. Instead, they are merely view containers.

So, what's so special about them? Why not make them just be an SC.Object?

Well, if you look at the source, you will find that SC.Pages are, in fact, SC.Objects:

http://github.com/sproutit/sproutcore/blob/master/frameworks/foundation/system/page.js

The only difference is that they instantiate their child objects on demand.

Notice how you use .design() to declare the objects in your mainPage? .design() does not create
a view instance. Rather, it simply subclasses a view. .design() is rather equivalent to .extend(),
in fact, except that it does a few extra things to help SproutCore's eventual view designer (think
Interface Builder).

SC.Page differs from SC.Object in that, when its get() function is called, it will not just return
the property; instead, it will first check if the object is a class. If so, it will call .create({ page: this })
on the value before returning it.


ContainerViews
------------------
ContainerViews use a nowShowing property to determine which child view they should show.
This property is a string value that is a key for a child view. Where do the ContainerViews get
the child view from?

Unless the name of the view starts with a "." (indicating that the view should be a child of
the SC.ContainerView itself), it looks in the PageView that is the ultimate owner of the
ContainerView itself (the "page" property is propagated through the view tree).

The benefit of using a Page in conjunction with a ContainerView is clear: the nowShowing view
will only be instantiated as and when required.

Complete Paths
--------------
According to the docs, you can also pass a full property path for nowShowing.

Example Recipe
================
Perhaps you have a ContainerView. You want to change its nowShowing property to things like:
"recipes", "ingredients", "ideas", etc.

You would put your container view, perhaps named "myContainer", into your main*Pane*.
You would then put your main*Pane*, as usual, inside the main**Page**. You'd also put your "recipes", 
"ingredients", and "ideas" views in the main**Page** (named "recipes", "ingredients", and "ideas").

Then, whenever you change the nowShowing property of your myContainer view, the recipes, 
ingredients, and ideas views would automatically be instantiated.
