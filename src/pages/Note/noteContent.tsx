import { useEffect, useRef, useState } from "react"
import { useOutletContext } from "react-router-dom" ;
import { scale } from "../../assets/data";
import { useParams } from "react-router-dom";
import NoteNotFound from "./noteNotFound";
import { motion } from "framer-motion";
import Loading from "../../components/loading";
import useApi from "../../hooks/useApi";

import { useNavigate } from "react-router-dom";
export function NoteContent() {
  const noteContent = useRef<HTMLPreElement | null>(null)

  const [noteTitle, setNoteTitle] = useState<string>('')
  const [isTextWrap, setIsTextWrap] = useState(false)
  const [isSaved, setIsSaved] = useState<boolean>(true)
  const navigate = useNavigate();

  const { id } = useParams()

  const [toggleSidebar, setToggleSidebar]: any = useOutletContext();
  const { data, isLoading, error, call} = useApi()

  const user_id = localStorage.getItem("user_id") || ""

  useEffect(() => {
    call({
      url: `/note/${id}?user_id=${user_id}`,
      data: {},
      headers: {},
      method: 'GET'
    })
  }, [id])
  
  useEffect(() => {
    if(data?.id) {
      console.log(data);

      noteContent.current!.innerText = data.content
      setNoteTitle(
        data.title
      )
    }
  }, [data])
  

  function saveNote() {
    call({
      url: `/note/${id}?user_id=67ec40019162541abba5edd3`,
      data: {
        title: noteTitle || "",
        content: noteContent.current?.innerText || ""
      },
      headers: {},
      method: 'PUT'
    })

    setIsSaved(true)

  }
    
  if(isLoading) return <Loading />
  if(error) return <NoteNotFound />

  if(data) {    
    return (<article   
      // onBlur={() => saveNote()}  
      className={`${toggleSidebar ? "note-conte-wrapper-active": ""} note-content-wrapper`}>
          <header className="note-content-header">
            <motion.div
            variants={scale}
            animate="visible"
            initial="hidden"
            className="title-wrapper">
              <span 
              onClick={() => {
                setToggleSidebar((toggleSidebar: boolean) => !toggleSidebar)
              }}
              className="sidebar-toggle">
                {!toggleSidebar ? 
                  <svg width="25" height="25" className="svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_111_6)">
                    <path d="M9 18L15 12L9 6V18Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_111_6">
                    <rect width="25" height="25" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>:
                <svg width="24" height="24" className="svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_111_5)">
                  <path d="M15 6L9 12L15 18L15 6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_111_5">
                  <rect width="24" height="24" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                  }
              </span>

              <input 
              className="note-title"
              value={noteTitle}
              onChange={(e) => {
                setIsSaved(false)
                setNoteTitle(e.target.value);
              }}
            ></input>
            </motion.div>
    
            <div className="header-options">  
                {
                  isTextWrap ? <svg onClick={() => setIsTextWrap(false)} className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_7_14260)">
                    <path d="M4 6H14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 18H14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 12H21L18 9M18 15L21 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_7_14260">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                  :
                  <svg onClick={() => setIsTextWrap(true)} className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_7_16520)">
                      <path d="M4 6H20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 18H9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 12H17C17.7956 12 18.5587 12.3161 19.1213 12.8787C19.6839 13.4413 20 14.2044 20 15C20 15.7956 19.6839 16.5587 19.1213 17.1213C18.5587 17.6839 17.7956 18 17 18H13L15 16M15 20L13 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_7_16520">
                      <rect width="24" height="24" fill="white"/>
                      </clipPath>
                      </defs>
                  </svg>
                }
            </div>
          </header>
    
          <motion.pre
          variants={scale}
          animate="visible"
          initial="hidden"
            ref={noteContent}
            
            onKeyDown={(e) => {
              setIsSaved(false)
              if(e.ctrlKey && e.key.toLowerCase() === 's') {
                saveNote()
              }
            }}
            className={`${isTextWrap ? 'note-content-wrap' : ''}`}
            id="note-content" 
            
            contentEditable={true}
          >
            {}
          </motion.pre>
          
          <div 
          className={`save-alert ${!isSaved ? 'save-alert-active': ''}`}
          onClick={() => {
            saveNote()
          }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_59_72)">
                <path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 15L11 17L15 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_59_72">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
      </article>)
  }

  return <NoteNotFound />
}