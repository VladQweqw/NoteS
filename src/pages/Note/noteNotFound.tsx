import { useNavigate } from 'react-router'

export default function NoteNotFound() {
   const navigate = useNavigate()

   return(
    <div className="note-not-found-wrapper full-w full-h d-flex flex-center">
      <h1><span className="err-404">404</span> Note was not found</h1>

      <button 
      onClick={() => navigate('/notes')}
      className="go-back">Home</button>   
    </div>
   )
}