import { z } from 'zod'
import { sendMsg } from '../websocket.js'
import { themeStr } from '../config.js'

export function registerSetMindMapTheme(server) {
  server.registerTool(
    'set_mind_map_theme',
    {
      description:
        '修改思维导图样式主题。\n' +
        '参数介绍：\n' +
        `theme：思维导图样式主题，可选参数。可选值为：${themeStr}。\n`,
      inputSchema: z.object({
        theme: z.string().describe('思维导图样式主题')
      })
    },
    async ({ theme }) => {
      try {
        sendMsg({
          type: 'set_mind_map_theme',
          theme
        })
        return {
          content: [
            {
              type: 'text',
              text: '已通知思维导图页面更新样式主题。'
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
