type paletteType = {
    color60: string, 
    color30: string, 
    accent: string, 
    background: string, 
    background_contrast: string, 
    text: string, 
    secondary_text: string, 
    third_text: string, 
}

type themeType = {
    name: string,
    palette: paletteType
}

type NoteType = {
    id: string,
    title: string,
    content: string,
    lastUpdate: string,
    creationDate: string,
    author: string,
}

type ContextDataType = {
    top: number,
    left: number,
    noteWidth: number,
    note_id: number
}


type UserType = {
    id: number,
    is_active: boolean,
    is_staff: boolean,
    is_superuser: boolean,
    last_login: string,
    nickname: string,
    password: string,
    user_permissions: [],
    creation_date: string,
    groups: []
}