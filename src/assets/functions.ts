
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
  text = text.replaceAll("</div>", ' ')

  // const markup = {
  //   "###": {
  //     start: '<h1>',
  //     end: "</h1>",
  //     wrap: function(text: string) {
  //       return this.start + text.slice(3) + this.end 
  //     }
  //   },
  //   "##": {
  //     start: '<h2>',
  //     end: "</h2>",
  //     wrap: function(text: string) {
  //       return this.start + text.slice(2) + this.end 
  //     }
  //   },
  //   "#": {
  //     start: '<h3>',
  //     end: "</h3>",
  //     wrap: function(text: string) {
  //       return this.start + text.slice(1) + this.end 
  //     }
  //   },
  //   "%%": {
  //     start: '<div class="content-tag">',
  //     end: "</div>",
  //     wrap: function(text: string) {
  //       return "<br>" + this.start + text.slice(2) + this.end
  //     }
  //   },
  //   "!(": {
  //     wrap: function(text: string) {
  //       return `<br><img class="content-image" alt="URL INVALID" src="${text.slice(2, -1)}" />`
  //     }
  //   },
  
  // }

  // let text_split = text.split(' ')
  let convertedString = text


  // for(let i = 0; i < text.length; i++) {
  //   let line = text[i]
  //   let str = line
    
  //   for(let prefix in markup) {
  //     if(line.slice(0, prefix.length) === prefix) {
  //       str = markup[prefix].wrap(line)

  //       break;      
  //     }
  //   }
    
  //   console.log(`Str: ${str}`);
  //   convertedString += str 
  // }

  // console.log(`Converted: ${convertedString}`);
  return convertedString
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
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return `${date.getDate()} ${month[date.getMonth()]} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`

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