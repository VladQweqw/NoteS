import RegisterPage from './pages/signup_page';
import LoginPage from './pages/login_page';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import { NoteContent } from './components/noteContent';
import Page404 from './components/404page';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
     <Routes>
        <Route path="/notes" element={<App />}>
          <Route path=':id' element={<NoteContent />}></Route>
        </Route>

        <Route path="/" element={<App />}>
          <Route path=':id' element={<NoteContent />}></Route>
        </Route>

        <Route path='accounts/login' element={<LoginPage />}></Route>
        <Route path='accounts/register' element={<RegisterPage />}></Route>
        <Route path='*' element={<Page404 />}></Route>
     </Routes>
    </Router>
  </React.StrictMode>
);
