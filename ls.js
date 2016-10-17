#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise

async function findFiles(dir) {
    // isDirectory?
    let files = await fs.readdir(dir)
    for (let item of files) {
        try {
            let fileStats = await fs.stat(dir + '/' + item)
            if ( await  fileStats.isDirectory()) {
                findFiles(dir + '/' + item)
            } else {
                console.log(dir + '/' + item)
            }
        } catch (err) {
            console.log(dir + '/' + item)
        }
    }
}

async function ls() {
    let input = await process.argv[2]
    findFiles(input)
}

ls()