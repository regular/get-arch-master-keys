const hyperquest = require('hyperquest')
const pull = require('pull-stream')
const toPull = require('stream-to-pull-stream')
const defer = require('pull-defer')
const {parse} = require('fast-html-parser')

const KEY_PAGE_URL = "https://www.archlinux.org/master-keys/"

module.exports = function () {
  const source = defer.source()
  pull(
    toPull.source(hyperquest(KEY_PAGE_URL)),
    pull.collect( (err, buffers) => {
      if (err) return cb(err)
      const html = Buffer.concat(buffers).toString()
      const root = parse(html)
      const table = root.querySelector('table')
      const rows = root.querySelectorAll('tr')
      rows.shift() // 1st row is heading
      const keys = pull(
        pull.values(rows),
        pull.map( row => ({
          As: row.querySelectorAll('a').map( a => ({
            attrs: a.rawAttrs,
            text: a.rawText
          })),
          TTs: row.querySelectorAll('tt').map( tt => ({
            text: tt.rawText.replace(/[^a-zA-Z0-9]/g, ' ')
          }))
        })),
        pull.map( ({As, TTs}) => ({
          fingerprint: TTs[0] && TTs[0].text,
          name: As[1] && As[1].text
        })),
        pull.filter( ({fingerprint, name}) => fingerprint && name )
      )
      source.resolve(keys)
    })
  )
  return source
}
