#!/usr/bin/env seed-node

var smartdown = require("smartdown"), fs = require("core_support:fs"), 
    spawn = require("spawn"), sys = require("sys");


fs.glob("src", /.*\.md/, function(err, paths) {
  var queue = [];
  for (var idx = 0, len = paths.length; idx < len; idx++) {
    queue.push("seed-node ./generate_one.js 'src/" + paths[idx] + "' 'out/" + paths[idx].replace(".md", ".html") + "'");
  }
  spawn.exec(queue, function(err, stdout, stderr) {
    sys.print(stdout);
  })(function() {
    sys.print("Finished.\n");
  });
});