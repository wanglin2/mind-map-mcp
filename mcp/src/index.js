#!/usr/bin/env node

/**
 * SimpleMindMap MCP Server
 * 使 AI Agent 能够生成思维导图
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { startHttpServer } from './http-server.js'
import { registerTools } from './tools/index.js'
import { log } from './logger.js'
import { config } from './config.js'

const server = new McpServer({
  name: 'simple-mind-map-mcp',
  version: '0.1.0',
})

// 注册所有工具
registerTools(server)

// 优雅关闭
function gracefulShutdown(reason) {
  log.info(`Shutting down: ${reason}`)
  process.exit(0)
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'))
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.stdin.on('close', () => gracefulShutdown('stdin closed'))

// 启动服务
async function main() {
  // 启动内嵌 HTTP/WebSocket 服务器
  const actualPort = await startHttpServer(config.port)
  if (actualPort !== config.port) {
    log.info(`Note: Using port ${actualPort} instead of ${config.port}`)
  }

  // 连接 MCP 传输
  const transport = new StdioServerTransport()
  await server.connect(transport)
  log.info('MCP server connected')
}

main().catch((err) => {
  log.error('Failed to start:', err)
  process.exit(1)
})