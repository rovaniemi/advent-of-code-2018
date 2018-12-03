import fs from 'fs'
const contents = fs.readFileSync(`${__dirname}/input`, 'utf8')
const arr = contents.toString().split('\n')

const first = () => {
  const input = arr.map(e => betterFormat(e))
  let matrix = initialiseMatrix()
  matrix = calculateFabrics(input, matrix)
  console.log(howManyIsOverOne(matrix))
}

const second = () => {
  const input = arr.map(e => betterFormat(e))
  let matrix = initialiseMatrix()
  matrix = calculateFabrics(input, matrix)
  console.log(findIdThatIsNotOverlap(input, matrix))
}

const findIdThatIsNotOverlap = (input, matrix) => {
  let id = undefined
  input.forEach(fabric => {
    if (!overlapping(fabric, matrix)) id = fabric.id
  })
  return id
}

const overlapping = (fabric, matrix) => {
  let overlapp = false
  for (let i = fabric.right; i < fabric.right + fabric.width; i++) {
    for (let j = fabric.top; j < fabric.top + fabric.length; j++) {
      if (matrix[i][j] > 1) overlapp = true
    }
  }
  return overlapp
}

const initialiseMatrix = () => {
  let matrix = []
  for (let i = 0; i < 1000; i++) {
    matrix[i] = []
    for (let j = 0; j < 1000; j++) {
      matrix[i][j] = 0
    }
  }
  return matrix
}

const calculateFabrics = (input, matrix) => {
  input.forEach(e => {
    for (let i = e.right; i < e.right + e.width; i++) {
      for (let j = e.top; j < e.top + e.length; j++) {
        matrix[i][j]++
      }
    }
  })
  return matrix
}

const howManyIsOverOne = matrix => {
  let answ = 0
  matrix.forEach(row =>
    row.forEach(e => {
      if (e > 1) answ++
    })
  )
  return answ
}

const betterFormat = string => {
  return {
    id: parseInt(string.split(' ')[0].substring(1)),
    right: parseInt(string.split(' ')[2].split(',')[0]),
    top: parseInt(
      string
        .split(' ')[2]
        .split(',')[1]
        .substring(0, string.split(' ')[2].split(',')[1].length - 1)
    ),
    width: parseInt(string.split(' ')[3].split('x')[0]),
    length: parseInt(string.split(' ')[3].split('x')[1])
  }
}

export default {
  first: first,
  second: second
}
