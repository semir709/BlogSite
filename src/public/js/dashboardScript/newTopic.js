let main_img;
let dialogUpload;

function getVal() {
  const heading = document.getElementById("heading");
  const article = document.getElementById("article");
  const main_img = document.getElementById('main-img');
  const dialogUpload = document.getElementById('upload');

  heading.addEventListener('input', OnInput);
  heading.addEventListener('click', onClick, {once:true});

  article.addEventListener('input', OnInput);
  article.addEventListener('click', onClick, {once:true});

  main_img.addEventListener('click', function() {dialogUpload.click()}); 

}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
  
}

function onClick() {
    this.innerHTML = "";
    
}