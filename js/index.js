let pageNum = 1
let limit = 3
document.addEventListener('DOMContentLoaded',() => {
    console.log('done')

monsterForm()
fetchMonsters(limit,pageNum)
navButtons()
})

let fetchMonsters = (limit,pageNum) => {
 const url = `http://localhost:3000/monsters?_limit=${limit}&_page=${pageNum}`
 fetch(url, {
   method:'GET',
  headers: { 
      'Content-type': 'application/json',
      'accept': 'application/json',
  },
 })
 .then(resp => resp.json())
//  .then(json_resp => {addMonsterDiv(json_resp)})
.then(addMonsterDiv)
 .catch((error) => {console.error(error);})
 
 
}

let monsterForm = () => {
    let newMonsterFormDiv = document.querySelector('#create-monster')
    let newMonsterForm = document.createElement('form')
    newMonsterForm.setAttribute('id','monster-form')
    let newMonsterName = document.createElement('input')
    newMonsterName.setAttribute('id', 'name')
    newMonsterName.setAttribute('placeholder','name...')
    let newMonsterAge = document.createElement('input')
    newMonsterAge.setAttribute('id', 'age')
    newMonsterAge.setAttribute('placeholder','age...')
    let newMonsterBio = document.createElement('input')
    newMonsterBio.setAttribute('id', 'description')
    newMonsterBio.setAttribute('placeholder','description...')
    let newMonsterButton = document.createElement('button')
    newMonsterButton.innerText = 'create'

    newMonsterForm.append(newMonsterName, newMonsterAge,newMonsterBio,newMonsterButton)
    newMonsterFormDiv.append(newMonsterForm)

    newMonsterForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let monsterName = event.target.name.value
        let monsterAge = event.target.age.value
        let monsterBio = event.target.description.value

        const url = `http://localhost:3000/monsters`
        fetch(url, {
          method:'POST',
         headers: { 
             'Content-type': 'application/json',
             'accept': 'application/json'
         },
         body: JSON.stringify({
         name: monsterName,
         age: monsterAge,
         description: monsterBio
          })
        })
        .then(resp => resp.json())
        .then(json_resp => {
            console.log(json_resp)
            addMonsterDiv

        })
        // .then(addMonsterDiv)
        .catch((error) => {console.error(error);})
        event.target.reset()
    })
    
}


let addMonsterDiv = (monsterObj) => {
    let monsterContainer = document.querySelector('#monster-container')
    
    // monsterObj = monsterObj.sort(function(a, b){
    //     return(a.id - b.id)
    // })
    // console.log
    monsterObj.forEach((indivMonster) => {
        
        let monsterDiv = document.createElement('div')
        let monsterH2 = document.createElement('h2')
        let monsterH4 = document.createElement('h4')
        let monsterP = document.createElement('p')
        monsterH2.innerText = indivMonster.name
        monsterH4.innerText = `Age: ${indivMonster.age}`
        monsterP.innerText = `Bio: ${indivMonster.description}`
        monsterDiv.append(monsterH2,monsterH4,monsterP)
        monsterContainer.append(monsterDiv)

    })
    
   
}

let navButtons = (oldMonster) => {
    let backButton = document.querySelector('#back')
    let forwardButton = document.querySelector('#forward')

    backButton.addEventListener('click', () => {
        if(pageNum === 1){
            alert('No more monsters in the back')
        }
        else{
            removeMonsters()
            fetchMonsters(limit,--pageNum)
        }
       
    })
    
    forwardButton.addEventListener('click', () => {
        removeMonsters()
        fetchMonsters(limit,++pageNum)

    })
}

let removeMonsters = () => {
   let div = document.querySelectorAll('#monster-container div')
   div.forEach((element) => {
       element.remove()
   })
}

