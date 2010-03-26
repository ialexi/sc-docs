Introducing Sproutcore
======================
Written by the awesome Charles Jolley.

Modern web browsers can be used to build fully-functional applications that have
the same richness, responsiveness, and even offline capabilities as native 
desktop or phone apps. We call these types of applications "cloud applications" because
they run business logic in the browser, but store their data in the cloud.

SproutCore is a modern HTML5 application platform for building rich cloud applications
without plugins. It includes a JavaScript framework that provides many common application
functions such as data management, server interaction, property bindings, event handling,
and views. It also includes a set of build tools that can combine your source files to
produce a bundle of HTML, CSS, and JavaScript optimized for deployment on the web.

SproutCore is more than just some code. It is an entire way of thinking about how you
build an application for the cloud. Cloud development is unlike either traditional web or
desktop app development; by following the methodology described by SproutCore, you can
spend a lot less time just trying to make your app work and a lot more time building
cool features.

SproutCore is Open Source
-------------------------
SproutCore was developed at Sproutit for its line of web-based small business apps.
It was open sourced so that anyone who wants to build cloud applications can avoid
reinventing the wheel. Since then, over 50 developers have contributed to SproutCore.
It has been used for dozens of commercial applications including some high-profile
consumer apps. You can use SproutCore freely in your own apps and contribute your
own features and bug fixes as well.

What's in the box?
-------------------
SproutCore includes a JavaScript framework made up of several smaller frameworks. It
also comes with build tools.

### Frameworks
- **Runtime.** Provides property observing, bindings, runloops, and basic object management.
- **Datastore.** Allows you to define your data model with full ORM. Includes technology
  to help you sync your data with the server and to stage and propagate model changes
  throughout your app.
- **Foundation.** Provides basic web-browser specific application level functions including
  event handling, the view layer, and routes.
- **Desktop.** UI features specific to desktop-style applications (or iPad apps). Designed
  to run in IE, Firefox, Safari, or Chrome.

### Build Tools
The build tools add many features common to native-style build systems to JavaScript, including:

- **Shared libraries and dependency management.** This ensures that libraries load in the right
  order and link correctly.
- **Code and resource optimization.**
- **Flexible Buildfiles.**  Allows you to customize the build process to your liking, even adding extra,
  custom build steps.
- **Auto-detection of app structure..** You don't have to list all of your files.
- **Command-line interface.** While the tools are written in Ruby, you don't need to have any knowledge
  of Ruby to use them.
- **Pure JavaScript, CSS, and HTML builds.** Even though the build tools are Ruby, your app won't be.
- **Flexible.** If you do know Ruby, you can access the tools as a Ruby library. Still, you'll probably
  never have to.

