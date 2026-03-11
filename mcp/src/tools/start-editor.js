import { z } from 'zod'
import { getServerPort } from '../http-server.js'
import { log } from '../logger.js'
import open from 'open'

export function registerStartEditor(server) {
  server.registerTool(
    'start_editor',
    {
      title: '打开思维导图编辑器',
      description:
        '如果要绘制思维导图，首先需要调用这个工具在默认浏览器打开思维导图编辑器页面。\n\n' +
        '这个工具调用完成后：\n\n' +
        '1. 浏览器会打开一个新标签页，显示思维导图编辑器页面，并渲染默认思维导图数据。\n' +
        '2. 编辑器页面会与 MCP 服务器通过 WebSocket 连接。\n',
      inputSchema: z.object({})
    },
    async ({}) => {
      try {
        const port = getServerPort()
        const url = `http://localhost:${port}`
        log.info(`Opening browser at ${url}`)
        await open(url, { wait: false })
        return {
          content: [
            {
              type: 'text',
              text:
                '思维导图编辑器页面已打开，你可以使用下面这些工具：\n' +
                `• set_mind_map_data - 全量更新编辑器渲染的思维导图数据\n` +
                `• set_mind_map_theme - 修改编辑器渲染的思维导图样式主题\n` +
                `• set_mind_map_layout - 修改编辑器渲染的思维导图结构布局\n` +
                `• export_mind_map_to - 导出为指定文件\n` +
                `• close_editor - 关闭当前打开的思维导图编辑器页面\n`
            }
          ]
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${message}` }],
          isError: true
        }
      }
    }
  )
}
