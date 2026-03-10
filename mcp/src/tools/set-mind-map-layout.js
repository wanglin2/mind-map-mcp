import { z } from 'zod'
import { sendMsg } from '../websocket.js'
import { layoutStr } from '../config.js'

export function registerSetMindMapLayout(server) {
  server.registerTool(
    'set_mind_map_layout',
    {
      description:
        '修改思维导图结构。\n' +
        '参数介绍：\n' +
        `layout：思维导图结构，可选参数。可选值为：${layoutStr}。\n`,
      inputSchema: z.object({
        layout: z.string().describe('思维导图结构')
      })
    },
    async ({ layout }) => {
      try {
        sendMsg({
          type: 'set_mind_map_layout',
          layout
        })
        return {
          content: [
            {
              type: 'text',
              text: '已通知思维导图页面更新结构。'
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
