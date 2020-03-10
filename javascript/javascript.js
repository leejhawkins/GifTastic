window.onload = function() {
    
    $("#submit").on("click",function(event) {
        event.preventDefault();
        var newGif = $("#gif-input").val().trim()
        if (newGif==="") {
         return; 
        } else {
        favorites.push(newGif);
        console.log(newGif)
        localStorage.setItem("favorites",JSON.stringify(favorites))
        populateButtons();
        getGifs(newGif);
        $("#gif-input").val("")
        }
        
    
        
    })
    $(document).on("click",".gif-btn",this.dataTexttoGif)
    $(document).on("click",".gif",this.changeState)
    populateButtons()
}
var gifs = ["Big Mouth","BoJack Horseman","Rick and Morty","Aqua Teen Hunger Force", "Archer",
"The Simpsons","Bob's Burger","Schitt's Creek","Arrested Development","30 Rock","The Office","Mystery Science Theater 3000"]
var favorites = JSON.parse(localStorage.getItem("favorites"));
if (!Array.isArray(favorites)) {
    favorites = [];
  }
function populateButtons (){
    $("#button-area").empty()
    for (var i=0;i<12;i++) {
        var newButton=$('<button>')
        newButton.addClass("btn btn-info gif-btn")
        newButton.attr("data-text",gifs[i]);
        newButton.text(gifs[i])
        $("#button-area").append(newButton)
    }
    $("#button-area").append("<h2>"+"Favorites: "+"</h2>")
    for (var i=0;i<favorites.length;i++) {
        var newButton=$('<button>')
        console.log(gifs[i])
        newButton.addClass("btn btn-info gif-btn")
        newButton.attr("data-text",favorites[i]);
        newButton.text(favorites[i])
        $("#button-area").append(newButton)
    }
}
function dataTexttoGif (){
    var text = $(this).attr("data-text");
    getGifs(text);
}
function getGifs (text) {
    $("#gif-area").empty();
    var gifType = text;
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gifType + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
       
        $("#instructions").text("Click to animate!!!")
        var results = response.data
        
        

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
          gifDiv.addClass("col mb-4")
         
          if (i%3 == 0) {
              var newRow =$("<div>")
              newRow.addClass("row row-cols-2 row-cols-md-3")
              $("#gif-area").append(newRow)
          }
          var p = $("<p>");
          var title = $("<p>");
          p.text(results[i].rating);
          title.text(results[i].title)
          var gif =$("<img>");
          gif.addClass("gif")
          gif.attr("src", results[i].images.fixed_height_still.url);
          gif.attr("data-still",results[i].images.fixed_height_still.url)
          gif.attr("data-animate",results[i].images.fixed_height.url)
          gif.attr("data-state","still")
          gifDiv.append(gif);
          gifDiv.append(p);
          gifDiv.append(title);
          newRow.append(gifDiv);
        }
      })
}
function changeState() {
    var state = $(this).attr("data-state");
   
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
}
