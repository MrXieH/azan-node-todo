#!/usr/bin/env node

const { Command } = require('commander');
const api = require('./index.js')
const pkg = require('./package.json')

const program = new Command();
program.version(pkg.version);
program.option('-d, --desc', 'emm...')

program
  .command('add <name>')
  .description('add a task')
  .action((e) => {
    api.add(e)
  })
program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear()
  })


if (process.argv.length === 2) {
  // 直接调用
  api.showAll()
  return
}
program.parse(process.argv);
