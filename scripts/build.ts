import { build as snowpackBuild } from 'snowpack'

process.env.NODE_ENV = 'production'
build()

async function build() {
  const { snowPackConfig } = await import('../config/snowpack')

  await snowpackBuild({
    config: snowPackConfig,
    lockfile: null
  })
}
