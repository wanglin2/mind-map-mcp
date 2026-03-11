import { z } from 'zod'
import { sendMsg } from '../websocket.js'
import { layoutStr, themeStr } from '../config.js'

export function registerSetMindMapData(server) {
  server.registerTool(
    'set_mind_map_data',
    {
      description:
        '设置当前打开的思维导图页面所渲染的思维导图数据。\n' +
        '不能修改部分数据，只能完整替换当前所渲染的思维导图数据。\n' +
        '参数介绍：\n' +
        'data：思维导图数据，必须是Markdown格式的字符串。\n' +
        `layout：思维导图结构，可选参数。可选值为：${layoutStr}。\n` +
        `theme：思维导图样式主题，可选参数。可选值为：${themeStr}。\n`,
      inputSchema: z.object({
        data: z.string().describe('思维导图数据'),
        layout: z.string().describe('思维导图结构').optional(),
        theme: z.string().describe('思维导图主题').optional()
      })
    },
    async ({ data, layout, theme }) => {
      try {
        sendMsg({
          type: 'set_mind_map_data',
          data,
          layout,
          theme
        })
        return {
          content: [
            {
              type: 'text',
              text:
                '已通知思维导图页面渲染新数据。接下来你可以使用下面这些工具：\n' +
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
