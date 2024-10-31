'use client'
import React, { useState } from 'react'
import { Image } from 'lucide-react'

type Props = {
  img: string|null
  name: string|null
  imgSize?: number
}

const SiteItem = ({ img, name, imgSize = 16 }: Props) => {
  const [ hasImage, setHasImage ] = useState(!!img)
  
  return (
    <div className='flex items-center gap-2'>
      { hasImage ? (
        <img src={img!} width={imgSize} height={imgSize} onError={() => setHasImage(false)}/>
      ) : (
        <Image size='18' className='text-[#dbdbdb]' />
      )}
      {name}
    </div>
  )
}

export default SiteItem