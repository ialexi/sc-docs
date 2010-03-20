#!/usr/bin/env seed-node

var sys = require("sys"), fs = require("core_support:fs"), 
    smartdown = require("smartdown"), Path = require("core_support:path"),
    haml = require("haml-js");

var source = process.ARGV[3], out = process.ARGV[4], relative = process.ARGV[5];

// adjust relative path as needed
if (relative[0] === ".") relative = relative.substr(2);
relative = relative.replace(/[^\/]+/g, "..");

// make output directory
fs.mkdir_p(Path.dirname(out), 0777);

// read content (and replace emdash because I like them :)
var content = fs.readFile(source);
content.replace("–", "&emdash");

// generate w/template
var template = fs.readFile("template.html");
var result = smartdown.render(content);
fs.writeFile(out, haml.render(template, {
  context: {
    "title": source,
    "contents": result
  },
  locals: {
    static_url: function(url) {
      return relative + url;
    }
  }
}));
