//I have this on public variable----------------------------------------------------
// const checkConfrm = document.getElementsByClassName('checkConfrm');
// const adminCheck = document.getElementsByClassName('adminCheck');

// let confrmStatus;
// let adminStatus;

// let delete_Btn = document.getElementById('delete');

// let cell;
// let inputName; 
// let inputLastName; 
// let inputMail; 
// let inputTime; 
// let inputConfrm; 
// let inputAdmin; 

// let ID;
//----------------------------------------------------------------------------------

let main_img;
let dialogUpload;

function getVal() {
  const heading = document.getElementById("heading");
  const article = document.getElementById("article");
  const main_img = document.getElementById('main-img');
  const dialogUpload = document.getElementById('upload');

  heading.addEventListener('input', OnInput);
  heading.addEventListener('click', onClick);

  article.addEventListener('input', OnInput);
  article.addEventListener('click', onClick);

  main_img.addEventListener('click', function() {dialogUpload.click()}); 

}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
  
}

function onClick() {
    this.innerHTML = "";
}




