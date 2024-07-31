const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}
$(document).ready(function () {
    // $('.materialboxed').materialbox();
    $('#clickMeButton').click(() => {
        $.ajax({url: "http://localhost:3040/MultiplyTwoNumber?n1=2&n2=4", success: function(result){
            console.log(result);
            console.log(result?.data);
            console.log(result?.statuscocde);
            alert("Result is " + result.data);
          }});
        //clickMe();
    })
});