import { startHttpServer, getServerPort } from '../src/http-server.js'
import { sendMsg, sendMsgWithCallback } from '../src/websocket.js'
import open from 'open'

const run = async () => {
  await startHttpServer(3100)
  const port = getServerPort()
  const url = `http://localhost:${port}`
  await open(url, { wait: false })

  setTimeout(() => {
    sendMsg({
      type: 'set_mind_map_data',
      data: `
# 思维导图
## 根节点
- 根节点1
- 根节点2
      `
    })

    setTimeout(async () => {
      const base64Content = await sendMsgWithCallback({
        type: 'export_mind_map_to',
        exportType: 'png'
      })
      console.log('导出的base64编码的文件内容：', base64Content)
    }, 5000)
  }, 5000)
}
run()
