// const { head } = require("../../../routes/routes");

// const { head } = require("../../../routes/routes");

function getVal() {
  let newArr;
  const heading = document.getElementById("heading");
  const article = document.getElementById("article");
  const main_img = document.getElementById('main-img');
  const dialogUpload = document.getElementById('upload');
  const clickbait = document.getElementById('clickbait'); 
  const formContent = document.getElementById('form-content');
  const input = document.querySelector('.main-input');

  formContent.addEventListener('keydown', disallowedEnter); // sometimes this just not include (error)
  input.addEventListener('keyup', inputEvent);

  heading.addEventListener('input', OnInput);
  heading.addEventListener('click', onClick, {once:true});

  clickbait.addEventListener('input', OnInput);
  clickbait.addEventListener('click', onClick, {once:true});

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

function savingData(event) {
  event.preventDefault();

  const f = document.getElementById('form-content');
  let form = new FormData(f);

  tagArray.forEach((item) => form.append("tags[]", item));

  $.ajax({
    url: '/dash/newTask/upload',
    data: form,
    cache: false,
    contentType: false,
    processData: false,
    method: 'POST',

    success: function(data){
        document.body.innerHTML = data;
    }
  });

  tagArray = [];
  
}

function updateContent(event, value) {
  event.preventDefault();
  let f = document.getElementById('form-content');
  let file = document.getElementById('upload');
  let img = document.getElementById('main-img');

  let imgTitle = img.src.split('image/')[1];
  let id = value;

  let form = new FormData(f);

  tagArray.forEach((item) => form.append("tags[]", item));

  form.append('img',file);
  
  if(JSON.stringify(imgTitle).length > 30) {
    form.append('imgName', img.title);  
  }
  else {
    form.append('imgName', imgTitle);
  }
  form.append('id',id);
  


  $.ajax({
    url: '/myTask/Finalupdate',
    data: form,
    cache: false,
    contentType: false,
    processData: false,
    method: 'POST',

    success: function(data){
        document.body.innerHTML = data;
    }
  });

  tagArray = [];
}

function disallowedEnter(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    return false;
}
} 

function createTag(value) {
  let div = document.createElement('div');
  let span = document.createElement('span');
  let close = document.createElement('span');


  div.setAttribute('class', 'tag');
  close.setAttribute('class', 'material-icons');
  close.setAttribute('data-item', value);
  close.addEventListener('click', closeTag);

  span.innerHTML= value;
  close.innerHTML = 'close';

  div.appendChild(span);
  div.appendChild(close);

  return div;
}

let tagArray = [];

function addTag() {
  reset();
  let tagCont = document.querySelector('.tagCont');


  tagArray.slice().reverse().forEach(function(t) {
    let tag = createTag(t);
    tagCont.prepend(tag);
  });
}

function inputEvent(e) {
  let value = e.target.value;
  let tagCont = document.querySelector('.tagCont');

  if(e.target.offsetWidth < 100) {
    
    let width = tagCont.clientWidth;
    tagCont.style.width =  (width + 100) + 'px';

  } 

  if(e.key === 'Enter') {
    tagArray.push(value);
    addTag();
    e.target.value = "";

  }


}

function closeTag(e) {
  let closeBtn = e.target;
  
  let value = closeBtn.getAttribute('data-item');
  let index = tagArray.indexOf(value);


  tagArray = [...tagArray.slice(0, index), ...tagArray.slice(index + 1)];

  if(newArr) {
    newArr = tagArray.join(',');
  }

  addTag();
  
}

function reset() {
  document.querySelectorAll('.tag').forEach(function(t) {
    t.parentElement.removeChild(t);
  });
}

