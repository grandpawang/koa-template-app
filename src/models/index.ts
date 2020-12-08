import template = require("./template")
import templateMongo = require("./templateMongo")
// mysql表单
export const mysql = [
  ...Object.values(template)
]

// mongodb 表单
export const mongo = [
  ...Object.values(templateMongo)
]
