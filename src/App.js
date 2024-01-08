import { forwardRef, useState, useEffect, useRef } from 'react';
import { getNewName, syncFiles, markdownToHtml, themeHandler } from './assets/functions';
import { COLORS, THEMES} from './assets/data';

// Syles
import './static/style.css'

// Hooks
import Context from './hooks/context';
import ThemesModal from './hooks/themesModal';

// File system
const fs = window.require('fs')

function App() {
  const INITIAL_NOTES = syncFiles()
  const textArea = useRef(null)  

  // Theme auto-update due to user's settings
  const index = parseInt(localStorage.getItem('themeIndex')) || 0
  themeHandler(THEMES[index].palette, index)

  const [isContextOpen, setIsContextOpen] = useState(false)
  const [isThemesModalOpen, setIsThemesModalOpen] = useState(false)

  const [notes, setNotes] = useState(INITIAL_NOTES)
  const [currentIndex, setCurrentIndex] = useState(0)  

  const [sortedAscdending, setSortedAscdending] = useState(false)
  const [colorsIndex, setColorsIndex] = useState(0)

  const [contextData, setContextData] = useState({
    top: 0,
    left: 0,
    noteWidth: 0,
    file_path: '',
  })

  function searchNotes(search) {
    if(search.trim() === '') return setNotes(INITIAL_NOTES)
    const keyword = search.toLowerCase()
    const notesCopy = INITIAL_NOTES

    const filteredNotes = notesCopy.filter((note) => {
      const noteTitle = note.title.toLocaleLowerCase()

      return noteTitle.indexOf(keyword) > -1
    })

    setNotes(filteredNotes)
  }

  function createNote() {
    try {
      fs.appendFile(`./notes/${getNewName()}.txt`, '', function(err) {
        if(err) throw err;
          console.log('Created succesfully!');
        
        setNotes(syncFiles())
      })
    }catch(err) {
      console.log(`Error: ${err}`);
    }
    
  }

  function saveNoteContent(file_path, new_content) {
    try {
      fs.writeFileSync(file_path, new_content)
      console.log('Saved succesfully!')
      
      setNotes(syncFiles())
    }catch(err) {
      console.log(`Error: ${err}`);
    }

  }

  function saveNoteTitle(file_path, new_title) {
    try {
      fs.rename(`notes/${file_path}.txt`, `notes/${new_title}.txt`, () => {
        console.log('Saved succesfully!')

        setNotes(() => syncFiles())
      })
    }catch(err) {
      console.log(`Error: ${err}`);
    }
  }

  function removeNote(file_path) {
    try {
      fs.unlinkSync(file_path);
      console.log('Removed succesfully!');

      setNotes(syncFiles())
    }catch(err) {
      console.log(`Error: ${err}`);
    }

  }

  function sortNotes() {
    let sortedNotes = []
    const copyNotes = [...notes]

    if(sortedAscdending) {
      sortedNotes = copyNotes.sort((a, b) =>  b.creationDate - a.creationDate)
    }else {
      sortedNotes = copyNotes.sort((a, b) =>  a.creationDate - b.creationDate)
    }

    setNotes(() => sortedNotes)
    setSortedAscdending(!sortedAscdending)
  }

  useEffect(() => {
    if(textArea.current)
        textArea.current.innerHTML = markdownToHtml(notes[currentIndex].text || '')
  }, [notes, currentIndex])
  
  return (
    <main className="main">
      <div className="sidebar">
        <div className="top-sidebar">
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
                  <path d="M3.5 9L7.5 5L11.5 9M7.5 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.5 15L17.5 19L13.5 15M17.5 19V5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_10_67">
                  <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
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
 
        <div className="bottom-sidebar notes" id='notes'>
            {notes.length > 0 ? notes?.map((note, index) => {
              return <Note 
              isActive={currentIndex === index}
              setContextData={setContextData}
              removeNote={removeNote} 
              setIsContextOpen={setIsContextOpen}
              setCurrentIndex={setCurrentIndex} 
              index={index} 
              saveNoteTitle={saveNoteTitle} 
              class={
                `${index === 0 ? 'note-active' : ''}`
              } 
              note={note} 
              key={index} />
            }):
              <div className="no-content-wrapper">
                <p className='no-data-text' onClick={() => createNote()}>No notes yet, create one!</p>
              </div>
            }
        </div>

        <div className="sidebar-footer">
            <svg
        onClick={() => {
          setIsThemesModalOpen(true)
        }}
        xmlns="http://www.w3.org/2000/svg" className='svg svg-btn' viewBox="0 0 34 34" fill="none">
            <g clipPath="url(#clip0_37_199)">
            <path d="M4.25 29.75V24.0833C4.25 22.9626 4.58234 21.867 5.20501 20.9351C5.82767 20.0032 6.71268 19.2769 7.74813 18.848C8.78358 18.4191 9.92295 18.3069 11.0222 18.5255C12.1214 18.7442 13.1311 19.2839 13.9236 20.0764C14.7161 20.8689 15.2558 21.8786 15.4745 22.9778C15.6931 24.077 15.5809 25.2164 15.152 26.2519C14.7231 27.2873 13.9968 28.1723 13.0649 28.795C12.133 29.4176 11.0374 29.75 9.91667 29.75H4.25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M29.75 4.25C25.7065 4.80307 21.8874 6.43753 18.6958 8.98088C15.5042 11.5242 13.0584 14.8821 11.6166 18.7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M29.75 4.25C29.1969 8.29343 27.5625 12.1125 25.0191 15.3042C22.4758 18.4958 19.1179 20.9416 15.3 22.3833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.0167 12.75C17.7695 14.0206 19.9794 16.2305 21.25 18.9833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_37_199">
            <rect width="34" height="34" fill="white"/>
            </clipPath>
            </defs>
            </svg>

            <p>v.0.0.1</p>
        </div>
      </div>

      {notes.length > 0 && notes[currentIndex] && 
            <NoteContent 
            colorsIndex={colorsIndex}
            setColorsIndex={setColorsIndex}
            saveNoteTitle={saveNoteTitle} 
            saveNoteContent={saveNoteContent} 
            ref={textArea} 
            note={notes[currentIndex]}
             />
      }

      <Context 
      removeNote={removeNote} 
      isContextOpen={isContextOpen} 
      setIsContextOpen={setIsContextOpen} 
      contextData={contextData} />

      {isThemesModalOpen && <ThemesModal setIsThemesModalOpen={setIsThemesModalOpen} />}

    </main>
  );
}

