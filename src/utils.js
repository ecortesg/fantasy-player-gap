export function arrayRange(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  )
}

export function roundNumber(number, decimals) {
  let powerOfTen = Math.pow(10, decimals)
  let result = Math.round(number * powerOfTen) / powerOfTen
  return result
}

export function draftPicks(draftSettings) {
  const { teams, rounds } = draftSettings
  const picks = []
  let ov = 1
  for (let i = 1; i <= Number(rounds) + 2; i++) {
    let order
    if (i % 2 === 1) {
      order = arrayRange(1, teams, 1)
    } else {
      order = arrayRange(1, teams, 1).reverse()
    }
    for (let j of order) {
      let pick = {}
      pick.overall = ov
      pick.round = i
      pick.number = order[j - 1]
      pick.team = j
      pick.player = {}
      picks.push(pick)
      ov++
    }
  }
  return picks
}

export function createRostersObject(n) {
  const result = {}
  for (let i = 1; i <= n; i++) {
    result[i] = []
  }
  return result
}
