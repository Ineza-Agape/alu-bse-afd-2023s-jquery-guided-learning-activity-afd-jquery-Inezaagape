$(document).ready(function() {
    // When search button is clicked
    $("#searchBtn").click(function() {
      searchBooks();
    });
  
    // Or when Enter is pressed in the input
    $("#search").keypress(function(e) {
      if (e.which == 13) searchBooks();
    });
  });

function searchBooks() {
  var keyword = $("#search").val().toLowerCase();
  $("#spinner").show(); // Show loading spinner

  $.ajax({
    url: "books.json",
    method: "GET",
    dataType: "json",
    beforeSend: function() {
      $("#spinner").fadeIn();
    },
    complete: function() {
      $("#spinner").fadeOut();
    },
    success: function(data) {
      var results = data.filter(function(book) {
        return book.title.toLowerCase().includes(keyword) ||
               book.author.toLowerCase().includes(keyword);
      });

      $("#results").empty();

      if (results.length === 0) {
        $("#results").html("<div>No books found.</div>");
        return;
      }

      results.forEach(function(book, idx) {
        var resultDiv = $("<div class='result'></div>")
          .text(book.title + " by " + book.author)
          .data("description", book.description);

        // Hover effect
        resultDiv.hover(
          function() { $(this).css("background", "#ffeeba"); },
          function() { $(this).css("background", ""); }
        );

        resultDiv.click(function() {
          $("#bookDetails")
            .hide()
            .html("<strong>Description:</strong> " + $(this).data("description"))
            .fadeIn(500)
            .delay(500)
            .slideDown(500);
        });

        $("#results").append(resultDiv.hide().fadeIn(500)); // Fade in effect
      });

      $("#search").fadeOut(1000);
    }
  });
}