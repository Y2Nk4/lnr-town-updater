import electron from 'electron'

export default function () {
  let currentWindow = electron.remote.getCurrentWindow()
  if (currentWindow.isDevToolsOpened()) {
    currentWindow.closeDevTools()
  }
  currentWindow.close()
  // electron.ipcRenderer.send('quit-application')
}
