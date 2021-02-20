import workers from '../workers/index'
import path from 'path'
import { promises as fsp } from 'fs'

console.log('promise fs', fsp)

export async function compareFileMd5 (filePath, correctMd5) {
  return await workers.fileMd5(filePath) === correctMd5
}

/**
 * Search for all minecraft versions
 * @param bundlePath{String} - bundleFile includes `.minecraft`
 * @return {Promise}
 * */
export async function searchAllVersions (bundlePath) {
  return fsp.readdir(path.resolve(bundlePath, 'versions'))
    .catch(err => {
      console.log('err', err)
    })
}

export default {
  compareFileMd5, searchAllVersions
}
