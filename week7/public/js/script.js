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

  const socket = io();

  socket.on("user count", function (count) {
    $("#userCount").text(`Current users online: ${count}`);
  });

  //fetchSchedule();
  // Initialize Materialize components
  $("select").formSelect();
  $(".sidenav").sidenav();
  $(".tabs").tabs();
  $(".scrollspy").scrollSpy();

  // Handle form submission
  $("#contactForm").submit(function (e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      message: $("#message").val(),
    };

    $.ajax({
      url: "/api/contact",
      type: "POST",
      data: formData,
      success: function (response) {
        if (response.statusCode === 201) {
          $("#formResponse")
            .text(`Hi ${formData.name}, your details are submitted.`)
            .css("color", "green");

            socket.emit("chat message", `New contact form submission: ${formData.message}`);
      

        } else {
          $("#formResponse")
            .text("There was an issue submitting your details.")
            .css("color", "red");
        }
        $("#contactForm")[0].reset(); // Reset the form
      },
      error: function () {
        $("#responseMessage")
          .text("There was an error processing your request.")
          .css("color", "red");
      },
    });
  });

  socket.on("chat message", (msg) => {
    console.log("New message: " + msg);
    
  });

  // Fetch and display schedule
  function fetchSchedule() {
    $.ajax({
      url: "/api/schedule",
      type: "GET",
      success: function (response) {
        if (response.statusCode === 200) {
          const scheduleTableBody = $("#scheduleTableBody");
          response.data.forEach((event) => {
            const row = `
              <tr>
                <td>${event.time}</td>
                <td>${event.event}</td>
                <td>${event.speaker}</td>
              </tr>
            `;
            scheduleTableBody.append(row);
          });
        } else {
          console.error("Failed to fetch schedule.");
        }
      },
      error: function () {
        console.error("Error fetching schedule.");
      },
    });
  }

  socket.on("update schedule", function (schedule) {
    $("#scheduleTableBody").empty();
    schedule.forEach((event) => {
      const row = `
        <tr>
          <td>${event.time}</td>
          <td>${event.event}</td>
          <td>${event.speaker}</td>
        </tr>
      `;
      $("#scheduleTableBody").append(row);
    });
  });

  fetchSchedule();
});