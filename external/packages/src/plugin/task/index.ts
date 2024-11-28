import { } from 'koishi-plugin-cron'
import { } from 'koishi-plugin-adapter-onebot'
import { Context, h } from 'koishi'
import { pathToFileURL } from 'url'
import { resolve } from 'path'


export default async function (ctx: Context) {
  // ctx.cron('00 11 * * *', async () => {
  //   const bot = ctx.bots[0]
  //   const guildList = await bot.getGuildList()
  //   const blackList = ['836894810']
  //   guildList.data
  //     .forEach(e =>
  //       blackList.some(v => e.id !== v) &&
  //       bot.sendMessage(e.id, '佩小琪提醒大家：已经11:00啦，大家不要忘记点外卖哟！')
  //     )
  // })
  // ctx.cron('30 17 * * *', async () => {
  //   const bot = ctx.bots[0]
  //   const guildList = await bot.getGuildList()
  //   const blackList = ['836894810']
  //   guildList.data
  //     .forEach(e =>
  //       blackList.some(v => e.id !== v) &&
  //       bot.sendMessage(e.id, '佩小琪提醒大家：已经17:30啦，佩小琪下班咯！等我回来吧！')
  //     )
  // })

  ctx.command('佩小琪下班啦')
    .action(async ({ session }) => {
      const bot = ctx.bots[0]
      const guildList = await bot.getGuildList()
      const blackList = ['836894810']
      guildList.data
        .forEach(e =>
          blackList.some(v => e.id !== v) &&
          bot.sendMessage(e.id, '佩小琪提醒大家：佩小琪下班咯！等我回来吧！')
        )
    })

  // const bot = ctx.bots[0]
  // const guildList = await bot.getGuildList()
  // const blackList = ['836894810']
  // guildList.data
  //   .forEach(e =>
  //     blackList.some(v => e.id !== v) &&
  //     bot.sendMessage(e.id, '佩小琪回来加班啦！')
  //   )
}
