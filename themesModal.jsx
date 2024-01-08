import React, { useState } from 'react'
import ModalWrapper from './modalWrapper'
import { themeHandler } from '../assets/functions'
import { THEMES } from '../assets/data'

export default function ThemesModal(data) {
  const [activeIndex, setActiveIndex] = useState(parseInt(localStorage.getItem('themeIndex')) || 0)

   return(
    <ModalWrapper setIsThemesModalOpen={data.setIsThemesModalOpen}>
        <div className="themes-modal">
            <header className="themes-title">
                <h3>Themes</h3>
            </header>
            <div className="themes-wrapper">
                {THEMES.map((theme, index) => {
                    return <Theme 
                    isActive={index === activeIndex} 
                    {...theme} 
                    key={index} 
                    setActiveIndex={setActiveIndex}
                    index={index}
                     />
                })}
            </div>
        </div>
    </ModalWrapper>
   )
}

function Theme(data) {
    return <div className={`${data.isActive && 'theme-active'}  theme`}>
        <label className="switch">
            <input
             checked={data.isActive} 
             type="checkbox"
             onChange={(e) => {
                data.setActiveIndex(data.index)

                themeHandler(data.palette, data.index)
             }}
             />
            <span className="slider"></span>
        </label>
        <p className={`${data.isActive && 'theme-name-active'}  theme-name`}>{data.name}</p>

        <div className="color-palette">
            {Object?.entries?.(data.palette)?.map((palette, index) => {
                return <span 
                    className="color" 
                    key={index}
                    style={{
                        backgroundColor: palette[1]
                }}></span>
            })}
        </div>
    </div>
}