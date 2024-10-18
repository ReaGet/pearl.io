import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { v4 as uuid4 } from 'uuid'
 
export async function GET() {
  const browser = await puppeteer.launch()
  const imageName = uuid4()
  try {
    const page = await browser.newPage();
    await page.goto("https://avtoalfa.com");
    await page.screenshot({ path: `public/${imageName}.png` });
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
  }
  return NextResponse.json({
    hello: `/${imageName}.png`
  })
}