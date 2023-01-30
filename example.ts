import fs from 'fs'
import { createChain } from './core'

function withChain() {
  let scripts = createChain('package.json')
    .map(file => fs.readFileSync(file).toString())
    .map(text => JSON.parse(text).scripts)
    .map(Object.keys)
    .unwrap()
  console.log('package scripts:', scripts)
}

function withoutChain() {
  console.log(
    'package scripts:',
    Object.keys(JSON.parse(fs.readFileSync('package.json').toString()).scripts),
  )
}

function withSideEffects() {
  let scripts = createChain('package.json')
    .use(file => console.log('reading file:', file))
    .map(fs.readFileSync)
    .use(buffer => console.log('size:', buffer.length))
    .map(buffer => buffer.toString())
    .map(JSON.parse)
    .use(pkg => console.log('package name:', pkg.name))
    .use(pkg => console.log('version:', pkg.version))
    .map(pkg => pkg.scripts)
    .map(Object.keys)
    .unwrap()
  console.log('package scripts:', scripts)
}

console.log('# with chain')
withChain()

console.log('# without chain')
withoutChain()

console.log('# with side effects')
withSideEffects()
