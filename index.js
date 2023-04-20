import{initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{getDatabase, ref,push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
//import { add } from "./addCart.js"



const appSetting={
    databaseURL:"https://shoppingcart-dc270-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSetting)
const database=getDatabase(app)
const userDatabase=document.getElementsByTagName("title")[0].id
const itemsInDB=ref(database, "userDatabase")




const addField=document.getElementById("item-field")
const addButton=document.getElementById("addButton")
const Itemlist=document.getElementById("Item-list")

onValue(itemsInDB, function(snapshot){

    if(snapshot.exists()){   
        let itemArray=Object.entries(snapshot.val())

        clearList()
        itemArray.forEach(element => {
            appendList(element)
        });}
    else{
        displayText(Itemlist,"No item here :((")
    }
 
})

addButton.addEventListener("click",function(){
    let input=addField.value

    push(itemsInDB,input)
    
    clearField();
   
    
})





function clearList(){
    Itemlist.innerHTML=""
}

function clearField(){
    addField.value=""
}

function appendList(input){
    //Itemlist.innerHTML += `<li>${input}</li>`
    let id=input[0]
    let val=input[1]
    let newIte= document.createElement("li")

    newIte.textContent=val;

    Itemlist.append(newIte)


    newIte.addEventListener("click", function(){
        let wantDeleteItem = ref(database,`items/${id}`)

        remove(wantDeleteItem)
    })
}


function displayText(input, text){
    input.innerHTML=text;
}
