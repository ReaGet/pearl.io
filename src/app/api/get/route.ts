import puppeteer from 'puppeteer'
import { v4 as uuid4 } from 'uuid'
 
const imgName = "test"

export const GET = async () => {
  const browser = await puppeteer.launch()
  const imageName = imgName || uuid4()
  try {
    const page = await browser.newPage();
    await page.goto("https://avtoalfa.com");
    await page.screenshot({ path: `public/${imageName}.png` });
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();

    const res = await fetch("http://localhost:3000/${imageName}.png");
  
    const blob = await res.blob();
  
    const headers = new Headers();
  
    headers.set("Content-Type", "image/*");
  }
  return new Response(`/${imageName}.png`, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg'
    }
    bo
  })
}