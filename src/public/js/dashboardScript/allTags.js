

function tagsDelete(e) {

    let id = e.target.getAttribute('data-id');
    let obj = {id}

    $.ajax({
        type:'DELETE',
        url:"/allTags/delete",
        data: obj,
        success: function(data) {
            $('#display').html(data);


        }
    });
}

function tagsUpdate(e) {
    let id = e.target.getAttribute('data-id');
    let input = e.target.parentNode.childNodes[1];

    let obj = {id, value: input.value}

    $.ajax({
        type:'POST',
        url:"/allTags/update",
        data: obj,
        success: function(data) {
            $('#display').html(data);
        }
    });
}