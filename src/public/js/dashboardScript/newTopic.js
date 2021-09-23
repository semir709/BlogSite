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


let textArea;
let heading; 
let article; 

let clickH = 0;
let clickA = 0;

let main_img;
let dialogUpload;

function getVal() {
  textArea = document.getElementsByTagName("textarea");
  heading = document.getElementById('heading');
  article = document.getElementById('article');
  main_img = document.getElementById('main-img');
  dialogUpload = document.getElementById('upload');

}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
  
}

function textAreaAutoSize() {
    for (let i = 0; i < textArea.length; i++) {
      textArea[i].addEventListener("input", OnInput, false);
      
    } 
}

function whenMouseClick() {

  if(heading) {
    heading.addEventListener('click', () => {
      if(clickH == 0) {
        heading.innerHTML = " ";
        clickH++;
      }
    });
  }

  if(article) {
    article.addEventListener('click', ()=> {
      if(clickA == 0) {
        article.innerHTML = " ";
        clickA++;
      }
    });
  }

}

let i = 0;
function imgClick() {
  if(main_img) {
    main_img.addEventListener('click', () => {
      i++;
      console.log(i);
      dialogUpload.click();
    });
  }
}

window.addEventListener('load', () => {
  getVal();
   
});


display.addEventListener('mousedown', () => { 
    getVal()
    textAreaAutoSize();
    whenMouseClick();
    imgClick();

});