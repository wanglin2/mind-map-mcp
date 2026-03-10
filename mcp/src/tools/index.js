import { registerStartEditor } from './start-editor.js'
import { registerSetMindMapData } from './set-mind-map-data.js'
import { registerSetMindMapTheme } from './set-mind-map-theme.js'
import { registerSetMindMapLayout } from './set-mind-map-layout.js'
import { registerCloseEditor } from './close-editor.js'
import { registerExportMindMapTo } from './export-mind-map-to.js'

/**
 * 注册所有 MCP 工具
 */
export function registerTools(server) {
  registerStartEditor(server)
  registerSetMindMapData(server)
  registerSetMindMapTheme(server)
  registerSetMindMapLayout(server)
  registerCloseEditor(server)
  registerExportMindMapTo(server)
}
