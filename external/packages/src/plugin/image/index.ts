import { } from 'koishi-plugin-adapter-onebot'
import { Context, h } from 'koishi'
import fs from 'fs'
import { pathToFileURL } from 'url'
import { resolve } from 'path'
import axios from 'axios'
import Jimp from 'jimp'

const acgUrl = '/Users/coderhyh/Pictures/img'
const acgImg = fs.readdirSync(acgUrl)

export default function (ctx: Context) {
  ctx.command('随机二次元')
    .action(async ({ session }) => {
      const fileName = acgImg[Math.floor(Math.random() * acgImg.length)]
      return h.image(pathToFileURL(`${acgUrl}/${fileName}`).href)
    })
  ctx.command('随机jk').alias('jk')
    .action(async ({ session }) => {
      return h.image('https://api.suyanw.cn/api/jk.php')
    })
  ctx.command('随机cos')
    .action(async ({ session }) => {
      return h.image('https://api.suyanw.cn/api/cos.php')
    })
  // ctx.command('舔狗证 <name>', '示例：舔狗证 名字')
  //   .action(async ({ session }, name) => {
  //     if (/<at id="\d+"\/>/.test(name)) {
  //       return '艾特无效，请直接输入内容'
  //     }
  //     if (name.length > 5) {
  //       return '内容过长，最多5个字'
  //     }
  //     return h.image('https://qtkj.love/api/tgzm.php?msg=' + name)
  //   })
  ctx.command('猫猫举牌 <text:string>', '示例：猫猫举牌 名字')
    .action(async ({ session }, text) => {
      if (!text?.length) {
        return '请输入内容'
      }
      if (text.length > 20) {
        return '内容过长'
      }
      return h.image('https://api.s1f.top/meme/maomaojupai?text=' + text)
    })
  ctx.command('黑丝举牌 <text:string>', '示例：黑丝举牌 名字; 支持3句话 空格隔开')
    .action(async ({ session }, ...text) => {
      if (!text.join(' ').length) {
        return '请输入内容'
      }
      if (text.join(' ').length > 20) {
        return '内容过长'
      }
      const msg = text.slice(0, 3).map((e, i) => `msg${i ? i : ''}=${e}`).join('&')

      return h.image('https://api.suyanw.cn/api/hsjp/?rgb1=0&rgb2=0&rgb3=0&' + msg)
    })
  ctx.command('举牌 <text:string>', '示例：举牌 内容')
    .action(async ({ session }, ...text) => {
      if (!text?.length) {
        return '请输入内容'
      }
      if (text.join(' ').length > 30) {
        return '内容过长'
      }
      return h.image('https://api.suyanw.cn/api/zt.php?msg=' + text.join(' '))
    })
  // ctx.command('喜报', '示例：喜报 内容; 可多行，空格隔开')
  //   .action(async ({ session }, ...text) => {
  //     if (!text?.length) {
  //       return '请输入内容'
  //     }
  //     return h.image('https://qtkj.love/api/bx.php?msg=' + text.join('\n'))
  //   })
  // ctx.command('悲报', '示例：悲报 内容; 可多行，空格隔开')
  //   .action(async ({ session }, ...text) => {
  //     if (!text?.length) {
  //       return '请输入内容'
  //     }
  //     return h.image('https://qtkj.love/api/emote_beibao.php?msg=' + text.join('\n'))
  //   })
  ctx.command('qq评估')
    .action(async ({ session }) => {
      session.onebot.sendGroupMsg(session.guildId, [
        {
          type: 'at',
          data: {
            qq: session.event.user.id,
          }
        },
        {
          type: 'image',
          data: {
            file: `https://api.suyanw.cn/api/pinggu.php?qq=${session.event.user.id}`
          }
        },
      ])
    })
  ctx.command('原神')
    .action(async ({ session }) => {
      return h.image('https://api.suyanw.cn/api/ys.php')
    })
  ctx.command('签证')
    .action(async ({ session }) => {
      return h.image('https://api.suyanw.cn/api/zs.php?qq=' + session.event.user.id)
    })
  ctx.command('羡慕')
    .action(async ({ session }) => {
      return h.image('https://api.pearktrue.cn/api/qqbqb/xianmu/xianmu.php?qq=' + session.event.user.id)
    })

  const getAcgR18 = async (count = 0) => {
    try {
      const img = await axios.get('http://api.yujn.cn/api/sese.php', { responseType: 'arraybuffer' })
      return img.data
    } catch (error) {
      console.log('获取失败', count, error.message);
      if (count++ < 5) return await getAcgR18(count)
      throw Error('获取失败')
    }
  }
  ctx.command('涩涩', '(r18)')
    .action(async ({ session }) => {
      try {
        const fileName = new Date().getTime() + '.jpg'
        const path = resolve(__dirname, fileName)
        // 1031015552 '796522033'
        const whiteList = ['881549303', '836894810', '768146256', '492126120', '320277810', '541444899', '953324814', '702082516']
        if (!whiteList.includes(session.guildId))
          return '涩涩在此群内禁用'
        const img = await getAcgR18()
        fs.writeFileSync(path, img)
        console.log('涩涩');
        const image = await Jimp.read(path)
        // 调整亮度和对比度
        image.brightness(0.1); // 亮度，范围[-1, 1]
        image.contrast(0.1);   // 对比度，范围[-1, 1]
        // // 轻微旋转
        // image.rotate(1); // 角度，单位：度
        // 保存修改后的图片
        image.writeAsync(path);
        session.onebot.sendGroupForwardMsg(session.guildId, [
          {
            type: "node",
            data: {
              user_id: "2507560118",
              nickname: "候凯",
              content: [
                // { type: "text", data: { text: '主人请看～' } },
                { type: "image", data: { file: path } },
              ]
            }
          }
        ] as any).finally(() => {
          fs.unlinkSync(path)
        })
        // return h.image(pathToFileURL(path).href)
      } catch (error) {
        console.log(error);

        return '获取失败'
      }
    })
  ctx.command('牵 <at>', '示例：牵 @某人')
    .action(async ({ session }, arg) => {
      const self = session.event.user.id
      const target = arg.match(/\d+/g)?.[0]
      if (!target) {
        session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${self}] 请@某人重新来～`)
        return
      }
      return h.image(`https://api.pearktrue.cn/api/qqbqb/qian/qian.php?qq1=${self}&qq2=${target}`)
    })
  ctx.command('爬 <at>', '示例：爬 @某人')
    .action(async ({ session }, arg) => {
      const self = session.event.user.id
      const target = arg?.match(/\d+/g)?.[0]
      if (!target) {
        session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${self}] 请@某人重新来～`)
        return
      }
      return h.image(`https://api.pearktrue.cn/api/qqbqb/pa/pa.php?qq=${target}`)
    })
  ctx.command('星座运势')
    .action(async ({ session }) => {
      return h.image('https://dayu.qqsuu.cn/xingzuoyunshi/apis.php')
    })
  ctx.command('舔狗日记').alias('候凯日记', '猴凯日记', '侯凯日记', '大海日记')
    .action(async ({ session }) => {
      return h.image('https://api.suyanw.cn/api/tgbj.php')
    })
  ctx.command('摸鱼')
    .action(async ({ session }) => {
      return h.image('http://api.yujn.cn/api/moyu.php?msg=摸鱼日报&type=image')
    })
  ctx.on('message', (session) => {
    const kun = ['哥哥', '鸡哥', '小黑子', '坤', 'kun']
    if (kun.some(e => session.content.includes(e))) {
      session.send(h.image('http://api.yujn.cn/api/cxk.php?'))
    }
  })
  // ctx.command('造谣')
  //   .action(async ({ session }) => {
  //     session.onebot.sendGroupForwardMsg(session.guildId, [
  //       {
  //         type: "node",
  //         data: {
  //           user_id: "2507560118",
  //           nickname: "候凯",
  //           content: [
  //             // { type: "text", data: { text: '主人请看～' } },
  //             // { type: "image", data: { file: path } },
  //           ]
  //         }
  //       }
  //     ] as any)
  //   })
}
