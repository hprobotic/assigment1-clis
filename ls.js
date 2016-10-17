#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let path = require('path')
let argv = require('yargs').argv
let prom = require('songbird')


async function ls(dirPath) {
    let stat = await fs.stat(dirPath)
    if (!stat.isDirectory()) return [dirPath]

    let promises = []
    let merged = []
    let listItem = await fs.readdir(dirPath)
    for (let item of listItem ) {
        if (argv.R) {
            let promise = ls(path.join(dirPath, item))
            promises.push(promise)
        } else {
            merged.push(path.join(dirPath, item))
        }
    }

    if (argv.R) {
        let files = await prom.all(promises)
        merged = [].concat.apply([], files)
    }
    return merged

}

async  function main() {
    let input = process.argv[2] || __dirname
    console.log(await ls(input))
}

main()

// async function findFiles(dir) {
//     // isDirectory?
//     let files = await fs.readdir(dir)
//     for (let item of files) {
//         try {
//             let fileStats = await fs.stat(dir + '/' + item)
//             if ( await  fileStats.isDirectory()) {
//                 findFiles(dir + '/' + item)
//             } else {
//                 console.log(dir + '/' + item)
//             }
//         } catch (err) {
//             console.log(dir + '/' + item)
//         }
//     }
// }
//
// async function ls() {
//     let input = await process.argv[2]
//     findFiles(input)
// }
//
// ls()