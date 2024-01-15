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
  let htmlArr = []

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
  
  let divIdx = text.indexOf('<')
  if(divIdx === -1) {
    text = `<div>${text}</div>`
  }else {
    htmlArr.push(`<div>${text.slice(0, divIdx)}</div>`)
  }

  for(let i = 0; i < text.length - 4; i++) {
    let div = text.slice(i, i + 5)
    
    function isLetter(str) {
      return str.length === 1 && str.match(/[a-z]/i);
    }

    function getPrefix(sentence) {
      let prefix = ''
      
      for(let letter of sentence) {
        if(!isLetter(letter)) {
          prefix += letter
        }else {
          break
        }
      }

      return prefix
    }
    
    if(div === '<div>') {
      div = text.slice(i, i + 6)
      let sentence = ''

        while(div !== '</div>' && i < text.length - 4) {
          sentence += text[i + 5]
          div = text.slice(i + 6, i + 12)
          
          i++
        }
        
        
        const prefix = getPrefix(sentence)
        if(prefix === null) {
          htmlArr.push(sentence)
        }else {
          if(prefix in markup) {
            htmlArr.push(`<div>${markup[prefix].wrap(sentence)}</div>`)
          }else {
            htmlArr.push(`<div>${sentence}</div>`)
          }
        }
    }
  }
  
  console.log(htmlArr);

  return htmlArr.join('')
}

export function themeHandler(palette, index) {
  let root = document.querySelector(':root');

  Object.entries(palette).forEach((color) => {
      root.style.setProperty(`--${color[0]}`, color[1]);
  })

  localStorage.setItem('themeIndex', index)
}

export function convertMsToCurrentDate(ms) {
  const seconds = Math.floor((new Date().getTime() - ms) / 1200);

  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(seconds / 3600);
  let days = Math.floor(seconds / ( 3600 * 24));
  
  if(days) {
    if(days <= 1)
    return `${days} day ago`
  
    return `${days} days ago`
  } else if(hours) {
    if(hours <= 1) 
      return `${hours} hour ago`

    return `${hours} hours ago`
  } else if(minutes) {
    if(minutes <= 1) 
      return `${minutes} minute ago`

    return `${minutes} minutes ago`
  }else if(seconds) {
    return `${seconds} seconds ago`
  }else {
    return 'Right now'
  }

}