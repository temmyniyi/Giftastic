$(function (){
    console.log ("loaded correctly"); 
    buttonGenerator(); 
})



// CREATE AN ARRAY TO POPULATE THE BUTTONS 

var GOT = ["Jon Snow", "Daenarys Targaryen", "Arya Stark", "Brandon Stark", "Eddard Stark", "Cersei Lannister", "Tyrion Lannister", "Jamie Lannister", "Sandor Clegane"]; 
var searchTerm = ""; 

//Create Buttons using the GOT array
function buttonGenerator () {
        $("#buttons").empty(); 
       for (var i = 0; i < GOT.length; i++) {
            var a = $("<button>"); 
            a.addClass("searchButton"); 
            a.attr("data-name", GOT[i]); 
            a.text(GOT[i]); 
            $("#buttons").append(a);
            console.log ("buttons created");    
        };
}; 

function GIFgenerator () {
    console.log (searchTerm); 
    console.log ("Button clicked");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=1GkFl3xoDoGUiLsnAoa9AybDWPVMNDkh&limit=10"; 
    console.log (queryURL); 

    $.ajax ({
        url:queryURL,  
        method: "GET" 
    })

   
    .then (function (response){
        var searchResults = response.data; 
        for (var i = 0; i < searchResults.length; i++) {
            var gifDiv = $("<div col-sm>");
            var gif = $("<img class= 'gif' data-state ='animate'>");
            gif.attr("src", searchResults[i].images.fixed_width.url);
            gif.attr("data-animate", searchResults[i].images.fixed_width.url);
            gif.attr("data-still", searchResults[i].images.fixed_width_still.url); 
            var rating = $("<p>")
            rating.text("This is rated " + searchResults[i].rating);
            console.log (rating); 
            gifDiv.prepend(gif,rating);
            $("#results").prepend(gifDiv); 
          }
          console.log(response); 
          
    })
}
//On click event code
$(document).on("click", ".searchButton", function () {
    $("#results").empty(); 
    offset = 10; 
    searchTerm = $(this).data("name") + " Person"; 
    console.log (searchTerm); 
    console.log ("Button clicked");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=1GkFl3xoDoGUiLsnAoa9AybDWPVMNDkh&limit=10"; 
    console.log (queryURL); 

    $.ajax ({
        url:queryURL,  
        method: "GET" 
    })

    // wait for a response 
    .then (function (response){
        var searchResults = response.data; 
        for (var i = 0; i < searchResults.length; i++) {
            var gifDiv = $("<div col-sm>");
            var gif = $("<img class= 'gif' data-state ='animate'>");
            gif.attr("src", searchResults[i].images.fixed_width.url);
            gif.attr("data-animate", searchResults[i].images.fixed_width.url);
            gif.attr("data-still", searchResults[i].images.fixed_width_still.url); 
            var rating = $("<p>")
            rating.text("This is rated " + searchResults[i].rating);
            console.log (rating);
            gifDiv.prepend(gif,rating);
            $("#results").prepend(gifDiv); 
          }
          console.log(response); 
          
    })

})

$("#results").on("click", ".gif", function () {
    console.log("clicked GIF"); 
    var imageState = $(this).attr("data-state"); 
    var stillImage = $(this).attr("data-still"); 
    var animatedImage = $(this).attr("data-animate"); 

    if (imageState === "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still"); 
        console.log("still");
    }
    
    else {
        $(this).attr("src", animatedImage);
        $(this).attr("data-state", "animate")
        console.log("animate"); 

    } 

})

$("#addButton").on("click", function (event) {

    event.preventDefault();
    console.log ("clicked on add"); 
    var newButton = $("#searchText").val();
        if (newButton != "") {  
        console.log (newButton); 
        GOT.push(newButton); 
        $("#results"). empty(); 
        $("#searchText").val(""); 
        buttonGenerator();
        searchTerm = newButton;
        offset = 10;  
        GIFgenerator(); 
        }
    })

   
var offset = 10; 
$("#loadMore").on("click", function (){
    console.log("clicked for more"); 
    var queryURLmore = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10" +offset+ "&limit=10"; 
    console.log (queryURLmore); 

    $.ajax ({
        url:queryURLmore,  
        method: "GET" 
    })

    .then (function (addMoreResponse) {
        var searchResultsMore = addMoreResponse.data; 
        for (var i = 0; i < searchResultsMore.length; i++) {
            var gifDiv = $("<div>");
            var gif = $("<img class= 'gif' data-state ='animate'>");
            gif.attr("src", searchResultsMore[i].images.fixed_width.url);
            gif.attr("data-animate", searchResultsMore[i].images.fixed_width.url);
            gif.attr("data-still", searchResultsMore[i].images.fixed_width_still.url); 
            var rating = $("<p>");
            rating.text("This is rated " + searchResultsMore[i].rating);
            console.log (rating); 
            gifDiv.prepend(gif,rating);
            $("#results").prepend(gifDiv); 
          }
          console.log(searchResultsMore); 
          offset +=10; 
    }

)})

