import { convertTimeFormat, themeHandler } from '../assets/functions'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ModalWrapper from './modalWrapper'
import { THEMES } from '../assets/data'
import Loading from './loading'

export default function ThemesModal(data: any) {
  const [activeIndex, setActiveIndex] = useState(parseInt(localStorage.getItem('themeIndex') || '0') || 0)
    
   return(
    <ModalWrapper setIsThemesModalOpen={data.setIsThemesModalOpen}>
        <div className="themes-modal">
            <div className="themes-container">
                <header className="themes-title">
                <h3>Themes</h3>
            </header>
            <div className="themes-wrapper">
                {THEMES.map((theme: themeType, index) => {
                    return <Theme 
                    isActive={index === activeIndex} 
                    {...theme} 
                    key={index} 
                    setActiveIndex={setActiveIndex}
                    index={index}
                     />
                })}
            </div>
            </div>

            <div className="themes-container">
                <header className="themes-title">
                    <h3>Account</h3>
                </header>

                {/* <AccountDetails /> */}
            </div>
        </div>
        
    </ModalWrapper>
   )
}

function Theme(data: {
    isActive: boolean,
    setActiveIndex: (args0: number) => void
    index: number,
    name: string,
    palette: paletteType
}) {
    return <div className={`${data.isActive && 'theme-active'}  theme`}>
        <label className="switch">
            <input
             checked={data.isActive} 
             type="checkbox"
             onChange={(e) => {
                data.setActiveIndex(data.index)

                themeHandler(data.palette, data.index)
             }}
             />
            <span className="slider"></span>
        </label>
        <p className={`${data.isActive && 'theme-name-active'}  theme-name`}>{data.name}</p>

        <div className="color-palette">
            {Object?.entries?.(data.palette)?.map((palette, index) => {
                return <span 
                    className="color" 
                    key={index}
                    style={{
                        backgroundColor: palette[1]
                }}></span>
            })}
        </div>
    </div>
}

function AccountDetails() {
    const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState<UserType>()
    const [error, setError] = useState<string>('')
    
    function logOut() {
        
    }

    function deleteUser() {
        const user_id = localStorage.getItem('user_id')
        console.log(`delete/${user_id}/`);
    }
    
    if(error) return <div className='d-flex full-h full-w flex-center' style={{
        flexDirection: 'column'
    }}>
        <h4>{error}</h4>
        <p className='secondary-text'>Please try again later</p>
    </div>

    if(isLoading) return <Loading />
    return(
        <div className="themes-wrapper user-wrapper">
            {userData ? 
            <div className="user-details">
                <div className="user-detail">
                    <p>Nickname:</p> 
                    <h3>{userData.nickname}</h3>
                </div>
                <div className="user-detail">
                    <p>Creation date:</p> 
                    <h3>{convertTimeFormat(userData.creation_date)}</h3>
                </div>
                <div className="user-detail danger-detail">
                    <button 
                    onClick={() => logOut()}
                    className="log-out">Log out</button>
                    
                </div>
                <div className="user-detail danger-detail">
                    <button 
                    onClick={() => deleteUser()}
                    className="log-out">Delete User</button>
                    
                </div>
                
            </div>
            : ''}
        </div>
    )
}