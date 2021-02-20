import { ipcRenderer } from 'electron'

export default function () {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('open-directory-dialog', {
      properties: [ 'openDirectory' ]
    })

    ipcRenderer.once('directory-dialog-selected-file', async (event, result) => {
      console.log('files', result)
      return resolve(result)
    })
  })
}
