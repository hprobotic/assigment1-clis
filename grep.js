#!/usr/bin/env babel-node

var helper = require('./helper')
var path = require('path')
let prom = require('songbird')
let fs = require('fs');
let argv = require('yargs').argv
let readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream(process.argv[3]),
    output: process.stdout,
    terminal: false
})

var re = new RegExp(process.argv[2])
var lineNum = 1

rd.on('line', function (line) {
    if(re.test(line)) {
        console.log(lineNum + ": " + line)
    }
    lineNum++
})