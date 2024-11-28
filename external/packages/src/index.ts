import { Context, Schema } from 'koishi'
import fs from 'fs'
import path from 'path'
import audio from './plugin/audio'
import image from './plugin/image'
import text from './plugin/text'
import task from './plugin/task'
import roastChiken from './plugin/roastChiken'

export const name = 'hyh'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

// const pluginFilenames = fs.readdirSync(__dirname + '/plugin').filter(e => e !== '.DS_Store')
export function apply(ctx: Context) {
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

  audio(ctx)
  image(ctx)
  text(ctx)
  task(ctx)
  roastChiken(ctx)
}
