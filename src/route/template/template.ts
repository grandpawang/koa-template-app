import { ecode } from "lib/ecode/common_ecode"
import { Context, Next } from "lib/net/http/context"

export async function test2(ctx: Context, next: Next) {
  ctx.json(ecode.OK, "test2", next)
}
