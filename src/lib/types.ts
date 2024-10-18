export type SiteItem = {
  id: string
  img: string
  name: string
  cached: number
  rules?: SiteRuleItem[]
  cachedRoutes: CachedRoute[]
}

export type CachedRoute = {
  id: string
  route: string
  title: string
  image: string
}

export type SiteRuleItem = {
  id: string
  title: string
  route: string
}