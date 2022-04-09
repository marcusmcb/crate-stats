const parseDisplayName = (url) => {
  let parts = url.split('/')
  let userString = parts[4]
  let userName = userString.replaceAll('_', ' ')
  return userName
}

module.exports = parseDisplayName
