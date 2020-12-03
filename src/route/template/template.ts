import { ecode } from "lib/ecode/common_ecode"
import { Context, Next } from "lib/net/http/context"
import { services } from ".";

console.log(services);

/**
 * template add
*/
export async function add(c: Context, next: Next) {
  console.log("post", c.request.toJSON())
  c.json(ecode.OK, "test2", next)
}

/**
 * template first
*/
export async function first(c: Context, next: Next) {
  console.log("get", c.request.get("token"))
  c.json(ecode.OK, "test2", next)
}
