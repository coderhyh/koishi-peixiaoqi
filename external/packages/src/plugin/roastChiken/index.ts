import {} from 'koishi-plugin-adapter-onebot'
import { Context, h } from 'koishi'
import fs from 'fs'
import axios from 'axios'
import {resolve} from 'path'

const getVideo = async (url: string) => {
  const localVideoPath = resolve(__dirname, `./${new Date().getTime()}.mp4`)
  const res = await axios.get(url, {
    responseType: 'stream'
  }).then(res => res.data)
  const writer = fs.createWriteStream(localVideoPath);
  res.pipe(writer);
  await new Promise(resolve => writer.on('finish', resolve));
  return localVideoPath
}

export default function (ctx: Context) {
  ctx.command('慢摇')
    .action(async ({ session }) => {
      return h.video('http://api.yujn.cn/api/manyao.php?type=video')
    })
  ctx.command('甜妹')
    .action(async ({ session }) => {
      return h.video('http://api.yujn.cn/api/tianmei.php?type=video')
    })
  ctx.command('萝莉')
    .action(async ({ session }) => {
      return h.video('http://api.yujn.cn/api/luoli.php?type=video')
    })
  ctx.command('吊带')
    .action(async ({ session }) => {
      return h.video('http://api.yujn.cn/api/diaodai.php?type=video')
    })
  ctx.command('小姐姐')
    .action(async ({ session }) => {
      return h.video('http://api.yujn.cn/api/zzxjj.php?type=video')
    })
  ctx.command('美腿')
    .action(async ({ session }) => {
      return h.video('http://api.yujn.cn/api/yuzu.php?type=video')
    })
  ctx.command('黑丝')
    .action(async ({ session }) => {
      return h.video('http://api.yujn.cn/api/heisis.php?type=video')
    })
  ctx.command('白丝')
    .action(async ({ session }) => {
      return h.video('http://api.yujn.cn/api/baisis.php?type=video')
    })
  ctx.command('cos')
    .action(async ({ session }) => {
      return h.video('http://api.yujn.cn/api/COS.php?type=video')
    })
  // ctx.command('白丝视频', 'ps: 只能发到支持上传群文件的群')
  //   .action(async ({ session }) => {
  //     try {
  //       const localVideoPath = await getVideo('https://qtkj.love/api/bssp.php')
  //       session.onebot.uploadGroupFile(session.guildId, localVideoPath, new Date().getTime() + '.mp4')
  //         .finally(() => fs.unlinkSync(localVideoPath))
  //     } catch (error) {
  //       return '视频获取失败'
  //     }
  //   })
}
