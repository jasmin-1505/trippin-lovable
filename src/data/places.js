// The trippin' place database — 12 fully enriched Jaipur places.
// category values double as the Do/Buy/Eat & Drink/Chill lens keys:
// Heritage -> Do, Arts & Craft -> Buy, Food & Drinks -> Eat & Drink, Slow Travel -> Chill

export const CATEGORY_LENS = {
  Heritage: { tab: 'Do', label: 'Things to do' },
  'Arts & Craft': { tab: 'Buy', label: 'Things to buy' },
  'Food & Drinks': { tab: 'Eat & Drink', label: 'Food & drinks' },
  'Slow Travel': { tab: 'Chill', label: 'Third places' },
}

export const PLACES = [
  {
    id: 1,
    name: 'Panna Meena ka Kund',
    type: 'Hidden gem',
    category: 'Heritage',
    emoji: '🏛️',
    tags: ['heritage', 'photo', 'golden', 'quiet', 'offbeat', 'nocrowd'],
    essence: ['old-soul', 'silent', 'photogenic', 'local-secret'],
    desc: 'A 16th-century stepwell hidden in Amer village, almost always empty. The geometric symmetry is staggering at dawn.',
    story:
      "Built in the reign of Raja Man Singh I, this stepwell was the original social hub where women gathered to collect water and rest — the world's first third place. The criss-crossing steps were designed so women from different castes never had to pass each other.",
    bestTime: '6–8am (golden light floods the steps, almost no one around)',
    gettingThere:
      "From Amber Fort gate, walk 200m toward the village market — it's behind the small temple with the red flag. No signboard. Ask any local for baori.",
    budget: {
      free: 'Entry free — no ticket, no gate',
      mid: 'Auto from old city ₹80 return',
      premium: 'Guided heritage walk including stepwell ₹400',
    },
    localContext: 'Locals come here for morning meditation before the city wakes up.',
  },
  {
    id: 2,
    name: 'Nahargarh Fort Walls',
    type: 'Sunset spot',
    category: 'Heritage',
    emoji: '🌄',
    tags: ['heritage', 'photo', 'golden', 'evening', 'energetic', 'wander'],
    essence: ['vast', 'breezy', 'romantic', 'alive'],
    desc: 'Not the main fort — the outer rampart walls. Walk them at dusk for a sweeping 180° view of the entire pink city lighting up below.',
    story:
      'Built in 1734 and never once conquered — partly because it was never seriously attacked. The walls were built for watching, not fighting. Local historians say the real purpose was to let the Maharaja see everything happening in his city at once.',
    bestTime: '5:30–7pm (sunset paints the city pink — extraordinary light)',
    gettingThere:
      'Auto to Nahargarh Fort ₹150 from old city. At the main gate turn left and follow the outer rampart — no ticket needed for the walls themselves.',
    budget: {
      free: 'Outer walls — no entry fee at all',
      mid: "Auto + chai at Wind View Café ₹230",
      premium: 'Sunset photography guide ₹600',
    },
    localContext: 'Young Jaipuris come here on evenings they want to remember.',
  },
  {
    id: 3,
    name: 'Amber Fort — Zenana Mahal',
    type: 'Must-visit',
    category: 'Heritage',
    emoji: '🏰',
    tags: ['heritage', 'deep', 'daytime', 'hero', 'anytime'],
    essence: ['grand', 'layered', 'regal', 'awe-inspiring'],
    desc: 'Skip the main courtyards — go straight to the Zenana Mahal, the royal women\'s quarters. Few tourists reach this far. The tilework is extraordinary.',
    story:
      'Amber Fort took 150 years to complete across four rulers. The Zenana was designed so queens could observe court proceedings through latticed marble screens without being seen — a 16th-century one-way mirror built in stone. The ceiling inlays here use a technique that has been lost.',
    bestTime: '8–10am (before tour groups, morning light in the inner chambers)',
    gettingThere:
      'Take the main entrance, pass through Ganesh Pol, then follow signs to Jai Mandir — Zenana Mahal is through the door on the far left. Ask a guard if unclear; most tourists skip it entirely.',
    budget: {
      free: 'Not possible — entry ₹100 Indian nationals',
      mid: 'Entry + audio guide ₹250',
      premium: 'Private guided tour of inner chambers ₹1200',
    },
    localContext: 'Local historians say the Zenana ceiling is the most underrated room in all of Rajasthan.',
  },
  {
    id: 4,
    name: 'City Palace — Textile Museum',
    type: 'Hidden section',
    category: 'Heritage',
    emoji: '🧵',
    tags: ['heritage', 'deep', 'daytime', 'quiet', 'craft'],
    essence: ['regal', 'detailed', 'textile', 'rare'],
    desc: 'Inside City Palace, most tourists skip the textile galleries. The royal costume and fabric collection spans 400 years — some pieces are extraordinary.',
    story:
      'The Maharaja of Jaipur was obsessive about fabric — he imported techniques from Persia, China, and Europe and fused them into a distinctly Rajasthani style. The collection includes a royal robe so large it takes four people to unfold it. The Maharaja it was made for weighed over 250kg.',
    bestTime: '10am–12pm (fewer school groups, good natural light in the gallery)',
    gettingThere:
      'Enter City Palace main gate, follow signs to Mubarak Mahal — the textile museum is on the upper floor. Separate ticket counter inside the complex.',
    budget: {
      free: 'Not possible — City Palace entry ₹200 Indian nationals',
      mid: 'Entry + textile gallery ₹250',
      premium: 'Guided textile tour with curator ₹800',
    },
    localContext: 'Textile designers from across India make pilgrimage here to study the embroidery patterns. Most visit before 10am.',
  },
  {
    id: 5,
    name: 'Lassiwala, MI Road',
    type: 'Legendary',
    category: 'Food & Drinks',
    emoji: '🥛',
    tags: ['food', 'hero', 'daytime', 'golden', 'nocrowd', 'wander', 'quiet'],
    essence: ['iconic', 'earthy', 'authentic', 'unmissable'],
    desc: 'Open only till noon. Thick, set lassi served in clay cups — the queue is the experience. Three generations, same recipe, same spot.',
    story:
      'Started in 1944 by a Punjabi migrant who fled partition with nothing but the family lassi recipe. The secret is buffalo milk set overnight, never blended. His grandson runs it now. The clay cups are sourced from the same potter his grandfather used.',
    bestTime: '8–10am (freshest batch, manageable queue — after 11am the wait is 40 minutes)',
    gettingThere:
      "MI Road near Niro's restaurant — look for the crowd standing outside a tiny shop with no signboard and no menu. If there's no queue, you're at the wrong place.",
    budget: {
      free: 'Clay cup lassi ₹60',
      mid: 'Large thick lassi ₹100',
      premium: "Two lassis and take your time — there's no upsell here",
    },
    localContext: "Jaipuris who've moved abroad dream about this. It's their first stop when they come back.",
  },
  {
    id: 6,
    name: 'Rawat Mishthan Bhandar',
    type: 'Street eat',
    category: 'Food & Drinks',
    emoji: '🥟',
    tags: ['food', 'cover', 'daytime', 'energetic', 'wander', 'all'],
    essence: ['crispy', 'chaotic', 'generous', 'unmissable'],
    desc: 'Pyaaz kachori that Jaipuris dream about when they move abroad. Crispy, spiced, hot — the gold standard of Rajasthani street food.',
    story:
      "They make over 10,000 kachoris daily and still sell out by afternoon. The onion filling recipe has not changed since the shop opened in 1953. The current owner's grandfather wrote it down in a ledger that's kept locked in a safe.",
    bestTime: '7–9am (fresh batch, maximum crunch — afternoon batches sit longer)',
    gettingThere:
      "Station Road near the railway station — a large brightly lit shop with a queue almost always out the door. You'll smell it before you see it.",
    budget: {
      free: '2 kachoris ₹40',
      mid: '2 kachoris + samosa + chai ₹120',
      premium: 'Full Rajasthani breakfast thali ₹200',
    },
    localContext: 'Every Jaipur resident has a strong opinion on whether Rawat or Lassiwala is the better morning stop. Try both and pick a side.',
  },
  {
    id: 7,
    name: 'Wind View Café, Nahargarh',
    type: 'Rooftop drinks',
    category: 'Food & Drinks',
    emoji: '☕',
    tags: ['food', 'slow', 'golden', 'evening', 'quiet', 'photo', 'deep'],
    essence: ['breezy', 'slow', 'views', 'indie'],
    desc: 'Chai and coffee at sunset inside the fort complex — the entire Pink City laid out below you, live folk music some weekends.',
    story:
      "Sits inside the 300-year-old fort walls — you're drinking chai inside a boundary built to protect a kingdom. The café owners say the wind here never stops, even in peak summer. The musicians who play here on Fridays have been coming for 11 years.",
    bestTime: '5–7pm (golden hour, cooler breeze, city lights start coming on)',
    gettingThere:
      "Inside Nahargarh Fort complex — follow signs after the main gate. It's on the upper terrace. Fort entry ₹50 required to access.",
    budget: {
      free: 'Window ledge view costs nothing if you order one chai',
      mid: 'Chai + snacks ₹180',
      premium: 'Sunset dinner with folk music ₹600',
    },
    localContext: 'Locals come here when they need to feel something bigger than their day.',
  },
  {
    id: 8,
    name: 'Masala Chowk',
    type: 'Night eats',
    category: 'Food & Drinks',
    emoji: '🌮',
    tags: ['food', 'evening', 'energetic', 'cover', 'wander', 'all'],
    essence: ['loud', 'festive', 'local-crowd', 'chaotic'],
    desc: 'An open-air food court near Ram Niwas Garden that comes alive after 8pm — locals eating, families out, absolute beautiful chaos.',
    story:
      "Opened as a city initiative to organise street food into one space. It worked better than anyone expected — it's now the most visited local eating spot in Jaipur with zero tourist infrastructure. The vendors here have been making the same dishes for 20+ years, just in a new location.",
    bestTime: '8–10:30pm (peak energy, everything fresh, full crowd)',
    gettingThere:
      "Near Albert Hall Museum, Ram Niwas Garden entrance on the south side. You'll hear it before you see it — follow the lights and the smell.",
    budget: {
      free: 'Browse and snack for ₹60',
      mid: 'Full street food crawl ₹200 — try at least 4 stalls',
      premium: 'Eat everything, tip generously ₹350',
    },
    localContext: "This is where Jaipuris eat when they don't want to cook. Pure local crowd, zero tourists.",
  },
  {
    id: 9,
    name: 'Iktara Café',
    type: 'Third place',
    category: 'Slow Travel',
    emoji: '🎵',
    tags: ['slow', 'deep', 'quiet', 'offbeat', 'nocrowd', 'evening', 'daytime', 'craft'],
    essence: ['indie', 'warm', 'unhurried', 'creative'],
    desc: 'A small café tucked inside a haveli lane — books, live folk music on weekends, filter coffee, and no wifi by design.',
    story:
      "Opened by a classical musician who wanted a space where art and conversation could happen without Instagram interruptions. He removed the wifi on day 3 after opening because he didn't like what screens were doing to the room. It's been wifi-free ever since.",
    bestTime: 'Late afternoon 4–7pm or Friday evenings for live sessions — arrive early, it fills up',
    gettingThere:
      "Enter Chandpol Bazaar, take the second left after the mithai shop — look for the hand-painted wooden sign at knee height. Easy to miss. That's intentional.",
    budget: {
      free: 'Sit as long as you like — no minimum order, no time limit',
      mid: 'Filter coffee + snack ₹180',
      premium: 'Live music Friday evening ₹200 cover charge',
    },
    localContext: 'Locals come here when they need to think, or when they want to feel something.',
  },
  {
    id: 10,
    name: 'Diggi Palace Lawns',
    type: 'Hidden garden',
    category: 'Slow Travel',
    emoji: '🌿',
    tags: ['slow', 'quiet', 'daytime', 'offbeat', 'nocrowd', 'wander', 'anytime'],
    essence: ['heritage', 'restful', 'green', 'unhurried'],
    desc: 'A heritage hotel garden open for breakfast — colonial-era lawns, peacocks wandering freely, and zero tourist infrastructure.',
    story:
      'Diggi Palace has hosted the Jaipur Literature Festival since its founding. Writers, artists, and thinkers have been sitting on these lawns arguing about books for 15 years. The peacocks are completely unimpressed by all of them.',
    bestTime: '8–10am (peacocks active, breakfast served on the lawns, soft light)',
    gettingThere:
      'Shivaji Marg near Civil Lines — look for the heritage gate with the Diggi Palace sign. Walk through the gate and past the lobby to the back garden.',
    budget: {
      free: 'Garden entry free — just walk in and find a lawn chair',
      mid: 'Heritage breakfast on the lawns ₹350',
      premium: 'Full brunch with fresh juice ₹600',
    },
    localContext: "Jaipur's creative crowd comes here on Sunday mornings. It feels like a different city.",
  },
  {
    id: 11,
    name: 'Anokhi Museum of Hand Printing',
    type: 'Hidden gem',
    category: 'Arts & Craft',
    emoji: '🖨️',
    tags: ['craft', 'deep', 'daytime', 'quiet', 'offbeat', 'nocrowd', 'slow'],
    essence: ['niche', 'meditative', 'tactile', 'rare'],
    desc: 'A tiny museum inside a restored haveli dedicated entirely to the art of hand block-printing. Almost no one visits. Deeply calming.',
    story:
      'Block printing in Jaipur dates to the 12th century — each wooden block is carved by hand and can last 20 years with care. This museum holds over 500 original blocks, some from royal commissions that no longer exist anywhere else. The curator can identify the village a block came from by the carving style alone.',
    bestTime: "Weekday mornings 10am–12pm (you'll likely have the entire museum to yourself)",
    gettingThere:
      'Kheri Gate near Amber — follow the Anokhi shop sign (look for the distinctive orange branding) and go upstairs. The museum is above the retail store.',
    budget: {
      free: 'Entry free on weekdays',
      mid: 'Guided tour ₹150',
      premium: 'Block-printing workshop hands-on 2 hours ₹800',
    },
    localContext: "Even most Jaipur locals don't know this exists. That's the whole point.",
  },
  {
    id: 12,
    name: 'Johari Bazaar at Opening Time',
    type: 'Local ritual',
    category: 'Arts & Craft',
    emoji: '💎',
    tags: ['craft', 'wander', 'daytime', 'cover', 'energetic', 'photo'],
    essence: ['vivid', 'busy', 'authentic', 'sensory'],
    desc: 'The gem and jewellery market before tourists arrive — shopkeepers setting up, morning light on silver, chai wallahs doing first rounds.',
    story:
      "Jaipur cuts 80% of the world's coloured gemstones. Johari Bazaar has been the centre of this trade since the 18th century when Maharaja Sawai Jai Singh attracted gem traders from across the Mughal empire with tax incentives. The real deals between wholesale traders still happen with a handshake before 9am.",
    bestTime: '8–9:30am (setup time, soft morning light on the silver, no tourist pressure)',
    gettingThere:
      'Enter from Badi Chaupar — the bazaar starts immediately on your left. Follow the sound of shutters opening and the smell of morning chai.',
    budget: {
      free: 'Browse freely — nobody pressures early morning',
      mid: 'Silver trinket or semi-precious stone ₹200–500',
      premium: 'Certified gemstone with provenance documentation ₹2000+',
    },
    localContext: "Gem traders start deals with a handshake at 8am. It's a completely different world before tourists arrive.",
  },
]

export function getPlaceById(id) {
  return PLACES.find((p) => p.id === id)
}
