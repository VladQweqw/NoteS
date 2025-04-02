import TopSidebar from "./topSidebar"
import BottomSidebar from "./bottomSidebar"
import MiddleSidebar from "./middleSidebar"
import { useState } from "react"
import Context from "../../../components/context"

export default function Sidebar(props: {
   setFilteredNotes: (args0: any) => void,
   filteredNotes: NoteType[],
   originalNotes: NoteType[],
   setToggleSidebar: (args0:boolean) => void,
   toggleSidebar: boolean,
   setIsThemesModalOpen: (args0: boolean) => void
}) {

   const [sortedAscdending, setSortedAscdending] = useState(false)
   const [isContextOpen, setIsContextOpen] = useState(false)
   const [contextData, setContextData] = useState<ContextDataType>({
      top: 0,
      left: 0,
      noteWidth: 0,
      note_id: 0,
   })


   function searchNotes(search: string) {
      if (search.trim() === "") {
         return props.setFilteredNotes(props.originalNotes)
      }

      let filtered_notes = props.filteredNotes.filter((note: NoteType) => {
         let note_title = note.title.toLowerCase()

         if (note_title.indexOf(search) > -1) {
            return note
         }

         return null
      })

      props.setFilteredNotes(filtered_notes)
   }

   function sortNotes() {
      let sorted_notes = []

      if (sortedAscdending) {
         sorted_notes = props.filteredNotes.sort((a: any, b: any): any => {
            return a.title > b.title
         })
      } else {
         sorted_notes = props.filteredNotes.sort((a: any, b: any): any => {
            return b.title > a.title
         })
      }

      props.setFilteredNotes(sorted_notes)
      setSortedAscdending(() => !sortedAscdending)
   }

   return (
      <div
         className="sidebar">
         <TopSidebar
            searchNotes={searchNotes}
            sortNotes={sortNotes}
            sortedAscdending={sortedAscdending}
            originalNotes={props.originalNotes}
            setToggleSidebar={props.setToggleSidebar}
            toggleSidebar={props.toggleSidebar}
         />

         <MiddleSidebar 
         setContextData={setContextData}
         setIsContextOpen={setIsContextOpen}
         {...props} />

         <BottomSidebar 
         setIsThemesModalOpen={props.setIsThemesModalOpen}
         />

         <Context
            isContextOpen={isContextOpen}
            setIsContextOpen={setIsContextOpen}
            contextData={contextData} />
      </div>
   )
}