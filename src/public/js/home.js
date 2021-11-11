

function buttonList(e) {

    const num = e.currentTarget.value;



    let location = window.location.href.split('/')[3];
    let tag = window.location.href.split('/')[4];
    
    if(num == 1 && location != 'category') {
        window.location.href = `/`
    }
    else if(location == 'category') {
        window.location.href = `/category/${tag}/?pa=${num}`
    }
    else {
        window.location.href = `/page/?pa=${num}`
    }
}


function arrowButtonFanLeft() {

    let location = window.location.href.split('/')[3];
    let tag = window.location.href.split('/')[4];

    if(location == 'category') {
        window.location.href = `/category/${tag}/?pa=${1}`
    }
    else {
        window.location.href = `/` 
    }
   
}

function arrowButtonFanRight(e) {

    let max = e.currentTarget.value;
    let location = window.location.href.split('/')[3];
    let tag = window.location.href.split('/')[4];

    if(location == 'category') {
        window.location.href = `/category/${tag}/?pa=${max}`
    }
    else {
        window.location.href = `/page/?pa=${max}`
    }


}

