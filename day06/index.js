import fs from 'fs'
const contents = fs.readFileSync(`${__dirname}/input`, 'utf8')
const arr = contents.toString().split('\n')

const first = () => {
  const anws = 0
  console.log(anws)
}
const second = () => {
  const answ = 0
  console.log(answ)
}
export default {
  first: first,
  second: second
}
