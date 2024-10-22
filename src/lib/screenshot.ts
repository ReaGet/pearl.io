import puppeteer from 'puppeteer'
import { v4 as uuid4 } from 'uuid'

const delayFn = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(() => resolve(), ms)
})


export const screenshotViewport = async (url: string, delay: number = 0): Promise<Blob> => {
  const browser = await puppeteer.launch()
  const imageName = uuid4()
  try {
    const page = await browser.newPage()

    await page.setViewport({
      width: 1500, // default: 800
      height: 1000, // default: 600
      deviceScaleFactor: 1, // default: 1
    })

    await page.goto(url)

    await delayFn(delay)

    await page.screenshot({ path: `public/${imageName}.jpg`, quality: 100 })   

  } catch (e) {
    console.log(e)
  } finally {
    await browser.close()

  }

  const res = await fetch(`http://localhost:3000/${imageName}.jpg`)
  return await res.blob()
}