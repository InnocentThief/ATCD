import queryString from 'query-string'

export const createQueryWritter =
  (queryName: string, getter: () => string | undefined) => () => {
    const query = queryString.parse(window.location.search)
    query[queryName] = getter() ?? null
    if (!query[queryName]) {
      delete query[queryName]
    }
    let path = window.location.href.split('?')[0]
    const url = `${path}?${queryString.stringify(query)}`
    window.history.replaceState(null, '', url)
  }
