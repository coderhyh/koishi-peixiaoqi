import { } from 'koishi-plugin-adapter-onebot'
import { Context, h, Session } from 'koishi'
import axios from 'axios'

const reqAudio = async (session: Session, content: string[], name: string) => {
  try {
    if (!content.length) {
      return '请输入内容'
    }
    const res = await axios.get(`https://qtkj.love/api/AI_Speaker/?speaker=${name}&message=${content.join(' ')}`)
      .then(r => r.data)
    if (res.code === 200) {
      console.log(content.join(' '), res.data.url);
      session.onebot.sendGroupMsg(session.guildId, `[CQ:record,file=${res.data.url}]`)
    }
    else {
      console.log(content.join(' '), res.msg);
      return h.text(res.msg)
    }
  } catch (error) {
    console.log(error);
  }
}
export default function (ctx: Context) {
  ctx.command('鸡你太美')
    .action(async ({ session }) => {
      return h.audio('http://api.yujn.cn/api/sjkk.php')
    })
  ctx.command('hentai')
    .action(async ({ session }) => {
      return h.audio('http://api.yujn.cn/api/maren.php')
    })
  // ctx.command('撒娇')
  //   .action(async ({ session }, ...content) => {
  //     try {
  //       const res = await axios.get('https://api.pearktrue.cn/api/yujie/?type=mp3').then(r => r.data)
  //       console.log(res);
  //       await session.onebot.sendGroupMsg(session.guildId, `[CQ:record,file=${res.audiopath}]`)
  //     } catch (error) {
  //       return '获取失败'
  //     }
  //   })
  // ctx.command('丁真 <content:string>', '示例：丁真 内容')
  //   .action(async ({ session }, ...content) => {
  //     reqAudio(session, content, 'dinzheng')
  //   })
  // // ctx.command('东雪莲 <content:string>', '示例：东雪莲 内容')
  // //   .action(async ({ session }, ...content) => {
  // //     reqAudio(session, content, 'dongxuelian')
  // //   })
  // ctx.command('懒羊羊 <content:string>', '示例：懒羊羊 内容')
  //   .action(async ({ session }, ...content) => {
  //     reqAudio(session, content, 'lanyangyang')
  //   })
  // ctx.command('陈泽 <content:string>', '示例：陈泽 内容')
  //   .action(async ({ session }, ...content) => {
  //     reqAudio(session, content, 'chenze')
  //   })
}
