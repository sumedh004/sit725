document.addEventListener("DOMContentLoaded", function () {
  // Initialize the sidenav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  // Initialize the parallax
  elems = document.querySelectorAll(".parallax");
  M.Parallax.init(elems);

  // Initialize the tabs
  elems = document.querySelectorAll(".tabs");
  M.Tabs.init(elems);

  // Initialize the scrollspy
  elems = document.querySelectorAll(".scrollspy");
  M.ScrollSpy.init(elems, { scrollOffset: 50 });
});

$(document).ready(function () {
  // Initialize Materialize components
  $("select").formSelect();
  $(".sidenav").sidenav();
  $(".tabs").tabs();
  $(".scrollspy").scrollSpy();

  // Handle form submission
  $("#contactForm").submit(function (e) {
    e.preventDefault(); // Prevent the default form submission

    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    // Extract form data
    $.ajax({
      url: "/submitContactForm",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ name: name, email: email, message: message }),
      success: function (response) {
        $("#formResponse")
          .html(`<p>${response.message}</p>`)
          .css("color", "green");
        $("#contactForm")[0].reset(); // Reset the form fields
      },
      error: function () {
        $("#formResponse")
          .html(
            "<p>There was an error submitting your details. Please try again.</p>"
          )
          .css("color", "red");
      },
    });
  });
});
