var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var nba = require("../models/nba");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create all our routes and set up logic within those routes where required.
router.get("/players", function(req, res) {
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(queryURL)
      console.log(response)
      // for (var i = 0; i < 450; i++) {
      //       var firstName = response[i].FirstName;
      //       var lastName = response[i].LastName;
      //       // var post = response.results[i].rating
      //       // var hours = response.results[i].opening_hours.open_now
      //       $("#response2").append("<div>", "FirstName: " + firstName, "<div>", "lastName: " + lastName, "<hr>")

      //       // if ((response.results[i].price_level < 4) && (response.results[i].rating > 4)) {
      //       //   // console.log(response.results[i].price_level)
      //       //   // console.log(response.results[i].name)
      //       //   $("#response2").append(name, "<div>", "Price Level: " + pricelevel, "<div>", "Rating: " + rating, "<hr>")
      //       // }

      //     }
    })
  nba.all(function(response) {
    res.json({ Firstname: data });
  });
});

router.post("/cats", function(req, res) {
  cat.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    // Send back the ID of the new quote
   });
});

router.put("/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update({
    sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id});
    }
  });
});

router.delete("/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  cat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
