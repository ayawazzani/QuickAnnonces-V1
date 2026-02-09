const STORAGE_KEY = 'qa_react_state'

export const loadState = () => {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : undefined
  } catch (e) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    // ignore
  }
}
