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

    const tagsElement = event.target.parentNode.parentNode.getElementsByClassName('tag');
    let tags = [];
    // const imgName = event.target.parentNode.parentNode.getElementsByClassName('myTopic_img')[0].src.split('image/')[1];

    for(let i = 0; i < tagsElement.length; i++) {

        tags.push(tagsElement[i].getAttribute('data-item'));
    }
    // console.log(imgName);
    let obj = {contentId: id, tags: tags};
    // let obj = {contentId: id, tags: tags, img: imgName};

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