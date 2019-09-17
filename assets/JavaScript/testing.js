console.log("this is search term in testing", searchTerm)
$.ajax({
  url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +searchTerm+ "&key=AIzaSyD-I609EBue7TuGbhT7_bn6PawQPIxN2wI&",
  method: "GET"
}).then(function (response) {
console.log ("response", response)
var videoId = response.items[0].id.videoId
console.log ("videoId", videoId)
$("#videoOutPut").append(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)


})


