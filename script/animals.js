let animalsList = new Array();

const animalFilters = {
  nameFilter: 'none',
  continentFilter: 'none',
  classFilter: 'none',
}

const classificationDropdown = document.querySelectorAll('.classification-dropdown');
const classificationListButtons = [...classificationDropdown].map(dropdownToggleEl => {
  dropdownToggleEl.addEventListener("click", (e)=> {
    const classificationSelected = e.target.value;
    const classificationButton = document.getElementById('classification-button');
    
    animalFilters.classFilter = classificationSelected;
    filterAnimals();

    if (classificationSelected != 'none') {
      classificationButton.innerHTML = classificationSelected;
      classificationButton.classList.remove('btn-secondary');
      classificationButton.classList.add('btn-primary');
    } else {
      classificationButton.innerHTML = 'Classification';
      classificationButton.classList.remove('btn-primary');
      classificationButton.classList.add('btn-secondary');
    }
    
  })
})

const continentDropdown = document.querySelectorAll('.continent-dropdown');
const continentListButtons = [...continentDropdown].map(dropdownToggleEl => {
  dropdownToggleEl.addEventListener("click", (e)=> {
    const continentSelected = e.target.value;
    const continentButton = document.getElementById('continent-button');
    
    animalFilters.continentFilter = continentSelected;
    filterAnimals();
    

    if (continentSelected != 'none') {
      continentButton.innerHTML = continentSelected;
      continentButton.classList.remove('btn-secondary');
      continentButton.classList.add('btn-primary');
    } else {
      continentButton.innerHTML = 'Continent';
      continentButton.classList.remove('btn-primary');
      continentButton.classList.add('btn-secondary');
    }

    
    
  })
})



function filterAnimals() {
  let animalsListFiltered = JSON.parse(JSON.stringify(animalsList)).filter((animal) => {
    let classFilter = true;
    let continentFilter = true;
    
    if (animalFilters.classFilter != 'none') {
      classFilter = animal.classification == animalFilters.classFilter;
    }
    if (animalFilters.continentFilter != 'none') {
      continentFilter = animal.continent == animalFilters.continentFilter;
    }
    
    return classFilter && continentFilter;

  });
  console.log(animalsListFiltered);
  displayAnimals(animalsListFiltered);
}

getAnimals()

function getAnimals() {
  fetch('script/animals.json')
  .then((response)=> response.json())
  .then((animals) => {
    animalsList = [...animals];
    displayAnimals(animals);
  })
}


function displayAnimals(animals) {
  const animalsDiv = document.getElementById("animals");
  animalsDiv.innerHTML = "";
  for (const animal of animals) {
    let colDiv = document.createElement("div");
    colDiv.className = "col";

    let cardDiv = document.createElement("div");
    cardDiv.className = "card shadow-sm";

    // Create the image element with class "card-img-top"
    let imgElement = document.createElement("img");
    imgElement.src = "images/tiger.jpg";
    imgElement.className = "card-img-top";
    imgElement.alt = "...";

    // Create the div with class "card-body"
    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    // Create the h5 element with class "card-title"
    var h5Element = document.createElement("h4");
    h5Element.className = "card-title";
    h5Element.textContent = animal.name;

    // Create the p element with class "card-text"
    let pElement = document.createElement("p");
    pElement.className = "card-text";
    pElement.textContent = animal.long_description;

    // Append the elements to build the structure
    cardBodyDiv.appendChild(h5Element);
    cardBodyDiv.appendChild(pElement);
    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);
    animalsDiv.appendChild(colDiv);
  } 
}