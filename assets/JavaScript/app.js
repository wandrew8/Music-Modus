//Variables

var artist = $("#artistInput").val().trim();
var songTitle = $("#songTitleInput").val().trim();

var artistNameArray = [];
var songTitleArray = [];


function displayArtistInfo(songTitle, artist) {


    var artistN = $(this).attr("data-name");
    var queryURL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + artistNameArray;
    
    console.log (artistName);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $(".image-cropper").css("background-image", "url(" + response.artists[0].strArtistThumb + ")");


        $("#artistBio").text(response.artists[0].strBiographyEN);
        var capitalizedName = capital_letter(artistNameArray[0])
        $("#artistName").text(capitalizedName);
    
        console.log(response.artists[0].strBiographyEN);
        console.log(response.artists[0].strArtistThumb);

        queryURL = `https://api.lyrics.ovh/v1/${artist}/${songTitle}`;
        console.log("query", queryURL)

        $.ajax({
         url: queryURL,
          method: "GET"
      }).then(function (responseLyrics) {
        console.log("lyricsresponse: ", responseLyrics)
       
        queryURL = "https://www.purgomalum.com/service/plain?text=" + responseLyrics.lyrics;

        $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (response) {
        console.log ("censored response", response)
        $("#lyricText").attr("dataCensored", response)
        $("#lyricText").attr("dataUncensored", responseLyrics.lyrics)
        $("#lyricText").attr("state", "uncensored")
        $("#lyricText").text(responseLyrics.lyrics)
        })

      })
        
    });   
}

//Function to capitalize the first letter of each word
function capital_letter(str) 
{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}


//Function to display the lyrics on the page
function displayLyrics() {

  var queryURL = "https://api.lyrics.ovh/v1/" + artistNameArray + "/" + songTitleArray + "/";
  

  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function (response) {

      $("#lyricText").append(response.lyrics)


      
  });   
}


//On click command for the submit button
$("#submitButton").on("click", function(event) {
    event.preventDefault();

    var artist = $("#artistInput").val().trim();
    var songTitle = $("#songTitleInput").val().trim();


    //Conditional to display modal prompting user to insert the needed information
    if (artist === "" || songTitle === "") {
      $(".bg-modal").css("display", "flex");

    }


    $(".image-cropper").css("background-image", "url()");
    $("#artistBio").empty();
    $("#artistName").empty();
    $("#lyricText").empty();
    $("#artistInput").val("");
    $("#songTitleInput").val("");
    artistNameArray = []
    artistNameArray.push(artist);
    songTitleArray = [];
    songTitleArray.push(songTitle);

    console.log("You selected the following artist: " + artist);
    displayArtistInfo(songTitle, artist);
    
})

$("#profanityFilter").on("click", function (){
  console.log("clicked")
  var state = $("#lyricText").attr("state")
  if (state === "uncensored"){
    $("#lyricText").attr("state", "censored")
    var censoredText = $("#lyricText").attr("dataCensored")
    $("#lyricText").text(censoredText)
  } else {
    $("#lyricText").attr("state", "uncensored")
    var uncensoredText = $("#lyricText").attr("dataUncensored")
    $("#lyricText").text(uncensoredText)
  }
})


//On click command to close the modal
$(".closeButton").on("click", function(event) {
  event.preventDefault();

  $(".bg-modal").css("display", "none");

});





//Slide in left animation code
var tl = new TimelineMax({onUpdate:updatePercentage});
var tl2 = new TimelineMax();
const controller = new ScrollMagic.Controller();

tl.from('#artistPhotoContainer', 0.8, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");
tl.from('#artistInfo', 0.6, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");
tl.from('#songMeter', 0.5, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");


const scene = new ScrollMagic.Scene({
  triggerElement: ".sticky",
            triggerHook: "onLeave",
            duration: "100%"
})
  .setPin(".sticky")
  .setTween(tl)
		.addTo(controller);

const scene2 = new ScrollMagic.Scene({
  triggerElement: "#artistPhotoContainer"
})
  .setTween(tl2)
		.addTo(controller);


function updatePercentage() {
  //percent.innerHTML = (tl.progress() *100 ).toFixed();
  tl.progress();
}
