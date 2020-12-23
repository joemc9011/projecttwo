// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function () {
  var queryURL = `https://api.sportsdata.io/v3/nba/scores/json/Players?key=336e712839ff463dab532b77803a63a9`
  // console.log(queryURL);
  // console.log(crd);
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(queryURL);
      console.log(response);
      for (var i = 0; i < response.length; i++) {

        var playerID = response[i].PlayerID;
        var fanDuel = response[i].FanDuelName;
        var team = response[i].Team;
        var salary = response[i].Salary;
        var position = response[i].Position
        var player1Elem = $("#players");


        if (response[i].Position == "PG" && response[i].Salary !== null) {
                   // var post = response.results[i].rating
          // var hours = response.results[i].opening_hours.open_now
         
          tr = $('<tr>');
          tr.append("<td>" + fanDuel + "</td>");
          tr.append("<td>" + position + "</td>");
          tr.append("<td>" + team + "</td>");
          tr.append("<td>" + salary + "</td>");
          $('#pgtable').append(tr);
        }
        else if (response[i].Position == "SG" && response[i].Salary !== null) {
          tr = $('<tr>');
          tr.append("<td>" + fanDuel + "</td>");
          tr.append("<td>" + position + "</td>");
          tr.append("<td>" + team + "</td>");
          tr.append("<td>" + salary + "</td>");
          $('#sgtable').append(tr);
        }
        else if (response[i].Position == "SF" && response[i].Salary !== null) {
          tr = $('<tr>');
          tr.append("<td>" + fanDuel + "</td>");
          tr.append("<td>" + position + "</td>");
          tr.append("<td>" + team + "</td>");
          tr.append("<td>" + salary + "</td>");
          $('#sftable').append(tr);
        }
        else if (response[i].Position == "PF" && response[i].Salary !== null) {
          tr = $('<tr>');
          tr.append("<td>" + fanDuel + "</td>");
          tr.append("<td>" + position + "</td>");
          tr.append("<td>" + team + "</td>");
          tr.append("<td>" + salary + "</td>");
          $('#pftable').append(tr);
        }
        else if (response[i].Position == "C" && response[i].Salary !== null) {
          tr = $('<tr>');
          tr.append("<td>" + fanDuel + "</td>");
          tr.append("<td>" + position + "</td>");
          tr.append("<td>" + team + "</td>");
          tr.append("<td>" + salary + "</td>");
          $('#ctable').append(tr);
        }}})
      })

$(function () {
  $.ajax("/players", {
    type: "GET"
  }).then(function (data) {
    var startersEl = $("#starters");
    var benchEl = $("#bench");

    var players = data.players;
    var len = players.length;

    for (var i = 0; i < players.length; i++) {
      var new_elem =
        "<li>" +
        players[i].lastName + "   " +
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
