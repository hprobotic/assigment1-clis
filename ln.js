#!/usr/bin/env babel-node

var helper = require('./helper')
var path = require('path')
let prom = require('songbird')
let fs = require('fs').promise
let argv = require('yargs').argv

async function ls() {
    fs.symLink(process.argv[2], process.argv[3]).catch(
        err => console.log(err)
    )
}