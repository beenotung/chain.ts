# chain.ts

Enjoy clarisity of the pipe syntax in Elixir within the current javascript environment in type-safe manner.

[![npm Package Version](https://img.shields.io/npm/v/chain.ts)](https://www.npmjs.com/package/chain.ts)

chain.ts helps you to express nested function calls in natural order without intermediate variables for better readability and maintainability.

## Installation

```bash
npm install chain.ts
```

```ts
// import from typescript
import { createChain } from 'chain.ts'
```

```js
// import from javascript
const { createChain } = require('chain.ts')
```

## Typescript Signature

```ts
export class Chain<T> {
  readonly value: T
  constructor(value: T)
  use(f: (value: T) => void): this
  map<R>(f: (value: T) => R): Chain<R>
  unwrap(): T
  static wrap<T>(value: T): Chain<T>
}
export let createChain: typeof Chain.wrap
```

## Usage Example

### Usage of createChain() and .map()

```ts
let scripts = createChain('package.json')
  .map(file => fs.readFileSync(file).toString())
  .map(text => JSON.parse(text).scripts)
  .map(Object.keys)
  .unwrap()
console.log('package scripts:', scripts)
```

Noted the above code is written (and read) by programmer in the same order as the execution order.

The above example is equivalent to below (less readable) version without intermidiate variables:

```ts
console.log(
  'package scripts:',
  Object.keys(JSON.parse(fs.readFileSync('package.json').toString()).scripts),
)
```

Noted the above code is written in reversed order as the execution order.
i.e. you see `Object.keys()` before `JSON.parse()` but the former is executed after the latter, hence it is unnatual to read the code, especially when the operation chain gets longer.

### Usage of .use()

In addition, you can perform side effects using `.use(cb)` without manually returning the original value in the chain of operations. For example:

```ts
let scripts = createChain('package.json')
  .use(file => console.log('reading file:', file))
  .map(file => fs.readFileSync(file).toString())
  .map(JSON.parse)
  .use(pkg => console.log('package name:', pkg.name))
  .use(pkg => console.log('version:', pkg.version))
  .map(pkg => pkg.scripts)
  .map(Object.keys)
  .unwrap()

console.log('package scripts:', scripts)
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
