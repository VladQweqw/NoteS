import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { convertTimeDifference } from "../../assets/functions"

export default function Note(data: {
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