export function isMobile() {
  return window.innerHeight > window.innerWidth && navigator.maxTouchPoints > 0
}

export function isTouchscreen() {
  return navigator.maxTouchPoints > 0
}
