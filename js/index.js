let currentPage = 1
let allMonstersDiv = document.querySelector("#monster-container")
let createMonsterDiv = document.querySelector("#create-monster")

const getAllMonsters = (pageNumber) => {
    
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(r => r.json())
    .then((monstersObj) => {
        monstersObj.forEach((monster)=> {
            let newMonster = createMonsterElements(monster)
            allMonstersDiv.append(newMonster)
        })
    })
}

let monsterForm = document.createElement("form")
    monsterForm.setAttribute("id", "monster-form")
let monsterName = document.createElement("input")
    monsterName.setAttribute("id", "name")
    monsterName.setAttribute("placeholder", "name...")
let monsterAge = document.createElement("input")
    monsterAge.setAttribute("id", "age")
    monsterAge.setAttribute("placeholder", "age..")
let monsterDescription = document.createElement("input")
    monsterDescription.setAttribute("id", "description")
    monsterDescription.setAttribute("placeholder", "description")
let submit = document.createElement("input")
    submit.setAttribute("type" ,"submit")
    submit.setAttribute("value", "Create")
monsterForm.append(monsterName, monsterAge, monsterDescription, submit)
createMonsterDiv.append(monsterForm)

function createNewMonster(){
    
    monsterForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        let inputName = evt.target.name.value
        let inputAge= evt.target.age.value
        let inputDescription = evt.target.description.value
        
        fetch("http://localhost:3000/monsters", {
          method:'POST',
          headers: { 
             'Content-type': 'application/json',
             'Accept': 'application/json'
          },
          body: JSON.stringify({
              name: inputName,
              age: inputAge,
              description: inputDescription
          })
        })
        .then(r => r.json())
        .then((newMonster) => {
            createMonsterElements(newMonster) 
        })
    })
}


function createMonsterElements(monster){
    let monsterDiv = document.createElement("div")
    let monsterName = document.createElement("h2")
        monsterName.innerText = monster.name
    let monsterAge = document.createElement("h4")
        monsterAge.innerText = `Age: ${monster.age}`
    let monsterDescription = document.createElement("p")
        monsterDescription.innerText = `Bio: ${monster.description}`
    monsterDiv.append(monsterName, monsterAge, monsterDescription)
    return monsterDiv
}


function handleBackButton(){
    let backButton = document.querySelector("#back")
    backButton.addEventListener("click", (evt) => {
        if (currentPage === 1) {
            return; 
        } 
        allMonstersDiv.innerText = ""
        currentPage -= 1
        getAllMonsters(currentPage)
        // console.log(currentPage)
    })
}

function handleForwardButton(){
    let forwardButton = document.querySelector("#forward")
    forwardButton.addEventListener("click", (evt) => {
        allMonstersDiv.innerText = ""
        currentPage += 1
        getAllMonsters(currentPage)
        // console.log(currentPage)
    })
}
getAllMonsters()
handleBackButton()
handleForwardButton()
createNewMonster()
// createMonsterElements()