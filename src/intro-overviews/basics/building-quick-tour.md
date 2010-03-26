Quick Tour of Building a SproutCore App
=======================================
This is a quick overview of the steps involved in building a SproutCore
application from scratch all the way through deployment. This gives a sense of
how the workflow works, rather than explain all of the technical details.

Creating an App
---------------
SproutCore has built-in generators that automatically set up your project. To
start a new project (and, automatically, an app inside of it), you use sc-init.

Defining Your Model
--------------------
1. Design your schema based on the type of records you might need to exchange with
the server.
2. Use sc-gen to add new record types (it is one of the code generators
   meant to speed things up a bit for you).
3. Define the property types and relations on your record types.
4. Define fixtures to provide test data.

Trying it Out
--------------
In development, you use **sc-server** as a test server. It is a simple web server that
will dynamically compile your app as needed. This way, you can change some files and
refresh, and see the results in your browser immediately. Even though you never explicitly
compile your app, it will run in the browser just like it will in production.

Another benefit of sc-server is that it will proxy certain URLs (which you define in
your Buildfile) to a different backend server. Often you will develop by using sc-server
to load your app and then have sc-server proxy to another server that serves real data.

By default, sc-server serves at: http://localhost:4020/your\_app

When debugging, it is useful to open the JavaScript console and test out creating records,
manipulating them, etc. (make sure you are in a [Run Loop](../runtime/run-loops.html), though!)
We suggest using Safari/WebKit and the WebKit Inspector. SC has special features designed for these
dev tools.

Design Your Views
------------------
Views are normally configured in a [Page object](../../class-overviews/pages.html)–which, oddly enough,
are not quite what they sound like, so read up on them! A default main\_page.js is added to your
resources folder when you create your project.

When you design views, you set properties and layout. Eventually, we will have a drag-and-drop UI
designer that will generate a page object for you.

Add Custom Views
-----------------
If you need to create views with custom logic in them, or maybe a new type of control, you can
add a custom view. You use `sc-gen` to add the view; this automatically adds a file for unit tests
too, which you should write to make sure they can work independently of your app (so they'll
be reusable for future work).

You can name custom views in your page design just like you would any other view. This will work
in the drag-and-drop UI designer as well.

Add Controllers and Bindings
-----------------------------
A controller acts as an anchor to your application. You set its `#js:content` property to point to
a model object or to another controller and you use _bindings_ to connect properties on the controller
to properties on your views. The controller will then relay changes to your views.

Your views will change their own properties in response to user actions. The controllers will relay those
property changes to your model, and so on.

At this point, you will be able to use your fixture data in your UI, make changes to it, and watch
all of your business logic work.

Add Responders
---------------
Controllers will relay data changes, but another part of your app involves handling high-level
state changes. For example, your UI may display certain views when the user's data is still loading,
other views when the user has no data and needs to add some, and yet other views when there is data
visible and ready to edit.

You can implement this part of your app "freehand" by simply writing code on controllers or objects
you create yourself, but that will likely end up messy. Or, you could use the super-cool SproutCore
Responder system instead.

Responder objects respond to "actions" sent by your user interface and then reconfigure your application.
You can model them by designing statecharts–each responder represents a state.

Responders are a newer part of the framework that have the potential to eliminate one of the last remaining
sources of "spaghetti" code in your application; still, many developers will just freestyle this part
of an app in a way that makes sense to them.

Adding a DataSource
---------------------
Now that your app is basically functioning, you can hook your app up to your server.
You can use any server backend that you like; the technology does not matter.

You write a DataSource class that interfaces with your server and model objects. SproutCore
will automatically call your data source whenever it needs to fetch data from the server or
commit changes back to it. You can also push data from the server at any time into the store.

As with many SproutCore things, to add data stores, you can use sc-gen. After adding it, you can
either write your data source as a wrapper around an existing library to talk to that server, or
write the data store from scratch. If you go the latter route, SC.Request provides an easy way to
do Ajax without needing to use another library like jQuery or Prototype.

Also, very wise to document your data source, it is.

Adding Localizations
---------------------
If you plan to launch with multiple languages, you can add a new language by using sc-gen.
Your app will have a default language (usually english) and one or more target languages.
When building for a target language, the build tools will use all of the files in your
resources directory or default language.lproj directory. However, any files with the same name in the
target langauge .lproj will override the default ones.

All new projects come with a strigns.js file. This is where you put strings you want localized.
Usually, you will want one strings.js file per .lproj directory. In your code, you can localize
any string by calling the .loc() method on it. This will lookup the string in the localized
strings.js file and use it if available.
Once you build your lproj directories, you can usually send your strings.js file off to someone
to have it localized.

You can also add a localization for any or each of your view designs, allowing you to override
specific settings (especially the layout) for each view.

Testing
--------
You now have all the pieces of your app in place. You will probably want to test it on
lots of different browsers. This is where unit tests come in.

SproutCore's unit test runner makes it easy to run your unit tests on different browsers. You
can actually write unit tests that will launch your app, perform functions, and verify the results.
This is a great way to make sure your app will run properly all the time.

Bigger projects may integrate the tests with Selenium to automate the testing process.

Deployment
-----------
When you are ready to deploy your app, all you need to do is run sc-build.
sc-build generates a bundles of HTML, JS, and CSS inside directories with an MD5
hash code as a build number; the hash code is based on the contents of the files,
so changing your files will change the hash code.

When you deploy your app, you just need to copy the entire contents of tmp/build to
a static web server.

Your server should be configured to serve everything **EXCEPT** for the index.html file
with a 1-year expiration header. This will allow for your assets to be cached _permanently_
on browsers once they load them, but still allow the index.html to update which version
is used: since the index.html references the resources it needs by build number, deploying
a new version will automatically load the new assets.

Once you've copied your files out, you may symlink the build directory for your app
you want to load to the actual URL you want the user to visit to load your app. For example,
if you want people to visit your app at http://myapp.com/appname and your project has a directory
called static/appname/123efab45aeb29cde4, then you could symlink /appname -> /static/appname/123efab45aeb29cde4.

Alternatively, you can tweak your build file, changing the :url\_prefix setting from its default
of /static/, to tell SproutCore to generate the files expecting a different URL. For instance,
in the above example you might use `#ruby::url_prefix=>'/appname/'`; you'd copy the build to the server,
and extract the index.html (and put it wherever you wanted), and you'd be set.

You can actually have multiple built versions of your app deployed, as each one has a different build number.

Congratulations
----------------
You just built and deployed a commercial-grade cloud application using SproutCore.