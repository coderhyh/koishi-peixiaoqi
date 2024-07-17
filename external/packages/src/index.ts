import { Context, Schema } from 'koishi'
import fs from 'fs'
import path from 'path'

export const name = 'hyh'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

const pluginFilenames = fs.readdirSync(__dirname + '/plugin').filter(e => e !== '.DS_Store')
export function apply(ctx: Context) {
  const basePath = path.resolve(__dirname, './plugin')
  for (const filename of pluginFilenames) {
    const fn = require(`${basePath}/${filename}/index.ts`).default
    fn(ctx)
  }
}
