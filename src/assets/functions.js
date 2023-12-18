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

export  function syncFiles() {
    const newNotes = []

    fs.readdirSync('notes').forEach((file_name) => {
      const noteContent = fs.readFileSync(`notes/${file_name}`, 'utf8')

      newNotes.push({
        title: file_name.slice(0, -4),
        text: noteContent
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
    }

  }

  let divIdx = text.indexOf('<')
  if(divIdx === -1) {
    text = `<div>${text}</div>`
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


  return htmlArr.join('')
}