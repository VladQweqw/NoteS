import { useRef } from "react"

const COLORS = [
    "#FFFFFF",
    '#e02828',
    '#3f7fd9',
    '#d9d63f',
    '#8728e0',
    '#d728e0',
    '#28e034'
]

export default function ColorContext(data) {
    const contextMenu = useRef(null)
    const { isColorContextOpen, setIsColorContextOpen, colorContextData, setColorContextSelect } = data
   
    return(     
        <ul 
            ref={contextMenu}
            className={`${isColorContextOpen ? 'color-context-menu-open': ''} color-context-menu `}
            style={{
                top: colorContextData.top - colorContextData.textHeight - 16 + 'px',
                left: colorContextData.left + 'px'
            }}>
            {COLORS.map((colorHEX, index) => {
                return <li
                onClick={() => {
                    setColorContextSelect(colorHEX)
                    setIsColorContextOpen(false)
                }}
                className="color-context-item" 
                key={index} 
                style={{backgroundColor: colorHEX}}></li>
            })}
            
        </ul>
   )
}
