/* eslint-env jasmine */
"use strict"

const type = require("../src/type")

/* Data */

const all = {
  // Atoms
  boolean: [true, false],
  date: [new Date()],
  function: [new Function(), () => {}],
  null: [null],
  number: [-1, 0, 1, NaN],
  string: ["foo", ""],
  symbol: [Symbol("foo"), Symbol("")],
  undefined: [undefined],

  // Composite
  array: [new Array()],
  error: [new Error(), new TypeError()],
  map: [new Map()],
  object: [new Object()],
  promise: [new Promise(() => {})],
  regexp: [new RegExp()],
  set: [new Set()],
  weakmap: [new WeakMap()],
  weakset: [new WeakSet()]
}

const atoms = [
  "boolean",
  "date",
  "function",
  "null",
  "number",
  "string",
  "symbol",
  "undefined"
]

/* Specs */

describe("type", () => {
  it("returns object type", () => {
    Object.entries(all).forEach(([typeName, examples]) => {
      examples.forEach(item => {
        expect(type(item)).toBe(typeName)
      })
    })
  })

  describe("set()", () => {
    it("sets a type", () => {
      class Foo {}
      type.set(Foo, "foo")
      expect(type(new Foo())).toBe("foo")

      // TODO: check why we cannot re-set a type & if this is desirable.
      // (maybe type.set() should be removed, actually)
      // type.set(Foo, undefined)
      // expect(type(new Foo())).toBe(undefined)
    })
  })

  describe("isArrayLike()", () => {
    it("returns whether an object is array-like", function () {
      Object.entries(all).forEach(([typeName, examples]) => {
        examples.forEach(item => {
          const expected = typeName === "array"
          expect(type.isArrayLike(item)).toBe(expected)
        })
        expect(type.isArrayLike(arguments)).toBe(true)
      })
    })
  })

  describe("isAtom()", () => {
    it("returns whether an object is an atom", () => {
      Object.entries(all).forEach(([typeName, examples]) => {
        examples.forEach(item => {
          const expected = atoms.includes(typeName)
          expect(type.isAtom(item)).toBe(expected)
        })
      })
    })
  })
})