const NoteContent = forwardRef(function(props, ref) {
  const [text, setText] = useState(props.note.title)
  const [isTextWrap, setIsTextWrap] = useState(false)

  useEffect(() => {
    setText(props.note.title)
  }, [props.note.title])  

  return <article 
  onBlur={() => {
      props.saveNoteContent(`notes/${props.note.title}.txt`, ref.current.innerHTML)
    }}
  className="note-content-wrapper">
      <header className="note-content-header">
        <div className="title-wrapper">
          <input 
          className="note-title" 
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onBlur={(e) => {
            props.saveNoteTitle(`${props.note.title}`, `${e.target.value}`)
        }}
        ></input>
          <svg xmlns="http://www.w3.org/2000/svg" className='svg' viewBox="0 0 23 23" fill="none">
            <g clipPath="url(#clip0_6_195)">
              <path d="M7.66671 19.1667L17.7292 9.10417C17.9809 8.85247 18.1806 8.55366 18.3168 8.2248C18.453 7.89593 18.5231 7.54346 18.5231 7.1875C18.5231 6.83155 18.453 6.47907 18.3168 6.15021C18.1806 5.82135 17.9809 5.52254 17.7292 5.27084C17.4775 5.01914 17.1787 4.81948 16.8498 4.68326C16.521 4.54704 16.1685 4.47693 15.8125 4.47693C15.4566 4.47693 15.1041 4.54704 14.7752 4.68326C14.4464 4.81948 14.1476 5.01914 13.8959 5.27084L3.83337 15.3333V19.1667H7.66671Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.9375 6.22919L16.7708 10.0625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.3334 17.25H19.1667" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          <defs>
            <clipPath id="clip0_6_195">
              <rect width="23" height="23" fill="white"/>
            </clipPath>
          </defs>
          </svg>
        </div>

        <div className="header-options">  
            <div className="text-colors">
              {COLORS.map((color, index) => {
                return <span 
                className={` ${props.colorsIndex === index ? 'color-item-active': ''} color-item`}
                style={{backgroundColor: color}} 
                key={index} 
                
                onClick={(e) => {
                  props.setColorsIndex(index)
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
        </div>
      </header>

      <pre
        onClick={() => {
          document.execCommand('foreColor', false, COLORS[props.colorsIndex])
        }}
        onKeyDown={(e) => {
          if(e.ctrlKey && e.key.toLowerCase() === 's') {
            props.saveNoteContent(`notes/${props.note.title}.txt`, e.target.innerHTML)
          }
        }}
        className={`${isTextWrap ? 'note-content-wrap' : ''}`}
        id="note-content" 
        ref={ref} 
        contentEditable={true}
        
      >
      </pre>
  </article>
})

function Note(data) {
  const note = useRef(null)
  const [title, setTitle] = useState(data.note.title)

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
        file_path: `notes/${title}.txt`,
      })

      data.setIsContextOpen(true)
    }}

    onClick={(e) => {
      data.setCurrentIndex(data.index)
    }} 
    
    className={`note ${data.isActive ? 'note-active': '' }`}>
      <input 
        onDoubleClick={(e) => {
          if(e.target.hasAttribute('readonly')) {
            e.target.removeAttribute('readonly')

            data.saveNoteTitle(`${data.note.title}`, `${e.target.value}`)
          }else {
            e.target.setAttribute('readonly', 'true');
          }
        }}

        onBlur={(e) => {
          e.target.setAttribute('readonly', 'true');
          data.saveNoteTitle(`${data.note.title}`, `${e.target.value}`)
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
