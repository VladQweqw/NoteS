import { useEffect, useRef, useState } from "react"
import { useOutletContext } from "react-router-dom" ;
import { COLORS, scale } from "../assets/data"
import { useParams } from "react-router-dom";
import NoteNotFound from "./noteNotFound";
import { callApi } from "../hooks/apis";
import { motion } from "framer-motion";
import Loading from "./loading";
import { Fonts } from "../assets/data";

export function NoteContent() {
  const noteContent = useRef<HTMLDivElement | null>(null)

  const [note, setNote] = useState<NoteType | null>(null)
  const [noteTitle, setNoteTitle] = useState<string>('')
  const [isTextWrap, setIsTextWrap] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [colorsIndex, setColorsIndex] = useState(0)
  const [fontIndex, setFontIndex] = useState<number>(0)
  const [isSaved, setIsSaved] = useState(true)
  
  const { id } = useParams()

  const [getNotes, toggleSidebar, setToggleSidebar]: any = useOutletContext();
  
  function getNoteContent() {
    callApi({
      method: "POST",
      url: `notes/${id}/`,
      headers: {},
      data: {
        'user': localStorage.getItem('user_id'),
      }
    }).then((data) => {
      if(data.title) {
        setNote(data)
        setNoteTitle(data.title)
      }else {
        console.log(`Error: ${data}`);
        setIsError(true)
      }
    
    })
    .catch((err) => {     
      console.log(`Error: ${err}`);
       
      setIsError(true)
    })
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setIsLoading(true)
    getNoteContent()
    
  }, [id])

  function saveNote() {    
    callApi({
      method: 'PUT',
      headers: {},
      data: {
        "user": localStorage.getItem('user_id'),
        "title": noteTitle,
        "content": noteContent.current!.innerHTML,
        "lastUpdate": new Date().getTime()
      },
      url: `notes/update/${id}/`
    }).then((data) => {
      console.log(data);
      
      if(data) {
        getNotes()
        setIsSaved(true)
      }
    })
  }

  if(isLoading) return <Loading />
  if(isError) return <NoteNotFound />
  if(note) {    
    return (<article   
      onBlur={() => saveNote()}  
      className={`${toggleSidebar ? "note-content-wrapper-active": ""} note-content-wrapper`}>
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
                <div className="font-options-wrapper">
                  <div
                  id="font-options">
                      {Fonts.map((font: fontType, index: number) => {
                        return <span 
                        className="font-option" 
                        key={index}
                        onClick={(e) => {
                          document.querySelectorAll('.font-option').forEach((item) => item.classList.remove('font-option-active'));

                          if(fontIndex === index) {
                            setFontIndex(0);

                          }else {
                            setFontIndex(index);
                            (e.target as HTMLSpanElement).classList.add('font-option-active');
                          }
                          
                        }}
                        >{font.name}</span>
                      })}
                  </div>
                </div>

                <div className="text-colors">
                  {COLORS.map((color, index) => {
                    return <span 
                    className={` ${colorsIndex === index ? 'color-item-active': ''} color-item`}
                    style={{backgroundColor: color}} 
                    key={index} 
                    
                    onClick={(e) => {
                      setColorsIndex(index)
                    }}
                    ></span>
                  })}
                </div>
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

                <span 
                className='refresh-svg'
                onClick={(e) => {
                  (e.target as HTMLSpanElement).style.animation = `rotate 300ms ease-in-out backwards`
                  setTimeout(() => {
                    (e.target as HTMLSpanElement).style.animation = ``
                    getNoteContent()
                  }, 300);

                }}>
                    <svg
                    className='svg' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_121_14137)">
                    <path d="M20 11.0002C19.7554 9.24041 18.9391 7.60985 17.6766 6.35969C16.4142 5.10953 14.7758 4.30911 13.0137 4.08175C11.2516 3.85438 9.46362 4.21268 7.9252 5.10144C6.38678 5.9902 5.18325 7.36013 4.5 9.00019M4 5.00019V9.00019H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 13C4.24456 14.7598 5.06093 16.3903 6.32336 17.6405C7.58579 18.8907 9.22424 19.6911 10.9863 19.9184C12.7484 20.1458 14.5364 19.7875 16.0748 18.8988C17.6132 18.01 18.8168 16.6401 19.5 15M20 19V15H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_121_14137">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                </span>

            </div>
          </header>
                
          <motion.div
          variants={scale}
          animate="visible"
          initial="hidden"
            ref={noteContent}
            dangerouslySetInnerHTML={{__html: note.content}}
            onClick={() => {
              document.execCommand('foreColor', false, COLORS[colorsIndex])
              document.execCommand(Fonts[fontIndex].fontFamily, false);
            }}
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
          
          </motion.div>
          
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
  }else {
    return <h1>Error</h1>
  }

}