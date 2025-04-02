import { useNavigate } from 'react-router'

export default function Page404() {
    const navigate = useNavigate()

   return(
    <div className="page-404 full-w full-h d-flex flex-center">
        <h1><span className="err-404">404</span>Page not found</h1>

        <button 
        onClick={() => navigate('/notes')}
        className="go-back">Home</button>   
    </div>
   )
}