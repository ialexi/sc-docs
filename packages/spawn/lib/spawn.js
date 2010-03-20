var sys = require("sys");
var mp = exports;

// constants
mp.NUM_CORES = 16;

mp.exec = function(queue, responder) {
  var len ;
  
  // if params are strings, make into an array 
  if ('string' === typeof queue) {
    queue = Array.prototype.slice.call(arguments);
    done = null;
  }
  
  if (!responder) responder = function(err, stdout, stderr) {};
  
  return function(done) {
    var running_count = 0;
    // runs the first item in the queue
    var run_first = function(){
      var entry = queue.shift();
      running_count ++;
      var result = sys.exec(entry, function(err, stdout, stderr) {
        try {
          responder(err, stdout, stderr);
        } catch (e) {
          sys.puts("Error in responder: " + entry);
        }
        running_count--;
        process_queue();
      });
    };
    
    // processes the queue
    var process_queue = function() {
      while (running_count < mp.NUM_CORES && queue.length > 0) run_first();
      if (running_count == 0 && queue.length == 0) {
        done();
      }
    };
    
    process_queue();
  }
};


