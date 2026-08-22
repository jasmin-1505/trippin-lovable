import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import PhoneFrame from './components/PhoneFrame'
import BottomTabBar from './components/BottomTabBar'
import ScreenTransition from './components/ScreenTransition'
import OfflineBanner from './components/OfflineBanner'
import OfflineFullScreen from './components/OfflineFullScreen'

import Splash from './screens/Splash'
import DataConsent from './screens/DataConsent'
import ProfileSetup from './screens/ProfileSetup'
import CityEntry from './screens/CityEntry'
import CitySnapshot from './screens/CitySnapshot'
import CityOverview from './screens/CityOverview'
import DrillDown from './screens/DrillDown'
import BudgetFilter from './screens/BudgetFilter'
import TrailLoading from './screens/TrailLoading'
import TrailScreen from './screens/TrailScreen'
import PlaceCard from './screens/PlaceCard'
import FunCorner from './screens/FunCorner'
import SaveConfirmation from './screens/SaveConfirmation'
import SavedTab from './screens/SavedTab'

import { PLACES, getPlaceById } from './data/places'
import { getTrail, getFunCorner } from './lib/matchingEngine'
import { storage } from './lib/storage'
import { queueRatingForSync } from './lib/backgroundSync'

const TAB_BAR_SCREENS = new Set(['trail', 'place', 'funcorner', 'saved'])

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [direction, setDirection] = useState('forward')
  const [placeOrigin, setPlaceOrigin] = useState('trail') // where PlaceCard was opened from

  const [profile, setProfile] = useState(() => storage.getProfile())
  const [consent, setConsent] = useState(() => storage.getConsent())
  const [answers, setAnswers] = useState({})
  const [budget, setBudget] = useState(null)
  const [trail, setTrail] = useState([])
  const [funCorner, setFunCorner] = useState([])
  const [activePlaceId, setActivePlaceId] = useState(null)
  const [ratings, setRatings] = useState(() => storage.getRatings())
  const [savedTrail, setSavedTrail] = useState(() => storage.getSavedTrail())
  const [toast, setToast] = useState(null)
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const go = (next, dir = 'forward') => {
    setDirection(dir)
    setScreen(next)
  }

  // ---- Splash / consent / profile ----
  const handleSplashContinue = () => go('consent')

  const handleConsentContinue = (c) => {
    setConsent(c)
    storage.setConsent(c)
    go('profile')
  }

  const handleProfileContinue = (p) => {
    setProfile(p)
    storage.setProfile(p)
    if (trail.length > 0) {
      go('trail', 'back')
    } else {
      go('cityEntry')
    }
  }

  const handleProfileSkip = () => go('cityEntry')

  // ---- City flow ----
  const handleExploreJaipur = () => go('citySnapshot')
  const handleCityToast = (msg) => setToast(msg)

  const handleSnapshotContinue = () => go('cityOverview')
  const handleOverviewContinue = () => go('drilldown')

  const handleDrilldownComplete = (finalAnswers) => {
    setAnswers(finalAnswers)
    go('budget')
  }

  const handleBudgetGenerate = (budgetId) => {
    setBudget(budgetId)
    go('trailLoading')
  }

  const handleTrailReady = () => {
    const generated = getTrail(answers, budget, PLACES)
    setTrail(generated)
    const traits = [answers.q1, answers.q2, answers.q3, answers.q4]
    setFunCorner(getFunCorner(generated, PLACES, traits))
    go('trail')
  }

  // ---- Trail / place / fun corner ----
  const handleOpenPlace = (placeId, from) => {
    setActivePlaceId(placeId)
    setPlaceOrigin(from)
    go('place')
  }

  const handleBackFromPlace = () => go(placeOrigin === 'funcorner' ? 'funcorner' : 'trail', 'back')

  const handleShowFunCorner = () => go('funcorner')
  const handleBackFromFunCorner = () => go('trail', 'back')

  const handleShuffleFunCorner = () => {
    const traits = [answers.q1, answers.q2, answers.q3, answers.q4]
    setFunCorner(getFunCorner(trail, PLACES, traits))
  }

  const handleRate = (placeId, rating) => {
    const next = { ...ratings, [placeId]: { rating, skipped: false } }
    setRatings(next)
    storage.setRatings(next)
    if (!navigator.onLine) queueRatingForSync(placeId, rating)
  }

  const handleSkipRating = (placeId) => {
    const next = { ...ratings, [placeId]: { rating: null, skipped: true } }
    setRatings(next)
    storage.setRatings(next)
  }

  const handleSaveTrail = () => {
    const record = {
      city: 'Jaipur',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      budget,
      answers,
      places: trail,
    }
    setSavedTrail(record)
    storage.setSavedTrail(record)
    go('saveConfirmation')
  }

  const handleBackFromConfirmation = () => go('trail', 'back')

  // ---- Bottom tabs ----
  const activeTab = screen === 'saved' ? 'saved' : screen === 'profile' ? 'profile' : 'discover'

  const handleTabChange = (tab) => {
    if (tab === 'saved') {
      go('saved')
    } else if (tab === 'profile') {
      go('profile')
    } else if (tab === 'discover') {
      go(trail.length > 0 ? 'trail' : 'cityEntry')
    }
  }

  const handleOpenSavedTrail = () => {
    if (!savedTrail) return
    setTrail(savedTrail.places)
    setAnswers(savedTrail.answers)
    setBudget(savedTrail.budget)
    go('trail')
  }

  const activePlace = useMemo(() => (activePlaceId ? getPlaceById(activePlaceId) : null), [activePlaceId])
  const showTabBar = TAB_BAR_SCREENS.has(screen)
  const hasSavedTrail = Boolean(savedTrail)

  if (!online && !hasSavedTrail && screen === 'splash' && !consent) {
    return (
      <PhoneFrame>
        <OfflineFullScreen onRetry={() => window.location.reload()} />
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame>
      <div className="h-full w-full flex flex-col relative">
        <OfflineBanner hasSavedTrail={hasSavedTrail} />

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <ScreenTransition screenKey={screen} direction={direction}>
              {screen === 'splash' && <Splash onContinue={handleSplashContinue} />}
              {screen === 'consent' && <DataConsent onContinue={handleConsentContinue} />}
              {screen === 'profile' && (
                <ProfileSetup
                  initialProfile={profile}
                  onContinue={handleProfileContinue}
                  onSkip={handleProfileSkip}
                />
              )}
              {screen === 'cityEntry' && (
                <CityEntry name={profile?.name} onExplore={handleExploreJaipur} onToast={handleCityToast} />
              )}
              {screen === 'citySnapshot' && <CitySnapshot onContinue={handleSnapshotContinue} />}
              {screen === 'cityOverview' && <CityOverview onContinue={handleOverviewContinue} />}
              {screen === 'drilldown' && <DrillDown onComplete={handleDrilldownComplete} />}
              {screen === 'budget' && <BudgetFilter onGenerate={handleBudgetGenerate} />}
              {screen === 'trailLoading' && <TrailLoading city="Jaipur" onDone={handleTrailReady} />}
              {screen === 'trail' && (
                <TrailScreen
                  trail={trail}
                  answers={answers}
                  budget={budget}
                  onOpenPlace={handleOpenPlace}
                  onShowFunCorner={handleShowFunCorner}
                  onSave={handleSaveTrail}
                />
              )}
              {screen === 'place' && activePlace && (
                <PlaceCard
                  place={activePlace}
                  selectedBudget={budget}
                  previousRating={ratings[activePlace.id]}
                  onBack={handleBackFromPlace}
                  onRate={handleRate}
                  onSkipRating={handleSkipRating}
                />
              )}
              {screen === 'funcorner' && (
                <FunCorner
                  picks={funCorner}
                  onShuffle={handleShuffleFunCorner}
                  onOpenPlace={handleOpenPlace}
                  onBack={handleBackFromFunCorner}
                />
              )}
              {screen === 'saveConfirmation' && (
                <SaveConfirmation city="Jaipur" onBack={handleBackFromConfirmation} />
              )}
              {screen === 'saved' && <SavedTab savedTrail={savedTrail} onOpenTrail={handleOpenSavedTrail} />}
            </ScreenTransition>
          </AnimatePresence>
        </div>

        {showTabBar && <BottomTabBar active={activeTab} onChange={handleTabChange} />}

        {toast && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-terracotta-dark text-cream text-[12.5px] font-sans px-4 py-2.5 rounded-full shadow-lg z-40 whitespace-nowrap">
            {toast}
          </div>
        )}
      </div>
    </PhoneFrame>
  )
}
