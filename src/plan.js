"use strict"
/**
 * Plan
 **/
const { timeout } = require("@kisbox/helpers")

/* Definition */

function plan (key, thunk = key) {
  if (plan.map.size === 0) {
    timeout(0).then(() => plan.execute())
  }
  plan.map.set(key, thunk)
}

plan.execute = function () {
  for (let [key, thunk] of plan.map) {
    thunk.call(key)
    plan.map.delete(key)
  }
}

plan.map = new Map()

/* Export */
module.exports = plan
