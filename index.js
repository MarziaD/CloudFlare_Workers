/**
 * Making the fetch request to the URL_API
 */


const URL_API = "https://cfw-takehome.developers.workers.dev/api/variants"
const COOKIE_NAME = "URL" 

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const cookie = getCookie(request, COOKIE_NAME)
  if (cookie) return fetchWebPage(cookie)

  return fetchWebPage()
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

/**
 * Fetches a random web page from the urls listed in URL_API
 * @param {Null | string} cookie
 */

async function fetchWebPage(cookie = null) {
  const url = cookie ? cookie : await fetchURL()
  const res = await fetch(url)

  const titleHandler = new TitleHandler()
  const descriptionHandler = new DescriptionHandler()
  const ctaHandler = new CTAHandler()

  const response = new HTMLRewriter()
    .on("title", titleHandler)
    .on("h1#title", titleHandler)
    .on("p#description", descriptionHandler)
    .on("a#url", ctaHandler)
    .transform(res)

  if (!cookie) {
    response.headers.set("Set-Cookie", `${COOKIE_NAME}=${url}`)
  }

  return response
}

/**
 * Fetches a random url from URL_API (https://cfw-takehome.developers.workers.dev/api/variants)
 */
async function fetchURL() {
  const res = await fetch(URL_API)
  const data = await res.json()
  const urls = data.variants
  const randomIndex = Math.round(Math.random())

  return urls[randomIndex]
}

/**
 * customises the title of the webpage.
 */
class TitleHandler {
  element(element) {
    element.prepend("Welcome! You are seeing")
  }
}


/**
 * customises the description.
 */


class DescriptionHandler {
  element(element) {
    element.append("It was created by Marzia Deodato. Check my work below!")
  }
}

/**
 * call to action
 */

class CTAHandler {
  element(element) {
    element.setAttribute("href", "https://github.com/MarziaD")
    element.setInnerContent("Visit my github")
  }
}


