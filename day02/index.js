import fs from 'fs'
const contents = fs.readFileSync(`${__dirname}/input`, 'utf8')

const first = () => {
  const answ = 0
  console.log(answ)
}

const second = () => {
  const answ = 0
  console.log(answ)
}

export default {
  first: first,
  second: second
}
