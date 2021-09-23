//const { json } = require("express");


const checkConfrm = document.getElementsByClassName('checkConfrm');
const adminCheck = document.getElementsByClassName('adminCheck');

let confrmStatus;
let adminStatus;

let delete_Btn = document.getElementById('delete');

let cell;
let inputName; 
let inputLastName; 
let inputMail; 
let inputTime; 
let inputConfrm; 
let inputAdmin; 

let ID;

function getIds() {

    btn = document.getElementById('delete');
    inputName = document.getElementById('inputName');
    inputLastName = document.getElementById('inputLastName');
    inputMail = document.getElementById('inputMail');
    inputTime = document.getElementById('inputTime');
    inputConfrm = document.getElementById('inputConfrm');
    inputAdmin = document.getElementById('inputAdmin');
    
}

display.addEventListener('mousedown', () => {
    getIds();

    rowClick();
    disableInputConfrm();
    disableInputAdmin();

    // updateBtn();
    // console.log(ID);
    // deleteBtn(ID);

    // console.log(ID);

      
});

//sending data from the table to the form ID:showData
function getDataFromRow(row) {
    cell = row.getElementsByTagName('td');

    if(cell) {
        data = {
            id: cell[0].innerHTML,
            name: cell[1].innerHTML,
            lastName: cell[2].innerHTML,
            email: cell[3].innerHTML,
            time: cell[4].innerHTML,
            confrm: cell[5].childNodes,
            admin: cell[6].childNodes
        }
    
        inputName.value = data.name;
        inputLastName.value = data.lastName;
        inputMail.value = data.email;
        inputTime.value = data.time;
        inputConfrm.checked = data.confrm[0].checked;
        inputAdmin.checked = data.admin[0].checked;
        

        ID = data.id;

        
    }
   

}


//when row is click
function rowClick() {

    
    let table = document.getElementById('table-data');

    if(table) {
        for(let i = 1; i < table.rows.length; i++) {
            table.rows[i].addEventListener('click', () => {
                
                for(let j = 0; j < table.rows.length; j++) {
                    table.rows[j].style.background = '';
                }
                table.rows[i].style.background = 'yellow';

                let row = table.rows[i];
                let tdAdmin = row.getElementsByTagName('td')[6];
                let tdConfrm = row.getElementsByTagName('td')[5];

                adminStatus = tdAdmin.getElementsByTagName('input')[0].checked;
                confrmStatus = tdConfrm.getElementsByTagName('input')[0].checked;
                
                getDataFromRow(table.rows[i]);
            });
        }
    }

}

//this does not allow changes in inputs ID: showData while using inputs in ID: table-data
//ID: table-data is set read-only in html
function disableInputConfrm () {
    if(checkConfrm) {
        for(let i = 0; i < checkConfrm.length; i++) {
            let c = checkConfrm[i].checked;
            checkConfrm[i].addEventListener('click', () => {
                checkConfrm[i].checked = c;
           });
        }
    }
    
}

function disableInputAdmin () {
    if(adminCheck) {
        for(let i = 0; i < adminCheck.length; i++) {
            let c = adminCheck[i].checked;
            adminCheck[i].addEventListener('click', () => {
                adminCheck[i].checked = c;
           });
        }
    }
}

//update and delete btn

function updateBtn(id, e) {

    e.preventDefault();

    const form = document.getElementById('formShowData');

    const dataForm = new FormData(form);

    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {

            if(this.responseText == 'false') {
                alert(`You can't update user with permission admin`);

            }
            else {
                display.innerHTML = this.responseText; 
            }
            
        }
    }
      

    let object = {};
    dataForm.forEach((value, key) => object[key] = value);
    const json =  object; 
    const obj = {inputData: json, tableData: {confrm: confrmStatus, admin: adminStatus}}

    xhttp.open('POST',`/dash/update/${id}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(obj));

}


function deleteBtn(id, e) {

    e.preventDefault();

    const form = document.getElementById('formShowData');

    const dataForm = new FormData(form);
  
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            
            
            if(this.responseText == 'false') {
                alert(`You can't delete user with permission admin`);

            }
            else {
                display.innerHTML = this.responseText; 
            }
            
        }
    }

    let object = {};
    dataForm.forEach((value, key) => object[key] = value);
    const json = JSON.stringify(object);
    
    xhttp.open('DELETE',`/dash/delete/${id}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(json);
}


