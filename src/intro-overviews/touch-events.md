Touch Events
============
SproutCore now supports multitouch.

Views ought to implement four methods to support touch:

- touchStart
- touchEnd
- touchCancelled
- touchesDragged

The methods are what they sound like. Really.

So, understanding that, why do three start with touch-, and one starts with touches-? There is
indeed a very logical and important reason: the ones with names starting with "touch" deal
with single touches at a time. The one starting with "touches" deals with potentially multiple touches.

Finding the Touch Responder
---------------------------
When a user first touches the screen, a touch responder for that touch is found. The touch responder
is the view that receives all further touch events for that touch, such as touchesDragged, touchEnd,
and touchCancelled.

The process is simple. First, it finds out what view the touch was targeted at originally. Then it
does some special stuff (which we'll discuss under 'Capturing Touch') for special views like ScrollViews. 
Finally, it starts at the target view and works up the view tree until it finds a view that _accepts_ the touch.
This view becomes the touch responder for the touch, and will receive further events 
(touchStart, touchesDragged, and touchCancelled);

Accepting the Touch: touchStart
===============================
To accept a touch, a view must return YES from touchStart.

How does a view know if it wants to accept the touch? You are possibly familiar with mouseDown's signature:

	mouseDown: function(evt) {

With mouseDown, you can decide whether or not to accept the touch based on, for instance, the pageX and Y
of the mouse.

touchStart's signature is slightly different:

	touchStart: function(touch) {

touchStart, instead of being passed the raw event, is passed an SC.Touch object. 

Tip: set acceptsMultitouch to YES to track multiple touches
-----------------------------------------------------------
By default, views will only receive touchStart for the _first_ finger to touch them,
and touchEnd for the _last_ finger to lift from them. This is to make it simpler to
handle views such as buttons, which don't need to track multiple touches.

To track multiple touches, set your view's acceptsMultitouch property to YES.

SC.Touch
-------------
SC.Touch represents the touch from the time the user puts their finger on the screen until the time they lift it.

The touch object acts like an event object in many ways. It has many other useful things, as well:

- pageX and pageY for the touch
- event: if in an event cycle, this contains the event. Otherwise, it is undefined.
- preventDefault: if the touch is connected with an event, this calls preventDefault on the event.
- touchesForView(view): when supplied a view, will find all touches that the view is the
  touch responder for. It is a CoreSet; to get an array, call .toArray on the result.

Note: If you call touchesForView(this), the touch supplied to touchStart will not be in the set,
as the view has not accepted it yet.

Tracking Movement: touchesDragged
=================================
touchesDragged will be called on a touch's touch responder every time a touch 
(or multiple touches) moves. Unlike touchStart, touchEnd, and touchCancelled, which are
called once per touch, touchesDragged is called once per event cycle, and can be called
with multiple touches.

touchesDragged signature is:

	touchesDragged: function(evt, touches) {

evt is relatively standard, except for the following:

- pageX and pageY are set to the pageX and pageY of the first touch
- the event has a touchesForView method (though you probably won't use it--see "touches")

In addition to the event, the CoreSet of touches for the view (that is, for which the view
is touch responder) is provided (this is why you don't have to call touchesForView).
It is a CoreSet of SC.Touch objects (the same as if you called touchesForView).

Ending Touches: touchEnd
========================
Do I really need to explain? Like touchStart, it is passed an SC.Touch object. This touch will
not be in the set of touches for the view, because it has ended.

Cancelling Touches:
===================
Basically, touchCancelled is like touchEnd, except it occurs when the touch was cancelled for
some other reason. For instance, if a button receives touchCancelled, it should make the button
stop being active, but should _not_ trigger the button's action.

Giving Up Touches
=================
Why would you want to give up a touch? Imagine that your control is inside a ScrollView:
if the touch moves too much, perhaps it should be considered a scroll, rather than an
action for your control.

From touchesDragged, you would give up touch responder status through a line like this:

	someTouch.makeTouchResponder(someTouch.nextTouchResponder);

The touch's nextTouchResponder is the responder that is the _parent_ touch responder; through
devious trickery (see *Capturing Touches*), ScrollView receives touch responder status _before_
other views; further, it doesn't just hand touch responder status to the target view (your view)--
it adds the responder to a stack of touch responders for the touch, so the responders can easily
return to their parent responder (which is what you do with the above line of code.)

Remember, though, that touchesDragged is called with a set of touches. It is really easy
to change the responder for all of the touches simultaneously, should you wish to do so:

	touches.forEach(function(touch){
		touch.makeTouchResponder(touch.nextTouchResponder);
	});

Perhaps you want to pass control only if the responder is scrollable:

	if (touch.nextTouchResponder && touch.nextTouchResponder.isScrollable) {
		touch.makeTouchResponder(touch.nextTouchResponder);
	}

You can also stack your touch responder on so that child views may easily return control back
to your view:

	touch.makeTouchResponder(touch.nextTouchResponder, YES); // YES as shouldStack argument

**If your view is no longer in the touch responder stack, touchCancelled will be called upon it.**
This means that, if shouldStack is YES (and as such the view was not removed), no touchCancelled
would be called; on the other hand, if you were returning control to the original view (returning to
the scroll view, for example), touchCancelled will be called.

Also note that, when touchEnd occurs, it will trigger touchEnd only for the main touchResponder; all
other responders will get touchCancelled.


Advanced: Capturing Touches
===========================
Implementing a Scroll view? You'll need to capture the touch before the target view gets it.

This is because Scroll views have some subtle quirks. For instance, a touch should not pass
through to the actual target until a split-second has passed—this is to prevent flicker should
the user decide to scroll rather than touch the target. Also, it needs to add itself to the
touch responder stack _before_ the target view, so that the target view can hand control back
simply as discussed above.

The first part—capturing the touch—is simple. Before starting at the target view and working its
way up to the root calling touchStart, SproutCore's touch events go the opposite direction, starting
at the root and working their way down to the target, calling a method named captureTouch:

	captureTouch: function(touch) {

If the view returns YES, the touchStart event will be sent directly to it.

You could then use invokeLater to wait that split-second. But then what? You don't actually
know what the target view should be. What you need is to start at the original target, and
do the whole working up to it calling captureTouch and work down from it calling touchStart
thing—but this time, starting from your own view, rather than the root. 

Thankfully, you can do this in one line of code:

	touch.captureTouch(this, YES); // the YES means stack, which I'm guessing you'd want to do
	// so that the new view can easily pass control back to this...
	// ... but you may know better than me

If the view returns the event back to you, your view will begin getting touchesDragged events and
will receive touchEnd when the touch ends (you will not receive another touchStart event, however). 
Otherwise, your view will receive a touchCancelled when the touch ends.
