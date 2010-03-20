#!/usr/bin/env seed-node

var sys = require("sys"), fs = require("core_support:fs"), 
    smartdown = require("smartdown"), Path = require("core_support:path"),
    haml = require("haml-js");

var source = process.ARGV[3], out = process.ARGV[4];
fs.mkdir_p(Path.dirname(out), 0777);

var content = fs.readFile(source);
content.replace("–", "&emdash");

var template = fs.readFile("template.html");
var result = smartdown.render(content);
fs.writeFile(out, haml.render(template, {
  context: {
    "title": source,
    "contents": result
  }
}));
