import { ipcRenderer } from 'electron'

export default function () {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('open-directory-dialog', {
      properties: [ 'openDirectory' ]
    })

    ipcRenderer.once('directory-dialog-selected-file', async (event, files) => {
      console.log('files', files)
      return resolve(files)
    })
  })
}
