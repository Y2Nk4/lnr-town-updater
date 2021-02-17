import PromiseWorker from 'promise-worker'
import FetchWorker from './workers/fetch.worker'
import ConfigFileWorker from './workers/configFile.worker'
import appConfig from './config'

const fetchPromiseWorker = new PromiseWorker(new FetchWorker())
const fetch = (url, options) => fetchPromiseWorker.postMessage({
  type: 'fetch', url, options, appConfig
})

const configFilePromiseWorker = new PromiseWorker(new ConfigFileWorker())
const writeLocalConfig = (content) => configFilePromiseWorker.postMessage({
  type: 'writeLocalConfig', content, appConfig
})
const getLocalConfig = () => configFilePromiseWorker.postMessage({
  type: 'getLocalConfig', appConfig
})

export default {
  fetch, writeLocalConfig, getLocalConfig
}
