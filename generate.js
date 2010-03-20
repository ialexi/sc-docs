#!/usr/bin/env seed-node

var smartdown = require("smartdown"), fs = require("core_support:fs"), 
    spawn = require("spawn"), sys = require("sys"), Path = require("core_support:path");

var start = new Date().getTime();
fs.glob("src", /.*\.md/, function(err, paths) {
  var queue = [];
  var total = 0, processed = 0;

  for (var idx = 0, len = paths.length; idx < len; idx++) {
    queue.push(
      "seed-node ./generate_one.js 'src/" + paths[idx] + 
      "' 'out/" + paths[idx].replace(".md", ".html") + 
      "' '" + Path.dirname(paths[idx]) + "/'");
    total++;
  }
  
  spawn.exec(queue, function(err, stdout, stderr) {
    sys.print(stdout + " " + stderr);
    processed++;
    sys.print("Processed: " + processed + " of " + total + "; " + (Math.round((processed / total) * 10000) / 100) + "%    \r");
  })(function() {
    fs.cp_r("resources", "out", function() {
      
    });
    
    var time = (new Date().getTime()) - start;
    sys.print("\nFinished in " + (time / 1000) + " seconds.                                           \n");
  });
});