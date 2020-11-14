const db = require('../db')
const fs = require('fs')

jest.mock('fs') // 从此刻变成__mocks__的fs

describe('db', () => {
    afterEach(() => {
      // 每次一个测试用例测试完了之后记得清除mocks
      fs.clearMocks()
    })
  it('can read', async () => {
    const data = [{ title: 'hi', done: false }]
    fs.setReadFileMock('/xxx', null, JSON.stringify(data))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(data)
  });
  it('can write', async () => {
    let fakeFile = ''
    fs.setWriteFileMock('/yyy', (path, data, callback) => {
      fakeFile = data
      callback(null)
    })
    const list = [{ title: '发发发', done: true }]
    await db.write(list, '/yyy')
    expect(fakeFile).toBe(JSON.stringify(list))
  });
});