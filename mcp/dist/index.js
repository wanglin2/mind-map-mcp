/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// external "@modelcontextprotocol/sdk/server/mcp.js"
const mcp_js_namespaceObject = require("@modelcontextprotocol/sdk/server/mcp.js");
;// external "@modelcontextprotocol/sdk/server/stdio.js"
const stdio_js_namespaceObject = require("@modelcontextprotocol/sdk/server/stdio.js");
;// external "http"
const external_http_namespaceObject = require("http");
;// external "fs"
const external_fs_namespaceObject = require("fs");
;// external "path"
const external_path_namespaceObject = require("path");
;// external "ws"
const external_ws_namespaceObject = require("ws");
;// ./src/logger.js
// 日志工具
function createLogger(prefix) {
  var log = function log(level, message) {
    var _console;
    var timestamp = new Date().toISOString();
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    (_console = console).error.apply(_console, ["[".concat(timestamp, "] [").concat(level.toUpperCase(), "] ").concat(prefix, ": ").concat(message)].concat(args));
  };
  return {
    debug: function debug(message) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return log.apply(void 0, ['debug', message].concat(args));
    },
    info: function info(message) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return log.apply(void 0, ['info', message].concat(args));
    },
    warn: function warn(message) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      return log.apply(void 0, ['warn', message].concat(args));
    },
    error: function error(message) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }
      return log.apply(void 0, ['error', message].concat(args));
    }
  };
}
var log = createLogger('SimpleMindMap MCP');
;// ./src/websocket.js
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var wss = null;
var clients = [];
var callbackMap = {};
function getClientCount() {
  return clients.length;
}
function isPlainObject(value) {
  return Boolean(value) && _typeof(value) === 'object' && !Array.isArray(value);
}

/**
 * 启动 WebSocket 服务器
 */
function startWebSocket(server) {
  wss = new external_ws_namespaceObject.WebSocketServer({
    server: server
  });
  log.info('WebSocket server attached');
  wss.on('connection', function (ws) {
    log.info('WebSocket client connected');
    clients.push(ws);

    // 接收浏览器编辑
    ws.on('message', function (data) {
      try {
        var msg = JSON.parse(data.toString());
        log.info('Received message:', msg);
        if (!isPlainObject(msg)) {
          return;
        }

        // 心跳
        if (msg.type === 'ping') {
          ws.send(JSON.stringify({
            type: 'pong'
          }));
          return;
        }

        // 处理回调
        if (msg.id && callbackMap[msg.id]) {
          callbackMap[msg.id](msg);
          delete callbackMap[msg.id];
          return;
        }
      } catch (error) {
        log.error('WebSocket message error:', error);
      }
    });
    ws.on('close', function () {
      log.info('WebSocket client disconnected');
      removeClient(ws);
    });
    ws.on('error', function (error) {
      log.error('WebSocket error:', error);
    });
  });
}

/**
 * 移除客户端
 */
function removeClient(ws) {
  var index = clients.indexOf(ws);
  if (index !== -1) {
    clients.splice(index, 1);
  }
}

/**
 * 发送消息给所有客户端
 */
function sendMsg(msg) {
  if (getClientCount() <= 0) {
    throw new Error('当前没有打开的思维导图页面，请先调用open_editor工具打开一个思维导图页面');
  }
  clients.forEach(function (client) {
    if (client.readyState === external_ws_namespaceObject.WebSocket.OPEN) {
      log.info('Sending message:', msg);
      client.send(JSON.stringify(msg));
    }
  });
}

/**
 * 发送消息给所有客户端并等待回调
 */
