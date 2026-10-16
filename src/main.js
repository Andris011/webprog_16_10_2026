// import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"
import uniqBy from 'lodash/uniqBy';
import dayjs from "dayjs";
import { orderBy } from "lodash";

let sportolok = [
  {"id": "1", "name": "Kovács Ferenc", "sport": "tenisz", "dateOfBirth": dayjs("2002-11-03"), "category": "felnőtt", "team": true},
  {"id": "2", "name": "Kovács Béla", "sport": "cyclocross", "dateOfBirth": dayjs("2008-02-03"), "category": "U19", "team": false},
  {"id": "3", "name": "Farkas Antal", "sport": "foci", "dateOfBirth": dayjs("2010-02-23"), "category": "U17", "team": true},
  {"id": "4", "name": "Kegyes Pál", "sport": "XCO", "dateOfBirth": dayjs("2008-11-22"), "category": "U19", "team": true},
  {"id": "5", "name": "Nagy János", "sport": "XCM", "dateOfBirth": dayjs("2007-01-12"), "category": "U21", "team": false},
  {"id": "5", "name": "Nagy Ferenc", "sport": "kosárlabda", "dateOfBirth": dayjs("1999-01-16"), "category": "felnőtt", "team": false}
]


let show = (sportolok) => {

  console.log(sportolok); // ellenorzes celjabol hogy valtozik e minden ahogy illik neki

  uniqList(sportolok, "id")

  console.log(sportolok)

  let table = document.getElementById("sportolokTable");
  
  let stable = document.createElement("table")
  let thead = document.createElement("thead")
  let headRow = document.createElement("tr")

  let hid = document.createElement("th")
  hid.textContent = "ID"
  headRow.appendChild(hid)

  let hname = document.createElement("th")
  hname.textContent = "Név"
  headRow.appendChild(hname)

  let hsport = document.createElement("th")
  hsport.textContent = "Sport"
  headRow.appendChild(hsport)

  let hdateOfBirth = document.createElement("th")
  hdateOfBirth.textContent = "Születési idő"
  headRow.appendChild(hdateOfBirth)

  let hcategory = document.createElement("th")
  hcategory.textContent = "Kategória"
  headRow.appendChild(hcategory)

  let hteam = document.createElement("th")
  hteam.textContent = "Csapat"
  headRow.appendChild(hteam)

  let hdelete = document.createElement("th")
  hdelete.textContent = "Törlés"
  headRow.appendChild(hdelete)

  thead.appendChild(headRow)
  stable.appendChild(thead)

  let tbody = document.createElement("tbody")

  sportolok.forEach(element => {
    let row = document.createElement("tr");

    let sid = document.createElement("td")
    sid.textContent = element.id
    row.appendChild(sid) 

    let sname = document.createElement("td")
    sname.textContent = element.name
    row.appendChild(sname)

    let ssport = document.createElement("td")
    ssport.textContent = element.sport
    row.appendChild(ssport)


    let sdateOfBirth = document.createElement("td")
    sdateOfBirth.textContent = `${element.dateOfBirth.format('YYYY/MM/DD')} (${dayjs().diff(element.dateOfBirth, "year")} éves)`
    row.appendChild(sdateOfBirth)

    let scategory = document.createElement("td")
    scategory.textContent = element.category
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
    deleteButton.textContent = "Törlés"
    deleteButton.className = "btn btn-danger"
    deleteButton.addEventListener("click", () => {
      sportolok.splice(sportolok.indexOf(element), 1)
      show(sportolok)
    })
    sdelete.appendChild(deleteButton)
    row.appendChild(sdelete)

    tbody.appendChild(row)
    

    document.getElementById("current_date").textContent = dayjs().format("YYYY. MM. DD.")
  });

stable.appendChild(tbody)
stable.className = "table table-striped table-hover"

if (table.firstChild) {
  table.firstChild.remove()
}

table.appendChild(stable)

}


let getSportoloFromForm = () => {
  let sid = document.getElementById("sid").value // szandekosan lehet szamon kivul mas is az ID
  let name = document.getElementById("name").value
  let sport = document.getElementById("sport").value
  let dateOfBirth = dayjs(document.getElementById("dateOfBirth").value)
  let category = document.getElementById("category").value
  let team = document.getElementById("team").checked

  if (!sid || !name || !sport || !dateOfBirth || !category) {
    alert("Kérlek töltsd ki az összes mezőt!")
    return null
  }
  sportolok.push({"id": sid, name, sport, dateOfBirth, category, team })
  show(sportolok)
}


let uniqList = (list, key) => {
  list.splice(0, list.length, ...uniqBy(list, key));
};


let orderList = () => {
  sportolok = orderBy(sportolok, [element => element.name.toLowerCase()], [document.getElementById("order").value])
  show(sportolok)
}


let init = () => {
  show(sportolok)

  document.getElementById("sform").addEventListener("submit", (event) => {
    event.preventDefault();
    getSportoloFromForm();
  });

  document.getElementById("order").addEventListener("change", orderList)
}

document.addEventListener("DOMContentLoaded", () => {
  init(); 
}
)
