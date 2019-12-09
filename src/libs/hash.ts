// use WeakMap to store the object->key mapping
// so the objects can be garbage collected.
// WeakMap uses a hashtable under the hood, so the lookup
// complexity is almost O(1).
const table = new WeakMap()

// counter of the key
let counter = 0

// hashes an array of objects and returns a string
export default function hash(args: any[]): string {
  if (!args.length) return ''
  let key = 'arg'
  for (let i = 0; i < args.length; ++i) {
    let _hash
    const arg = args[i]
    switch (typeof arg) {
      case 'object':
        if (!table.has(arg)) {
          _hash = counter
          table.set(arg, counter++)
        } else {
          _hash = table.get(arg)
        }
        break
      case 'string':
        // need to consider the case that `arg` is a string:
        // args           _hash
        // "undefined" -> '"undefined"'
        // undefined   -> 'undefined'
        // 123         -> '123'
        // null        -> 'null'
        // "null"      -> '"null"'
        _hash = '"' + arg + '"'
        break
      default:
        _hash = String(arg)
    }
    key += '@' + _hash
  }
  return key
}
