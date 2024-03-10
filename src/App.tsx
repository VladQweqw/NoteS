import { themeHandler, convertTimeDifference, getNewName } from './assets/functions';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { callApi } from './hooks/apis';
import { Outlet } from 'react-router-dom';
import { THEMES} from './assets/data';
import anime from 'animejs';

// Syles
import './static/style.css'

// Hooks
import Context from './components/context';
import ThemesModal from './components/themesModal';
import Loading from './components/loading';

// File system
const VERSION = '0.9.2'

function App() {
  const navigate = useNavigate();

  const { id } = useParams()
  const user_id = Number(localStorage.getItem('user_id')) || 0
  
  // Theme auto-update due to user's settings
  const index = parseInt(localStorage.getItem('themeIndex') || '') || 0
  themeHandler(THEMES[index].palette, index)

  const animationRef = useRef<any>(null)
  const mainRef = useRef<HTMLElement | null>(null)

  const [isContextOpen, setIsContextOpen] = useState(false)
  const [isThemesModalOpen, setIsThemesModalOpen] = useState(false)
  const [notes, setNotes] = useState<NoteType[]>([])
  const [filteredNotes, setFilteredNotes] = useState<NoteType[]>([])
  const [sortedAscdending, setSortedAscdending] = useState(false)
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  const [contextData, setContextData] = useState<ContextDataType>({
    top: 0,
    left: 0,
    noteWidth: 0,
    note_id: 0,
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function searchNotes(search: string) {
    let filtered_notes = notes.filter((note: NoteType) => {
      let note_title = note.title.toLowerCase()
      
      if(note_title.indexOf(search) > -1) {
        return note
      }

      return null
    })

    setFilteredNotes(filtered_notes)
    
  }

  function getNotes() {
    setIsLoading(true)

    callApi({
      method: 'POST',
      headers: {},
      data: {
          'user': user_id,
      },
      url: "notes/"
    })
    .then((data) => {
      if(data)
        setNotes(data)
        setFilteredNotes(data)
    })
    .finally(() => {      
      setIsLoading(false)
    })

  }

  function createNote() {
    const title = getNewName(notes)
    
    const data = {
      "title": title,
      "content": "",
      "user": user_id
    }    
    
    callApi({
      method: 'POST',
      headers: {},
      data: data,
      url: "notes/add/"
    }).then((resp) => {         
      getNotes()
    })

  }

  function removeNote(note_id: number) {
    let ok = false

    if(note_id === Number(id))
      ok = true

    const data = {
      "user": user_id
    }
    
    callApi({
      method: 'DELETE',
      headers: {},
      data: data,
      url: `notes/delete/${note_id}/`
    }).then((resp) => {          
      getNotes()

      if(ok)  
        navigate('/notes/')
    })
  }

  function sortNotes() {
    let sorted_notes = []

    if(sortedAscdending) {
      sorted_notes = filteredNotes.sort((a: any, b: any): any => {
        return a.title > b.title
      })
    }else {
      sorted_notes = filteredNotes.sort((a: any, b: any): any => {
        return b.title > a.title
      })
    }
    
    setFilteredNotes(sorted_notes)
    setSortedAscdending(() => !sortedAscdending)
  }

  useEffect(() => {
    const user_id = Number(localStorage.getItem('user_id')) || 0
    if(!user_id) navigate('/accounts/login')
    
    getNotes()   

    if(notes) {
      animationRef.current = anime({
        targets: '.sidebar-side',
        opacity: [0, 1],
        translateX: ['-100%', '0%'],
        easing: 'easeInOutSine',
        duration: 500,
        delay: anime.stagger(50),
        
      })
    }

    if(notes.length <= 0) {
      mainRef.current!.classList.remove('main-active')

    }
    
  }, [])

  useEffect(() => {
    if(toggleSidebar) {
      mainRef.current!.classList.add('main-active')
    }else {
      mainRef.current!.classList.remove('main-active')
    }
  }, [toggleSidebar])
  
  
  return (
    <main
    ref={mainRef}
    className="notes-main">
      <div 
      className="sidebar">
        <div className="top-sidebar sidebar-side">
          <div className="search-wrapper">
            <input onChange={(e) => {
              searchNotes(e.target.value)
            }} type="search" name="Search notes" id="search-field" placeholder='Search...' />
          </div>

          <div className="sidebar-options">

            <span onClick={() => {
              sortNotes()
            }}>
              <svg className='svg' viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_10_67)">
                  <path d="M3.5 9L7.5 5L11.5 9M7.5 5V19" stroke={`${sortedAscdending ? "#FFF": "#FF0000"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.5 15L17.5 19L13.5 15M17.5 19V5" stroke={`${sortedAscdending ? "#FFF" : "#FF0000"}`}  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_10_67">
                  <rect width="24" height="24" fill={`${sortedAscdending ? "#FFF" : "#FF0000"}`} transform="translate(0.5)"/>
                  </clipPath>
                  </defs>
              </svg>
            </span>

            <span 
            className='refresh-svg'
            onClick={(e) => {
              (e.target as HTMLSpanElement).style.animation = `rotate 300ms ease-in-out backwards`
              setTimeout(() => {
                (e.target as HTMLSpanElement).style.animation = ``
                getNotes()
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

            <span onClick={() => {
              createNote()
            }} className="filter">
              <span className="create-note" id='create-note'>
                <svg  className='svg' viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_11_14244)">
                  <path d="M17.4167 3.5V8.16667C17.4167 8.47609 17.544 8.77283 17.7706 8.99162C17.9972 9.21042 18.3045 9.33333 18.625 9.33333H23.4583" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.0417 24.5H8.95832C8.31738 24.5 7.70269 24.2542 7.24948 23.8166C6.79627 23.379 6.54166 22.7855 6.54166 22.1667V5.83333C6.54166 5.21449 6.79627 4.621 7.24948 4.18342C7.70269 3.74583 8.31738 3.5 8.95832 3.5H17.4167L23.4583 9.33333V22.1667C23.4583 22.7855 23.2037 23.379 22.7505 23.8166C22.2973 24.2542 21.6826 24.5 21.0417 24.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 12.8333V19.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.375 16.3333H18.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_11_14244">
                  <rect width="29" height="28" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                  </defs>
                </svg>
              </span>
            </span>

          </div>

        </div>
        
        <div
            className="bottom-sidebar notes sidebar-side" 
            id='notes'> 
               {isLoading ? <Loading /> : 
               (filteredNotes.length > 0) ? filteredNotes?.map((note: NoteType, index: number) => {
                return <Note 
                index={index}
                isActive={note.id === Number(id)}
                setContextData={setContextData}
                removeNote={removeNote} 
                setIsContextOpen={setIsContextOpen}
                note={note}
                class={
                  `${index === 0 ? 'note-active' : ''}`
                } 
                key={index} />
              }):
              <div className="no-content-wrapper">
                <p className='no-data-text' onClick={() => createNote()}>No notes yet, create one!</p>
              </div>
              }
               
                
        </div>

        <div className="sidebar-footer sidebar-side">
        <svg 
        onClick={() => setIsThemesModalOpen(true)}
        className='svg svg-btn' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_110_14137)">
          <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_110_14137">
          <rect width="24" height="24" fill="white"/>
          </clipPath>
          </defs>
          </svg>




            <p>v{VERSION}</p>
        </div>
      </div>

      <Outlet 
        context={[
          getNotes,
          toggleSidebar,
          setToggleSidebar
        ]}
      />


      <Context 
      removeNote={removeNote} 
      isContextOpen={isContextOpen} 
      setIsContextOpen={setIsContextOpen} 
      contextData={contextData} />
      {isThemesModalOpen && <ThemesModal setIsThemesModalOpen={setIsThemesModalOpen} />}

    </main>
  );
}


function Note(data: {
  note: NoteType,
  isActive: boolean,
  setContextData: (args0: any) => void,
  setIsContextOpen: (args0: boolean) => void,
  removeNote: (args0: number) => void,
  class: string,
  index: number
}) {
  const navigate = useNavigate()
  
  const note = useRef<any>(null)

  const [title, setTitle] = useState(data.note.title)
  const [lastModified, setLastModified] = useState(convertTimeDifference(data.note.creationDate, data.note.lastUpdate))

  useEffect(() => {
    setTitle(data.note.title)
  }, [data.note.title])

  return(
        <div
      ref={note}
      onContextMenu={(e) => {
        const rect = note.current.getBoundingClientRect()
        
        data.setContextData({
          top: rect.top,
          left: rect.left,
          noteWidth: rect.width,
          note_id: data.note.id,
        })

        data.setIsContextOpen(true)
      }}
      onKeyDown={(e) => {
        if(e.key === 'Delete') {
            data.removeNote(data.note.id)
        }
      }}
      onMouseEnter={(e) => {
        setLastModified(convertTimeDifference(data.note.creationDate, data.note.lastUpdate))
      }}
      onClick={(e) => {
        navigate(`/notes/${data.note.id}`)
      }} 
      className={`note ${data.isActive ? 'note-active': '' }`}>
        <p 
        
        className="note-last-update">Edited {lastModified}</p>

        <input 
          onDoubleClick={(e: any) => {
            if(e.target.hasAttribute('readonly')) {
              e.target.removeAttribute('readonly')


            }else {
              e.target.setAttribute('readonly', 'true');
            }
          }}

          onBlur={(e) => {
            e.target.setAttribute('readonly', 'true');
          
          }}

          onChange={(e) => {
            setTitle(e.target.value)
          }}
          type='text'  
          className='note-name input-field' 
          value={title}
          readOnly={true}
        />
      </div>
  )

}

export default App;
