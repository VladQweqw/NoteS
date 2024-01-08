import { useRef } from "react"

export default function Context(data) {
    const contextMenu = useRef(null)
    const { removeNote, contextData, setIsContextOpen, isContextOpen } = data



    return(     
        <ul 
            ref={contextMenu}
            className={`${isContextOpen ? 'context-menu-open': ''} context-menu `}
            style={{
                top: contextData.top + 'px',
                left: contextData.left + contextData.noteWidth + 8 + 'px'
            }}>
            <li
                onClick={(e) => {
                    removeNote(contextData.file_path)
                    setIsContextOpen(false)
                }}
                className="context-menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" className="svg delete-svg" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_7_15846)">
                    <path d="M4 7H20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 11V17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 11V17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_7_15846">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            Delete</li>
            
            <li 
            className="context-menu-item"
            onClick={() => {
                navigator.clipboard.writeText(contextData.file_path)
                setIsContextOpen(false)

            }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="svg copy-path-svg" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_7_16516)">
                    <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 3H11C9.89543 3 9 3.89543 9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5C15 3.89543 14.1046 3 13 3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_7_16516">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                Copy path
            </li>

            <li 
                className="context-menu-item" 
                onClick={() => {    
                    setIsContextOpen(false)
                }}    
            >Close</li>
        </ul>
   )
}
