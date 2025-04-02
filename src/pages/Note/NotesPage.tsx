import { themeHandler } from '../../assets/functions';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { THEMES } from '../../assets/data';
import anime from 'animejs';

import useApi from '../../hooks/useApi';
import Sidebar from './Sidebar/Sidebar';
import ThemesModal from '../../components/themesModal';

import { useLocation } from 'react-router-dom';
import Loading from '../../components/loading';

export default function NotesPage() {
  const navigate = useNavigate();

  const user_id = localStorage.getItem("user_id") || ""

  // Theme auto-update due to user's settings
  const index = parseInt(localStorage.getItem('themeIndex') || '') || 0
  themeHandler(THEMES[index].palette, index)

  const animationRef = useRef<any>(null)
  const mainRef = useRef<HTMLElement | null>(null)
  const location = useLocation()

  const [isThemesModalOpen, setIsThemesModalOpen] = useState(false)
  const [notes, setNotes] = useState<NoteType[]>([])
  const [filteredNotes, setFilteredNotes] = useState<NoteType[]>([])
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)

  const { data, isLoading, error, call } = useApi({
    method: 'GET',
    url: `/note/user/${user_id}`,
    data: {},
    headers: {},
  })

  function getNotes() {
    call({
      method: 'GET',
      url: `/note/user/${user_id}`,
      data: {},
      headers: {},
    }) 
  }

  useEffect(() => {
    if(!user_id) navigate('/accounts/login')
      
    if(location.pathname === "/" || location.pathname === "/notes") {
      getNotes()
    }
  }, [location])
  

  useEffect(() => {
    if (data?.length > 0) {
      console.log(data);

      animationRef.current = anime({
        targets: '.sidebar-side',
        opacity: [0, 1],
        translateX: ['-100%', '0%'],
        easing: 'easeInOutSine',
        duration: 500,
        delay: anime.stagger(50),
      })
      
      updateNotes()
    }

    if (notes.length <= 0) {
      mainRef.current!.classList.remove('main-active')
    }
  }, [data])

  function updateNotes() {
    setNotes(data)
    setFilteredNotes(data)
  }

  useEffect(() => {
    if (toggleSidebar) {
      mainRef.current!.classList.toggle('main-active')
    } else {
      mainRef.current!.classList.remove('main-active')
    }
  }, [toggleSidebar])


  if(isLoading) return <Loading />

  return (
    <main
      ref={mainRef}
      className="notes-main">
      <Sidebar
          setIsThemesModalOpen={setIsThemesModalOpen}
          setFilteredNotes={setFilteredNotes}
          filteredNotes={filteredNotes}
          originalNotes={data}
          setToggleSidebar={setToggleSidebar}
          toggleSidebar={toggleSidebar}
        />

      <Outlet
        context={[
          toggleSidebar,
          setToggleSidebar,
          updateNotes
        ]}
      />

      {isThemesModalOpen && <ThemesModal setIsThemesModalOpen={setIsThemesModalOpen} />}
    </main>
  );
}