// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $.ajax("/cats", {
      type: "GET"
    }).then(function(data) {
      var sleepyElem = $("#sleepyCats");
      var nosleepyElem = $("#notSleepyCats");
  
      var cats = data.cats;
      var len = cats.length;
  
      for (var i = 0; i < len; i++) {
        var new_elem =
          "<li>" +
          cats[i].id + 
          ". "+cats[i].name +
          "<button class='change-sleep' data-id='" +
          cats[i].id +
          "' data-newsleep='" +
          !cats[i].sleepy +
          "'>";
  
        if (cats[i].sleepy) {
          new_elem += "SLEEP TIME!";
        } else {
          new_elem += "WAKE UP!";
        }
  
        new_elem += "</button>";
  
        new_elem +=
          "<button class='delete-cat' data-id='" +
          cats[i].id +
          "'>DELETE!</button></li>";
  
        if (cats[i].sleepy) {
          sleepyElem.append(new_elem);
        } else {
          nosleepyElem.append(new_elem);
        }
      }
    });
  
    $(document).on("click", ".change-sleep", function(event) {
      var id = $(this).data("id");
      var newSleep = $(this).data("newsleep")===true;
  
      var newSleepState = {
        sleepy: newSleep
      };
  
      // Send the PUT request.
      $.ajax("/cats/" + id, {
        type: "PUT",
        data: JSON.stringify(newSleepState),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("changed sleep to", newSleep);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newCat = {
        name: $("#ca")
          .val()
          .trim(),
        sleepy: $("[name=sleepy]:checked")
          .val()
          .trim()
      };
  
      // Send the POST request.
      $.ajax("/cats", {
        type: "POST",
        data: JSON.stringify(newCat),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("created new cat");
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(document).on("click", ".delete-cat", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/cats/" + id, {
        type: "DELETE"
      }).then(function() {
        console.log("deleted cat", id);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  });
  