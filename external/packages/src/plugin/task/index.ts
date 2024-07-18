import { } from 'koishi-plugin-cron'
import { } from 'koishi-plugin-adapter-onebot'
import { } from '@koishijs/plugin-broadcast'
import { Context } from 'koishi'


export default async function (ctx: Context) {
  try {
    ctx.cron('00 11 * * *', async () => {
      const bot = ctx.bots[0]
      const guildList = await bot.getGuildList()
      const blackList = ['836894810']
      guildList.data
        .filter(e => blackList.some(v => e.id !== v))
        .forEach(e => bot.sendMessage(e.id, '佩小琪提醒大家：已经11.00啦，大家不要忘记点外卖哟！'))
    })
    ctx.cron('30 17 * * *', async () => {
      const bot = ctx.bots[0]
      const guildList = await bot.getGuildList()
      const blackList = ['836894810']
      guildList.data
        .forEach(e =>
          blackList.some(v => e.id !== v) &&
          bot.sendMessage(e.id, '佩小琪提醒大家：已经17.30啦，佩小琪要下班啦！等我回来吧！')
        )
    })
  } catch (error) {
    console.log(error);
  }
}
