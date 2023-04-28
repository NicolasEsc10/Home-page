/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"L96FjofvlB2vXVVD","label":"Reddit","bookmarks":[{"id":"hxNmOqUMdB4uXQK7","label":"r/homepages","url":"https://www.reddit.com/"},{"id":"6FES4GL3pkZyFQsw","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"CIbLklQnTugn2fUq","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"}]},{"id":"yzITcPPdUQirYgA7","label":"Discord","bookmarks":[{"id":"JVfn7zekdoG22PzV","label":"discord forever","url":"https://discord.com/channels/831083226319552542/915439452585881610"},{"id":"FlRiPXMfHlUV3lWQ","label":"dincy","url":"https://discord.com/channels/770339254101344256/968872575637794817"},{"id":"3eFc34zacW5bbDiD","label":"frontend Coffe","url":"https://discord.com/channels/594363964499165194/881903930085343293"},{"id":"G9HKZnUtVm0KbjRQ","label":"programadores","url":"https://discord.com/channels/768278151435386900/845314420494434355"}]},{"id":"epgDewhpJRsAACio","label":"worth reading","bookmarks":[{"id":"wtgV3JMc0PntcMLk","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"nLTXm9Wyv2DbgW91","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"ItcQCg9mKutzQ9bG","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"SoPwaKYI2zB4jL7R","label":"sources","bookmarks":[{"id":"VCgWYsv49sjsWV9V","label":"icons","url":"https://feathericons.com/"},{"id":"nVRaQHZHB3vbViXv","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"jBmxur0OSE4OAAYZ","label":"twitter","url":"https://twitter.com/home"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
