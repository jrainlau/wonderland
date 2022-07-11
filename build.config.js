const { version } = require('./package.json')
const fs = require('fs-extra')

fs.ensureDirSync('./dist')

module.exports = {
  detectUpdateChannel: false,
  publish: [{
    provider: 'generic',
    url: ''
  }],
  asar: false,
  directories: {
    output: `./dist/${version}`
  },
  win: {
    artifactName: "${productName}-${version}.${ext}"
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
  }
}
