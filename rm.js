#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let dirArray = []

async function rmFileAndDir(fileAndDir) {
    while (fileAndDir.length > 0){
        await fs.rmdir(fileAndDir.pop())
    }
}

async function findFiles(dir) {
    dirArray.push(dir)
    let dirsName = await fs.readdir(dir)
    for (let item of dirsName) {
        try {
            let fileStats = await fs.stat(dir + '/' + item)
            if ( await  fileStats.isDirectory() ) {
                dirArray.push(dir + '/' + item)
                findFiles(dir + '/' + item)
            } else {
                await  fs.unlink(dir + '/' + item)
            }
        } catch (err) {
            await fs.unlink(dir + '/' + item)
        }
    }

}

async function rm() {
    let input = process.argv[2]
    await findFiles(input)
    await rmFileAndDir(dirArray)
}

rm()