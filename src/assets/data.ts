export const COLORS = [
    "#FFFFFF",
    '#e02828',
    '#3f7fd9',
    '#d9d63f',
    '#8728e0',
    '#d728e0',
    '#28e034'
  ]

export const THEMES: themeType[] = [
    {
        name: 'Default',
        palette: {
            color60: '#4B2B8E',
            color30: '#2A1E44',
            accent: '#9C3EBD',
            background: '#181818',
            background_contrast: '#202020',
            text: '#FFFFFF',
            secondary_text: '#FFFFFF80',
            third_text: '#FFFFFF40',
        }
    },
    {
        name: 'Light',
        palette: {
            color60: '#00000060',
            color30: '#00000030',
            accent: '#000000',
            background: '#FFFFFF90',
            background_contrast: '#DDDADA',
            text: '#000000',
            secondary_text: '#00000060',
            third_text: '#00000030',
        }
    },
    {
        name: 'Nina Sheep',
        palette: {
            color60: '#D03232',
            color30: '#D0323230',
            accent: '#C65050',
            background: '#C65050',
            background_contrast: '#271212',
            text: '#FFFFFF',
            secondary_text: '#FFFFFF80',
            third_text: '#FFFFFF60',
        }
    },
    {
        name: 'Aqua',
        palette: {
            color60: '#37809760',
            color30: '#37809730',
            accent: '#3A97B5',
            background: '#153429',
            background_contrast: '#2C5244',
            text: '#FFFFFF',
            secondary_text: '#FFFFFF80',
            third_text: '#FFFFFF60',
        }
    },
    {
        name: 'Savana',
        palette: {
            color60: '#A8481F',
            color30: '#A8481F60',
            accent: '#B53A3A',
            background: '#302E1A',
            background_contrast: '#A9923F',
            text: '#FFFFFF',
            secondary_text: '#FFFFFF80',
            third_text: '#FFFFFF60',
        }
    },
    {
        name: 'Orange',
        palette: {
            color60: '#FF5C00',
            color30: '#A8481F',
            accent: '#FF5C00',
            background: '#E68615',
            background_contrast: '#F2DF7C',
            text: '#000000',
            secondary_text: '#00000080',
            third_text: '#00000060',
        }
    },
]


export const animation_fade = {
    hidden: {
        transform: 'translateY(50%) scale(0)'
    },
    visible: {
        transform: 'translateY(0%) scale(1)'
    }
}

export const scale = {
    hidden: {
        x: "10%",

        opacity: 0,
    },
    
    visible: {
        x: "0%",
        opacity: 1,
        transition: {
            ease: 'easeInOut',
            duration: '.3'
        }

    }
}