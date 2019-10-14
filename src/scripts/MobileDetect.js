// This script detects if the user is using a mobile device
export function isMobile() {
  return window.innerHeight > window.innerWidth && isTouchscreen();
}

export function isTouchscreen() {
  return (
    "ontouchstart" in window ||
    navigator.MaxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
