
const adminM_btn = document.getElementById('adminM_btn');
const newTopicBtn = document.getElementById('newTopic_btn');
const myTopicBtn = document.getElementById('myTopic_btn');
const manageComBtn = document.getElementById('manage_btn');

const display = document.getElementById('display');

function adminBtn() {
    $.ajax({
        type:'GET',
        url:"/dashboard/getData",
        success: function(data) {
            $('#display').html(data);
            
        }
    });

    setTimeout(getValAdmin, 100);
}

function new_topicBtn() {

    $.ajax({
        type:'GET',
        url:"/dashboard/newTopic",
        success: function(data) {
            $('#display').html(data);
            
        }
    });

    setTimeout(getVal, 100);
}

function my_TopicBtn() {

    $.ajax({
        type:'GET',
        url:"/dashboard/myTopic",
        success: function(data) {
            $('#display').html(data);
            
        }
    });
    
}

function manageCom_btn() {
   
    $.ajax({
        type:'GET',
        url:"/dashboard/manageCom",
        success: function(data) {
            $('#display').html(data);
            
        }
    });
    
}