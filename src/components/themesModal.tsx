import { convertTimeFormat, themeHandler } from '../assets/functions'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import ModalWrapper from './modalWrapper'
import { THEMES } from '../assets/data'
import Loading from './loading'
import useApi from '../hooks/useApi'

export default function ThemesModal(data: any) {
    const [activeIndex, setActiveIndex] = useState(parseInt(localStorage.getItem('themeIndex') || '0') || 0)

    return (
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

                    <AccountDetails />
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
    const user_id = localStorage.getItem("user_id") || ""

    const { data, isLoading, error, call } = useApi({
        url: `/user/${user_id}`,
        data: {},
        headers: {},
        method: 'GET'
    })

    function logOut() {
        localStorage.clear()
        navigate("/login")
    }

    function deleteUser() {
        call({
            url: `/user/${user_id}`,
            data: {},
            headers: {},
            method: 'DELETE'
        })

        logOut();
    }

    if (error) return <div className='d-flex full-h full-w flex-center' style={{
        flexDirection: 'column'
    }}>
        <h4>An error occured</h4>
        <p className='secondary-text'>Please try again later</p>
    </div>

    if (isLoading) return <Loading />
    return (
        <div className="themes-wrapper user-wrapper">
            {data ?
                <div className="user-details">
                    <div className="user-detail">
                        <p>Nickname:</p>
                        <h3>{data.nickname}</h3>
                    </div>
                    <div className="user-detail">
                        <p>Creation date:</p>
                        <h3>{convertTimeFormat(data.creation_date)}</h3>
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