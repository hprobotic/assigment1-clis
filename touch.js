#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise

async function touch() {
    let input = await process.argv[2]
    try {
        let fileStats = await fs.stat(input)
        if (await fileStats.isFile()) {
            var timeInMiliSec = new Date()
            var sec = Math.round(timeInMiliSec.getTime() / 1000)
            await  fs.utimes(input, sec, sec)
            console.log('File has been created:', input)
        } else {
            console.log('File not found')
        }
    } catch (err) {
        await  fs.writeFile(input, '')
    }

}

touch()