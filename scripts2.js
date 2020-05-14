const types = {
  "Water": {
    "active": false,
    "weakness": ["Grass", "Electric"]
  },
  "Grass": {
    "active": false,
    "weakness": ["Flying", "Poison", "Bug", "Fire", "Ice"]
  },
  "Normal": {
    "active": false,
    "weakness": ["Fighting"]
  },
  "Fighting": {
    "active": false,
    "weakness": ["Flying", "Fairy", "Psychic"] 
  },
  "Flying": {    
    "active": false,
    "weakness": ["Rock", "Electric", "Ice"]
  },
  "Poison" : {
    "active": false,
    "weakness": ["Ground", "Psychic"]
  },
  "Ground": {
    "active": false,
    "weakness": ["Water", "Grass", "Ice"]
  },
  "Rock": {
    "active": false,
    "weakness": ["Fighting", "Ground", "Steel", "Water", "Grass"]
  },
  "Bug": {
    "active": false,
    "weakness": ["Flying", "Rock", "Fire"]
  },
  "Ghost": {
    "active": false,
    "weakness": ["Ghost", "Dark"]
  },
  "Steel": {
    "active": false,
    "weakness": ["Fighting", "Ground", "Fire"]
  },
  "Electric": {
    "active": false,
    "weakness": ["Ground"]
  },
  "Psychic": {
    "active": false,
    "weakness": ["Bug", "Ghost", "Dark"]
  },
  "Ice": {
    "active": false,
    "weakness": ["Fighting", "Rock", "Steel", "Fire"]
  },
  "Dragon": {
    "active": false,
    "weakness": ["Ice", "Dragon", "Fairy"]
  },
  "Dark": {
    "active": false,
    "weakness": ["Fighting", "Bug", "Fairy"]
},
"Fairy": {
    "active": false,
    "weakness": ["Poison", "Steel"]
},
"Fire": {
    "active": false,
    "weakness": ["Ground", "Rock", "Water"]
}
}
const activeTypes = [];
let weaknessStore = [];
let activeCount = 0;

// pushes type from Button to activeTypes 
// Input = String e.g. "Fire"
// get Types from activeTypes and apply them to commonWeakness array and apply helpers to sort business logic

function pushType(input) {
    if(!activeTypes.includes(input)){
        activeTypes.push(input);
        for (let i = 0; i < activeTypes.length; i++) {
            sortDupsHelper(types[activeTypes[i]].weakness);
        }
    }
    activeCheck(input);
    console.log(activeTypes);
    console.log(weaknessStore);
    console.log(activeCount);
}


// CommonWeakness helper that sorts duplicates. Called from inside getWeakness
// ensures no dups get posted on the screen
function sortDupsHelper(weaknessArr) {
    for(let i = 0; i < weaknessArr.length; i++) {
        if(!weaknessStore.includes(weaknessArr[i])){
            weaknessStore.push(weaknessArr[i]);
        }
    }
}



// Removes types from activeType 
// and also weaknessArr. But needs to check if other type also has weakness
// activeType needs to be a string and match the type e.g. "Fire"

function removeWeakness(activeType) {
    removeActiveTypeHelper(activeType);
}

// activeType needs to be a string and match the type e.g. "Fire"
function removeActiveTypeHelper(activeType) {
    var index = activeTypes.indexOf(activeType);
    if (index !== -1) {
        activeTypes.splice(index, 1);
        removeCommonWeakness(activeType);
    }
}

// param removedType = 'Fire' or whatever type user clicks
function removeCommonWeakness(removedType) {
    weaknessStore = [];

    for(let i = 0; i < activeTypes.length; i++) {
        // these should be the types that are in the common weakness that need to be checked for duplicates 
        for(let x = 0; x < types[activeTypes[i]].weakness.length; x++){
            weaknessStore.push(types[activeTypes[i]].weakness[x])
        }
    }
}
function disableButtons(){
  var buttonss = document.querySelectorAll("button.innactive");
        if (activeCount === 2){
            for (i = 0; i < buttonss.length; i++){
                buttonss[i].disabled = true;
                console.log('disable buttons');
                
            }
        
          }
       else {
        for (i = 0; i < buttonss.length; i++){
          buttonss[i].disabled = false;
       }
       }   
    }
        
        function activeCheck(input) {
            var type = document.querySelector('#' + input);
            if(!types[input].active) {
                type.setAttribute('class', 'active');
                console.log(type.hasAttribute('collapsible'));
                types[input].active = true;
                activeCount++;
                removeDiv();
                disableButtons();
                console.log('Active')
            } 
            else {
                types[input].active = false;
                type.classList.remove("active");
                type.setAttribute('class', 'innactive')
                removeWeakness(input);
                activeCount--;
                disableButtons();
                removeDiv();
                console.log('Innactive')
            }
        }
        
        function createDiv() {
            var weakness = document.querySelector('#weakness');
            
            for (var i = 0; i < weaknessStore.length; i++){
                var newElement = document.createElement('div');
                newElement.innerHTML = weaknessStore[i];
                newElement.setAttribute('class', weaknessStore[i]);
                newElement.setAttribute('id', 'weaknessBox');
                weakness.appendChild(newElement);
            }
        }
        
        function removeDiv() {
            let element = document.getElementById("weakness");
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            document.querySelectorAll(".collapsible").disabled = true;

            createDiv();
        }
        
        // document.addEventListener("DOMContentLoaded", function() {
        //   });
        
        
        
        
        
        
        
        
        
        
        
        




