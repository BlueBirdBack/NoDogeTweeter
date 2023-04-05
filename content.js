// Define the logo selector and the URL of the original Twitter logo.
const logoSelector = 'header h1[role="heading"] svg'
const originalTwitterLogo =
  'https://abs.twimg.com/icons/apple-touch-icon-192x192.png'

// Initialize a flag to indicate whether the logo has been replaced.
let logoReplaced = false

// Function to replace the Doge logo with the original Twitter logo.
const replaceLogo = () => {
  // If the logo has already been replaced, return.
  if (logoReplaced) return

  // Find the logo element using the defined selector.
  const logoElement = document.querySelector(logoSelector)
  if (!logoElement) return

  // Get the parent element of the logo.
  const logoElementWrapper = logoElement.parentNode

  // Create a new image element to replace the original logo.
  const imgElement = document.createElement('img')
  if (logoElementWrapper && imgElement) {
    // Set the source and size of the new image element.
    imgElement.src = originalTwitterLogo
    imgElement.style.width = '2rem' // Adjust the size as needed.
    imgElement.style.height = '2rem' // Adjust the size as needed.

    // Add the new image element to the parent element and remove the original logo.
    logoElementWrapper.appendChild(imgElement)
    logoElement.remove() // Remove the original SVG logo.
    logoReplaced = true
  }
}

// Create a MutationObserver to watch for changes in the DOM.
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // If new nodes are added to the DOM, attempt to replace the logo.
    if (mutation.type === 'childList' && mutation.addedNodes.length) {
      replaceLogo()
    }
  }
})

// Start observing the document body for changes in the DOM.
observer.observe(document.body, { childList: true, subtree: true })

// Replace the logo once the DOM content is loaded.
document.addEventListener('DOMContentLoaded', replaceLogo)
