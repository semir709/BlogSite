

function buttonList(e) {

    const num = e.currentTarget.value;
    
    if(num == 1) {
        window.location.href = `/`
    }
    else {
        window.location.href = `/page/?pa=${num}`
    }
}


function arrowButtonFanLeft() {
    const queryString = window.location.search;

    let page = queryString.split('=')[1];
    
    if(page == 1) {
        window.location.href = `/`
    }
    else if(page > 1) {
        page = page - 1;
        if(page == 1) {
            window.location.href = `/`;
        }
        else {
            window.location.href = `/page/?pa=${page}`
        }
        
    }
    else {
        window.location.href = `/`
    }
    
}

function arrowButtonFanRight() {
    const queryString = window.location.search;

    let page;

    if(typeof queryString.split('=')[1] == 'undefined') {
        page = 1;
    } 
    else {
        page = queryString.split('=')[1];
    }

    if(page >= 1) {
        page++;
        window.location.href = `/page/?pa=${page}`
    }
    else {
        window.location.href = `/`
    }
}