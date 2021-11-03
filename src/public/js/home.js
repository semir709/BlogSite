

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
    window.location.href = `/` 
}

function arrowButtonFanRight(e) {

    let max = e.currentTarget.value;

    window.location.href = `/page/?pa=${max}`

    console.log(max);

}

