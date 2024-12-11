import { Context, Schema } from "koishi";
import { transform } from "koishi-plugin-markdown";
import { chat, openChat } from "./maxkb";

export interface Config {
  baseUrl: string;
  apikey: string;
  atTrigger: boolean;
  keywordTrigger: boolean;
  keyword: string;
}

export default function (ctx: Context) {
  ctx.config.baseUrl = 'http://127.0.0.1:8080/api/application/e1aefd00-b6ce-11ef-8c11-0242ac110004'
  ctx.config.apikey = 'application-d06d94eb9d661e36e451d1eaf58b6856'

  const keyword = /^pxq/;
  ctx.on('message', async (session) => {
    if (keyword.test(session.content)) {
      const chats = await ctx.database.get("maxkb", session.channelId);
      let chatId: string;
      if (chats.length > 0) {
        chatId = chats[0].chatId;
      } else {
        chatId = await openChat(ctx);
        await ctx.database.create("maxkb", { id: session.channelId, chatId });
      }
      const rawAnswer = await chat(ctx, session.content, chatId);
      session.send(transform(rawAnswer));
    }
  })
}
