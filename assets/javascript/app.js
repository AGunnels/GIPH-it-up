$(document).ready(function () {

    var addFavorites;
    //Favorite Musicians array  
    var musicians = [
        'Bonnie Raitt',
        'Tom Petty',
        'Willie Nelson',
        'Hall & Oats',
        'Aretha Franklin',
        'Janis Joplin',
        'The Beatles',
        'Ricky Skaggs',
        'Van Morrison',
        'Otis Redding'
    ]

    //add buttons

    var printBtn = function (addButton) {
        var gifBtn = $('<button class="searchButton" data-value="' + addButton + '">' + addButton + '</button>');
        $('.buttonBank').append(gifBtn);
    }
    //loop through controller array
    for (var i = 0; i < musicians.length; i++) {
        printBtn(musicians[i]);
    }

    //append new buttons from search bar: onclick event
    $('.createButton').on('click', function () {
        //set musician button value equal to value in userValue ID
        addFavorites = $('#userValue').val().trim();
        printBtn(addFavorites);
        //return to a blank string
        $('#userValue').val('');
    });

    //search criteria
    //base url and query operator

    //event for search button fields
    $('body').on('click', '.searchButton', function () {
        $('.giphStations').empty();
        //set var to equal the value of button clicked
        // 
        var searchQuery = $(this).attr('data-value');
        // searchQuery = $(this).data('value');


        //console.log(searchQuery);
        var apiKey = 'FR0HzDmPvnAethpn6NXaqei2hCr47CdB';
        var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=FR0HzDmPvnAethpn6NXaqei2hCr47CdB&q=' + searchQuery + 's&limit=10&offset=0&rating=G&lang=en';
        console.log(queryURL);
        //call ajax
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //log the data for reference
            console.log(response);
            //create a loop to run through array and get img responses
            for (var i = 0; i < response.data.length; i++) {
                //abbreviate response
                var result = response.data[i];
                console.log(result);
                //create an image dynamically in the document
                var resultImage = $('<img>');
                //set class equal to gif
                resultImage.addClass('gif');
                //set still image source attribute
                resultImage.attr("src", result.images.fixed_height_small_still.url);
                //store image attribute for a "static-image" option
                resultImage.attr("data-still", result.images.fixed_height_small_still.url);
                //store image attriute for an "animated-image" option
                resultImage.attr("data-animate", result.images.fixed_height_small.url);
                //set the default image state
                resultImage.attr("data-state", "still");
                //set image alt attribute
                resultImage.attr('alt', result.slug);

                //append image to existing gifStation div
                $('.giphStations').append(resultImage);
            }
        });
    });
    
//create click function to toggle animations; select "gif" class
		$(document).on("click", ".gif", function() {
            var state = $(this).attr("data-state");
            console.log(state);
            if(state == "still"){
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            }
            else if(state == "animate"){
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still"); 
            }    
            });	
    });


