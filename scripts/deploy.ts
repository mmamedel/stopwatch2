import 'dotenv/config'
import ghpages from 'gh-pages'
import { build } from './common'
import pkg from '../package.json'

process.env.NODE_ENV = 'production'
const repo = pkg.repository.url.replace(
  /(https:\/\/)/,
  `$1${process.env.GH_TOKEN}@`
)

deploy()

async function deploy() {
  await build()

  ghpages.publish('build', { repo }, (err) => {
    err && console.error(err)
  })
}
