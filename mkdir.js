#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise

async function mkdir() {
    let argv = await process.argv
    console.log(argv)
    let input = await process.argv[2]
    await fs.mkdir(input)
}

mkdir()