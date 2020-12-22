var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var nbas = require("../models/nba");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/indexthree.html"));
});

// Create all our routes and set up logic within those routes where required.
router.get("/players", function(req, res) {
  nbas.all(function(data) {
    res.json({ players: data });
  });
});

router.post("/players", function(req, res) {
  nbas.create([
    "lastName", "starter"
    // "PlayerID"
  ], [
    req.body.lastName, req.body.starter
    // req.body.PlayerID
  ], function(result) {
    res.json({id: result.id})
    // Send back the ID of the new quote
   });
});

router.put("/players/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  nbas.update({
    starter: req.body.starter
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id});
    }
  });
});

router.delete("/players/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  nbas.delete(condition, function(result) {
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
