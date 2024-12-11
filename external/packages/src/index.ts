import { Context, Schema } from 'koishi'
import fs from 'fs'
import path from 'path'
import audio from './plugin/audio'
import image from './plugin/image'
import text from './plugin/text'
import task from './plugin/task'
import roastChiken from './plugin/roastChiken'
import watermark from './plugin/watermark'
import maxkb from './plugin/maxkb'

export const name = 'hyh'

export interface Config { }

export const inject = ['database']

export const Config: Schema<Config> = Schema.object({})

export interface MaxKBChat {
  id: string;
  chatId: string;
}

declare module "koishi" {
  interface Tables {
    maxkb: MaxKBChat;
  }
}

// const pluginFilenames = fs.readdirSync(__dirname + '/plugin').filter(e => e !== '.DS_Store')
export function apply(ctx: Context) {
  ctx.model.extend("maxkb", {
    id: "string",
    chatId: "string",
  });
  // ctx.database.remove('message_counter_records' as any, {
  //   channelId: '978642752'
  // })
  // ctx.on('message', (session) => {
  //   console.log(session.content);
  // })
  // ctx.middleware(async (session, next) => {
  //   console.log("\x1b[32m中间件 - selfId\x1b[0m%s", session.selfId);
  //   console.log("\x1b[32m中间件 - channelId\x1b[0m%s", session.channelId);
  //   console.log("\x1b[32m中间件 - guildId\x1b[0m%s", session.guildId);
  //   console.log("\x1b[32m中间件 - message\x1b[0m%s", session.content);
  //   console.log("\n\n");
  // });

  // const basePath = path.resolve(__dirname, './plugin')
  // for (const filename of pluginFilenames) {
  //   const fn = require(`${basePath}/${filename}/index.ts`).default
  //   fn(ctx)
  // }

  // docker run -d \
  // --name=meme-generator \
  // -p 2233:2233 \
  // -v /Users/coderhyh/Pictures/memes:/data/memes \
  // --restart always \
  // meetwq/meme-generator:latest

  // docker run -v /Users/coderhyh/Desktop/docker-volumes/douyin_tiktok_download_api/douyin_web/config.yaml:/app/crawlers/douyin/web/config.yaml -d --name douyin_tiktok_api -p 7769:80 evil0ctal/douyin_tiktok_download_api

  // docker run -d \
  //   --name=javbus-api \
  //   --restart=unless-stopped \
  //   -p 8922:3000 \
  //   -e HTTP_PROXY=http://host.docker.internal:7897 \
  //   ovnrain/javbus-api

  audio(ctx)
  image(ctx)
  text(ctx)
  task(ctx)
  roastChiken(ctx)
  watermark(ctx)
  maxkb(ctx)
}
