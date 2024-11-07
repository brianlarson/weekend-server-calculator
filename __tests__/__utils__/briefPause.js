// Helper function to ensure our tests aren't failing because
// of race conditions. @testing-library/dom has groovy method
// called #waitFor, but it doesn't play nice with the manual
// way that seems to work best with using @testing-library goodies
// with Vanilla JS:
function briefPause(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

module.exports = briefPause
