#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise

async function cat() {
    let input = await process.argv[2]
    let data = await fs.readFile(input, 'utf-8')
    console.log(data)
}

cat()