const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

//"curried function" (=>  =>)
// "..." = a spread operator
//"fns" = shortcut for function
// "${}" = like removing contents from a wrapper
const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
// straight brackets []= array and curly brackets {}= the object
const makePoemHTML = ([{title, author, lines}]) => {
  let titleTag= makeTag("h2")(title)
// "pipe" = like a pipeline of actions (like going down a grocery aisle for ingredients on a list in order)
  let authorName= pipe(makeTag("em"), makeTag ("h3"))(`by ${author}`)
console.log(lines)
//"stanzas" will hold multiple arrays inside of it, and each inner array = 1 stanza
  let stanzas=[]
// "stanza" holds all of the lines that make up one stanza
  let stanza=[]
  lines.forEach((line,index)=>{
    if(!line){ 
//"push" adds a value to the end of the array
    stanzas.push(stanza)
    stanza=[]
// "==" compares two values to see if they're the same value, "===" compares value and the type
    }else if(index===lines.length-1){
//falsey values = 0, -0, 0n, empty strings, null, undefined, NaN ("not a number")
    stanza.push(line)
    stanzas.push(stanza)
    }else{
    stanza.push(line)
    }
  })
    let stanzasStr=""
    stanzas.forEach(stanzaArr=>{
//"join" takes all elements of an array and smooshes them together in a single string, whatever is in the "" gets tucked in between each element (like a layered cake, aka the frosting or whatever between cake layers)
    stanzasStr+=makeTag("p")(stanzaArr.join("<br/>")) //"br"=line break
    })
  return `${titleTag}${authorName}${stanzasStr}`
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
