let mindMapInstance = null
const getDataFromBackend = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        mindMapData: {
          root: {
            data: {
              text: '根节点'
            },
            children: []
          },
          theme: {
            template: 'oreo',
            config: {}
          },
          layout: 'logicalStructure',
          config: {},
          view: null
        },
        mindMapConfig: {},
        lang: 'zh',
        localConfig: null
      })
    }, 200)
  })
}
const setTakeOverAppMethods = data => {
  window.takeOverAppMethods = {}
  // 获取思维导图数据的函数
  window.takeOverAppMethods.getMindMapData = () => {
    return data.mindMapData
  }
  // 保存思维导图数据的函数
  window.takeOverAppMethods.saveMindMapData = data => {
    console.log(data)
  }
  // 获取思维导图配置，也就是实例化时会传入的选项
  window.takeOverAppMethods.getMindMapConfig = () => {
    return data.mindMapConfig
  }
  // 保存思维导图配置
  window.takeOverAppMethods.saveMindMapConfig = config => {
    console.log(config)
  }
  // 获取语言的函数
  window.takeOverAppMethods.getLanguage = () => {
    return data.lang
  }
  // 保存语言的函数
  window.takeOverAppMethods.saveLanguage = lang => {
    console.log(lang)
  }
  // 获取本地配置的函数
  window.takeOverAppMethods.getLocalConfig = () => {
    return data.localConfig
  }
  // 保存本地配置的函数
  window.takeOverAppMethods.saveLocalConfig = config => {
    console.log(config)
  }
}
const initWS = () => {
  let ws = null
  let connected = false
  let reconnectDelay = 2000
  let heartbeatTimer = null
  let reconnectTimer = null

  const getWebSocketUrl = () => {
    const { protocol, hostname, host, search } = window.location
    const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:'
    return `${wsProtocol}//${host}`
  }

  const connect = () => {
    ws = new WebSocket(getWebSocketUrl())

    ws.addEventListener('open', () => {
      console.log('Connected to WebSocket server')
      connected = true
      reconnectDelay = 2000
      startHeartbeat()
    })

    ws.addEventListener('close', () => {
      console.log('Disconnected from WebSocket server')
      connected = false
      stopHeartbeat()
      scheduleReconnect()
    })

    ws.addEventListener('error', () => {
      console.log('WebSocket error')
      ws.close()
    })

    ws.addEventListener('message', event => {
      try {
        const msg = JSON.parse(event.data)
        console.log('Received message:', msg)
        if (msg.type === 'set_mind_map_data') {
          handleSetMindMapData(msg)
        } else if (msg.type === 'set_mind_map_layout') {
          mindMapInstance.setLayout(msg.layout)
        } else if (msg.type === 'set_mind_map_theme') {
          mindMapInstance.setTheme(msg.theme)
        } else if (msg.type === 'close_editor') {
          window.close()
        } else if (msg.type === 'export_mind_map_to') {
          handleExportMindMapTo(msg)
        }
      } catch {}
    })
  }

  const startHeartbeat = () => {
    if (heartbeatTimer) {
      window.clearInterval(heartbeatTimer)
    }
    heartbeatTimer = window.setInterval(() => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }))
      }
    }, 25000)
  }

  const stopHeartbeat = () => {
    if (heartbeatTimer) {
      window.clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  const scheduleReconnect = () => {
    if (reconnectTimer) {
      return
    }
    const delay = reconnectDelay
    reconnectDelay = Math.min(reconnectDelay * 2, 60000)
    reconnectTimer = window.setTimeout(() => {
      reconnectTimer = null
      connect()
    }, delay)
  }

  const handleSetMindMapData = ({ data, layout, theme }) => {
    const mindMapData = {
      root: window.simpleMindMap.default.markdown.transformMarkdownTo(data)
    }
    if (layout) {
      mindMapData.layout = layout
    }
    if (theme) {
      mindMapData.theme = {
        template: theme
      }
    }
    const onEnd = () => {
      mindMapInstance.view.fit()
      mindMapInstance.off('node_tree_render_end', onEnd)
    }
    mindMapInstance.on('node_tree_render_end', onEnd)
    window.$bus.$emit('setData', mindMapData)
  }

  const handleExportMindMapTo = async ({ exportOnBrowser, exportType, id }) => {
    try {
      // 直接在浏览器导出
      if (exportOnBrowser) {
        window.$bus.$emit('export', exportType)
        ws.send(
          JSON.stringify({
            type: 'export_mind_map_to',
            exportOnBrowser
          })
        )
        return
      }
      if (typeof mindMapInstance.doExport[exportType] !== 'function') {
        throw new Error(`Unsupported export type: ${exportType}`)
      }
      const res = await mindMapInstance.doExport[exportType]()
      console.log(res)
      if (res) {
        ws.send(
          JSON.stringify({
            type: 'export_mind_map_to',
            data: res,
            exportType,
            id
          })
        )
      } else {
        throw new Error(`Export mind map failed: ${exportType}`)
      }
    } catch (error) {
      console.error('Export mind map failed:', error)
      ws.send(
        JSON.stringify({
          type: 'export_mind_map_to',
          error: error.message,
          exportType,
          id
        })
      )
    }
  }

  connect()
}
initWS()
window.onload = async () => {
  if (!window.takeOverApp) return
  // 请求数据
  const data = await getDataFromBackend()
  // 设置全局的方法
  setTakeOverAppMethods(data)
  // 思维导图实例创建完成事件
  window.$bus.$on('app_inited', mindMap => {
    console.log(mindMap)
    mindMapInstance = mindMap
  })
  // 可以通过window.$bus.$on()来监听应用的一些事件
  // 实例化页面
  window.initApp()
}
