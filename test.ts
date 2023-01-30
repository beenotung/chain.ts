import { Chain, createChain } from './core'

console.assert(createChain == Chain.wrap, 'createChain is alias of Chain.wrap')

let two = createChain(2)
let five = two.map(x => x + 3)
let ten = five.map(x => x * 2)

console.assert(
  two instanceof Chain,
  'createChain will create instance of Chain',
)
console.assert(
  five instanceof Chain,
  'createChain will create instance of Chain',
)
console.assert(
  ten instanceof Chain,
  'createChain will create instance of Chain',
)

let called: number[] = []
two.use(x => called.push(x))
five.use(x => called.push(x))
ten.use(x => called.push(x))

console.assert(two.value == two.unwrap(), '.unwrap() serve as alias to .value')

console.assert(two.value == 2, 'should be two')
console.assert(five.value == 5, 'should be five')
console.assert(ten.value == 10, 'should be ten')

console.assert(called.length == 3, 'should be called 3 times')
console.assert(called[0] == 2, 'should be called with 2')
console.assert(called[1] == 5, 'should be called with 5')
console.assert(called[2] == 10, 'should be called with 10')

console.log('finished all tests')
