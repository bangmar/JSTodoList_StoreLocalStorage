// cek local storage

if(typeof(localStorage) != undefined){
    console.log("local storage bisa digunakan");
}


// fungi untuk todo

//todo list ambil tabel row untuk table headnya
let todoList = document.getElementById('todoList')

// passangan key value untuk menyimpan ke local storage
let todos = {}
const STORAGE_TODOS = 'STORAGE_TODOS'


// membaca data ketika pertama kali reload
if(localTodo = localStorage.getItem(STORAGE_TODOS)){
    todos = JSON.parse(localTodo)

    // isi objek todos
    for(let text in todos){
        createRow(text, todos[text])
    }
}





// sinkron ke local storage

function singkronlocalStorage(aksi, item, status = false){
    switch(aksi){
        case 'add':
        case 'toggle':
            todos[item] = status;
            break;
        case 'remove':
            delete todos[item]
            break;
    }

    console.log(todos)
    localStorage.setItem(STORAGE_TODOS , JSON.stringify(todos))
}




function addTodo(){

    // ambil teks dari inputan
    let myTodo = document.getElementById('myTodo')

    // masukan dalam tabel

    if(myTodo.value == ""){
        alert("form tidak boleh kosong")
    }else{
        createRow(myTodo.value)
        singkronlocalStorage('add', myTodo.value)
    }

    // kosongkan data form
    myTodo.value = ""
}

function createRow(text, status = false){

    let isDone = (status) ? 'done' : ''
    let isChecked = (status) ? 'checked' : ''

    let newTodo = `<tr><td><input type="checkbox" ${isChecked} onclick="toggleDone(this)" id="checked"></td> <td class='${isDone}'>${text}</td> <td onclick="removetodo(this)" class = "btnRemove">[X]</td></tr>`
        
    todoList.insertAdjacentHTML('afterend', newTodo)
}



function toggleDone(el){
    //cari elemen samping checkbox
    let doneList = el.parentElement.nextElementSibling
    let status = doneList.classList.toggle('done')


    singkronlocalStorage('toggle', doneList.innerHTML, status)
}

function removetodo(el){
    let removeAlert = confirm(`sure to remove ${el.previousElementSibling.innerHTML} from list ?`)

    if(removeAlert == true) { 
        el.parentElement.remove()
    }

    singkronlocalStorage('remove', el.previousElementSibling.innerHTML.trim())

}