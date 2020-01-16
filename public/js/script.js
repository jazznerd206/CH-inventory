$(document).on('click', '#add-button', (event) => {
    window.location.href = '/add';
    console.log("click")
})
$(document).on('click', '#remove-button', (event) => {
    window.location.href = '/remove';
    console.log("click")
})
$(document).on('click', '#add-new-color', (event) => {
    window.location.href = '/addnew';
    console.log("click")
})
$(document).on('click', '#delete', (event) => {
    window.location.href = '/delete';
    console.log("click")
})