import type { SiteItem } from "./types"

export const sites: SiteItem[] = [
  {
    id: "123",
    img: "/images/avtoalfa.svg",
    name: "avtoalfa.com",
    cached: 122,
    rules: [
      {
        id: '1',
        title: 'АВТОАЛЬФА официальный сайт Набережные Челны | Интернет-магазин автозапчастей',
        route: '/',
      },
      {
        id: '2',
        title: 'Каталог',
        route: '/catalog/',
      }
    ],
    cachedRoutes: [
      {
        id: '1',
        title: 'АВТОАЛЬФА официальный сайт Набережные Челны | Интернет-магазин автозапчастей',
        route: '/',
        image: '',
      },
      {
        id: '2',
        title: 'Каталог',
        route: '/catalog/',
        image: '',
      }
    ],
  },
  {
    id: "4324",
    img: "/images/steners.ico",
    name: "steners.com",
    cached: 37,
    rules: [],
    cachedRoutes: [],
  },
]

export const DASHBOARD = '/dashboard'