const fs = jest.createMockFromModule('fs') // mock fs
const _fs = jest.requireActual('fs') // 原来的fs

Object.assign(fs, _fs)

let readMocks = {}

fs.setReadFileMock = (path, error, data) => {
    readMocks[path] = [error, data]
}

// 重写readFile方法
fs.readFile = (path, options, callback) => {
    if (callback === undefined) {
        callback = options
    }
    if (path in readMocks) {
        callback(...readMocks[path])
    } else {
        _fs.readFile(path, options, callback)
    }
}

let writeMocks = {}

fs.setWriteFileMock = (path, fn) => {
    writeMocks[path] = fn
}

fs.writeFile = (file, data, options, callback) => {
    if (file in writeMocks) {
        writeMocks[file](file, data, options, callback)
    } else {
        _fs.writeFile(file, data, options, callback)
    }
}

fs.clearMocks = () => {
    readMocks = {}
    writeMocks = {}
}

module.exports = fs