let myTopic_showAtricle = document.getElementsByClassName('myTopic_showArticle');
let myTopic_delete = document.getElementsByClassName('myTopic_delete');
let myTopic_update = document.getElementsByClassName('myTopic_update');

function myTopicButton_delete(event) {
    let name = event.target.className;
    name = name.split('_');
    let id = name[2];

    let obj = {contentId: id};

    $.ajax({
        type:'DELETE',
        url:"/myTask/delete",
        data: obj,
        success: function(data) {
            $('#display').html(data);
           
            
        }
    });
}

function myTopicButton_update(event) {
    let name = event.target.className;
    name = name.split('_');
    let id = name[2];

    let obj = {contentId: id};

    $.ajax({
        type:'POST',
        url:"/myTask/update",
        data: obj,
        success: function(data) {
            $('#display').html(data);
        }
    });

    setTimeout(getVal, 100);
}