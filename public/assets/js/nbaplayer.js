//$(function () {
//var queryURL = `https://api.sportsdata.io/v3/nba/scores/json/Players?key=336e712839ff463dab532b77803a63a9`
     // console.log(queryURL);
     // console.log(crd);
     $.ajax({
       url: queryURL,
       method: "GET"
     })
       .then(function (response) {
         console.log(queryURL)
         console.log(response)
         for (var i = 0; i < response.length; i++) {
           // var fanDuelName = response[i].FanDuelName;
           // var playerID = response[i].PlayerID;
           var firstName = response[i].FirstName;
           var lastName2 = response[i].LastName;
           var team = response[i].Team;
           var salary = response[i].Salary;
           var position = response[i].Position
           // var player1Elem = $("#players");
 
           if (response[i].Position == "PG" && response[i].Salary !== null) {
             $("#pgfirstname").append("<td>", firstName, "</td>");
             $("#pglastname").append("<td>", lastName2, "</td>");
             $("#pgposition").append("<td>", position, "</td>");
             $("#pgteam").append("<td>", team, "</td>");
             $("#pgsalary").append("<td>", salary, "</td>");
           }
           else if (response[i].Position == "SG" && response[i].Salary !== null) {
             $("#sgfirstname").append("<td>", firstName, "</td>");
             $("#sglastname").append("<td>", lastName2, "</td>");
             $("#sgposition").append("<td>", position, "</td>");
             $("#sgteam").append("<td>", team, "</td>");
             $("#sgsalary").append("<td>", salary, "</td>");
           }
           else if (response[i].Position == "SF" && response[i].Salary !== null) {
             $("#sffirstname").append("<td>", firstName, "</td>");
             $("#sflastname").append("<td>", lastName2, "</td>");
             $("#sfposition").append("<td>", position, "</td>");
             $("#sfteam").append("<td>", team, "</td>");
             $("#sfsalary").append("<td>", salary, "</td>");
           }
           else if (response[i].Position == "PF" && response[i].Salary !== null) {
             $("#pffirstname").append("<td>", firstName, "</td>");
             $("#pflastname").append("<td>", lastName2, "</td>");
             $("#pfposition").append("<td>", position, "</td>");
             $("#pfteam").append("<td>", team, "</td>");
             $("#pfsalary").append("<td>", salary, "</td>");
           }
           else if (response[i].Position == "C" && response[i].Salary !== null) {
             $("#cfirstname").append("<td>", firstName, "</td>");
             $("#clastname").append("<td>", lastName2, "</td>");
             $("#cposition").append("<td>", position, "</td>");
             $("#cteam").append("<td>", team, "</td>");
             $("#csalary").append("<td>", salary, "</td>");
 
           }}})
