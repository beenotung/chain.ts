export class Chain<T> {
  constructor(public readonly value: T) {}

  use(f: (value: T) => void): this {
    f(this.value)
    return this
  }

  map<R>(f: (value: T) => R): Chain<R> {
    return new Chain<R>(f(this.value))
  }

  // use .unwrap() instead of .value to avoid prettier inline the last expression
  unwrap(): T {
    return this.value
  }

  toString(): string {
    return String(this.value)
  }

  valueOf(): T {
    return this.value
  }

  static wrap<T>(value: T): Chain<T> {
    return new Chain<T>(value)
  }
}

export let createChain = Chain.wrap
