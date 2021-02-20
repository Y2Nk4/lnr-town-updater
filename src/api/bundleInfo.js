import workers from '../workers/index'
import config from '../config/config'

console.log('api', config)
let api = config.api

export async function getBundleInfo () {
  return workers.fetch(api.bundleInfoJsonUrl, {
    cache: 'no-store',
    returnType: 'json',
    headers: {
      'Cache-Control': 'no-cache'
    }
  })
}

export default {
  getBundleInfo
}
