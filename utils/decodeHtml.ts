export const decodeHtml = (html: string): string => {
  const text = document.createElement('textarea')
  text.innerHTML = html
  return text.value
}
