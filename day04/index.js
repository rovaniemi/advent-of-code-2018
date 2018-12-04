import fs from 'fs'
const contents = fs.readFileSync(`${__dirname}/input`, 'utf8')
const arr = contents.toString().split('\n')

const first = () => {
  const list = formatList(
    arr.sort(
      (a, b) => new Date(a.substring(1, 17)) - new Date(b.substring(1, 17))
    )
  )
  const guards = betterSleepFormat(list)
  const mostSleepingGuardId = getMostSleepingGuardId(guards)
  const mostAsleepedMinute = getMostAsleepedMinute(guards[mostSleepingGuardId])
  console.log(mostAsleepedMinute * mostSleepingGuardId)
}

const second = () => {
  const list = formatList(
    arr.sort(
      (a, b) => new Date(a.substring(1, 17)) - new Date(b.substring(1, 17))
    )
  )
  const guards = betterSleepFormat(list)
  const minuteFormat = getMinuteFormat(guards)
  const answ = getMostFrequentlySleepingGuardAndMinute(minuteFormat)
  console.log(answ)
}

const getMostFrequentlySleepingGuardAndMinute = input => {
  const max = {
    minute: undefined,
    value: 0,
    id: undefined
  }
  Object.keys(input).forEach(k =>
    Object.keys(input[k]).forEach(e => {
      if (max.value < input[k][e]) {
        max.id = k
        max.minute = e
        max.value = input[k][e]
      }
    })
  )
  console.log(max)
  return max.id * max.minute
}

const getMinuteFormat = guards => {
  const minuteFormat = {}
  Object.keys(guards).forEach(guardId => {
    minuteFormat[guardId] = getAsleepedMinutes(guards[guardId])
  })
  return minuteFormat
}

const getAsleepedMinutes = input => {
  let minutes = {}
  for (let i = 0; i < 60; i++) {
    minutes[i] = 0
  }
  input.forEach(e => {
    for (
      let i = parseInt(e.start.substring(14, 16));
      i < parseInt(e.end.substring(14, 16));
      i++
    ) {
      minutes[i]++
    }
  })

  return minutes
}

const getMostAsleepedMinute = input => {
  const minutes = getAsleepedMinutes(input)
  const max = {
    minute: 0,
    id: undefined
  }
  Object.keys(minutes).forEach(e => {
    if (max.minute < minutes[e]) {
      max.id = e
      max.minute = minutes[e]
    }
  })
  return max.id
}

const getMostSleepingGuardId = guards => {
  const mostSleeping = {
    minutes: 0,
    id: undefined
  }

  Object.keys(guards).forEach(guardId => {
    const totalMinutes = guards[guardId].reduce((p, c) => p + c.minutes, 0)
    if (mostSleeping.minutes < totalMinutes) {
      mostSleeping.minutes = totalMinutes
      mostSleeping.id = guardId
    }
  })

  return mostSleeping.id
}

const betterSleepFormat = guards => {
  const guardsSleep = {}
  Object.keys(guards).forEach(guardId => {
    const guardCommands = guards[guardId]
    for (let i = 0; i < guardCommands.length; i = i + 2) {
      if (!guardsSleep[guardId]) guardsSleep[guardId] = []
      guardsSleep[guardId].push({
        start: guardCommands[i].substring(1, 17),
        end: guardCommands[i + 1].substring(1, 17),
        minutes: Math.floor(
          Math.abs(
            new Date(guardCommands[i].substring(1, 17)) -
              new Date(guardCommands[i + 1].substring(1, 17))
          ) /
            1000 /
            60
        )
      })
    }
  })
  return guardsSleep
}

const formatList = arr => {
  const formattedLists = {}
  let guardId = arr[0].split('#')[1].split(' ')[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes('Guard #')) {
      guardId = arr[i].split('#')[1].split(' ')[0]
    }
    if (!arr[i].includes('Guard #')) {
      if (!formattedLists[guardId]) formattedLists[guardId] = []
      formattedLists[guardId].push(arr[i])
    }
  }
  return formattedLists
}

export default {
  first: first,
  second: second
}
