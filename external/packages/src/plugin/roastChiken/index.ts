import {} from 'koishi-plugin-adapter-onebot'
import { Context } from 'koishi'
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
  ctx.command('烧鸡视频', 'ps: 只能发到支持上传群文件的群')
    .action(async ({ session }) => {
      try {
        const localVideoPath = await getVideo('https://qtkj.love/api/qttj.php')
        session.onebot.uploadGroupFile(session.guildId, localVideoPath, new Date().getTime() + '.mp4')
          .finally(() => fs.unlinkSync(localVideoPath))
      } catch (error) {
        return '视频获取失败'
      }
    })
  ctx.command('少萝视频', 'ps: 只能发到支持上传群文件的群')
    .action(async ({ session }) => {
      try {
        const localVideoPath = await getVideo('https://qtkj.love/api/slxl.php')
        session.onebot.uploadGroupFile(session.guildId, localVideoPath, new Date().getTime() + '.mp4')
          .finally(() => fs.unlinkSync(localVideoPath))
      } catch (error) {
        return '视频获取失败'
      }
    })
  ctx.command('卡点变装', 'ps: 只能发到支持上传群文件的群')
    .action(async ({ session }) => {
      try {
        const localVideoPath = await getVideo('https://qtkj.love/api/kdbz.php')
        session.onebot.uploadGroupFile(session.guildId, localVideoPath, new Date().getTime() + '.mp4')
          .finally(() => fs.unlinkSync(localVideoPath))
      } catch (error) {
        return '视频获取失败'
      }
    })
  ctx.command('甜妹视频', 'ps: 只能发到支持上传群文件的群')
    .action(async ({ session }) => {
      try {
        const localVideoPath = await getVideo('https://qtkj.love/api/tmxl.php')
        session.onebot.uploadGroupFile(session.guildId, localVideoPath, new Date().getTime() + '.mp4')
          .finally(() => fs.unlinkSync(localVideoPath))
      } catch (error) {
        return '视频获取失败'
      }
    })
  ctx.command('你的欲梦', 'ps: 只能发到支持上传群文件的群')
    .action(async ({ session }) => {
      try {
        const localVideoPath = await getVideo('https://qtkj.love/api/ndym.php')
        session.onebot.uploadGroupFile(session.guildId, localVideoPath, new Date().getTime() + '.mp4')
          .finally(() => fs.unlinkSync(localVideoPath))
      } catch (error) {
        return '视频获取失败'
      }
    })
  ctx.command('甩裙视频', 'ps: 只能发到支持上传群文件的群')
    .action(async ({ session }) => {
      try {
        const localVideoPath = await getVideo('https://qtkj.love/api/sqxl.php')
        session.onebot.uploadGroupFile(session.guildId, localVideoPath, new Date().getTime() + '.mp4')
          .finally(() => fs.unlinkSync(localVideoPath))
      } catch (error) {
        return '视频获取失败'
      }
    })
  ctx.command('白丝视频', 'ps: 只能发到支持上传群文件的群')
    .action(async ({ session }) => {
      try {
        const localVideoPath = await getVideo('https://qtkj.love/api/bssp.php')
        session.onebot.uploadGroupFile(session.guildId, localVideoPath, new Date().getTime() + '.mp4')
          .finally(() => fs.unlinkSync(localVideoPath))
      } catch (error) {
        return '视频获取失败'
      }
    })
}
