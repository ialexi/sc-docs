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