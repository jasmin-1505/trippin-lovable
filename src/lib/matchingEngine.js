// trippin' matching engine — getTrail() and getFunCorner()

const NO_CROWD_KEEP_TAGS = ['nocrowd', 'quiet', 'offbeat']
const NO_OUTDOOR_REMOVE_TAGS = ['wander', 'photo', 'golden']

/**
 * Q5 exclusion filter — runs before scoring, not after.
 */
function applyExclusionFilter(places, q5trait) {
  switch (q5trait) {
    case 'nocrowd':
      return places.filter((p) => p.tags.some((t) => NO_CROWD_KEEP_TAGS.includes(t)))
    case 'nopaid':
      return places.filter((p) => !p.budget.free.startsWith('Not possible'))
    case 'nooutdoor':
      return places.filter((p) => !p.tags.some((t) => NO_OUTDOOR_REMOVE_TAGS.includes(t)))
    case 'all':
    default:
      return places
  }
}

/**
 * answers: { q1, q2, q3, q4, q5 } — trait strings
 * budget: 'free' | 'mid' | 'premium'
 */
export function getTrail(answers, budget, allPlaces) {
  const traits = [answers.q1, answers.q2, answers.q3, answers.q4].filter(Boolean)

  const pool = applyExclusionFilter(allPlaces, answers.q5)

  const scored = pool
    .map((p) => ({ ...p, score: traits.filter((t) => p.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)

  // Variety cap: max 2 places per category
  const selected = []
  const categoryCount = {}
  for (const p of scored) {
    if (selected.length >= 5) break
    const count = categoryCount[p.category] || 0
    if (count < 2) {
      selected.push(p)
      categoryCount[p.category] = count + 1
    }
  }

  // Pad to 5 with next highest-scored places, ignoring the cap
  if (selected.length < 5) {
    const selectedIds = new Set(selected.map((p) => p.id))
    for (const p of scored) {
      if (selected.length >= 5) break
      if (!selectedIds.has(p.id)) {
        selected.push(p)
        selectedIds.add(p.id)
      }
    }
  }

  return selected
}

/**
 * mainTrail: array of place objects already on the trail
 * allPlaces: full place database
 * userTraits: [q1, q2, q3, q4] trait strings
 */
export function getFunCorner(mainTrail, allPlaces, userTraits) {
  const maxMatchScore = 4
  const trailIds = new Set(mainTrail.map((p) => p.id))
  const pool = allPlaces.filter((p) => !trailIds.has(p.id))

  const scored = pool.map((p) => {
    const matchScore = userTraits.filter((t) => p.tags.includes(t)).length
    const normalizedMatchScore = matchScore / maxMatchScore
    const randomScore = Math.random()
    const finalScore = randomScore * 0.75 + normalizedMatchScore * 0.25
    return { ...p, finalScore }
  })

  scored.sort((a, b) => b.finalScore - a.finalScore)

  return scored.slice(0, 2)
}
