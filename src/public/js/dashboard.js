
const adminM_btn = document.getElementById('adminM_btn');
const newTopicBtn = document.getElementById('newTopic_btn');
const myTopicBtn = document.getElementById('myTopic_btn');
const manageComBtn = document.getElementById('manage_btn');

const display = document.getElementById('display');

adminM_btn.addEventListener('click', () => {
    clickA = 0;
    clickH = 0;

    $.ajax({
        type:'GET',
        url:"/dashboard/getData",
        success: function(data) {
            $('#display').html(data);
            
        }
    });

});


newTopicBtn.addEventListener('click', () => {
    clickA = 0;
    clickH = 0;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {

            display.innerHTML = this.responseText;
        }
    }

    xhttp.open('GET','/dashboard/newTopic', true);
    xhttp.send();
});

myTopicBtn.addEventListener('click', () => {
    clickA = 0;
    clickH = 0;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {

            display.innerHTML = this.responseText;
        }
    }

    xhttp.open('GET','/dashboard/myTopic', true);
    xhttp.send();
});

manageComBtn.addEventListener('click', () => {
    clickA = 0;
    clickH = 0;
    
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {

            display.innerHTML = this.responseText;
        }
    }

    xhttp.open('GET','/dashboard/manageCom', true);
    xhttp.send();
});