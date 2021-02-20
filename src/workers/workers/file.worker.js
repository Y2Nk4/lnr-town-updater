import registerPromiseWorker from 'promise-worker/register'
import crypto from 'crypto'
import fs from 'fs'

registerPromiseWorker(async (message) => {
  console.log(message)
  if (message.type === 'fileMd5') {
    return new Promise((resolve, reject) => {
      const output = crypto.createHash('md5')
      const input = fs.createReadStream(message.filePath)

      input.on('error', (err) => {
        reject(err)
      })

      output.once('readable', () => {
        resolve(output.read().toString('hex'))
      })

      input.pipe(output)
    })
  }
})
