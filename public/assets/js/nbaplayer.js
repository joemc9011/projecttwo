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