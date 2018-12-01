import fs from 'fs'
const contents = fs.readFileSync(`${__dirname}/input`, 'utf8')
const arr = contents.toString().split('\n')

const first = () => {
  const sum = arr.reduce((p, c) => {
    const sign = c.substring(0, 1)
    return sign === '+'
      ? p + parseInt(c.substring(1, c.length))
      : p - parseInt(c.substring(1, c.length))
  }, 0)
  console.log(sum)
}

const second = () => {
  const hash = {}
  let i = 0
  let freq = 0
  let answ = undefined
  while (answ === undefined) {
    if (hash[freq]) {
      answ = freq
    } else {
      const target = arr[i]
      const sign = target.substring(0, 1)
      hash[freq] = true
      sign === '+'
        ? (freq += parseInt(target.substring(1, target.length)))
        : (freq -= parseInt(target.substring(1, target.length)))
      if (i === arr.length - 1) {
        i = 0
      } else {
        i++
      }
    }
  }
  console.log(answ)
}

export default {
  first: first,
  second: second
}
