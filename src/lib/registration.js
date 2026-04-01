const STORAGE_KEY = 'sshge_registrations'

export function getRegistrations() {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    return []
  }

  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function saveRegistrations(registrations) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations))
}

export function generateRegistrationNumber(phoneNumber, registrations) {
  const digits = phoneNumber.replace(/\D/g, '')
  const lastFourDigits = digits.slice(-4).padStart(4, '0')
  const similarNumbers = registrations.filter((item) =>
    item.registrationNumber.startsWith(lastFourDigits),
  ).length

  return similarNumbers === 0
    ? lastFourDigits
    : `${lastFourDigits}-${String(similarNumbers + 1).padStart(2, '0')}`
}
