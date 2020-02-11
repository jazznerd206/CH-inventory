$(".newRBar").on('submit', event => {
    event.preventDefault();
    const newColor = {};
    newColor.colorCode = $("#colorCode").val().trim();
    newColor.weightIn = $("#weightIn").val().trim();
    console.log(newColor);
  })