/**
 * Making the fetch request to the URL_API
 */


const URL_API = "https://cfw-takehome.developers.workers.dev/api/variants"
const COOKIE_NAME = "URL" 

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}



/**
 * From the request it gets the name of the cookie.
 * @param {Request} request 
 * @param {string} name 
 */
function getCookie(request, name) {
    let result = null
    let cookieString = request.headers.get("Cookie")
    if (cookieString) {
      let cookies = cookieString.split(";")
      cookies.forEach((cookie) => {
        let cookieName = cookie.split("=")[0].trim()
        if (cookieName === name) {
          let cookieVal = cookie.split("=")[1]
          result = cookieVal
        }
      })
    }
    return result
  }