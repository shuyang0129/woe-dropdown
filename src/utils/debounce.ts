export function debounce<Params extends any[]>(cb: (...args: Params) => any, time = 100) {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Params) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => cb(...args), time)
  }
}
