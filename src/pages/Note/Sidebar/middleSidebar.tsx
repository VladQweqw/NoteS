import { useParams } from "react-router"
import Note from "../note"
import useApi from "../../../hooks/useApi"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import Loading from "../../../components/loading"
import { getNewName } from "../../../assets/functions"

export default function MiddleSidebar(props: {
    setFilteredNotes: (args0: any) => void,
    filteredNotes: NoteType[],
    originalNotes: NoteType[],
    setIsContextOpen: (args0: boolean) => void,
    setContextData: (args0: ContextDataType) => void
 }) {
    const { id } = useParams()
    const user_id = localStorage.getItem("user_id") || ""
    const navigate = useNavigate();

    const { data, isLoading, error, call} = useApi()
    
    function createNote() {
        call({
            url: `/note`,
            data: {
                title: getNewName(props.originalNotes),
                content: "",
                author: user_id
            },
            headers: {},
            method: 'POST'
          })
    }

    useEffect(() => {
        if(data?.id) {
            navigate("/")
        }
    }, [data])
    
    if(error) console.log(error);
    if(isLoading) return <Loading />
    
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
                    <p 
                    onClick={() => createNote()}
                    className='no-data-text' >No notes yet, create one!</p>
                </div>
            }
        </div>
    )
}