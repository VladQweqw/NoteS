import { themeHandler } from '../../assets/functions';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { THEMES } from '../../assets/data';
import anime from 'animejs';

import useApi from '../../hooks/useApi';
import Sidebar from './Sidebar/Sidebar';
import ThemesModal from '../../components/themesModal';


export default function NotesPage() {
    const navigate = useNavigate();

    const user_id = Number(localStorage.getItem('user_id')) || 0
    
    // Theme auto-update due to user's settings
    const index = parseInt(localStorage.getItem('themeIndex') || '') || 0
    themeHandler(THEMES[index].palette, index)
  
    const animationRef = useRef<any>(null)
    const mainRef = useRef<HTMLElement | null>(null)
  
    const [isThemesModalOpen, setIsThemesModalOpen] = useState(false)
    const [notes, setNotes] = useState<NoteType[]>([])
    const [filteredNotes, setFilteredNotes] = useState<NoteType[]>([])
    const [isSaved, setIsSaved] = useState(true)
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  
  
    const { data, isLoading, error, call} = useApi()

    function getNotes() {
      call({
        method: 'GET',
        url: `/note/user/67ec40019162541abba5edd3`,
        data: {},
        headers: {},
      })
      
    }
  
    useEffect(() => {
      if(data?.length > 0) {
        console.log(data);
        
        setNotes(data)
        setFilteredNotes(data)
      }
    }, [data])
    
  
    useEffect(() => {
      // const user_id = Number(localStorage.getItem('user_id')) || 0
      // console.log(user_id);
      
      // if(!user_id) navigate('/accounts/login')
      
      getNotes()   
  
      if(notes) {
        animationRef.current = anime({
          targets: '.sidebar-side',
          opacity: [0, 1],
          translateX: ['-100%', '0%'],
          easing: 'easeInOutSine',
          duration: 500,
          delay: anime.stagger(50),
          
        })
  
        console.log(notes);
        
      }
  
      if(notes.length <= 0) {
        mainRef.current!.classList.remove('main-active')
      }
  
    }, [])
  
    useEffect(() => {
      if(toggleSidebar) {
        mainRef.current!.classList.add('main-active')
      }else {
        mainRef.current!.classList.remove('main-active')
      }
    }, [toggleSidebar])
    
  
    return (
      <main
      ref={mainRef}
      className="notes-main">
        {
          data?.length ? <Sidebar
          setIsThemesModalOpen={setIsThemesModalOpen}
          setFilteredNotes={setFilteredNotes}
          filteredNotes={filteredNotes}
          originalNotes={data}
          /> : null
        }
  
        <Outlet 
          context={[
            setIsSaved,
            isSaved,
            getNotes,
            toggleSidebar,
            setToggleSidebar
          ]}
        />
  
  
      
        {isThemesModalOpen && <ThemesModal setIsThemesModalOpen={setIsThemesModalOpen} />}
      </main>
    );
}