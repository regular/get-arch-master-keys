#!/usr/bin/env node
const pull = require('pull-stream')
const keys = require('.')

pull(
  keys(),
  pull.map( ({fingerprint, name}) => 
   `${fingerprint} | ${name}`
  ),
  pull.drain(console.log)
)
