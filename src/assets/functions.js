const fs = window.require('fs')

export function getNewName() {
    const names = fs.readdirSync('notes')
    let i = 2;

    if(names.indexOf("Untitled.txt") === -1) return `Untitled`
    while(names.indexOf(`Untitled_${i}.txt`) !== -1) {
      i++
    } 
    
    return `Untitled_${i}`
}

export function syncFiles() {
  const newNotes = []
  let i = 0
  if (!fs.existsSync('notes')){
    fs.mkdirSync('notes');
  }

  fs.readdirSync('notes').forEach((file_name) => {
    const stats = fs.statSync(`notes/${file_name}`)
    const noteContent = fs.readFileSync(`notes/${file_name}`, 'utf8')

    newNotes.push({
      title: file_name.slice(0, -4),
      text: noteContent,
      lastModified: Math.floor(stats.mtimeMs),
      creationDate: stats.birthtimeMs,
      id: i++
    })

  })

  return newNotes
}

export function markdownToHtml(text) {
  if(!text) return ' '

  text = text.replaceAll("<div>", '')
  text = text.replaceAll("</div>", ' ')

  const markup = {
    "###": {
      start: '<h1>',
      end: "</h1>",
      wrap: function(text) {
        return this.start + text.slice(3) + this.end 
      }
    },
    "##": {
      start: '<h2>',
      end: "</h2>",
      wrap: function(text) {
        return this.start + text.slice(2) + this.end 
      }
    },
    "#": {
      start: '<h3>',
      end: "</h3>",
      wrap: function(text) {
        return this.start + text.slice(1) + this.end 
      }
    },
    "%%": {
      start: '<div class="content-tag">',
      end: "</div>",
      wrap: function(text) {
        return "<br>" + this.start + text.slice(2) + this.end
      }
    },
    "!(": {
      wrap: function(text) {
        return `<br><img class="content-image" alt="URL INVALID" src="${text.slice(2, -1)}" />`
      }
    },
  
  }
  console.log(text);
  text = text.split(' ')
  console.log(text);
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

export function themeHandler(palette, index) {
  let root = document.querySelector(':root');

  Object.entries(palette).forEach((color) => {
      root.style.setProperty(`--${color[0]}`, color[1]);
  })

  localStorage.setItem('themeIndex', index)
}

export function convertMsToCurrentDate(ms) {
  const seconds = Math.floor((new Date().getTime() - ms) / (60 * 17));

  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(seconds / 3600);
  let days = Math.floor(seconds / ( 3600 * 24));
  
  if(days) {
      if(days > 365) return 'Over an year'

      return days + (days > 1 ? ` days ago`: ' day ago')
  } else if(hours) {
    return hours + (hours > 1 ? ` hours ago`: ' hour ago')
  } else if(minutes) {
      return minutes +( minutes > 1 ? ` minutes ago`: ' minute ago')
  }else if(seconds) {
    return `${seconds} seconds ago`
  }else {
    return 'Right now'
  }

}