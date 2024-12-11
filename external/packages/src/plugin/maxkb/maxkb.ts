import { Context } from "koishi";
import { posix } from "path";

export async function openChat(ctx: Context) {
  const url = posix.join(ctx.config.baseUrl, "chat/open");
  const res = await ctx.http.get(url, {
    headers: { Authorization: ctx.config.apikey },
  });
  return res.data;
}

export async function chat(ctx: Context, message: string, chatId: string) {
  const url = posix.join(ctx.config.baseUrl, "../chat_message", chatId);
  const res = await ctx.http.post(
    url,
    { message, stream: false },
    { headers: { Authorization: ctx.config.apikey } }
  );
  return res.data.content;
}
