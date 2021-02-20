import PromiseWorker from 'promise-worker'
import FetchWorker from './workers/fetch.worker'
import ConfigFileWorker from './workers/configFile.worker'
import FileWorker from './workers/file.worker'
import appConfig from './config'

import md5File from 'md5-file'
console.log('md5-file', md5File)

const fetchPromiseWorker = new PromiseWorker(new FetchWorker())
const fetch = (url, options) => fetchPromiseWorker.postMessage({
  type: 'fetch', url, options, appConfig
})

const filePromiseWorker = new PromiseWorker(new FileWorker())
const fileMd5 = (filePath) => filePromiseWorker.postMessage({
  type: 'fileMd5', filePath, appConfig
})

const configFilePromiseWorker = new PromiseWorker(new ConfigFileWorker())
const writeLocalConfig = (content) => configFilePromiseWorker.postMessage({
  type: 'writeLocalConfig', content, appConfig
})
const getLocalConfig = () => configFilePromiseWorker.postMessage({
  type: 'getLocalConfig', appConfig
})

export default {
  fetch,
  writeLocalConfig,
  getLocalConfig,
  fileMd5
}
