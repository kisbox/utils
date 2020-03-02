"use strict"
/**
 * A lightweight yet complete alternative to `typeof` based on traits.
 **/

const {
  $meta: { $tag }
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

type.isArrayLike = function (any) {
  // https://stackoverflow.com/a/55080450
  return (
    !!any
    && typeof any[Symbol.iterator] === "function"
    && typeof any.length === "number"
    && typeof any !== "string"
  )
}

type.isAtom = function (any) {
  return any === null || typeof any !== "object" || any instanceof Date
}

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