function sendMsgWithCallback(_x) {
  return _sendMsgWithCallback.apply(this, arguments);
}
function _sendMsgWithCallback() {
  _sendMsgWithCallback = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(msg) {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          return _context.a(2, new Promise(function (resolve) {
            if (getClientCount() <= 0) {
              reject(new Error('当前没有打开的思维导图页面，请先调用open_editor工具打开一个思维导图页面'));
              return;
            }
            var id = Date.now();
            sendMsg(_objectSpread(_objectSpread({}, msg), {}, {
              id: id
            }));
            callbackMap[id] = resolve;
          }));
      }
    }, _callee);
  }));
  return _sendMsgWithCallback.apply(this, arguments);
}
;// external "url"
const external_url_namespaceObject = require("url");
;// ./src/http-server.js
function http_server_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return http_server_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (http_server_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, http_server_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, http_server_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), http_server_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", http_server_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), http_server_regeneratorDefine2(u), http_server_regeneratorDefine2(u, o, "Generator"), http_server_regeneratorDefine2(u, n, function () { return this; }), http_server_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (http_server_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function http_server_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } http_server_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { http_server_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, http_server_regeneratorDefine2(e, r, n, t); }
function http_server_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function http_server_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { http_server_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { http_server_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }






var isDev = "production" === 'development';
var MIME_TYPES = {
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
};
function safeFilePath(rootDir, requestPath) {
  var decoded = decodeURIComponent(requestPath.split('?')[0] || '/');
  var normalized = external_path_namespaceObject.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  return external_path_namespaceObject.join(rootDir, normalized);
}
var MAX_PORT_ATTEMPTS = 20;
var currentServerPort = null;

/**
 * 获取当前服务器端口
 */
function getServerPort() {
  return currentServerPort || parseInt(process.env.PORT || '3100', 10);
}

// HTTP 服务器
function startHttpServer(_x) {
  return _startHttpServer.apply(this, arguments);
}
function _startHttpServer() {
  _startHttpServer = http_server_asyncToGenerator(/*#__PURE__*/http_server_regenerator().m(function _callee(port) {
    var __filename, __dirname, webRoot, _tryListen;
    return http_server_regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          __filename = (0,external_url_namespaceObject.fileURLToPath)("file:///E:/wanglin/mind-map-mcp/mcp/src/http-server.js");
          __dirname = external_path_namespaceObject.dirname(__filename); // 当前目录
          webRoot = isDev ? external_path_namespaceObject.resolve(__dirname, '../../package/web-dist') : external_path_namespaceObject.resolve(__dirname, './web-dist');
          if (external_fs_namespaceObject.existsSync(webRoot)) {
            _context.n = 1;
            break;
          }
          throw new Error("web-dist not found at ".concat(webRoot, "."));
        case 1:
          _tryListen = function tryListen(tryPort) {
            return new Promise(function (resolve, reject) {
              var server = external_http_namespaceObject.createServer(function (req, res) {
                log.info(req.url);
                if (!req.url) {
                  res.writeHead(400);
                  res.end('Bad Request');
                  return;
                }
                var requestPath = req.url === '/' ? '/index.html' : req.url;
                var filePath = safeFilePath(webRoot, requestPath);

                // 如果资源不存在，回退到 SPA 入口
                if (!external_fs_namespaceObject.existsSync(filePath) || external_fs_namespaceObject.statSync(filePath).isDirectory()) {
                  log.info("Resource not found, falling back to index.html: ".concat(filePath));
                  filePath = external_path_namespaceObject.join(webRoot, 'index.html');
                }
                var stat = external_fs_namespaceObject.statSync(filePath);
                var etag = "W/\"".concat(stat.size, "-").concat(stat.mtimeMs, "\"");
                var isIndex = external_path_namespaceObject.basename(filePath) === 'index.html';
                var isAsset = requestPath.startsWith('/dist/');
                if (req.headers['if-none-match'] === etag) {
                  log.info("Not modified: ".concat(filePath));
                  res.writeHead(304);
                  res.end();
                  return;
                }
                external_fs_namespaceObject.readFile(filePath, function (err, data) {
                  if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                    return;
                  }
                  var ext = external_path_namespaceObject.extname(filePath);
                  var contentType = MIME_TYPES[ext] || 'application/octet-stream';
                  var cacheControl = isIndex ? 'no-cache' : isAsset ? 'public, max-age=31536000, immutable' : 'no-cache';
                  res.writeHead(200, {
                    'Content-Type': contentType,
                    'Cache-Control': cacheControl,
                    ETag: etag
                  });
                  res.end(data);
                });
              });
              server.on('error', function (err) {
                log.info("Port ".concat(tryPort, " in use, trying ").concat(tryPort + 1));
                if (err.code === 'EADDRINUSE') {
                  if (tryPort >= port + MAX_PORT_ATTEMPTS) {
                    reject(new Error("No available ports in range ".concat(port, "-").concat(port + MAX_PORT_ATTEMPTS)));
                    return;
                  }
                  _tryListen(tryPort + 1).then(resolve)["catch"](reject);
                } else {
                  reject(err);
                }
              });
              server.listen(tryPort, function () {
                log.info("HTTP server started on: http://localhost:".concat(tryPort));
                currentServerPort = tryPort;
                startWebSocket(server);
                resolve(tryPort);
              });
            });
          };
          return _context.a(2, _tryListen(port));
      }
    }, _callee);
  }));
  return _startHttpServer.apply(this, arguments);
}
;// external "zod"
const external_zod_namespaceObject = require("zod");
;// external "open"
const external_open_namespaceObject = require("open");
;// ./src/tools/start-editor.js
function start_editor_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return start_editor_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (start_editor_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, start_editor_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, start_editor_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), start_editor_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", start_editor_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), start_editor_regeneratorDefine2(u), start_editor_regeneratorDefine2(u, o, "Generator"), start_editor_regeneratorDefine2(u, n, function () { return this; }), start_editor_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (start_editor_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function start_editor_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } start_editor_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { start_editor_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, start_editor_regeneratorDefine2(e, r, n, t); }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function start_editor_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function start_editor_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { start_editor_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { start_editor_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }




