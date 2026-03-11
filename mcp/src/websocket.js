import { WebSocketServer, WebSocket } from 'ws'
import { log } from './logger.js'

let wss = null
const clients = []
const callbackMap = {}

export function getClientCount() {
  return clients.length
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

/**
 * 启动 WebSocket 服务器
 */
export function startWebSocket(server) {
  wss = new WebSocketServer({ server })
  log.info('WebSocket server attached')

  wss.on('connection', ws => {
    log.info('WebSocket client connected')
    clients.push(ws)

    // 接收浏览器编辑
    ws.on('message', data => {
      try {
        const msg = JSON.parse(data.toString())
        log.info('Received message:', msg)

        if (!isPlainObject(msg)) {
          return
        }

        // 心跳
        if (msg.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong' }))
          return
        }

        // 处理回调
        if (msg.id && callbackMap[msg.id]) {
          callbackMap[msg.id](msg)
          delete callbackMap[msg.id]
          return
        }
      } catch (error) {
        log.error('WebSocket message error:', error)
      }
    })

    ws.on('close', () => {
      log.info('WebSocket client disconnected')
      removeClient(ws)
    })

    ws.on('error', error => {
      log.error('WebSocket error:', error)
    })
  })
}

/**
 * 移除客户端
 */
function removeClient(ws) {
  const index = clients.indexOf(ws)
  if (index !== -1) {
    clients.splice(index, 1)
  }
}

/**
 * 发送消息给所有客户端
 */
export function sendMsg(msg) {
  if (getClientCount() <= 0) {
    throw new Error(
      '当前没有打开的思维导图页面，请先调用open_editor工具打开一个思维导图页面'
    )
  }
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      log.info('Sending message:', msg)
      client.send(JSON.stringify(msg))
    }
  })
}

/**
 * 发送消息给所有客户端并等待回调
 */
export async function sendMsgWithCallback(msg) {
  return new Promise(resolve => {
    if (getClientCount() <= 0) {
      reject(
        new Error(
          '当前没有打开的思维导图页面，请先调用open_editor工具打开一个思维导图页面'
        )
      )
      return
    }
    const id = Date.now()
    sendMsg({
      ...msg,
      id
    })
    callbackMap[id] = resolve
  })
}
