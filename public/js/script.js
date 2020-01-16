
$('#enter').on('click', (event) => {
    console.log('click');
    window.location.href = '/enter';
    console.log("click")
})
$('#update').on('click', (event) => {
    console.log('click');
    window.location.href = '/update';
    console.log("click")
})
$('#create-new').on('click', (event) => {
    console.log('click');
    window.location.href = '/create-new';
    console.log("click")
})


$('#create-new-reichenbach-bar').on('click', (event) => {
    console.log('click');
    window.location.href = '/create-new-reichenbach-bar';
    console.log("click")
})
$('#new-reichenbach-bar').on('click', (event) => {
    event.preventDefault();
    console.log('clicked');
    console.log(window.location);
    $.ajax({
        method: 'POST',
        url: '/new-reichenbach-bar',
        data: {
            colorCode: $('#colorCode').val(),
            weightIn: $('#weightIn').val()
        }
    }).then((data) => {
        console.log(data)   
        console.log('color input click handled')
    }).catch(err => console.log('err in click handler' + err))
})


$('#create-new-reichenbach-frit').on('click', (event) => {
    console.log('click');
    window.location.href = '/create-new-reichenbach-frit';
    console.log("click")
})
