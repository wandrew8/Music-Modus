$.ajax({
  url: 'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyD-I609EBue7TuGbhT7_bn6PawQPIxN2wI&part=snippet,contentDetails,statistics,status',
  method: "GET"
}).then(function (response) {
console.log ("response", response)

})


