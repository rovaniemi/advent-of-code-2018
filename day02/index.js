import fs from 'fs'
const contents = fs.readFileSync(`${__dirname}/input`, 'utf8')
const arr = contents.toString().split('\n')

const first = () => {
  let two = 0
  let three = 0

  arr.forEach(e => {
    nTimesAnyLetter(e, 2) ? two++ : ''
    nTimesAnyLetter(e, 3) ? three++ : ''
  })

  console.log(two * three)
}

const second = () => {
  const correctStrings = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + i; j < arr.length; j++) {
      if (oneCharDiff(arr[i], arr[j])) correctStrings.push(...[arr[i], arr[j]])
    }
  }
  const correctString = correctStrings[0]
    .split('')
    .map((e, i) => (e === correctStrings[1].split('')[i] ? e : ''))
    .join('')

  console.log(correctString)
}

const oneCharDiff = (first, second) => {
  return (
    first
      .split('')
      .map((e, i) => e === second.split('')[i])
      .filter(e => !e).length === 1
  )
}

const nTimesAnyLetter = (string, n) => {
  const hash = {}
  string.split('').forEach(char => {
    hash[char] ? hash[char]++ : (hash[char] = 1)
  })
  return Object.values(hash).includes(n)
}

export default {
  first: first,
  second: second
}
