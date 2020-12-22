// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $.ajax("http://127.0.0.1:8080/getdata", {
    type: "GET"
  }).then(function (data) {
    console.log(data)
    var startersEl = $("#starters");
    var benchEl = $("#bench");
    

    var players = data;
    var length = players.length;

    for (var i = 0; i < players.length; i++) {
      var new_elem =
        "<li>" +
        players[i].id +
        ". " + players[i].lastName +
        "<button class='change-roster' data-id='" +
        players[i].id +
        "' data-reserve='" +
        !players[i].starter +
        "'>";

      if (players[i].starter) {
        new_elem += "starter";
      } else {
        new_elem += "bench";
      }

      new_elem += "</button>";

      new_elem +=
        "<button class='delete-player' data-id='" +
        players[i].id +
        "'>Delete!!</button></li>";

      if (players[i].starter) {
        startersEl.append(new_elem);
      } else {
        benchEl.append(new_elem);
      }
    }

   
    $(document).on("click", ".change-roster", function (event) {
      var id = $(this).data("id");
      var newTeam = $(this).data("reserve") === true;

      var newTeamState = {
        starter: newTeam
      };

      // Send the PUT request.
      $.ajax("/players/" + id, {
        type: "PUT",
        data: JSON.stringify(newTeamState),
        dataType: 'json',
        contentType: 'application/json'
      }).then(function () {
        console.log("changed eat to", newTeam);
        // Reload the page to get the updated list
        location.reload();
      });
    });

    $(".create-form").on("submit", function (event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      var newPlayer = {
        lastName: $("#ca").val().trim(),
        // devoured: $("[name=eaten]:checked").val().trim()
      };

      // Send the POST request.
      $.ajax("/players", {
        type: "POST",
        data: JSON.stringify(newPlayer),
        dataType: 'json',
        contentType: 'application/json'
      }).then(function () {
        console.log("created new player");
        // Reload the page to get the updated list
        location.reload();
      });
    });

    $(document).on("click", ".delete-player", function (event) {
      var id = $(this).data("id");

      // Send the DELETE request.
      $.ajax("/players/" + id, {
        type: "DELETE"
      }).then(function () {
        console.log("deleted players", id);
        // Reload the page to get the updated list
        location.reload();
      });
    })
  })
})
