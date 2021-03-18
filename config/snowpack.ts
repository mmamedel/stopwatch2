import { createConfiguration } from 'snowpack'

const isProd = process.env.NODE_ENV === 'production'

export const snowPackConfig = createConfiguration({
  mount: {
    public: { url: '/', static: true },
    src: { url: '/js' }
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    'snowpack-plugin-skypack-replacer'
  ],
  routes: [],
  optimize: {
    bundle: isProd
  },
  alias: {
    '@': './src'
  }
})
