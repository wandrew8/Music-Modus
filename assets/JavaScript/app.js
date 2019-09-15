var artist = $("#artistInput").val().trim();
var artistName = [];

function displayArtistInfo(songTitle, artist) {

    var artistN = $(this).attr("data-name");
    var queryURL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + artistName;
    
    console.log (artistName);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $(".image-cropper").css("background-image", "url(" + response.artists[0].strArtistThumb + ")");


        $("#artistBio").text(response.artists[0].strBiographyEN);
        $("#artistName").text(artistName[0].toUpperCase());
    
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

$("#submitButton").on("click", function(event) {
    event.preventDefault();

    var artist = $("#artistInput").val().trim();
    var songTitle = $("#songTitleInput").val().trim();

    $(".image-cropper").css("background-image", "url()");
    $("#artistBio").empty();
    $("#artistName").empty();
    $("#artistInput").val("");
    $("#songTitleInput").val("");
    artistName = []
    artistName.push(artist);
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



//Slide in left animation
var tl = new TimelineMax({onUpdate:updatePercentage});
var tl2 = new TimelineMax();
const controller = new ScrollMagic.Controller();

tl.from('#artistPhotoContainer', 0.8, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");
tl.from('#artistInfo', 0.5, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");
tl.from('#songMeter', 0.2, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");


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
