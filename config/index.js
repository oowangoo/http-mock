import fs from 'fs'
import config from './_base.js'
import _debug from 'debug'

const debug = _debug('app:config')

debug(`Apply enviroment overrides for NODE_ENV ${config.env}`)

let overrideFilename = `_${config.env}.js`
let hasOverrideFile
try {
  fs.lstatSync(`${__dirname}/${overrideFilename}`)
  hasOverrideFile = true
} catch (e) {}

let overrides
if (hasOverrideFile) {
  overrides = require(`./${overrideFilename}`)(config)
} else {
  debug(`No configuration overrides found for NODE_ENV "${config.env}"`)
}

export default Object.assign({}, config, overrides);
