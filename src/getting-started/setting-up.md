Installing SproutCore 1.0
-------------------------
 
SproutCore 1.0 Beta is available as a Ruby gem from Github.  This gem is updated periodically whenever
major new changes are published to the Beta.  If you want the most up-to-date code, however, you should
install manually instead.  See "Getting the Latest Code" below for more info.
 
To install SproutCore 1.0 just type the following into the command-line:
 
    sudo gem install sproutcore
 
If you have trouble installing this way, your Rubygems may be out of date.  Follow these instructions to update
RubyGems.   Also, the gem should install any other required libraries for you.  But if you still have problems, 
you can try following the instructions under "Prerequisites" below.  
 
**IMPORTANT**:  SproutCore 1.0 recently transitioned from using GitHub to publish gems to using the main RubyForge repository
If you installed SproutCore 1.0 prior to Sep 28, 2009 using gem first run the following command to uninstall the GitHub Gem:
 
    sudo gem uninstall sproutit-sproutcore
 
Once you have uninstalled the old Github gem you can just use the RubyForge gem from now on. 
 
(If you install this gem prior to July 21 and it appears to break your RubyGem install, follow the instructions at
Abbot-GemFixup to make RubyGem work again.)
 
if you are installing in virtual enviroment go to this page
 
First Steps
-----------
Now that you have SproutCore 1.0 installed, here are a few commands to get you going:
 
    sc-init HelloWorld
    cd hello_world
    sc-server
 
if you faced a problem during the last part then this probably because the PATH of the gem isn't
the default one.  You can call the command as
 
    /var/lib/gems/1.8/bin/sc-init HelloWorld
    cd hello_world
    sc-server
 
Or you may reconfigure the path  by running the following command
 
    PATH=/var/lib/gems/1.8/bin
    export PATH
 
Then rerun sc-init command. 
 
