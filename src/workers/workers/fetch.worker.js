import registerPromiseWorker from 'promise-worker/register'

registerPromiseWorker(async (message) => {
  console.log(message)
  if (message.type === 'fetch') {
    message.options.returnType = message.options.returnType || 'text'
    if (!['arrayBuffer', 'blob', 'formData', 'json', 'text'].includes(message.options.returnType)) {
      return Promise.reject(new TypeError(`Expected returnType to be one of 'arrayBuffer', 'blob', 'formData', 'json', 'text', got ${message.options.returnType}`))
    }

    return fetch(message.url, message.options)
      .then(resp => {
        console.log('received')
        return resp[message.options.returnType]()
      })
      .catch((err) => {
        console.error(err)
      })
  }
})
