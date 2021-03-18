import { build as snowpackBuild } from 'snowpack'

export async function build() {
  const { snowPackConfig } = await import('../config/snowpack')

  await snowpackBuild({
    config: snowPackConfig,
    lockfile: null
  })
}
