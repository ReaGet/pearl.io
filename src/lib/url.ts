import { parsePath, parseURL, withHttps, withProtocol } from "ufo"

export const parseURLWithProtocol = (url: string) => {
  const _url = withHttps(url||'')
  const { host = '' } = parseURL(_url)
  const pathname = parsePath(_url).pathname

  return {
    host,
    origin: withHttps(host),
    pathname,
  }
}