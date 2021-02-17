import path from 'path'
import { remote } from 'electron'

export default {
  runningDir: path.dirname(remote.app.getPath('exe')),
  appPath: remote.app.getPath('exe'),
  appBaseName: path.basename(remote.app.getPath('exe'))
}
