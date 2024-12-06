import { Context, h } from 'koishi'

const apiHost = 'http://127.0.0.1:7769'
export default function(ctx: Context) {

  async function getVideoDetailMinimal(url: string) {
    return await ctx.http.get(apiHost + '/api/hybrid/video_data?url=' + url + '&minimal=true');
  };

  ctx.middleware(async (session, next) => {
    if (!session.content.includes('douyin.com')) return next()
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const url = session.content.match(urlRegex)[0];
    if (!url) return

    try {
      const response = await getVideoDetailMinimal(url);
      if (response.code !== 200) {
        return '解析失败! 该链接或许不支持';
      }
      const { data: { desc, image_data } } = response;

      const isTypeImage = image_data && Object.keys(image_data).length > 0;
      session.send('抖音解析内容：\n' + desc);
      if (isTypeImage) {
        const { no_watermark_image_list } = image_data;

        const forwardMessages = no_watermark_image_list.map((img: string) => h('message', h.image(img)))

        const forwardMessage = h('message', { forward: true, children: forwardMessages });
        try {
          await session.send(forwardMessage);
        } catch (error) {
          ctx.logger.error(`合并转发消息发送失败: ${error}`);
        }
      } else {
        const videoBuffer = await ctx.http.get<ArrayBuffer>(apiHost + '/api/download?url=' + url + '&prefix=true&with_watermark=true', {
          responseType: 'arraybuffer',
        });
        session.send(h.video(videoBuffer, 'video/mp4'))
      }
    } catch(err) {
      console.log(err);
      return `发生错误!;  ${err}`;
    }
  });
}
