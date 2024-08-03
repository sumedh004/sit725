const express = require("express");
const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/submitContactForm", (req, res) => {
  //const { name, email, message } = req.body;

  // res.send('Form submitted successfully');
  // res.json({
  //     statusCode: 200,
  //     message: `${name}, your details are submitted.`
  // });

  const { name, email, message } = req.body;

  console.log("Form Submitted:", { name, email, message });

  // Respond to the client
  res.json({
    status: "success",
    message: `Hi ${name}, your details are submitted.`,
  });
});


const port = 3040;
app.listen(port, () => {
  console.log("hello i'm listening to port " + port);
});
