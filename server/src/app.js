#!/usr/bin/env node

require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const http = require('http')
const logger = require('morgan')
const cors = require('cors')

async function init() {
  const db = require('./db')
  await db.init()

  const app = express()

  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(cors({
    origin: process.env.CLIENT_ROOT,
    credentials: true
  }))

  app.use('/api', require('./routes/index'))

  var server = http.createServer(app)

  var port = normalizePort(process.env.PORT || '3200')
  server.listen(port)
  server.on('error', onError)
  server.on('listening', () => onListening(server))
}

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

function onListening(server) {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.debug('--- Listening on ' + bind + ' ---')
}

init()
