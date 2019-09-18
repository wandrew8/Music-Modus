var lyricHold;

function displayArtistInfo(songTitle, artist) {



 

    var artistN = $(this).attr("data-name");
    var queryURL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + artistNameArray;
  var queryURL =
    "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + artist;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $(".image-cropper").css(
      "background-image",
      "url(" + response.artists[0].strArtistThumb + ")"
    );
    $("#artistBio").text(response.artists[0].strBiographyEN);
    var capitalizedName = capital_letter(artist);
    $("#artistName").text(capitalizedName);

    queryURL = `https://api.lyrics.ovh/v1/${artist}/${songTitle}`;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(responseLyrics) {
      queryURL =
        "https://www.purgomalum.com/service/plain?text=" + artist + responseLyrics.lyrics;

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
        

      }).then(function(response) {
        var lyricLocation = $("#lyricText");
        lyricLocation.empty();
        lyricLocation.attr("dataCensored", response);
        lyricLocation.attr("dataUncensored", responseLyrics.lyrics);
        lyricLocation.attr("state", "uncensored");
        lyricLocation.text(responseLyrics.lyrics);
        lyricHold = responseLyrics.lyrics;

        var settings = {
          async: true,
          crossDomain: true,
          url: "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/",
          method: "POST",
          headers: {
            "x-rapidapi-host": "twinword-emotion-analysis-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "7d3b7b461bmsh4767c71572dc937p16d8f7jsn23f01c67289a",
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            text: lyricHold
          }
        };

        $.ajax(settings).then(function(response) {
          console.log(response);
          meterFill(
            response.emotion_scores.joy,
            response.emotion_scores.suprise,
            response.emotion_scores.fear,
            response.emotion_scores.disgust,
            response.emotion_scores.anger,
            response.emotion_scores.sadness
          );
        });
      });
      
        })


      })

    })
    console.log("this is search term in testing", artist + songTitle)
    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + artist + songTitle + "&key=AIzaSyD-I609EBue7TuGbhT7_bn6PawQPIxN2wI&",
      method: "GET"
    }).then(function (response) {
      console.log("response", response)
      var videoId = response.items[0].id.videoId
      console.log("videoId", videoId)
      $("#videoOutPut").append(`<iframe width="79%" height="78%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)


    })



    });
  };


//Function to capitalize the first letter of each word
function capital_letter(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}



//Function to display the lyrics on the page
function displayLyrics() {

    //Main content appears on the page
    $("#mainContent").css("display", "block");
    $("#moreContent").css("display", "block");
  var queryURL = "https://api.lyrics.ovh/v1/" + artistNameArray + "/" + songTitleArray + "/";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    $("#lyricText").append(response.lyrics)

    console.log("Here are the lyrics: " + response)

    if (songTitleArray === response.error) {
      $(".bg-modal").css("display", "flex");

    }

  });

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}

//On click command for the submit button
$("#submitButton").on("click", function (event) {
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
  $("#videoOutPut").empty();
  artistNameArray = []
  artistNameArray.push(artist);
  songTitleArray = [];
  songTitleArray.push(songTitle);

  console.log("You selected the following artist: " + artist);
  displayArtistInfo(songTitle, artist);

  $("#profanityFilter").on("click", function () {
    console.log("clicked")
    var state = $("#lyricText").attr("state")
    if (state === "uncensored") {
      $("#lyricText").attr("state", "censored")
      var censoredText = $("#lyricText").attr("dataCensored")
      $("#lyricText").text(censoredText)
    } else {
      $("#lyricText").attr("state", "uncensored")
      var uncensoredText = $("#lyricText").attr("dataUncensored")
      $("#lyricText").text(uncensoredText)
    }
  })

  //On click command for the submit button
$("#submitButton").on("click", function(event) {
  event.preventDefault();

  var artist = $("#artistInput")
    .val()
    .trim();
  var songTitle = $("#songTitleInput")
    .val()
    .trim();

  //Main content appears on the page
  $("#mainContent").css("display", "flex");
  $("#moreContent").css("display", "flex");

  //Conditional to display modal prompting user to insert the needed information
  if (artist === "" || songTitle === "") {
    $(".bg-modal").css("display", "block");
    $("#mainContent").css("display", "none");
    $("#moreContent").css("display", "none");
  } else {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#mainContent").offset().top
      }, 2000);
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
      } 
      else if (state === "censored") {
        $("#lyricText").attr("state", "uncensored")
        var censoredText = $("#lyricText").attr("dataUncensored")
        $("#lyricText").text(uncensoredText)
      }
    })
});

})

//On click command to close the modals
$(".closeButton").on("click", function (event) {
  event.preventDefault();

  $(".bg-modal").css("display", "none");
});

$(".closeButton").on("click", function (event) {
  event.preventDefault();

  $(".bg-modal2").css("display", "none");
});

//Slide in left animation code
var tl = new TimelineMax({ onUpdate: updatePercentage });
var tl2 = new TimelineMax();
const controller = new ScrollMagic.Controller();

tl.from('#songMeter', 4, { x: -300, opacity: 0, ease: Power4.easeInOut }, "=-1");
tl.from('#artistPhotoContainer', 2, { x: -500, opacity: 0, ease: Power4.easeInOut }, "=-1");
tl.from('#videoContainer', 4, { x: -500, opacity: 0, ease: Power4.easeInOut }, "=-1");
tl.from('#lyrics', 4, { x: -100, opacity: 0, ease: Power4.easeInOut }, "=-1");
tl.from('#artistInfo', 4, { x: -500, opacity: 0, ease: Power4.easeInOut }, "=-1");

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
//meter function w/ arrays
var joyLocation = $("#joy-meter");
var supriseLocation = $("#suprise-meter");
var fearLocation = $("#fear-meter");
var disgustLocation = $("#disgust-meter");
var angerLocation = $("#anger-meter");
var sadnessLocation = $("sadness-meter");

var meterFill = function(joy, suprise, fear, disgust, anger, sadness) {
  var jpixles = joy * 2200;

  joyLocation.animate({
    width: "50px",
    height: jpixles > 250 ? 250 : jpixles + "px"
  });
  joyLocation.css("background-color", "orange");
  var Suppixles = suprise * 2200;

  supriseLocation.animate({
    width: "50px",
    height: Suppixles > 250 ? 250 : Suppixles + "px"
  });
  supriseLocation.css("background-color", "yellow");
  var fpixles = fear * 2200;

  fearLocation.animate({
    width: "50px",
    height: fpixles > 250 ? 250 : fpixles + "px"
  });
  fearLocation.css("background-color", "purple");

  var dpixles = disgust * 2200;

  disgustLocation.animate({
    width: "50px",
    height: dpixles > 250 ? 250 : dpixles + "px"
  });
  disgustLocation.css("background-color", "green");

  var apixles = anger * 2200;

  angerLocation.animate({
    width: "50px",
    height: apixles > 250 ? 250 : apixles + "px"
  });
  angerLocation.css("background-color", "red");

  var sadpixles = sadness * 2200;

  sadnessLocation.animate({
    width: "50px",
    height: sadpixles > 250 ? 250 : sadpixles + "px"
  });
  sadnessLocation.css("background-color", "blue");
};

//Hides opening animation on click of mouse
$("#openingAnimationContainer").on("click", function () {
  $("#openingAnimationContainer").slideUp("slow");
});

//Fades in text "click to begin" within opening animation
$(document).ready(function () {
  $("#openingClick").fadeIn(5000);
});

//Hides form content until user clicks on the page

$(document).on("click", function() {
  $("#formContent").css("display", "flex");
})
