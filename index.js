
const parser = require('yaml-js')
const seperators = [ '---', '= yaml =']
const pattern = pattern = '^('
      + '((= yaml =)|(---))'
      + '$([\\s\\S]*?)'
      + '\\2'
      + '$'
      + (process.platform === 'win32' ? '\\r?' : '')
      + '(?:\\n)?)'
const regex = new RegExp(pattern, 'm')

module.exports = extractor
module.exports.test = test

function extractor(string) {
  string = string || ''

  if (regex.test(string)) return parse(string)
  else return { attributes: {}, body: string }
}

function parse(string) {
  var match = regex.exec(string)
  var yaml = match[match.length - 1].replace(/^\s+|\s+$/g, '')
  var attributes = parser.load(yaml) || {}
  var body = string.replace(match[0], '')

  return { attributes: attributes, body: body }
}

function test(string){
  string = string || ''

  return regex.test(string)
}
