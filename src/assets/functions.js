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
  let htmlText = ''
  let htmlArr = []
  let i = 0
  
  
  while(i < text.length) {
    let str = '', tag = ''
    while(text[i] !== '<' && i < text.length) {
      str += text[i]
      i++
    }
    
    while(text[i] !== '>' && i < text.length) {
      tag += text[i]
      i++
    }
    tag += text[i++]


    htmlArr.push(str)
    htmlArr.push(tag)
  }
    
    
  
  return htmlArr.join('')
}