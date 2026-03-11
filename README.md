# SimpleMindMap MCP Server

一个MCP服务器，支持让AI生成思维导图。

> 思维导图编辑能力来源于项目[https://github.com/wanglin2/mind-map](https://github.com/wanglin2/mind-map)。
>
> `mind-map`项目提供了一个强大的思维导图编辑能力，包含：js库、web、客户端。

# 安装

npm安装包：`simple-mind-map-mcp`。

你可以根据你所使用的AI客户端，选择不同的安装方式。

MCP配置文件配置参考：

```json
{
  "mcpServers": {
    "simple-mind-map-mcp": {
      "command": "npx",
      "args": ["-y", "simple-mind-map-mcp"]
    }
  }
}
```

同时本项目提供了一个[技能文件](./sikll/SKILL.md)，可以更精确的控制AI生成的思维导图。

# 可用工具

| 工具名称   | 描述                                 |
| --------------------- | ------------------------------------ |
|  start_editor         | 启动思维导图编辑器                     |
|  set_mind_map_data    | 设置思维导图数据                       |
|  set_mind_map_theme   | 设置思维导图主题                       |
|  set_mind_map_layout  | 设置思维导图结构                       |
|  export_mind_map_to   | 将当前渲染的思维导图导出为指定类型的文件 |
|  close_editor         | 关闭当前打开的思维导图编辑页面          |

# 使用示例

## 没有配置技能

- 生成思维导图

```bash
以减肥计划为主题生成一个思维导图
```

```bash
以减肥计划为主题生成一个思维导图。使用时间轴结构，使用暗色主题
```

```bash
以减肥计划为主题生成一个思维导图。导出为图片
```

```bash
根据以下内容生成一个思维导图：
# 根节点
## 二级节点
### 三级节点
```

- 已经生成了思维导图后可以修改主题和结构

```bash
换一个主题
```

```bash
使用暗色主题
```

```bash
切换为鱼骨图
```

- 已经生成了思维导图后可以导出文件

```bash
导出为图片文件
```

```bash
导出为PDF文件，保存到当前项目的目录中。
```

- 使用完可以关闭编辑器

```bash
关闭编辑器
```

## 配置了技能

选择技能后，可以省略多余的话，直接说：

```bash
要生成的思维导图的主题
```

# 原理

1. MCP服务器会启动一个简单的http服务，提供思维导图编辑器页面的访问。

2. AI调用`start_editor`工具会在浏览器打开思维导图编辑器页面。页面和MCP服务其会通过Websocket建立连接。

3. AI调用工具时会给页面发送对应的消息，页面会根据消息进行相应的操作。

思维导图编辑能力来源于该项目[https://github.com/wanglin2/mind-map](https://github.com/wanglin2/mind-map)的web版本。直接使用了`mind-map`项目仓库中的`dist`目录中已编译后的文件。然后存放在`/mcp/web-dist/`目录下。`/mcp/web-dist/dist/index.js`里面为和MCP服务端通信的代码。

能直接使用编译后的文件，是得益于`mind-map`项目提供了一种[接管模式](https://wanglin2.github.io/mind-map-docs/start/deploy.html#%E7%AC%AC%E4%BA%8C%E7%A7%8D)。

# 本地开发

克隆本仓库，进入`mcp`目录，安装完依赖后，可以在AI客户端中配置如下MCP服务器：

```json
{
  "mcpServers": {
    "simple-mind-map-mcp": {
      "command": "node",
      "args": ["index.js"],
      "env": {
        "NODE_ENV": "development"
      },
      "cwd": "项目存放路径\\mind-map-mcp\\mcp\\src"
    }
  }
}
```

编译：

```bash
npm run build
```

# License

MIT License
