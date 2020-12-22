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
        }

      

        // var new_elem =
        //   "<li>" +
        //   playerID +
        //   ". " + fanDuel + " ";
        // new_elem += "</button>";
        // new_elem +=
        //   "<button class='deleteplayer' data-playerinfo='" +
        //   playerID[i] +
        //   "'>DELETE!</button></li>";
        // player1Elem.append(new_elem);
      }
      // console.log(new_elem);
    });

    // pulls from mysql
  $.ajax("/players", {
    type: "GET"
  }).then(function (data) {
    var player1Elem = $("#player1");
    var players = data.players;
    var len = players.length;
    for (var i = 0; i < len; i++) {
      var new_elem =
        "<li>" +
        players[i].id +
        ". " + players[i].TeamName +
        "<button class='change-team' data-id='" +
        players[i].id +
        "' data-newteam='" +
        !players[i].player1 +
        "'>";
      if (players[i].player1) {
        new_elem += "BENCH TEAM ";
      };
      // else {
      //   new_elem += "WAKE UP!";
      // }
      new_elem += "</button>";
      new_elem +=
        "<button class='delete-team' data-id='" +
        players[i].id +
        "'>DELETE!</button></li>";
      player1Elem.append(new_elem);

      $(document).on("click", ".change-team", function (event) {
        var id = $(this).data("id");
        var newTeam = $(this).data("newteam") === true;
        var newTeamState = {
          player1: newTeam,
          player2: newTeam,
          player3: newTeam,
          player4: newTeam,
          player5: newTeam
        };


        // Send the PUT request.
        $.ajax("/players/" + id, {
          type: "PUT",
          data: JSON.stringify(newTeamState),
          dataType: 'json',
          contentType: 'application/json'
        }).then(function () {
          console.log("changed team to", newTeam);
          // Reload the page to get the updated list
          location.reload();
        });
      });


      $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var newTeamNameEntered = {
          PlayerID: playerID,
          FanDuelName: response[i].FanDuelName
          // TeamName: $("#ca").val().trim(),
          // sleepy: $("[name=sleepy]:checked")
          //   .val()
          //   .trim()
        };
        // Send the POST request.
        $.ajax("/players", {
          type: "POST",
          data: JSON.stringify(newTeamNameEntered),
          dataType: 'json',
          contentType: 'application/json'
        }).then(function () {
          console.log("created new team");
          // Reload the page to get the updated list
          location.reload();
        });
      });


      $(document).on("click", ".deleteplayer", function (event) {
        var id = $(this).data("playerinfo");
        // Send the DELETE request.
        $.ajax("/players/" + id, {
          type: "DELETE",
          dataType: 'json'
        }).then(function () {
          console.log("deleted team", id);
          // Reload the page to get the updated list
          location.reload();
        });
      });
    }
  })
});



