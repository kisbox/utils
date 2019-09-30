/* eslint-env jasmine */
"use strict"

const forArgs = require("../src/for-args")

/* Specs */

describe("forArgs", () => {
  describe("empty", () => {
    it("doesn't pass arguments", () => {
      forArgs([], null, function () {
        expect(arguments.length).toBe(0)
      })
    })
  })

  describe("value", () => {
    it("consumes a value", () => {
      forArgs(["value"], [1], function (x) {
        expect(x).toBe(1)
        expect(arguments.length).toBe(1)
      })
    })
  })

  describe("values", () => {
    it("iterate over arrays", () => {
      const args = []
      forArgs(["values"], [[1, 2, 3]], function (x) {
        args.push(x)
        expect(arguments.length).toBe(1)
      })
      expect(args).toEqual([1, 2, 3])
    })
  })

  describe("keys:value", () => {
    it("consumes key-value pairs of objects", () => {
      const keys = []
      const values = []
      forArgs(["keys:value"], [{ foo: "bar", bar: "baz" }], function (
        key,
        value
      ) {
        keys.push(key)
        values.push(value)
        expect(arguments.length).toBe(2)
      })
      expect(keys).toEqual(["foo", "bar"])
      expect(values).toEqual(["bar", "baz"])
    })
  })
})
