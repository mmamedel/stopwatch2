process.env.NODE_ENV = 'development'
import { startServer } from 'snowpack'
import { snowPackConfig } from '../config/snowpack'

startServer({
  config: snowPackConfig,
  lockfile: null
})
