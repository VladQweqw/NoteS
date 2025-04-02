import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import NotesPage from './pages/Note/NotesPage';
import RegisterPage from "./pages/Login/signup_page";
import LoginPage from "./pages/Login/login_page";
import Page404 from './components/404page';

import { NoteContent } from './pages/Note/noteContent';

import './static/style.css'


function App() {

  return(
    <>
      <Router>
           <Routes>
              <Route path="/notes" element={<NotesPage />}>
                <Route path=':id' element={<NoteContent />}></Route>
              </Route>
      
              <Route path="/" element={<NotesPage />}>
                <Route path=':id' element={<NoteContent />}></Route>
              </Route>
      
              <Route path='accounts/login' element={<LoginPage />}></Route>
              <Route path='accounts/register' element={<RegisterPage />}></Route>
              <Route path='*' element={<Page404 />}></Route>
           </Routes>
          </Router>
    
    </>
  )
}


export default App;
