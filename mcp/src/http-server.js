import http from 'http'
import fs from 'fs'
import path from 'path'
import { startWebSocket } from './websocket.js'
import { log } from './logger.js'
import { fileURLToPath } from 'url'

const isDev = process.env.NODE_ENV === 'development'

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
}

function safeFilePath(rootDir, requestPath) {
  const decoded = decodeURIComponent(requestPath.split('?')[0] || '/')
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '')
  return path.join(rootDir, normalized)
}

const MAX_PORT_ATTEMPTS = 20

let currentServerPort = null

/**
 * 获取当前服务器端口
 */
export function getServerPort() {
  return currentServerPort || parseInt(process.env.PORT || '3100', 10)
}

// HTTP 服务器
export async function startHttpServer(port) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  // 当前目录
  const webRoot = isDev
    ? path.resolve(__dirname, '../../package/web-dist')
    : path.resolve(__dirname, './web-dist')
  if (!fs.existsSync(webRoot)) {
    throw new Error(`web-dist not found at ${webRoot}.`)
  }
  const tryListen = tryPort => {
    return new Promise((resolve, reject) => {
      const server = http.createServer((req, res) => {
        log.info(req.url)
        if (!req.url) {
          res.writeHead(400)
          res.end('Bad Request')
          return
        }

        const requestPath = req.url === '/' ? '/index.html' : req.url
        let filePath = safeFilePath(webRoot, requestPath)

        // 如果资源不存在，回退到 SPA 入口
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          log.info(
            `Resource not found, falling back to index.html: ${filePath}`
          )
          filePath = path.join(webRoot, 'index.html')
        }

        const stat = fs.statSync(filePath)
        const etag = `W/"${stat.size}-${stat.mtimeMs}"`
        const isIndex = path.basename(filePath) === 'index.html'
        const isAsset = requestPath.startsWith('/dist/')

        if (req.headers['if-none-match'] === etag) {
          log.info(`Not modified: ${filePath}`)
          res.writeHead(304)
          res.end()
          return
        }

        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(500)
            res.end('Internal Server Error')
            return
          }

          const ext = path.extname(filePath)
          const contentType = MIME_TYPES[ext] || 'application/octet-stream'
          const cacheControl = isIndex
            ? 'no-cache'
            : isAsset
              ? 'public, max-age=31536000, immutable'
              : 'no-cache'
          res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': cacheControl,
            ETag: etag
          })
          res.end(data)
        })
      })

      server.on('error', err => {
        log.info(`Port ${tryPort} in use, trying ${tryPort + 1}`)
        if (err.code === 'EADDRINUSE') {
          if (tryPort >= port + MAX_PORT_ATTEMPTS) {
            reject(
              new Error(
                `No available ports in range ${port}-${port + MAX_PORT_ATTEMPTS}`
              )
            )
            return
          }
          tryListen(tryPort + 1)
            .then(resolve)
            .catch(reject)
        } else {
          reject(err)
        }
      })

      server.listen(tryPort, () => {
        log.info(`HTTP server started on: http://localhost:${tryPort}`)
        currentServerPort = tryPort
        startWebSocket(server)
        resolve(tryPort)
      })
    })
  }

  return tryListen(port)
}
