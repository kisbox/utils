"use strict"
/**
 * A lightweight yet complete alternative to `typeof` based on traits.
 **/

const { $tag, isArrayLike, isAtom, isInstance } = require("@kisbox/helpers")

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
// type.set(Proxy, "proxy")
type.set(RegExp, "regexp")
type.set(Set, "set")
type.set(WeakSet, "weakset")
type.set(WeakMap, "weakmap")

if (typeof Promise !== "undefined") {
  type.set(Promise, "promise")
}

/* Export */
module.exports = type
