// import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"

let sportolok = [
  {"name": "Kovács Ferenc", "sport": "tenisz", "dateOfBirth": "2000", "category": "felnőtt", "team": true},
  {"name": "Kovács Béla", "sport": "cyclocross", "dateOfBirth": "2008", "category": "U19", "team": false},
  {"name": "Farkas Antal", "sport": "foci", "dateOfBirth": "2010", "category": "U17", "team": true},
  {"name": "Kegyes Pál", "sport": "XCO", "dateOfBirth": "2008", "category": "U19", "team": true},
  {"name": "Nagy János", "sport": "XCM", "dateOfBirth": "2007", "category": "U21", "team": false},
]


let show = (sportolok) => {


  let table = document.getElementById("sportolokTable");
  
  let stable = document.createElement("table")
  let thead = document.createElement("thead")
  let headRow = document.createElement("tr")
  let hname = document.createElement("th")
  hname.innerHTML = "Név"
  headRow.appendChild(hname)

  let hsport = document.createElement("th")
  hsport.innerHTML = "Sport"
  headRow.appendChild(hsport)

  let hdateOfBirth = document.createElement("th")
  hdateOfBirth.innerHTML = "Születési év"
  headRow.appendChild(hdateOfBirth)

  let hcategory = document.createElement("th")
  hcategory.innerHTML = "Kategória"
  headRow.appendChild(hcategory)

  let hteam = document.createElement("th")
  hteam.innerHTML = "Csapat"
  headRow.appendChild(hteam)

  let hdelete = document.createElement("th")
  hdelete.innerHTML = "Törlés"
  headRow.appendChild(hdelete)

  thead.appendChild(headRow)
  stable.appendChild(thead)

  let tbody = document.createElement("tbody")

  sportolok.forEach(element => {
    let row = document.createElement("tr");

    let sname = document.createElement("td")
    sname.innerHTML = element.name
    row.appendChild(sname)

    let ssport = document.createElement("td")
    ssport.innerHTML = element.sport
    row.appendChild(ssport)


    let sdateOfBirth = document.createElement("td")
    sdateOfBirth.innerHTML = element.dateOfBirth
    row.appendChild(sdateOfBirth)

    let scategory = document.createElement("td")
    scategory.innerHTML = element.category
    row.appendChild(scategory)

    let steam = document.createElement("td")
    let steamcheckbox = document.createElement("input")
    steamcheckbox.type = "checkbox"
    steamcheckbox.checked = element.team
    steamcheckbox.addEventListener("change", () => {
      element.team = steamcheckbox.checked
    })
    steam.appendChild(steamcheckbox)
    row.appendChild(steam)

    let sdelete = document.createElement("td")
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Törlés"
    deleteButton.className = "btn btn-danger"
    deleteButton.addEventListener("click", () => {
      sportolok.splice(sportolok.indexOf(element), 1)
      show(sportolok)
    })
    sdelete.appendChild(deleteButton)
    row.appendChild(sdelete)

    tbody.appendChild(row)
    
  });

stable.appendChild(tbody)
stable.className = "table table-striped table-hover"

if (table.firstChild) {
  table.firstChild.remove()
}

table.appendChild(stable)

}


let getSportoloFromForm = () => {
  let name = document.getElementById("name").value
  let sport = document.getElementById("sport").value
  let dateOfBirth = document.getElementById("dateOfBirth").value
  let category = document.getElementById("category").value
  let team = document.getElementById("team").checked

  if (!name || !sport || !dateOfBirth || !category) {
    alert("Kérlek töltsd ki az összes mezőt!")
    return null
  }
  sportolok.push({ name, sport, dateOfBirth, category, team })
  show(sportolok)
}




let init = () => {
  console.log("init called")
  show(sportolok)

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    getSportoloFromForm();
  
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init(); 
}
)
