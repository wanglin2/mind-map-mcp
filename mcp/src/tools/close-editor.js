import { z } from 'zod'
import { sendMsg } from '../websocket.js'

export function registerCloseEditor(server) {
  server.registerTool(
    'close_editor',
    {
      description: '关闭当前打开的思维导图编辑页面。',
      inputSchema: z.object({})
    },
    async () => {
      try {
        sendMsg({
          type: 'close_editor'
        })
        return {
          content: [
            {
              type: 'text',
              text: '已通知浏览器关闭思维导图页面。'
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
