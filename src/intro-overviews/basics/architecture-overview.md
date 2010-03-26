SproutCore Architecture Overview
=====================================================
SproutCore applications are designed around the Model-View-Controller pattern. The MVC
paradigm is a long standing pattern in desktop applications; it helps you break your code
into layers that are easier to maintain over time.

Models
------
Models implement the business logic of your application. This is where you define things
like "Contacts" or "Events" and their relationships to one another. 

You often define much of your model as a schema similar to the way to might model a database
structure. You also include validation code in the model to make sure the data is always
consistent and correct.

In SproutCore, the model also contains interaction code that will synchronize your in-memory
data with local browser storage and with your server.

Views
-----
Views display the visual UI of your applications. They also handle low-level mouse, touch, and keyboard
events and turn them into higher level actions your application can respond to.

Good views are written in a generic way. You should avoid putting business logic or application-specific
logic into views. Instead, just write these views to worry about drawing and events and leave everything
else to the rest of the app.

In SproutCore, the actual display of your UI is left up to the browser using HTML, CSS, SVG, Canvas, and
sometimes Flash. Your views will simply render this content and then leave the actual painting up to the
browser.

Controllers
-----------
Controllers shuttle data between your model and your views. In a typical app, you may have many model
objects loaded and only a few views visible on screen. The controllers are responsible for picking
the model objects and forwarding their data to the views.

In most frameworks, the controller layer is the most disorganized part of your app. This is often considered
the "glue" code that you write to hook everything together. It is also one of the most common sources of bugs.

In SproutCore apps, your controller layer is often divided into controllers–which shuttle data–and
Responders, which respond to high-level actions in your application. Using these techniques can
eliminate much of the glue code in your app, along with many bugs.

**Editor's Note:** Responders are AWESOME!