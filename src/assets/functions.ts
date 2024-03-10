
export function getNewName(notes: NoteType[]) {
    let i = 2
    
    const existDefault = notes.find((note: NoteType) => {
      return note.title === 'First Note'
    })
    if(!existDefault) return "First Note"

    function exist(title: string) {
      return notes.find((note: NoteType) => {
        return note.title === title
      })
    }

    while(exist(`Note_${i}`)) {
      i++
    }
    
    return `Note_${i}`
}

export function markdownToHtml(text: string) {
  if(!text) return ' '
  
  text = text.replaceAll("<div>", '')
  text = text.replaceAll('&nbsp;', '<br>')
  let textArr = text.split("</div>")
  
  if(textArr.length === 1) {
    textArr[0] = `<div>${textArr[0]}</div>`
  }
  
  const markdownElements: any = {
    "###": {
      start: '<h1>',
      end: "</h1>",
      wrap: function(text: string) {
        return this.start + text.slice(3) + this.end 
      }
    },
    "##": {
      start: '<h2>',
      end: "</h2>",
      wrap: function(text: string) {
        return this.start + text.slice(2) + this.end 
      }
    },
    "#": {
      start: '<h3>',
      end: "</h3>",
      wrap: function(text: string) {
        return this.start + text.slice(1) + this.end 
      }
    },
    "%%": {
      start: '<div class="content-tag">',
      end: "</div>",
      wrap: function(text: string) {
        return "<br>" + this.start + text.slice(2) + this.end
      }
    },
    "!(": {
      wrap: function(text: string) {
        return `<br><img class="content-image" alt="URL INVALID" src="${text.slice(2, -1)}" />`
      }
    },
  
  }

  for(let idx in textArr) {    
    let line = textArr[idx]

    for(let prefix in markdownElements) {
      let wordPrefix = line.slice(0, prefix.length)      
      if(wordPrefix === prefix) {
        let newLine = markdownElements[prefix].wrap(line.slice(wordPrefix.length - 1))
        console.log(line, newLine);
        
        textArr[idx] = `<div>${newLine}</div>`
      }
    }
  }

  return textArr.join('')
}

export function themeHandler(palette: paletteType, index: number) {
  let root: any = document.querySelector(':root');

  Object.entries(palette).forEach((color) => {
      root.style.setProperty(`--${color[0]}`, color[1]);
  })

  localStorage.setItem('themeIndex', index.toString())
}

export function convertTimeDifference(creation_date: string, last_update: string) {
  const date = new Date(last_update)
  var fullMonth = ["January", "February", "March", "April", "May", "June", "July","August", "September", "Octomber", "November", "December"];
    
  return `${date.getDate()} ${fullMonth[date.getMonth()]}`

  // const seconds = Math.floor(diff / 3600);

  // let minutes = Math.floor(seconds / 60);
  // let hours = Math.floor(seconds / 3600);
  // let days = Math.floor(seconds / ( 3600 * 24));
  
  // if(days) {
  //     if(days > 365) return 'Over an year'

  //     return days + (days > 1 ? ` days ago`: ' day ago')
  // } else if(hours) {
  //   return hours + (hours > 1 ? ` hours ago`: ' hour ago')
  // } else if(minutes) {
  //     return minutes +( minutes > 1 ? ` minutes ago`: ' minute ago')
  // }else if(seconds) {
  //   return `${seconds} seconds ago`
  // }else {
  //   return 'Right now'
  // }

}

export function convertTimeFormat(time: any) {
  const date = new Date(time)

  const minutes = date.getMinutes()
  const hour = date.getHours()
  const day = date.getDate()
  const month = date.getMonth()

  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return `${day} ${months[month]} ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

}