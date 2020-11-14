const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')
const dbPath = path.join(home, '.todo')

const db = {
  read(p = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(p, { flag: 'a+' }, (error, data) => {
        if (error) return reject(error)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(data, p = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(data)
      fs.writeFile(p, string, (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
}

module.exports = db