
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

function onFileSelected(event) {
  let selectedFile = event.target.files[0];
  let reader = new FileReader();

  let imgtag = document.getElementById("main-img");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
}

function articleCancled(e) {
  e.preventDefault();

  const heading = document.getElementById("heading");
  const article = document.getElementById("article");
  const main_img = document.getElementById('main-img');

  heading.value = "You're header goes here...";
  article.value = "Your text goes here...";
  
  main_img.src ="Empty";

}


