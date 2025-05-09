import { useEffect, useRef } from "react"
import useApi from "../hooks/useApi"
import Loading from "./loading"

import { useNavigate } from "react-router"

export default function Context(props: {
    contextData: ContextDataType,
    setIsContextOpen: (args0: boolean) => void,
    isContextOpen: boolean
}) {
    const navigate = useNavigate();
    const contextMenu = useRef(null)
    const { contextData, setIsContextOpen, isContextOpen } = props
    const { data, isLoading, error, call} = useApi()

    const user_id = localStorage.getItem("user_id") || ""
    
    function removeNote() {
        const id = props.contextData.note_id || "";

        call({
            url: `/note/${id}?user_id=${user_id}`,
            data: {},
            headers: {},
            method: 'DELETE'
          })
          
    }
    
    useEffect(() => {
      if(data === "Note deleted") {
        setIsContextOpen(false)
        navigate("/")
      }
    }, [data])
    
    return(     
        <ul 
            ref={contextMenu}
            className={`${isContextOpen ? 'context-menu-open': ''} context-menu `}
            style={{
                top: contextData.top + 'px',
                left: contextData.left + contextData.noteWidth + 8 + 'px'
            }}>
            {isLoading ? <Loading /> : null}
            
            {
                error ? 
                <li
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
            Error occured</li>
                : 
                <li onClick={(e) => {
                    removeNote()
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
            }

            <li className="context-menu-item" 
                onClick={() => {    
                    setIsContextOpen(false)
                }}    
            >Close</li>
        </ul>
   )
}
