const { version } = require('./package.json')
const fs = require('fs-extra')

fs.ensureDirSync('./dist')

module.exports = {
  publish: [{
    provider: 'generic',
    url: ''
  }],
  asar: false,
  directories: {
    output: `./dist/${version}`
  },
}
