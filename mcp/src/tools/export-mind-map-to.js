import { z } from 'zod'
import { sendMsgWithCallback } from '../websocket.js'
import { exportTypeStr } from '../config.js'
import fs from 'fs'
import path from 'path'

export function registerExportMindMapTo(server) {
  server.registerTool(
    'export_mind_map_to',
    {
      description:
        '将当前渲染的思维导图导出为指定类型的文件。\n' +
        '参数介绍：\n' +
        `exportType：导出文件类型。可选值为：${exportTypeStr}。\n` +
        `saveFolder：导出的文件要保存到的目录。禁止使用相对目录！该参数为可选参数，如果用户没有明确让你导出到当前目录，该参数可以不用传递，会直接在浏览器端进行导出。`,
      inputSchema: z.object({
        exportType: z.string().describe('导出文件类型'),
        saveFolder: z
          .string()
          .describe(
            '导出的文件要保存到的目录。禁止使用相对目录！该参数为可选参数，如果用户没有明确让你导出到当前目录，该参数可以不用传递，会直接在浏览器端进行导出。'
          )
          .optional()
      })
    },
    async ({ exportType, saveFolder }) => {
      try {
        const res = await sendMsgWithCallback({
          type: 'export_mind_map_to',
          exportType,
          exportOnBrowser: !saveFolder
        })
        if (res.error) {
          throw new Error(res.error)
        }
        let text = ''
        if (res.exportOnBrowser) {
          text = '已成功在浏览器中导出文件。'
        } else {
          const base64Content = res.data
          if (!base64Content) {
            throw new Error('导出文件内容为空。')
          }
          const base64Data = base64Content.split(',')[1]
          const filePath = path.join(saveFolder, `${res.id}.${exportType}`)
          const buffer = Buffer.from(base64Data, 'base64')
          fs.writeFileSync(filePath, buffer)
          text = '文件已成功导出到：' + filePath + '。'
        }
        return {
          content: [
            {
              type: 'text',
              text
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
