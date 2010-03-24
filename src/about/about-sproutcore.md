SproutCore is an open-source platform for building fast [rich cloud applications][1] on the web.  Specifically, the tools we develop are suitable for building large-scale applications that scale to many millions of users across many different devices. 

 

## Why Now?

 

People are spending more time on devices other than their main PC.  The software they use must work well on all of these new devices while storing the user's data in the cloud where it can accessed from anywhere.  They require a new generation of software designed for the cloud and for mobile devices with different operating systems, hardware and platform constraints.

 

Given this major shift, we think the only logical answer is to build your applications on HTML5.  The web browser is the one platform that every device runs well.  With HTML5 standard technologies already included, it is possible to create applications that rival more native applications as well.

 

On the desktop, developers have a pile of build tools, frameworks, and interface designer IDEs to help them create rich dynamic UIs.  We need the same thing on the web.  That is why SproutCore exists.

 

# Goals and Non-Goals

 

In general, we want our code to reflect the following ideals:

 

*   **Apps can compete in terms of richness and functionality with most desktop applications.**  This means supporting apps are large in scale, have many deep, complex features, support keyboard events, drag and drop, touch events, and rich animations, are offline capable, immediately respond to user actions; minimizing delays due to network latency

*   **Work well in all modern web browsers** (e.g. at least Safari 3 or later, Firefox 3 or later, IE 7 or later) *without plugins*.  Plugins may be used in some limited cases such as offline storage, video, or uploading - but the capability should degrade smoothly.

*   **Design for high-latency.** Assume the user's data will live in the cloud at least 250msec away from the user's client and minimize this effect on the user experience.

*   **Take the time to build high-quality, maintainable code.** All code must be well unit tested across all browsers.  We must be able to iterate implementations and add new features without fear of breaking existing functionality.

*   **Focus on performance.** Minimize the time it takes to download and start an app.  Avoid doing work unless absolutely necessary

*   **Make app development as easy as possible.** Specifically: 
    *   **Be easy.**  The API and developer tools should generally do the right thing out of the box.  The ideal is to one day be able to write many basic applications without actually writing much code at all.  Use generators, IDEs etc.
    
    *   **Be consistent.**  The programming API should adopt consistent design patterns and reuse them whenever possible so that a developer can easily guess how a particular component will behave.
    
    *   **Be opinionated**. Whenever possible, the API should make it easy to do things correctly and hard to do things that are known to be problematic.
    
    *   **Be resilient**.  Whenever possible, the framework should adapt to the way developers are using the components.  If a developer uses an API in a way not anticipated by the developers, it should still behave in a reliable way.  
    
    *   **Stay small(ish)**.  Prefer a smaller number of more flexible classes or a larger number of specialized classes.
    
*   **Be Hackable.**  We want to keep the code readable, organized, and decoupled enough that its easy for developers to mold it to their needs.

*   **Share the cost!**  SproutCore exists to help businesses create compelling applications on the web for both internal and external use.  It is licensed under MIT so you can use it as you wish.  As you benefit from the hard work done by others at no cost, our only request is that you and your company dedicate some time to contribute back as well.   

 

In addition, the SproutCore project is specifically NOT focused on the following.

 

*   **SproutCore is not for enhancing web pages.**  SproutCore is about building full apps.  By definition these can't degrade into simple HTML markup.  SproutCore is not intended for spicing up document-oriented web pages.
*   **SproutCore is not a jQuery/Prototype/Dojo/etc.-killer.**  Proceeding from the above, lower-level DOM libraries in common use do a great job at making it easy to manipulate HTML.  SproutCore should work well along-side these libraries; not compete with them.

 

## How to Sell Your Team

 

If you're thinking about using SproutCore for a project, the best way to decide is to build an app or two.  The [Todo tutorial on this site][2] is a great starting point.  [NOTE: Todos is still being updated for the SproutCore 1.0 Beta as of Aug 7.]  It won't take long for you to see the benefits for yourself.

 

When comparing SproutCore to alternative implementations, a few things to think about are: performance (SproutCore is really fast compared to the competition), learning curve (all platforms like SproutCore have a steep learning curve, but SproutCore is based on JavaScript, which gives you a nice head start), and completeness of the API (only SproutCore has databindings, a data store, incremental rendering, and many other features).

 

Sometimes these things aren't important to your project.  But if they are, we think that SproutCore 1.0 will offer you a great alternative.

 

## How to Get Started

 

The best way to get started with SproutCore is to [install it][3]!  Then, go through a [tutorial][4] or [two][2] and read the guides.  You can also get on the IRC channel (#sproutcore on freenode), join the [Google Group][5] and get in touch with the fine developers all over the world building awesome apps with our platform.

 

Keep in mind that SproutCore is available under a liberal license (MIT) so that you can do with it whatever you want.  Our only request is that if you decide to build on SproutCore, try to contribute something back as well!  Improve the docs, submit bug fixes and unit tests, or simply release widgets you've built as an add-on framework that others can use.  If you're not sure how you can best help out, ask on the Google Group or IRC channel.  We'll be happy to help you find your place.

 

## How to Contribute Back

 

You can contribute to SproutCore in lots of different ways.  Here are some guidelines to get you started:

 

### **Promoting SproutCore**

 

The easiest, and sometimes most effective way to help SproutCore is simply to promote it.  Twitter what you like, what you are working on, and what you want to improve.  Write blog posts with tutorials.  Think about what info you wished you had when you first got started and write it up so others can benefit.  

 

If you want to talk at a conference or meetup and want some materials to get you going, email the Google Group and we can usually help you out.

 

### **Fixing Bugs**

 

If you found a bug, you can open a ticket on our Lighthouse Tracker, preferably attaching a test we can use to reproduce the issue.  

 

If you fix a bug, just clone the main sproutcore repo on Github, add your fix and send a Pull Request to "sproutit".  We'll integrate it ASAP.  

 

Note that to go into the master branch, bugs usually require a unit test to go along with them that verifies the fix unless a test already exists or the fix is for something that is not testable (such as docs or some portions of the code).  If you have questions, ask on the group.

 

### **Submitting New Features**  

 

If you've built a new feature you think would be useful for SproutCore, get in touch with us on IRC channel or Google Group.  We'll help you through the process of getting it submitted and merged in.  

 

Sometimes the best way to share new features is as a separate framework.  Other times, we will integrate it directly, in which case your new feature will need unit tests and documentation as well to make it into the mainline branch.  If you don't have this stuff - don't worry.  Get in touch and we'll help you through it.

 

### **Improving Documentation**

 

SproutCore is documented on this Wiki and inline in the source.  To edit this Wiki, just signup and start making changes.  Source changes can be submitted like Bug Fixes through Github.

 

 [1]: /What-is-a-Cloud-Application
 [2]: /Todos%C2%A0Intro
 [3]: /Abbot-Setting+Up
 [4]: /Hello-World-Tutorial
 [5]: http://groups.google.com/group/sproutcore
