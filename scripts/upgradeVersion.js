const { resolve } = require('path')
const fs = require('fs-extra')

const packageJson = require('../package.json')
const { version } = packageJson
const [major, minor, patch] = version.split('.')
const newVersion = [major, minor, Number(patch) + 1].join('.')
console.log('New version is: ', newVersion)
packageJson.version = newVersion
fs.writeFileSync(resolve(__dirname, '../package.json'), JSON.stringify(packageJson, null, 2), 'utf-8')
