import { forwardRef , useState, useEffect, useRef } from 'react';

// Syles
import './static/style.css'

const fs = window.require('fs')
const pathModule = window.require('path')

const initialNotes = [
  {
    title: 'Sandu',
    text: 'AWD',
  },
  {
    title: 'Ionut',
    text: 'sugi pula ionut',
  },
  {
    title: 'Danutu',
    text: 'Ba <i>CAL<i> in el lmc <c class="accent">ma</c> rupe maine',
  },
  {
    title: 'Bodorineeee',
    text: 'sugi pula ionut',
  },
]

function App() {
  const [notes, setNotes] = useState(initialNotes)
  const [currentIndex, setCurrentIndex] = useState(0)
  const textArea = useRef(null)

  function searchNotes(search) {
    if(search.trim() === '') return setNotes(initialNotes)
    const keyword = search.toLowerCase()
    const notesCopy = initialNotes

    const filteredNotes = notesCopy.filter((note) => {
      const noteTitle = note.title.toLocaleLowerCase()

      return noteTitle.indexOf(keyword) > -1
    })

    setNotes(filteredNotes)
  }
  

  useEffect(() => {
    if(textArea.current)
      textArea.current.innerHTML = notes[currentIndex].text

      const notes_elem = document.querySelectorAll('.note')

      notes_elem.forEach((note) => {
        note.classList.remove('note-active')
        notes_elem[currentIndex].classList.add('note-active')
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])
  

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
            <span className="create-note" id='create-note'>
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
              setNotes([
                ...notes, 
                {
                  title: 'Sandu',
                  text: 'HAHDWH',
                }
              ])
            }} className="filter">
              <svg className='svg' viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          </div>

        </div>
 
        <div className="bottom-sidebar notes" id='notes'>
            {notes.length > 0 ? notes?.map((note, index) => {
              return <Note setCurrentIndex={setCurrentIndex} index={index} class={
                `${index === 0 ? 'note-active' : ''}`
              } note={note} key={index} />
            }):  <p className='no-data-text'>Create a note</p>}
        </div>
      </div>

      <article className="note-content-wrapper"> 
          {notes[currentIndex]?.text ? 
            <NoteContent ref={textArea} note={notes[currentIndex]} />
          : <p className='no-data-text'>Nothing here yet, click on a note or create one to start</p>  
        }
      </article> 

    </main>
  );
}


const NoteContent = forwardRef(function(props, ref) {
  const [text, setText] = useState(props.note.title)

  useEffect(() => {
    setText(props.note.title)
  }, [props.note])
  
  const handleChange = event => {
    setText(event.target.value);
  };

  return <>
    <header className="note-content-header">
      <div className="title-wrapper">
        <input 
        className="note-title" 
        value={text}
        onChange={handleChange}
        onBlur={() => {
        // saveTitle()
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
          <input onBlur={(e) => {
            let tr = window.getSelection().getRangeAt(0);
            let span = document.createElement("span");
            span.style.color = e.target.value;
            span.appendChild(tr.extractContents());
            tr.insertNode(span)
          
            

          }} type="color" className='input color-input' id="current-color" name="Text color" />

          <svg xmlns="http://www.w3.org/2000/svg" className='svg' viewBox="0 0 30 30" fill="none">
            <g clipPath="url(#clip0_29_66)">
              <path d="M5 10V7.5C5 6.83696 5.26339 6.20107 5.73223 5.73223C6.20107 5.26339 6.83696 5 7.5 5H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 5H22.5C23.163 5 23.7989 5.26339 24.2678 5.73223C24.7366 6.20107 25 6.83696 25 7.5V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 20V11.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.25 11.25H18.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
    <clipPath id="clip0_29_66">
      <rect width="30" height="30" fill="white"/>
    </clipPath>
  </defs>
          </svg>
      </div>
    </header>
    <pre id="note-content" ref={ref} contentEditable></pre>
  </>
})

function Note(data) {
  return(
    <div onClick={(e) => {
      data.setCurrentIndex(data.index)
      
    }} className={`note ${data.class}`}>
      <p className='note-name'>{data.note.title}</p>
    </div>
  )

}

export default App;
