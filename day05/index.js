import fs from 'fs'
const contents = fs.readFileSync(`${__dirname}/input`, 'utf8')
const string = contents.toString()

const first = () => {
  //const answ = formatString(string)
  //console.log(answ.length)
}

const second = () => {
  const answers = []
  for (let i = 0; i < 26; i++) {
    const stringIndexSet = new Set()
    for (let j = 0; j < string.length; j++) {
      if (string.charCodeAt(j) === 65 + i || string.charCodeAt(j) === 97 + i) {
        stringIndexSet.add(j)
      }
    }
    let newString = ''
    const oldStringArr = string.split('')
    for (let i = 0; i < string.length; i++) {
      if (!stringIndexSet.has(i)) {
        newString += oldStringArr[i]
      }
    }
    const aStr = formatString(newString)
    answers.push(aStr.length)
  }
  console.log(Math.min(...answers))
}

const formatString = string => {
  const stringIndexSet = new Set()
  for (let i = 1; i < string.length; i++) {
    if (Math.abs(string.charCodeAt(i - 1) - string.charCodeAt(i)) === 32) {
      if (!stringIndexSet.has(i - 1)) {
        stringIndexSet.add(i - 1)
        stringIndexSet.add(i)
      }
    }
  }
  let newString = ''
  const oldStringArr = string.split('')
  for (let i = 0; i < string.length; i++) {
    if (!stringIndexSet.has(i)) {
      newString += oldStringArr[i]
    }
  }
  if (string.length !== newString.length) {
    newString = formatString(newString)
  }
  return newString
}

export default {
  first: first,
  second: second
}
