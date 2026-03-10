// 日志工具
function createLogger(prefix) {
  const log = (level, message, ...args) => {
    const timestamp = new Date().toISOString()
    console.error(
      `[${timestamp}] [${level.toUpperCase()}] ${prefix}: ${message}`,
      ...args
    )
  }

  return {
    debug: (message, ...args) => log('debug', message, ...args),
    info: (message, ...args) => log('info', message, ...args),
    warn: (message, ...args) => log('warn', message, ...args),
    error: (message, ...args) => log('error', message, ...args)
  }
}

export const log = createLogger('Simplemindmap MCP')
