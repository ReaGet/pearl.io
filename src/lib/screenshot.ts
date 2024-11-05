'use server'
import chromium from '@sparticuz/chromium-min'
import puppeteer, { Page } from 'puppeteer-core'
import { v4 as uuid4 } from 'uuid'
import { imageSavingPath } from './folders'

const delayFn = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(() => resolve(), ms)
})

export const screenshotViewport = async (url: string, projectId: string, delay: number = 0): Promise<string | null> => {
  const imageName = uuid4()
  try {
    await getPuppeteerPage(url, async (page) => {
      await delayFn(delay)
      await page.screenshot({ path: `public/${imageSavingPath(projectId)}/${imageName}.jpg`, quality: 100 })   
    })
  } catch (e) {
    console.log('[screenshotViewport]:', e)
  }

  return imageName
}

export const screenshotViewportBlob = async (url: string, delay: number = 0): Promise<Uint8Array | null> => {
  try {
    return await getPuppeteerPage(url, async (page) => {
      await delayFn(delay)
      return await page.screenshot({ quality: 100, type: 'jpeg' })   
    })
  } catch (e) {
    console.log('[screenshotViewportBlob]:', e)
  }
  return null
}

type GetPuppeteerPageParam = (page: Page) => Promise<any>

export const getPuppeteerPage = async (url: string, callback: GetPuppeteerPageParam) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  })
  try {
    const page = await browser.newPage()

    await page.setViewport({
      width: 1500, // default: 800
      height: 1000, // default: 600
      deviceScaleFactor: 1, // default: 1
    })

    await page.goto(url)

    return await callback(page)
  } catch(e) {
    console.log('[getPuppeteerPage]:', e)
  } finally {
    await browser.close()
  }
}