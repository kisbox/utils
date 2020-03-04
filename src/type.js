"use strict"
/**
 * A lightweight yet complete alternative to `typeof` based on traits.
 **/

const {
  $meta: { $tag },
  any: { isArrayLike, isAtom, isInstance }
} = require("@kisbox/helpers")

const $type = $tag("/type/")

/* Definition */

function type (any) {
  const primitive = typeof any
  if (primitive === "object") {
    return any === null ? "null" : $type.get(any)
  } else {
    return primitive
  }
}

type.set = function (constructor, typeName) {
  $type.set(constructor.prototype, typeName)
}

/* Special Type Testing */

type.isArrayLike = isArrayLike
type.isAtom = isAtom
type.isInstance = isInstance

/* Initial Setup */

type.set(Array, "array")
type.set(Date, "date")
type.set(Error, "error")
type.set(Map, "map")
type.set(Object, "object")
type.set(Promise, "promise")
// type.set(Proxy, "proxy")
type.set(RegExp, "regexp")
type.set(Set, "set")
type.set(WeakSet, "weakset")
type.set(WeakMap, "weakmap")

/* Export */
module.exports = type
