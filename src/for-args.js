"use strict"
/**
 * Arguments parsing utility.
 *
 * @exports forArgs
 */

const {
  constructor: { call }
} = require("@kisbox/helpers")

const type = require("./type")

const { shift } = call(Array)

/* Definition */

/* Destructure **args** after **signature** and loop over handler.
 *
 * Possible args definitions.
 *
 */
function forArgs (formals, actuals, handler, current = []) {
  // if (formals) self-call(loop)
  // else applyHandler(current)
  if (formals.length) {
    const instruction = formals.shift()
    const loop = forArgs[instruction]
    if (!loop) {
      throw new Error(`Invalid 'forArgs' instruction: ${formals[0]}`)
    }
    loop(formals, actuals, handler, current)
  } else {
    handler.apply(this, current)
  }
}

/* Primitives */

/* Consumes a value */
forArgs["value"] = function (formals, actuals, handler, current) {
  const next = shift(actuals)
  current.push(next)
  forArgs(formals, actuals, handler, current)
}

/* Consumes values */
forArgs["values"] = function (formals, actuals, handler, current) {
  const next = shift(actuals)
  const index = current.length
  next.forEach(value => {
    current[index] = value
    forArgs(formals, actuals, handler, current)
  })
}

forArgs["keys:value"] = function (formals, actuals, handler, current) {
  const next = shift(actuals)
  const index = current.length
  if (type(next) === "object") {
    Object.entries(next).forEach(([key, value]) => {
      current[index] = key
      current[index + 1] = value
      forArgs(formals, actuals, handler, current)
    })
  } else {
    typeError("keys:value", next)
  }
}

/* Compound */

/* Consumes an atom or an array of atoms. */
forArgs["atoms"] = function (formals, actuals, handler, current) {
  const next = actuals[0]
  if (type.isAtom(next)) {
    // atom => "value"
    forArgs["value"](formals, actuals, handler, current)
  } else if (type.isArrayLike(next)) {
    // atoms => "values"
    forArgs["values"](formals, actuals, handler, current)
  } else {
    typeError("atoms", next)
  }
}

/* Consumes a key/atom pairs */
forArgs["keys:atom"] = function (formals, actuals, handler, current) {
  const next = actuals[0]
  if (type.isAtom(next)) {
    // key, atom => "value", "value"
    formals.unshift("value")
    forArgs["value"](formals, actuals, handler, current)
  } else if (type.isArrayLike(next)) {
    // ...keys, atom => "values", "value"
    formals.unshift("value")
    forArgs["values"](formals, actuals, handler, current)
  } else if (type(next) === "object") {
    // { ...key: atom } => "keys:value"
    forArgs["keys:value"](formals, actuals, handler, current)
  } else {
    typeError("keys:atom", next)
  }
}

/* Helpers */
function typeError (type, argument) {
  throw new Error(`Argument is not of expected type '${type}': ${argument}`)
}

/* Export */
module.exports = forArgs