function registerStartEditor(server) {
  server.registerTool('start_editor', {
    title: '打开思维导图编辑器',
    description: '如果要绘制思维导图，首先需要调用这个工具在默认浏览器打开思维导图编辑器页面。\n\n' + '这个工具调用完成后：\n\n' + '1. 浏览器会打开一个新标签页，显示思维导图编辑器页面，并渲染默认思维导图数据。\n' + '2. 编辑器页面会与 MCP 服务器通过 WebSocket 连接。\n',
    inputSchema: external_zod_namespaceObject.z.object({})
  }, /*#__PURE__*/function () {
    var _ref2 = start_editor_asyncToGenerator(/*#__PURE__*/start_editor_regenerator().m(function _callee(_ref) {
      var port, url, message, _t;
      return start_editor_regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _objectDestructuringEmpty(_ref);
            _context.p = 1;
            port = getServerPort();
            url = "http://localhost:".concat(port);
            log.info("Opening browser at ".concat(url));
            _context.n = 2;
            return external_open_namespaceObject(url, {
              wait: false
            });
          case 2:
            return _context.a(2, {
              content: [{
                type: 'text',
                text: '思维导图编辑器页面已打开，你可以使用下面这些工具：\n' + "\u2022 set_mind_map_data - \u5168\u91CF\u66F4\u65B0\u7F16\u8F91\u5668\u6E32\u67D3\u7684\u601D\u7EF4\u5BFC\u56FE\u6570\u636E\n" + "\u2022 set_mind_map_theme - \u4FEE\u6539\u7F16\u8F91\u5668\u6E32\u67D3\u7684\u601D\u7EF4\u5BFC\u56FE\u6837\u5F0F\u4E3B\u9898\n" + "\u2022 set_mind_map_layout - \u4FEE\u6539\u7F16\u8F91\u5668\u6E32\u67D3\u7684\u601D\u7EF4\u5BFC\u56FE\u7ED3\u6784\u5E03\u5C40\n" + "\u2022 export_mind_map_to - \u5BFC\u51FA\u4E3A\u6307\u5B9A\u6587\u4EF6\n" + "\u2022 close_editor - \u5173\u95ED\u5F53\u524D\u6253\u5F00\u7684\u601D\u7EF4\u5BFC\u56FE\u7F16\u8F91\u5668\u9875\u9762\n"
              }]
            });
          case 3:
            _context.p = 3;
            _t = _context.v;
            message = _t instanceof Error ? _t.message : String(_t);
            return _context.a(2, {
              content: [{
                type: 'text',
                text: "Error: ".concat(message)
              }],
              isError: true
            });
        }
      }, _callee, null, [[1, 3]]);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}
;// ./src/config.js
var config = {
  port: parseInt(process.env.PORT || '3100', 10)
};
var layoutStr = 'logicalStructure（逻辑结构图）、logicalStructureLeft（向左逻辑结构图）、mindMap（思维导图）、organizationStructure（组织结构图）、catalogOrganization（目录组织图）、timeline（时间轴）、verticalTimeline（垂直时间轴）、fishbone（鱼骨图）';
var lightThemeList = [{
  name: '天清绿',
  value: 'skyGreen'
}, {
  name: '经典绿',
  value: 'classicGreen'
}, {
  name: '经典蓝',
  value: 'classicBlue'
}, {
  name: '天空蓝',
  value: 'blueSky'
}, {
  name: '脑残粉',
  value: 'brainImpairedPink'
}, {
  name: '泥土黄',
  value: 'earthYellow'
}, {
  name: '清新绿',
  value: 'freshGreen'
}, {
  name: '清新红',
  value: 'freshRed'
}, {
  name: '浪漫紫',
  value: 'romanticPurple'
}, {
  name: '粉红葡萄',
  value: 'pinkGrape'
}, {
  name: '薄荷',
  value: 'mint'
}, {
  name: '金色vip',
  value: 'gold'
}, {
  name: '活力橙',
  value: 'vitalityOrange'
}, {
  name: '绿叶',
  value: 'greenLeaf'
}, {
  name: '小黄人',
  value: 'minions'
}, {
  name: '简约黑',
  value: 'simpleBlack'
}, {
  name: '课程绿',
  value: 'courseGreen'
}, {
  name: '咖啡',
  value: 'coffee'
}, {
  name: '红色精神',
  value: 'redSpirit'
}, {
  name: '牛油果',
  value: 'avocado'
}, {
  name: '秋天',
  value: 'autumn'
}, {
  name: '奥利奥',
  value: 'oreo'
}, {
  name: '浅海',
  value: 'shallowSea'
}, {
  name: '柠檬气泡',
  value: 'lemonBubbles'
}, {
  name: '玫瑰',
  value: 'rose'
}, {
  name: '海蓝线',
  value: 'seaBlueLine'
}, {
  name: '莫兰迪',
  value: 'morandi'
}, {
  name: '仙人掌',
  value: 'cactus'
}, {
  name: '脑图经典2',
  value: 'classic2'
}, {
  name: '脑图经典3',
  value: 'classic3'
}, {
  name: '脑图经典4',
  value: 'classic4'
}, {
  name: '脑图经典5',
  value: 'classic5'
}, {
  name: '脑图经典6',
  value: 'classic6'
}, {
  name: '脑图经典7',
  value: 'classic7'
}, {
  name: '脑图经典8',
  value: 'classic8'
}, {
  name: '脑图经典9',
  value: 'classic9'
}, {
  name: '脑图经典10',
  value: 'classic10'
}, {
  name: '脑图经典11',
  value: 'classic11'
}, {
  name: '脑图经典12',
  value: 'classic12'
}, {
  name: '脑图经典13',
  value: 'classic13'
}, {
  name: '脑图经典14',
  value: 'classic14'
}, {
  name: '脑图经典15',
  value: 'classic15'
}];
var darkThemeList = [{
  name: '脑图经典',
  value: 'classic'
}, {
  name: '黑色幽默',
  value: 'blackHumour'
}, {
  name: '深夜办公室',
  value: 'lateNightOffice'
}, {
  name: '黑金',
  value: 'blackGold'
}, {
  name: '橙汁',
  value: 'orangeJuice'
}, {
  name: '霓虹灯',
  value: 'neonLamp'
}, {
  name: '暗夜冰刃',
  value: 'darkNightLceBlade'
}, {
  name: '暗色',
  value: 'dark'
}, {
  name: '暗色2',
  value: 'dark2'
}, {
  name: '暗色3',
  value: 'dark3'
}, {
  name: '暗色4',
  value: 'dark4'
}, {
  name: '暗色5',
  value: 'dark5'
}, {
  name: '暗色6',
  value: 'dark6'
}, {
  name: '暗色7',
  value: 'dark7'
}];
var themeStr = '亮色主题：' + lightThemeList.map(function (item) {
  return item.value + '（' + item.name + '）';
}).join('、') + '；暗色主题：' + darkThemeList.map(function (item) {
  return item.value + '（' + item.name + '）';
}).join('、');
var exportTypeList = [{
  name: '图片',
  type: 'png',
  desc: '常用图片格式，适合查看分享'
}, {
  name: 'SVG',
  type: 'svg',
  desc: '可缩放矢量图形'
}, {
  name: 'PDF',
  type: 'pdf',
  desc: '适合查看浏览和打印'
}, {
  name: 'Markdown',
  type: 'md',
  desc: 'md文本格式，便于其他软件打开'
}, {
  name: 'XMind',
  type: 'xmind',
  desc: 'XMind软件格式'
}, {
  name: 'Txt',
  type: 'txt',
  desc: '纯文本文件'
}, {
  name: 'Excel',
  type: 'xlsx',
  desc: '表格文本形式，可用Excel软件编辑'
}];
var exportTypeStr = exportTypeList.map(function (item) {
  return item.type + '（' + item.desc + '）';
}).join('、');
;// ./src/tools/set-mind-map-data.js
function set_mind_map_data_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return set_mind_map_data_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (set_mind_map_data_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, set_mind_map_data_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, set_mind_map_data_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), set_mind_map_data_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", set_mind_map_data_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), set_mind_map_data_regeneratorDefine2(u), set_mind_map_data_regeneratorDefine2(u, o, "Generator"), set_mind_map_data_regeneratorDefine2(u, n, function () { return this; }), set_mind_map_data_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (set_mind_map_data_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function set_mind_map_data_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } set_mind_map_data_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { set_mind_map_data_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, set_mind_map_data_regeneratorDefine2(e, r, n, t); }
function set_mind_map_data_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function set_mind_map_data_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { set_mind_map_data_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { set_mind_map_data_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



function registerSetMindMapData(server) {
  server.registerTool('set_mind_map_data', {
    description: '设置当前打开的思维导图页面所渲染的思维导图数据。\n' + '不能修改部分数据，只能完整替换当前所渲染的思维导图数据。\n' + '参数介绍：\n' + 'data：思维导图数据，必须是Markdown格式的字符串。\n' + "layout\uFF1A\u601D\u7EF4\u5BFC\u56FE\u7ED3\u6784\uFF0C\u53EF\u9009\u53C2\u6570\u3002\u53EF\u9009\u503C\u4E3A\uFF1A".concat(layoutStr, "\u3002\n") + "theme\uFF1A\u601D\u7EF4\u5BFC\u56FE\u6837\u5F0F\u4E3B\u9898\uFF0C\u53EF\u9009\u53C2\u6570\u3002\u53EF\u9009\u503C\u4E3A\uFF1A".concat(themeStr, "\u3002\n"),
    inputSchema: external_zod_namespaceObject.z.object({
      data: external_zod_namespaceObject.z.string().describe('思维导图数据'),
      layout: external_zod_namespaceObject.z.string().describe('思维导图结构').optional(),
      theme: external_zod_namespaceObject.z.string().describe('思维导图主题').optional()
    })
  }, /*#__PURE__*/function () {
    var _ref2 = set_mind_map_data_asyncToGenerator(/*#__PURE__*/set_mind_map_data_regenerator().m(function _callee(_ref) {
      var data, layout, theme, message, _t;
      return set_mind_map_data_regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            data = _ref.data, layout = _ref.layout, theme = _ref.theme;
            _context.p = 1;
            sendMsg({
              type: 'set_mind_map_data',
              data: data,
              layout: layout,
              theme: theme
            });
            return _context.a(2, {
              content: [{
                type: 'text',
                text: '已通知思维导图页面渲染新数据。接下来你可以使用下面这些工具：\n' + "\u2022 set_mind_map_data - \u5168\u91CF\u66F4\u65B0\u7F16\u8F91\u5668\u6E32\u67D3\u7684\u601D\u7EF4\u5BFC\u56FE\u6570\u636E\n" + "\u2022 set_mind_map_theme - \u4FEE\u6539\u7F16\u8F91\u5668\u6E32\u67D3\u7684\u601D\u7EF4\u5BFC\u56FE\u6837\u5F0F\u4E3B\u9898\n" + "\u2022 set_mind_map_layout - \u4FEE\u6539\u7F16\u8F91\u5668\u6E32\u67D3\u7684\u601D\u7EF4\u5BFC\u56FE\u7ED3\u6784\u5E03\u5C40\n" + "\u2022 export_mind_map_to - \u5BFC\u51FA\u4E3A\u6307\u5B9A\u6587\u4EF6\n" + "\u2022 close_editor - \u5173\u95ED\u5F53\u524D\u6253\u5F00\u7684\u601D\u7EF4\u5BFC\u56FE\u7F16\u8F91\u5668\u9875\u9762\n"
              }]
            });
          case 2:
            _context.p = 2;
            _t = _context.v;
            message = _t instanceof Error ? _t.message : String(_t);
            return _context.a(2, {
              content: [{
                type: 'text',
                text: "Error: ".concat(message)
              }],
              isError: true
            });
        }
      }, _callee, null, [[1, 2]]);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}
;// ./src/tools/set-mind-map-theme.js
function set_mind_map_theme_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return set_mind_map_theme_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (set_mind_map_theme_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, set_mind_map_theme_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, set_mind_map_theme_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), set_mind_map_theme_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", set_mind_map_theme_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), set_mind_map_theme_regeneratorDefine2(u), set_mind_map_theme_regeneratorDefine2(u, o, "Generator"), set_mind_map_theme_regeneratorDefine2(u, n, function () { return this; }), set_mind_map_theme_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (set_mind_map_theme_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function set_mind_map_theme_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } set_mind_map_theme_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { set_mind_map_theme_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, set_mind_map_theme_regeneratorDefine2(e, r, n, t); }
function set_mind_map_theme_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function set_mind_map_theme_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { set_mind_map_theme_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { set_mind_map_theme_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



function registerSetMindMapTheme(server) {
  server.registerTool('set_mind_map_theme', {
    description: '修改思维导图样式主题。\n' + '参数介绍：\n' + "theme\uFF1A\u601D\u7EF4\u5BFC\u56FE\u6837\u5F0F\u4E3B\u9898\uFF0C\u53EF\u9009\u53C2\u6570\u3002\u53EF\u9009\u503C\u4E3A\uFF1A".concat(themeStr, "\u3002\n"),
    inputSchema: external_zod_namespaceObject.z.object({
      theme: external_zod_namespaceObject.z.string().describe('思维导图样式主题')
    })
  }, /*#__PURE__*/function () {
    var _ref2 = set_mind_map_theme_asyncToGenerator(/*#__PURE__*/set_mind_map_theme_regenerator().m(function _callee(_ref) {
      var theme, message, _t;
      return set_mind_map_theme_regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            theme = _ref.theme;
            _context.p = 1;
            sendMsg({
              type: 'set_mind_map_theme',
              theme: theme
            });
            return _context.a(2, {
              content: [{
                type: 'text',
                text: '已通知思维导图页面更新样式主题。'
              }]
            });
          case 2:
            _context.p = 2;
            _t = _context.v;
            message = _t instanceof Error ? _t.message : String(_t);
            return _context.a(2, {
              content: [{
                type: 'text',
                text: "Error: ".concat(message)
              }],
              isError: true
            });
        }
      }, _callee, null, [[1, 2]]);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}
;// ./src/tools/set-mind-map-layout.js
function set_mind_map_layout_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return set_mind_map_layout_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (set_mind_map_layout_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, set_mind_map_layout_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, set_mind_map_layout_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), set_mind_map_layout_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", set_mind_map_layout_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), set_mind_map_layout_regeneratorDefine2(u), set_mind_map_layout_regeneratorDefine2(u, o, "Generator"), set_mind_map_layout_regeneratorDefine2(u, n, function () { return this; }), set_mind_map_layout_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (set_mind_map_layout_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function set_mind_map_layout_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } set_mind_map_layout_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { set_mind_map_layout_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, set_mind_map_layout_regeneratorDefine2(e, r, n, t); }
function set_mind_map_layout_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function set_mind_map_layout_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { set_mind_map_layout_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { set_mind_map_layout_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



function registerSetMindMapLayout(server) {
  server.registerTool('set_mind_map_layout', {
    description: '修改思维导图结构。\n' + '参数介绍：\n' + "layout\uFF1A\u601D\u7EF4\u5BFC\u56FE\u7ED3\u6784\uFF0C\u53EF\u9009\u53C2\u6570\u3002\u53EF\u9009\u503C\u4E3A\uFF1A".concat(layoutStr, "\u3002\n"),
    inputSchema: external_zod_namespaceObject.z.object({
      layout: external_zod_namespaceObject.z.string().describe('思维导图结构')
    })
  }, /*#__PURE__*/function () {
    var _ref2 = set_mind_map_layout_asyncToGenerator(/*#__PURE__*/set_mind_map_layout_regenerator().m(function _callee(_ref) {
      var layout, message, _t;
      return set_mind_map_layout_regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            layout = _ref.layout;
            _context.p = 1;
            sendMsg({
              type: 'set_mind_map_layout',
              layout: layout
            });
            return _context.a(2, {
              content: [{
                type: 'text',
                text: '已通知思维导图页面更新结构。'
              }]
            });
          case 2:
            _context.p = 2;
            _t = _context.v;
            message = _t instanceof Error ? _t.message : String(_t);
            return _context.a(2, {
              content: [{
                type: 'text',
                text: "Error: ".concat(message)
              }],
              isError: true
            });
        }
      }, _callee, null, [[1, 2]]);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}
;// ./src/tools/close-editor.js
function close_editor_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return close_editor_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (close_editor_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, close_editor_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, close_editor_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), close_editor_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", close_editor_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), close_editor_regeneratorDefine2(u), close_editor_regeneratorDefine2(u, o, "Generator"), close_editor_regeneratorDefine2(u, n, function () { return this; }), close_editor_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (close_editor_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function close_editor_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } close_editor_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { close_editor_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, close_editor_regeneratorDefine2(e, r, n, t); }
function close_editor_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function close_editor_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { close_editor_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { close_editor_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


function registerCloseEditor(server) {
  server.registerTool('close_editor', {
    description: '关闭当前打开的思维导图编辑页面。',
    inputSchema: external_zod_namespaceObject.z.object({})
  }, /*#__PURE__*/close_editor_asyncToGenerator(/*#__PURE__*/close_editor_regenerator().m(function _callee() {
    var message, _t;
    return close_editor_regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          sendMsg({
            type: 'close_editor'
          });
          return _context.a(2, {
            content: [{
              type: 'text',
              text: '已通知浏览器关闭思维导图页面。'
            }]
          });
        case 1:
          _context.p = 1;
          _t = _context.v;
          message = _t instanceof Error ? _t.message : String(_t);
          return _context.a(2, {
            content: [{
              type: 'text',
              text: "Error: ".concat(message)
            }],
            isError: true
          });
      }
    }, _callee, null, [[0, 1]]);
  })));
}
;// ./src/tools/export-mind-map-to.js
function export_mind_map_to_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return export_mind_map_to_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (export_mind_map_to_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, export_mind_map_to_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, export_mind_map_to_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), export_mind_map_to_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", export_mind_map_to_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), export_mind_map_to_regeneratorDefine2(u), export_mind_map_to_regeneratorDefine2(u, o, "Generator"), export_mind_map_to_regeneratorDefine2(u, n, function () { return this; }), export_mind_map_to_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (export_mind_map_to_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function export_mind_map_to_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } export_mind_map_to_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { export_mind_map_to_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, export_mind_map_to_regeneratorDefine2(e, r, n, t); }
function export_mind_map_to_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function export_mind_map_to_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { export_mind_map_to_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { export_mind_map_to_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }





function registerExportMindMapTo(server) {
  server.registerTool('export_mind_map_to', {
    description: '将当前渲染的思维导图导出为指定类型的文件。\n' + '参数介绍：\n' + "exportType\uFF1A\u5BFC\u51FA\u6587\u4EF6\u7C7B\u578B\u3002\u53EF\u9009\u503C\u4E3A\uFF1A".concat(exportTypeStr, "\u3002\n") + "saveFolder\uFF1A\u5BFC\u51FA\u7684\u6587\u4EF6\u8981\u4FDD\u5B58\u5230\u7684\u76EE\u5F55\u3002\u7981\u6B62\u4F7F\u7528\u76F8\u5BF9\u76EE\u5F55\uFF01\u8BE5\u53C2\u6570\u4E3A\u53EF\u9009\u53C2\u6570\uFF0C\u5982\u679C\u7528\u6237\u6CA1\u6709\u660E\u786E\u8BA9\u4F60\u5BFC\u51FA\u5230\u5F53\u524D\u76EE\u5F55\uFF0C\u8BE5\u53C2\u6570\u53EF\u4EE5\u4E0D\u7528\u4F20\u9012\uFF0C\u4F1A\u76F4\u63A5\u5728\u6D4F\u89C8\u5668\u7AEF\u8FDB\u884C\u5BFC\u51FA\u3002",
    inputSchema: external_zod_namespaceObject.z.object({
      exportType: external_zod_namespaceObject.z.string().describe('导出文件类型'),
      saveFolder: external_zod_namespaceObject.z.string().describe('导出的文件要保存到的目录。禁止使用相对目录！该参数为可选参数，如果用户没有明确让你导出到当前目录，该参数可以不用传递，会直接在浏览器端进行导出。').optional()
    })
  }, /*#__PURE__*/function () {
    var _ref2 = export_mind_map_to_asyncToGenerator(/*#__PURE__*/export_mind_map_to_regenerator().m(function _callee(_ref) {
      var exportType, saveFolder, res, text, base64Content, base64Data, filePath, buffer, message, _t;
      return export_mind_map_to_regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            exportType = _ref.exportType, saveFolder = _ref.saveFolder;
            _context.p = 1;
            _context.n = 2;
            return sendMsgWithCallback({
              type: 'export_mind_map_to',
              exportType: exportType,
              exportOnBrowser: !saveFolder
            });
          case 2:
            res = _context.v;
            if (!res.error) {
              _context.n = 3;
              break;
            }
            throw new Error(res.error);
          case 3:
            text = '';
            if (!res.exportOnBrowser) {
              _context.n = 4;
              break;
            }
            text = '已成功在浏览器中导出文件。';
            _context.n = 6;
            break;
          case 4:
            base64Content = res.data;
            if (base64Content) {
              _context.n = 5;
              break;
            }
            throw new Error('导出文件内容为空。');
          case 5:
            base64Data = base64Content.split(',')[1];
            filePath = external_path_namespaceObject.join(saveFolder, "".concat(res.id, ".").concat(exportType));
            buffer = Buffer.from(base64Data, 'base64');
            external_fs_namespaceObject.writeFileSync(filePath, buffer);
            text = '文件已成功导出到：' + filePath + '。';
          case 6:
            return _context.a(2, {
              content: [{
                type: 'text',
                text: text
              }]
            });
          case 7:
            _context.p = 7;
            _t = _context.v;
            message = _t instanceof Error ? _t.message : String(_t);
            return _context.a(2, {
              content: [{
                type: 'text',
                text: "Error: ".concat(message)
              }],
              isError: true
            });
        }
      }, _callee, null, [[1, 7]]);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}
;// ./src/tools/index.js







/**
 * 注册所有 MCP 工具
 */
function registerTools(server) {
  registerStartEditor(server);
  registerSetMindMapData(server);
  registerSetMindMapTheme(server);
  registerSetMindMapLayout(server);
  registerCloseEditor(server);
  registerExportMindMapTo(server);
}
;// ./src/index.js
//#!/usr/bin/env node

/**
 * SimpleMindMap MCP Server
 * 使 AI Agent 能够生成思维导图
 */
function src_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return src_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (src_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, src_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, src_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), src_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", src_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), src_regeneratorDefine2(u), src_regeneratorDefine2(u, o, "Generator"), src_regeneratorDefine2(u, n, function () { return this; }), src_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (src_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function src_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } src_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { src_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, src_regeneratorDefine2(e, r, n, t); }
function src_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function src_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { src_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { src_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }






var server = new mcp_js_namespaceObject.McpServer({
  name: 'simple-mind-map-mcp',
  version: '0.1.0'
});

// 注册所有工具
registerTools(server);

// 优雅关闭
function gracefulShutdown(reason) {
  log.info("Shutting down: ".concat(reason));
  process.exit(0);
}
process.on('SIGINT', function () {
  return gracefulShutdown('SIGINT');
});
process.on('SIGTERM', function () {
  return gracefulShutdown('SIGTERM');
});
process.stdin.on('close', function () {
  return gracefulShutdown('stdin closed');
});

// 启动服务
function main() {
  return _main.apply(this, arguments);
}
function _main() {
  _main = src_asyncToGenerator(/*#__PURE__*/src_regenerator().m(function _callee() {
    var transport;
    return src_regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return startHttpServer(config.port);
        case 1:
          // 连接 MCP 传输
          transport = new stdio_js_namespaceObject.StdioServerTransport();
          _context.n = 2;
          return server.connect(transport);
        case 2:
          log.info('MCP server connected');
        case 3:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}
main()["catch"](function (err) {
  log.error('Failed to start:', err);
  process.exit(1);
});
/******/ })()
;