import React from 'react'

type Props = {
  img: string
  name: string
  imgSize?: number
}

const SiteItem = ({ img, name, imgSize = 16 }: Props) => {
  return (
    <div className='flex items-center gap-2'>
      <img src={img} width={imgSize} height={imgSize} />
      {name}
    </div>
  )
}

export default SiteItem