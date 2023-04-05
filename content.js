const logoSelector = 'header h1[role="heading"] svg'
const originalTwitterLogo =
  'https://abs.twimg.com/icons/apple-touch-icon-192x192.png'

let logoReplaced = false

const replaceLogo = () => {
  if (logoReplaced) return

  const logoElement = document.querySelector(logoSelector)
  if (!logoElement) return

  const logoElementWrapper = logoElement.parentNode

  const imgElement = document.createElement('img')
  if (logoElementWrapper && imgElement) {
    imgElement.src = originalTwitterLogo
    imgElement.style.width = '2rem' // Adjust the size as needed.
    imgElement.style.height = '2rem' // Adjust the size as needed.
    logoElementWrapper.appendChild(imgElement)
    logoElement.remove() // Remove the original SVG logo.
    logoReplaced = true
  }
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList' && mutation.addedNodes.length) {
      replaceLogo()
    }
  }
})

observer.observe(document.body, { childList: true, subtree: true })

document.addEventListener('DOMContentLoaded', replaceLogo)
