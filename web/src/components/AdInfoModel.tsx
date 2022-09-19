import React from 'react'

interface AdInfo {
    title: string,
    subtitle: string,
    customColor?: string,
}

const AdInfoModel = (props: AdInfo) => {
  return (
    <div className='flex flex-col'>
        <span className="text-[#C4C4C6]">{props.title}</span>
        <span className={`font-bold ${
            props.customColor ? props.customColor : "text-white"
        }`}>{props.subtitle}</span>
    </div>
  )
}

export default AdInfoModel