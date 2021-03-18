import ghpages from 'gh-pages'
import { build } from './common'

process.env.NODE_ENV = 'production'

deploy()

async function deploy() {
  await build()
  console.log('test')

  ghpages.publish('build', (err) => {
    err && console.error(err)
  })
}
