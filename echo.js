#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise

async function echo() {
    // Use 'await' in here
    // Your implementation here
    let input = await process.argv.slice(2).join(" ")
    console.log(input)
    // console.log(await fs.readFile(__filename, console.log))
}

echo()
