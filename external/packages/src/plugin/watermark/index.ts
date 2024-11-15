import { Context, h } from 'koishi'
import axios from 'axios'
import fs from 'fs'
import {resolve} from 'path'

const baseUrl = 'https://api.cenguigui.cn/api/video/?url='
const reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g

export default function(ctx: Context) {
  ctx.command('去水印 <url>', '示例：去水印 链接(抖音复制的文本就可以)')
    .usage(`支持列表: 皮皮虾, 抖音, 微视, 快手, 6间房, 哔哩哔哩, 微博, 绿洲, 度小视, 开眼, 陌陌, 皮皮搞笑, 全民k歌, 逗拍, 虎牙, 新片场, 哔哩哔哩, Acfun, 美拍, 西瓜视频, 火山小视频, 网易云Mlog, 好看视频, QQ小世界\n温馨提示: 哔哩哔哩/6间房/微博仅支持下载无法去除水印`)
    .action(async ({ session }, ...text) => {
      try {
        if (!text.length) return '请输入链接'
        if (!session.guildId) return '请在群聊中使用'

        const url = text.join(' ').match(reg)[0]

        const r: any = await axios.post(`${baseUrl}${url}`).then(r => r.data)
        if (r.code === 200) {
          const res = await axios.get(`https://api.suyanw.cn/api/dwz.php?url=${r.data.url}`).then(r => r.data)
          session.onebot.sendGroupMsg(session.guildId, `[CQ:at,qq=${session.event.user.id}] 由于上传不了群文件，解析地址: ${res.data.url}`)
          // const res = await axios.get(r.data.url, {
          //   responseType: 'stream'
          // }).then(res => res.data)
          // const fileName = new Date().getTime() + '.mp4'
          // const localVideoPath = resolve(__dirname, fileName)
          // const writer = fs.createWriteStream(localVideoPath);
          // res.pipe(writer);
          // await new Promise(resolve => writer.on('finish', resolve));

          // session.onebot.uploadGroupFile(session.guildId, localVideoPath, fileName).finally(() => fs.unlinkSync(localVideoPath))
        } else {
          session.send(r.msg)
        }

      } catch (error) {
        console.log(error);

        session.send('发生错误')
      }
    })
}
