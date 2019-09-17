//Variables
var artist = $("#artistInput").val().trim();
var songTitle = $("#songTitleInput").val().trim();

var artistNameArray = [];
var songTitleArray = [];
var lyricHold;

function displayArtistInfo(songTitle, artist) {

    var artistN = $(this).attr("data-name");
    var queryURL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + artistNameArray;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $(".image-cropper").css("background-image", "url(" + response.artists[0].strArtistThumb + ")");
        $("#artistBio").text(response.artists[0].strBiographyEN);
        var capitalizedName = capital_letter(artistNameArray[0])
        $("#artistName").text(capitalizedName);
    


        queryURL = `https://api.lyrics.ovh/v1/${artist}/${songTitle}`;
       
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (responseLyrics) {
       
       
        queryURL = "https://www.purgomalum.com/service/plain?text=" + responseLyrics.lyrics;

        $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (response) {
        var lyricLocation = $('#lyricText')
        lyricLocation.empty()
        lyricLocation.attr("dataCensored", response)
        lyricLocation.attr("dataUncensored", responseLyrics.lyrics)
        lyricLocation.attr("state", "uncensored")
        lyricLocation.text(responseLyrics.lyrics)
        lyricHold = responseLyrics.lyrics
        

        var settings = {
          async: true,
          crossDomain: true,
          url: "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/",
          method: "POST",
          headers: {
              "x-rapidapi-host": "twinword-emotion-analysis-v1.p.rapidapi.com",
              "x-rapidapi-key": "7d3b7b461bmsh4767c71572dc937p16d8f7jsn23f01c67289a",
              "content-type": "application/x-www-form-urlencoded"
          },
          data: {
              text: lyricHold
          }
      }
        
          $.ajax(settings).then(function (response) {
            
          console.log(response)
          meterFill(response.emotion_scores.joy,response.emotion_scores.suprise,response.emotion_scores.fear,response.emotion_scores.disgust,
            response.emotion_scores.anger,response.emotion_scores.sadness)
      });
      
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

//On click command for the submit button
$("#submitButton").on("click", function(event) {
    event.preventDefault();

    var artist = $("#artistInput").val().trim();
    var songTitle = $("#songTitleInput").val().trim();

    //Main content appears on the page
    $("#mainContent").css("display", "flex");
    $("#moreContent").css("display", "flex");

    $([document.documentElement, document.body]).animate({
      scrollTop: $("#mainContent").offset().top
    }, 2000);

    //Conditional to display modal prompting user to insert the needed information
    if (artist === "" || songTitle === "") {
      $(".bg-modal").css("display", "block");
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

    
    displayArtistInfo(songTitle, artist);
    
    $("#profanityFilter").on("click", function (){
      
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
})



//On click command to close the modals
$(".closeButton").on("click", function(event) {
  event.preventDefault();

  $(".bg-modal").css("display", "none");

});

$(".closeButton").on("click", function(event) {
  event.preventDefault();

  $(".bg-modal2").css("display", "none");

});



//Slide in left animation code
var tl = new TimelineMax({onUpdate:updatePercentage});
var tl2 = new TimelineMax();
const controller = new ScrollMagic.Controller();

tl.from('#songMeter', 4, {x:-300, opacity: 0,ease: Power4.easeInOut}, "=-1");
tl.from('#artistPhotoContainer', 2, {x:-500, opacity: 0,ease: Power4.easeInOut}, "=-1");
tl.from('#videoContainer', 4, {x:-500, opacity: 0,ease: Power4.easeInOut}, "=-1");
tl.from('#lyrics', 4, {x:-100, opacity: 0,ease: Power4.easeInOut}, "=-1");
tl.from('#artistInfo', 4, {x:-500, opacity: 0,ease: Power4.easeInOut}, "=-1");


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


var joyLocation = $("#joy-meter")
var supriseLocation = $("#suprise-meter")
var fearLocation = $("#fear-meter")
var disgustLocation = $("#disgust-meter")
var angerLocation = $("#anger-meter")
var sadnessLocation = $("sadness-meter")

var meterFill= function(joy,suprise,fear,disgust,anger,sadness){  

  var jpixles = joy*2200

  joyLocation.animate({
    width: "50px",
    height: jpixles+ "px",
  })
  joyLocation.css("background-color", "orange")
  var Suppixles = suprise*2200

  supriseLocation.animate({
    width: "50px",
    height: Suppixles+ "px",
  })
  supriseLocation.css("background-color", "yellow") 
  var fpixles = fear*2200

  fearLocation.animate({
    width: "50px",
    height: fpixles+ "px",
  })
  fearLocation.css("background-color", "purple")

  var dpixles = disgust*2200

  disgustLocation.animate({
    width: "50px",
    height: dpixles+ "px",
  })
  disgustLocation.css("background-color", "green")

  var apixles = anger*2200

  angerLocation.animate({
    width: "50px",
    height: apixles+ "px",
  })
  angerLocation.css("background-color", "red")
  
  var sadpixles = sadness*2200
  
  sadnessLocation.animate({
    width: "50px",
    height: sadpixles + "px",
  })
  sadnessLocation.css("background-color", "blue")
}  
  

//Hides opening animation on click of mouse
$("#openingAnimationContainer").on("click", function() {
  $("#openingAnimationContainer").slideUp("slow");
});


//Fades in text "click to begin" within opening animation
$(document).ready(function() {
  $("#openingClick").fadeIn(5000);
});


//Hides form content until user clicks on the page
$(document).on("click", function() {
  $("#formContent").css("display", "flex")
})

