monsters = []
let monsterContainer = document.getElementById("monster-container")
let createMonsterDiv = document.getElementById("create-monster")
let forwardButton = document.getElementById("forward")
let backButton = document.getElementById("back")
let pageNumber = 1

function loadPage(pageNumber){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(resp => resp.json())
    .then(monsterArr => {
        monsterArr.forEach((monster) => {
                addMonsterToPage(monster)
        })
    })
}
loadPage(pageNumber)

function addMonsterToPage(monster){
    let monsterName = document.createElement("h2")
    monsterName.innerText = monster.name

    let monsterAge = document.createElement("p")
    monsterAge.innerText = monster.age

    let monsterDesc = document.createElement("p")
    monsterDesc.innerText = monster.description

    monsterContainer.append(monsterName, monsterAge, monsterDesc)
}

let monsterForm = document.createElement("form")
monsterForm.className = "create-monster"
// monsterForm.method = "POST"
// monsterForm.action = "http://localhost:3000/monsters"
let newMonsterName = document.createElement("input")
newMonsterName.id = "name"
newMonsterName.placeholder = "Name..."

let newMonsterAge = document.createElement("input")
newMonsterAge.id = "age"
newMonsterAge.placeholder = "Age..."

let newMonsterDesc = document.createElement("input")
newMonsterDesc.id = "description"
newMonsterDesc.placeholder = "Description..."

let createMonsterButton = document.createElement("button")
createMonsterButton.innerText = "Create Monster!"

monsterForm.append(newMonsterName, newMonsterAge, newMonsterDesc, createMonsterButton)
createMonsterDiv.append(monsterForm)

monsterForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    
    fetch(`http://localhost:3000/monsters`, {
     method:'POST',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
        name: evt.target.name.value, 
        age: evt.target.age.value, 
        description: evt.target.description.value
     })
    })
    .then(resp => resp.json())
    .then(newMonsterObj => addMonsterToPage(newMonsterObj))
})

forwardButton.addEventListener("click", ()=>{
    monsterContainer.innerText = ""
    pageNumber+= 1
    loadPage(pageNumber)
})

backButton.addEventListener("click", ()=>{
    monsterContainer.innerText = ""
    pageNumber--
    loadPage(pageNumber)
})