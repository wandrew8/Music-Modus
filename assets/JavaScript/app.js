function displayArtistInfo() {

    var artist = $(this).attr("data-name");
    var queryURL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=joni+mitchell";
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        console.log(response.artists[0].strBiographyEN);
        console.log(response.artists[0].strArtistThumb);


        
    });
    
    
}

displayArtistInfo();
