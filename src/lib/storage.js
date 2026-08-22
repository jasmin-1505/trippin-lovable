const KEYS = {
  consent: 'trippin_consent',
  profile: 'trippin_profile',
  savedTrail: 'trippin_saved_trail',
  ratings: 'trippin_ratings',
  installDismissed: 'trippin_install_dismissed',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable — fail silently, in-memory state still works
  }
}

export const storage = {
  getConsent: () => read(KEYS.consent, null),
  setConsent: (v) => write(KEYS.consent, v),

  getProfile: () => read(KEYS.profile, null),
  setProfile: (v) => write(KEYS.profile, v),

  getSavedTrail: () => read(KEYS.savedTrail, null),
  setSavedTrail: (v) => write(KEYS.savedTrail, v),

  getRatings: () => read(KEYS.ratings, {}),
  setRatings: (v) => write(KEYS.ratings, v),

  getInstallDismissed: () => read(KEYS.installDismissed, false),
  setInstallDismissed: (v) => write(KEYS.installDismissed, v),
}
