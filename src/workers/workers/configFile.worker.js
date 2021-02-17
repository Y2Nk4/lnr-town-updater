import registerPromiseWorker from 'promise-worker/register'
import fs from 'fs'

registerPromiseWorker((message) => {
  if (message.type === 'getLocalConfig') {
    console.log(message)
    return new Promise((resolve, reject) => {
      console.log(message.appConfig)
      fs.readFile(`${message.appConfig.appDirectory}/updater.json`, { encoding: 'utf8' }, (err, content) => {
        if (err) {
          console.log(err, err.code)
          // eslint-disable-next-line prefer-promise-reject-errors
          return reject(err)
        } else {
          if (content) {
            try {
              return resolve(JSON.parse(content))
            } catch (e) {
              return resolve({})
            }
          } else {
            return resolve({})
          }
        }
      })
    })
  } else if (message.type === 'writeLocalConfig') {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${message.appConfig.appDirectory}/updater.json`, JSON.stringify(
        message.content, null, '\t', '\n'
      ), (err) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(true)
        }
      })
    })
  }
})
