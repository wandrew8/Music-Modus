var lyricHold;
var censored = true;
var lyricLocation;
var censoredLyrics; 
var censorshipfunc = function(){
  var censored = $('#customSwitch1').prop("checked");
  if(censored === true){
     $("#lyricText").text(censoredLyrics)
  }else{
    $("#lyricText").text(lyricHold)
  }
}
$("#customSwitch1").click(function(){
    censorshipfunc()
})

function displayArtistInfo(songTitle, artist) {
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
        "https://www.purgomalum.com/service/plain?text=" + responseLyrics.lyrics;
        

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        lyricLocation = $("#lyricText");

        lyricHold = responseLyrics.lyrics;
        censoredLyrics = response;
        censorshipfunc()

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
    });
  });
  console.log("this is a test", artist + songTitle)
    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + artist + songTitle + "&key=AIzaSyA6wZLmmeTTmwU8mKtb3xg0SpC-GMxcFng",
      method: "GET"
    }).then(function (response) {
      console.log("response", response)
      var videoId = response.items[0].id.videoId
      console.log("videoId", videoId)

<<<<<<< HEAD
      $("#videoOutPut").append(`<iframe width="79%" height="78%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
=======
      $("#videoOutPut").append(`<iframe width="79%" height="78%" src="https://www.youtube.com/embed/${videoId}?" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
>>>>>>> 91397590d4dd9d6dfccc49ded411d8560d72140f

    })
   
}

//Function to capitalize the first letter of each word
function capital_letter(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}

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
      },
      2000
    );
  }

  $(".image-cropper").css("background-image", "url()");
  $("#artistBio").empty();
  $("#artistName").empty();
  $("#lyricText").empty();
  $("#artistInput").val("");
  $("#songTitleInput").val("");

  displayArtistInfo(songTitle, artist);

   
 });



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
var tl = new TimelineMax({ onUpdate: updatePercentage });
var tl2 = new TimelineMax();
const controller = new ScrollMagic.Controller();

tl.from(
  "#songMeter",
  4,
  { x: -300, opacity: 0, ease: Power4.easeInOut },
  "=-1"
);
tl.from(
  "#artistPhotoContainer",
  2,
  { x: -500, opacity: 0, ease: Power4.easeInOut },
  "=-1"
);
tl.from(
  "#videoContainer",
  4,
  { x: -500, opacity: 0, ease: Power4.easeInOut },
  "=-1"
);
tl.from("#lyrics", 4, { x: -100, opacity: 0, ease: Power4.easeInOut }, "=-1");
tl.from(
  "#artistInfo",
  4,
  { x: -500, opacity: 0, ease: Power4.easeInOut },
  "=-1"
);

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
var sadnessLocation = $("#sadness-meter");

var meterFill = function(joy, suprise, fear, disgust, anger, sadness) {
  var jpixles = joy * 1500;

  joyLocation.animate({
    width: "100%",
    height: jpixles > 250 ? 250 : jpixles + "px"
  });
  joyLocation.css("background-color", "#18dcff");
  var suppixles = suprise * 1500;

  supriseLocation.animate({
    width: "100%",
    height: suppixles > 250 ? 250 : suppixles + "px"
  });
  supriseLocation.css("background-color", "#18dcff");
  var fpixles = fear * 1500;

  fearLocation.animate({
    width: "100%",
    height: fpixles > 250 ? 250 : fpixles + "px"
  });
  fearLocation.css("background-color", "#18dcff");

  var dpixles = disgust * 1500;

  disgustLocation.animate({
    width: "100%",
    height: dpixles > 250 ? 250 : dpixles + "px"
  });
  disgustLocation.css("background-color", "#18dcff");

  var apixles = anger * 1500;

  angerLocation.animate({
    width: "100%",
    height: apixles > 250 ? 250 : apixles + "px"
  });
  angerLocation.css("background-color", "#18dcff");

  var sadpixles = sadness * 1500;

  sadnessLocation.animate({
    width: "100%",
    height: sadpixles > 250 ? 250 : sadpixles + "px"
  });
  sadnessLocation.css("background-color", "#18dcff");
  joyLocation.empty()
  supriseLocation.empty()

};

//Hides opening animation on click of mouse for full screen
$("#openingAnimationContainer").on("click", function() {
  $("#openingAnimationContainer").slideUp("slow");
});

//Hides opening animation on click of mouse for small screens
$("#openingAnimationTwo").on("click", function() {
  $("#openingAnimationTwo").slideUp("slow");
});

//Fades in text "click to begin" within opening animation full screen
$(document).ready(function() {
  $("#openingClick").fadeIn(5000);
});

//Fades in text "click to begin" within opening animation full screen
$(document).ready(function() {
  $("#openingClick2").fadeIn(5000);
});

//Hides form content until user clicks on the page

$(document).on("click", function() {
  $("#formContent").css("display", "flex");
});