Now visit [http://localhost:4020/hello_world](http://localhost:4020/hello_world) to see your handiwork.
 
For more info checkout "Using SproutCore 1.0" below.  You can also follow the Hello World Tutorial.
 
Getting the Latest Code
------------------------
 
The RubyGem is updated only periodically.  If you are working on a SproutCore 1.0 app, you will probably want to get the very latest code instead.  The instructions below will tell you how to get the latest SproutCore code from Github installed on your computer.  It's a few more steps but will give you access to the latest bug fixes and features.
 
Prerequisites
Before you setup Abbot, make sure you have installed:
 
- The latest version of the Mac OS X Build Tools (if on a Mac) or the Ruby/Cygwin installer if on Windows.  
  On Linux be sure to install your distribution's build tools.  For a recent version of Ubuntu/Debian run 
  `sudo apt-get install build-essential` in a console to install the bits you need.

- Ruby 1.8.6 or later (try ruby --version on the command line) and RubyGems 1.3.5 or later (try gem --version).  
  For a recent version of Ubuntu/Debian run "sudo apt-get install ruby rubygems" in a console to install ruby and gems.
  If your gem version is too old, use "sudo gem update --system" to get the latest gem.

- The latest version of Git ([Mac Installer](http://code.google.com/p/git-osx-installer/)).  For a recent version of 
  Ubuntu/Debian run "sudo apt-get install git-core" in a console to install the git software.
 
You will also need to make sure you have any required gems installed on your computer.  
These gems are libraries used by the SproutCore build tools.  NOTE: Be sure you run the command–shown at the top of this page–to add 
gems.github.com as a gem repository or else the install of json_pure will fail.   Just put the following lines into your console:
 
    sudo gem install rack jeweler json_pure extlib erubis thor rspec
 
 
You should now have a system ready for the latest SproutCore code.
 
Setting Up
-----------
Now that you have the pre-reqs all ready, you can proceed with the install.  
Open a terminal and cd into the directory where you want to install things.  
Then type the following (or just copy and paste the items below):
 
    git clone git://github.com/sproutit/sproutcore-abbot.git abbot
    cd abbot
    rake init
    cd ..
    git clone git://github.com/sproutit/sproutcore-samples.git samples
    cd samples
    mkdir -p frameworks
    cd frameworks
    git clone git://github.com/sproutit/sproutcore.git sproutcore
    cd ..
 
Add the path to abbot/bin to the beginning of your PATH to be able run the abbot command-line
tools (sc-init, sc-server, sc-build, sc-gen, sc-manifest, sc-docs, and more) without having to enter the full path: 
 
    export PATH=`pwd`/abbot/bin:$PATH
 
Make sure you have configured your github account with SSH Keys and Username/Email (Without setting up the SSH key
for your machine, you will get a permission denied error when trying to initialize the Git repository) 
 
You should now have the full set of SproutCore tools running the latest Abbot-compatible code.
 
Using SproutCore 1.0
====================
Testing SproutCore with Abbot
-----------------------------

To load your SproutCore-based app with Abbot, you simply need to invoke sc-server from Abbot.  
If you installed via gem (or added the path to abbot/bin to your PATH), then you can just cd into any project directory and type:
 
    sc-server
 
If you have checked-out the latest code from GitHub, cd into a project directory (like the "samples" directory you checked out above).
Then run:
 
    PATH_TO_ABBOT/bin/sc-server
 
Now you can visit some of the sample apps by going to http://localhost:4020. Check out http://localhost:4020/store_configurator ,
http://localhost:4020/clock, and http://localhost:4020/sample_controls. From an iPhone you can also check out the mobile demo
at http://localhost:4020/iphone_demo.
 
Building SproutCore with Abbot
-------------------------------
To perform a build of sproutcore or any other app, you can use sc-build just like before.  If you installed via gem,
then just cd into any project directory and type:
 
    sc-build APP_NAME -rc
 
If you checked-out the latest code from GitHub, cd into your project directory and call the build tool 
directly from your Abbot directory.  For example, cd into the "samples" directory you checked out above then run:
 
    ../abbot/bin/sc-build sample_controls -rc
 
This will do a build of the "sample_controls" app along with any required dependencies into the tmp/build directory
inside your "samples" folder.
 
Running SproutCore Unit Tests
-----------------------------
With your Abbot sc-server running, the test runner can normally be accessed at:
 
http://localhost:4020/sproutcore/tests
 
You can also run unit tests directly by visiting their URL.  This is useful if you want to automate your testing.
You can find unit tests in the source directories of each framework.  For example, the unit tests for the "sproutcore/runtime"
framework are found at
 
    samples/frameworks/sproutcore/frameworks/runtime/tests
 
You can load and run all of these tests by simply visiting:
 
    http://localhost:4020/sproutcore/runtime/en/tests.html
 
In your web browser.  If you would like to run just the unit tests from a single file, you can change "tests.html"
for a path directly to your test, changing the .js extension to .html.  For example, if you want to run the unit test in 
costello/tests/core/guidFor.js you would visit:
 
    http://localhost:4020/sproutcore/runtime/en/tests/core/guidFor.html  <-- note '.html' not '.js'!
 
When you edit unit tests, just make your changes, save your unit test or source code, then hit refresh in
the web browser.  The updated code will load and the unit tests will run again.  
 
Note that SproutCore unit testing is based on jQuery's "QUnit" library.  Although we may change this in the future, 
the API from this library will form the basis of future work.  Please consult this API for docs on how to write unit tests.
 
If you would like to access the unit tests for a framework other than Runtime, use the same method as described above
but substitute your framework of choice for "runtime."  For example, to load the unit tests for sproutcore/foundation
(found on disk at frameworks/sproutcore/frameworks/foundation), visit:
 
    http://localhost:4020/sproutcore/foundation/en/tests.html 
 
Testing the Build Tools Themselves
-----------------------------------
The new build tools also sport a full set of unit tests for the build tools themselves.  
These are written using rspec.  Any changes you make to the build tools must include changes to the unit tests as well.  
 
You can only run the build tools unit tests if you have checked out the latest Abbot tools from GitHub.
Gem installs do not put the unit tests in a place you can easily access them.
 
To run the unit tests, make sure you've checked out the latest Abbot version. Then cd into the "abbot" directory and type:
 
    rake spec
 
You can also run an individual unit test by doing
 
    spec --color path/to/unit/test
 
All unit tests can be found in the "specs" directory.  
 
In general, we create one directory for each source .rb file in the "lib" directory of Abbot.  This directory 
contains a single _spec.rb file for each method that contains tests for that method.  For example, to find the
unit tests for the SC::Target.manifest_for() method (defined in abbot/lib/sproutcore/models/target.rb), you should look in:
 
    abbot/spec/lib/models/target/manifest_for_spec.rb
 
Other Notable Changes
---------------------
The Abbot build tools are primarily a rewrite of the older SproutCore build tools with the goal of making them easier
to modify and adding unit tests (we went from 0 unit tests to over 400 of 'em, yay!).  However, Abbot also adds some
other notable feature enhancements.  Namely:
 
- Frameworks can now be nested.  This has allowed us to split up the "sproutcore" framework in seven smaller frameworks
  covering basic property observing (costello), basic application-logic (foundation), the model layer (datastore), 
  desktop-web browser-specific UI clients (desktop), mobile-browser specific UI (mobile), testing (testing), and debugging (debug).
  When SproutCore is built, it will automatically reference the proper frameworks and combine them if possible  
  However, you can now also build apps that reference only the frameworks you need.

- Support for Themes.  In addition to supporting apps (or clients) and framework target types, the build tools now support "themes".
  These are special targets that contain CSS, images and other assets needed to implement a particular look and feel.  
  SproutCore will come with two built in theme:  empty_theme (which simply resets the browser to some reasonable defaults) 
  and standard_theme (which contains the standard SC theme.)  Other themes in private use will be converted to  themes also for 1.0.
  
- Creating Multiple Resources with sc_resource().  Past versions would place all CSS into a single file called 'stylesheet.css' and 
  all JavaScript into a single file called 'javascript.js'.  Sometimes, however, you need to build several CSS or JS files that can
  be loaded lazily at runtime.  Abbot now supports this.  To have a JS or CSS file included in a different combined file
  during a build other than the default, just add an "sc_resource('resource_name')" directive to the top of your source file.
  See specs/fixtures/real_world in Abbot or some examples.
 
Getting Started with Git
--------------------------
SproutCore has adopted a standard workflow for using git.  To contribute to the Abbot or Bitburger tools, follow the instructions
on the Git Workflow-Introduction page.  You can also get a start by visiting this page with a compilation of commonly used git commands
 
A Final Word
-------------
If you need to talk to someone about Abbot, checkout the Google Group, the IRC channel (#sproutcore on irc.freenode.net) or the Jabber
chatroom (join sproutcore@conferences.jabber.org).  If you need to reach someone privately about Abbot because you are working
on a secret project, please email Charles Jolley.