import { } from 'koishi-plugin-adapter-onebot'
import { Context, h } from 'koishi'
import axios from 'axios'
import fs from 'fs'
import { resolve } from 'path'

export default function (ctx: Context) {
  ctx.command('kfc')
    .action(async ({ session }) => {
      const text = await axios.get('https://qtkj.love/api/kfc.php?type=text').then(r => r.data)
      return h.text(text)
    })
  ctx.command('uuid')
    .action(async ({ session }, arg) => {
      const text = await axios.get('https://api.suyanw.cn/api/uuid.php?type=text').then(r => r.data)
      session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${session.event.user.id}] ${text}`)
    })
  ctx.command('鸡汤')
    .action(async ({ session }, arg) => {
      const text = await axios.get('https://api.suyanw.cn/api/djt.php').then(r => r.data)
      session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${session.event.user.id}] ${text}`)
    })
  ctx.command('猫眼票房')
    .action(async ({ session }, arg) => {
      const text = await axios.get('https://qtkj.love/api/piaofang.php').then(r => r.data)
      session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${session.event.user.id}]\n${text}`)
    })
  ctx.command('祝福')
    .action(async ({ session }, arg) => {
      const text = await axios.get('https://qtkj.love/api/zfy.php').then(r => r.data)
      session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${session.event.user.id}] ${text}`)
    })
  ctx.command('骂我')
    .action(async ({ session }) => {
      const res = await axios.get('https://api.oddfar.com/yl/q.php?c=1009&encode=text').then(r => r.data)
      session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${session.event.user.id}] ${res}`)
    })
  ctx.guild('796522033').command('轻骑兵')
    .action(async ({ session }) => {
      session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=1804569144] 沟槽的轻骑兵`)
    })
  // ctx.guild('796522033').command('樱岛')
  //   .action(async ({ session }) => {
  //     session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=987942314] 沟槽的樱道友`)
  //   })
  ctx.guild('796522033').command('下头')
    .action(async ({ session }) => {
      session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=2694562449] 下头狗`)
    })
  ctx.guild('796522033').command('管理员')
    .action(async ({ session }) => {
      session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=676220020] 狗群主 快给[CQ:at,qq=${session.event.user.id}]管理员`);
    })
  ctx.guild('796522033', '436984426', '745893769').command('大海')
    .action(async ({ session }) => {
      session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=2259660294] 两眼一条缝，外八小胡子，右嘴一颗痣，手拿爱疯15，张嘴八系，闭嘴拆迁`)
    })
  ctx.command('骂 <at>', '示例：骂 @某人')
    .action(async ({ session }, user) => {
      const self = session.event.user.id
      // session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${self}] 近期骂人被举报，我要文明发言！不过你可以骂自己`)
      // return
      const target = user?.match(/\d+/g)?.[0]
      if (!target) {
        session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${self}] 请@某人重新来～`)
        return
      }

      if (target === session.bot.userId) {
        session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${self}] 不准骂佩小琪！哼！`)
        return
      }
      if (target === '772567615') {
        session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${self}] 不准骂我主人！哼！`)
        return
      }
      const res = await axios.get('https://api.oddfar.com/yl/q.php?c=1009&encode=text').then(r => r.data)
      session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${target}] ${res}`)
    })
  // ctx.command('点歌 <music:string>', '示例：点歌 鸡你太美')
  //   .action(async ({ session }, musicName) => {
  //     try {
  //       const music = musicName.trim()
  //       if (!music) return '请输入歌名再来'
  //       const res = await axios.get(`https://qtkj.love/api/qq_music.php?msg=${music}&n=1`).then(r => r.data)
  //       console.log('点歌: ', music, ': ', res);
  //       if (res.status === 'success') {
  //         const r = await axios.get(res.url, { responseType: 'stream' }).then(r => r.data)
  //         const fileName = new Date().getTime() + '.mp3'
  //         const localAudioPath = resolve(__dirname, fileName)
  //         const writer = fs.createWriteStream(localAudioPath);
  //         r.pipe(writer);
  //         await new Promise(resolve => writer.on('finish', resolve));
  //         // return h.audio(pathToFileURL(localAudioPath).href)
  //         session.onebot.uploadGroupFile(session.guildId, localAudioPath, `${music}-${res.singer}.mp3`)
  //           .finally(() => fs.unlinkSync(localAudioPath))
  //       } else return '点歌失败'
  //     } catch (error) {
  //       return '点歌失败'
  //     }
  //   })
  ctx.command('抽签')
    .action(async ({ session }) => {
      try {
        const self = session.event.user.id
        const res = await axios.get(`https://api.suyanw.cn/api/chouq.php`).then(r => r.data)
        if (res.code !== 1) {
          return '抽签失败'
        }
        const { format, draw, annotate, explain, details, source, image } = res.data
        const content = `\n本次签到结果：${format}\n\n签名：${draw}\n\n注解：${annotate}\n\n解签：${explain}\n\n详情：${details}\n\n出处：${source}`
        session.onebot.sendGroupMsg(session.guildId, [
          {
            type: 'at',
            data: {
              qq: self
            }
          },
          {
            type: 'text',
            data: {
              text: content
            }
          },
          {
            type: 'image',
            data: {
              file: image
            }
          }
        ])
      } catch (error) {
        return '抽签失败'
      }
    })
  ctx.on('message-deleted', async (session) => {
    const { operator_id, user_id } = session.event._data
    const res = await session.onebot.getMsg(session.event._data.message_id)
    const message: any = res.message
    console.log('撤回消息: ', session.guildId, operator_id, user_id, message);
    const blackList = ['1031015552', '855139333']
    if (blackList.includes(session.guildId)) return
    if (!message || operator_id !== user_id) {
      console.log('消息为空 或者 非本人撤回消息: ', session.guildId, operator_id, user_id, message);
      return
    }
    let defaultMsg: any = {
      type: 'text',
      data: {
        text: '【未知的回显类型】'
      }
    }
    const messageType = (item) => {
      const obj = {
        image: {
          type: 'image',
          data: {
            file: item.data.url
          }
        },
        text: {
          type: 'text',
          data: {
            text: item.data.text ?? ''
          }
        },
        video: {
          type: 'text',
          data: {
            text: '【视频不支持回显】'
          }
        },
        at: {
          type: 'at',
          data: {
            qq: item.data.qq
          }
        },
        reply: {
          type: 'text',
          data: {
            text: '【引用消息，不支持回显】'
          }
        },
        record: {
          type: 'text',
          data: {
            text: '【语音消息，不支持回显】'
          }
        },
        face: {
          type: "text",
          data: {
            text: '【表情】'
          }
        },
        forward: {
          type: "text",
          data: {
            text: '【合并消息，不支持回显】'
          }
        }
      }
      return obj[item.type]
    }
    const msg = [
      {
        type: 'at',
        data: {
          qq: user_id + '',
        }
      },
      {
        type: 'text',
        data: {
          text: ' 撤回了一条消息：\n'
        }
      },
      ...message.map(e => messageType(e) ?? defaultMsg)
    ]

    session.onebot.sendGroupMsg(session.guildId, msg)
  })
}
