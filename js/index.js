let page = 1

let monsterArea = document.getElementById("monster-container")
let monsterFormArea = document.getElementById("create-monster")
let forwardButton = document.getElementById("forward")
forwardButton.innerText = "More Monsters!"
let backButton = document.getElementById("back")
backButton.remove()

let newMonsterForm = document.createElement("form")
let newMonsterName = document.createElement("input")
let newMonsterAge = document.createElement("input")
let newMonsterDescription = document.createElement("input")
let createNewMonster = document.createElement("input")
newMonsterName.type = "text"
newMonsterName.name = "name"
newMonsterName.placeholder = "name"

newMonsterAge.type = "number"
newMonsterAge.name = "age"
newMonsterAge.placeholder = "age"

newMonsterDescription.type = "text"
newMonsterDescription.name = "description"
newMonsterDescription.placeholder = "description"

createNewMonster.type = "submit"
createNewMonster.name = "submit"

newMonsterForm.append(newMonsterName, newMonsterAge, newMonsterDescription, createNewMonster)
monsterFormArea.append(newMonsterForm)



function getMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(r => r.json())
    .then((monsters) => {
      monsters.forEach((monster) => {
          addMonsterToPage(monster)
      })  
    })
}

function addMonsterToPage(monster) {
    let monsterDiv = document.createElement("div")
    let monsterH3 = document.createElement("h3")
    let monsterP = document.createElement("p")
    let monsterH5 = document.createElement("h5")
    monsterH3.innerText = `${monster.name}`
    monsterH5.innerText = `Age: ${monster.age}`
    monsterP.innerText = `${monster.description}`
    monsterDiv.append(monsterH3, monsterH5, monsterP)
    monsterArea.append(monsterDiv)
}

getMonsters(page)

forwardButton.addEventListener("click", (event) => {
    page++
    getMonsters(page)
})

newMonsterForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let customName = event.target.name.value
    let customAge = event.target.age.value
    let customDescription = event.target.description.value

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "name": customName,
            "age": customAge,
            "description": customDescription
        })
    })
    .then(r => r.json())
    .then((monster) => {
        addMonsterToPage(monster)
    })
    event.target.reset()
})