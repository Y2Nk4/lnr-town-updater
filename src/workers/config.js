import electron from 'electron'
import path from 'path'

const app = electron.remote.app

const appPath = app.getPath('exe')

export default {
  appPath,
  appDirectory: path.dirname(appPath)
}
