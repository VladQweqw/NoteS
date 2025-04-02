import { useParams } from "react-router"
import Note from "../note"

export default function MiddleSidebar(props: {
    setFilteredNotes: (args0: any) => void,
    filteredNotes: NoteType[],
    originalNotes: NoteType[],
    setIsContextOpen: (args0: boolean) => void,
    setContextData: (args0: ContextDataType) => void
 }) {
    const { id } = useParams()
    
    return (
        <div className="middle-sidebar notes sidebar-side"
            id='notes'>
            {props.filteredNotes.length > 0 ? props.filteredNotes?.map((note: NoteType, index: number) => {
                return <Note
                    index={index}
                    isActive={note.id === id}
                    setContextData={props.setContextData}
                    setIsContextOpen={props.setIsContextOpen}
                    note={note}
                    class={
                        `${index === 0 ? 'note-active' : ''}`
                    }
                    key={index} />
            }) :
                <div className="no-content-wrapper">
                    <p className='no-data-text' >No notes yet, create one!</p>
                </div>
            }
        </div>
    )
}