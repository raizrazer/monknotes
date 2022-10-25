import React from 'react'

const DarkModeSelector = ({switchTheme}) => {
  return (
    <div onClick={()=>{switchTheme()}} className='darkmode-switcher z-50 rounded-full transition-[width] w-20 hover:w-36 aspect-square bg-brand-main-color-dark absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-pointer'></div>
  )
}

export default DarkModeSelector