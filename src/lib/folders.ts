import { rmdir, mkdir, readdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

export const __dirname = process.cwd()

export const imageSavingPath = (projectId: string) => `${process.env.NEXT_PUBLIC_SCREENSHOTS_PATH}/${projectId}`

export const createFolder = async (dir: string) => {
  const path = join(__dirname, dir)
  try {
    if (existsSync(path)) {
      return console.log(`${path}: already exists`)
    }
  
    await mkdir(path, {
      recursive: true
    })
  } catch(e) {
    console.log(`Failed to create folder (${path}): `, e)
  }
}

export const removeFolder = async (dir: string) => {
  const path = join(__dirname, dir)
  try {
    if (!existsSync(path)) {
      return console.log(`${path}: doesn't exist`)
    }

    await readdir(path).then(async (files) => {
      await Promise.all(files.map(f => unlink(`${path}/${f}`)))
    })
  
    await rmdir(path, {
      maxRetries: 2
    })
  } catch(e) {
    console.log(`Failed to remove folder (${path}): `, e)
  }
}

export const removeFile = async (dir: string, filename: string) => {
  const path = join(__dirname, dir)
  try {
    if (!existsSync(path)) {
      return console.log(`${path}: doesn't exist`)
    }

    await readdir(path).then(async (files) => {
      const file = files.find((f) => f === filename)
      if (file) unlink(`${path}/${file}`)
    })
  } catch(e) {
    console.log(`Failed to remove file (${path}) (${filename}): `, e)
  }
}