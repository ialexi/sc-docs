Case: Segmented Renderer
=========================================
SegmentedView is a complex renderer. Other renderers, like CheckboxView, could be so simple that
it is laughable. SegmentedView, on the other hand, has multiple children–segments–that must be managed.
The process to manage them is not _that_ complex, but it takes a fair bit of code. Since it would be
helpful for you to understand both how simple and complex renderers could work, I am documenting
how I might make a Segmented renderer.

Again, **keep in mind that most renderers are nowhere near this complicated**.

Since I know roughly how I am going to convert SegmentedView over to renderers,
I thought it may be helpful to explain the process.

I first considered making two renderers: one for SegmentedView, and one for single
segments. This is the right path, but then I realized something: ButtonView has DOM
almost identical to SegmentedView's segments. The segments are, in effect, buttons, 
but with some extra bits added to determine if they are the first or last segments, etc.

I decided that, instead of making two completely distinct renderers, I'd create two renderers,
but one of them (the segment renderer) would use Button renderer, and just add a couple of class
names for first segment, etc.

Then, my only concern is the Segmented renderer. Well, this is relatively simple as well.
All that needs to happen is to keep an array of segment renderers. When another segment is
added, another renderer should be added. It does not matter what the order of the segments
are.


Possible Steps
--------------
Here are some of my possible steps (not tested yet, but it should give some ideas):

1. Rewrite displayItems so it returns an array of hashes instead of an array of arrays.
   That is, instead of the title being the first or second element in an array, it should be
   the "title" property in the hash.

2. Add a createRenderer function (returns `#js:theme.segmented()`)

3. Add updateRenderer function. Does two things: supplies items+alignment; calculates which
   item(s) are selected, setting the isSelected attribute appropriately; updates isActive
   based on activeIndex property.

4. Write the Segmented renderer, using didAttachLayer and willDetachLayer to alert the child
   renderers that layers are being attached/detached; the catch is, supply layer providers like the
   following:
   
        #js
        {
          "provider": this,
          "rendererIndex": idx,
          getLayer: function() {
            return this.provider.getLayerForIndex(this.rendererIndex);
          }
        }
  
   Then, have a function named getLayerForIndex that will find the layer at the given index; the render
   function will add an id like: segment-(SC.guidFor(segment)), so all that needs to be done is: 
   
       getLayerForIndex: function (idx) {
         this.$(SC.guidFor(this.\_segments[idx]));
       }
   
   Now, the individual segments will be able to retrieve their layers. In `#js:update()`, if we are going change
   the number of visible items, we should use this.layer() to get the layer, and, since if we are adding
   or removing elements, it may be more efficient to replace them all in one go, just create a render
   context for the layer and call render (re-rendering in entirety). Otherwise, we should just call
   `#js:child.update()` on each of the child renderers. Since they have the layer provider we so kindly
   made in didAttach/willDetach, they will know where to get their layers, should they need them.
   
   In render, we need only to add or remove segment renderers as necessary, create render contexts for them
   (with &lt;a&gt; tags) and then call their render functions.
   
   Because Segmented appears to be slightly special, we must also add the renderer's layoutDirection property
   to the sub-renderers (you'll see how we'd use this)

5. Write the Segment renderer, which has just a single child renderer (which does not even need a custom layer
   provider since it is just further modifying the existing segment layer), and set the first, middle, and last
   segment class names as needed (both in the render and update functions). Finally, if the this.layoutDirection
   is SC.HORIZONTAL\_LAYOUT, we add the 'display: inline-block' style.


I hope that helps anyone who wants to build a complicated renderer.