var recognition = new webkitSpeechRecognition();
var currentlyRecording = false;
recognition.onresult = function (event) {
    var saidText = "";
    for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            saidText = event.results[i][0].transcript;
        } else {
            saidText += event.results[i][0].transcript;
        }
    }
    document.getElementById("navbar-search-text").value = saidText;
    document.getElementById("navbar2-search-text").value = saidText;
    document.getElementById("navbar-speech-icon").className = "fa fa-microphone microphone-ico";
    document.getElementById("navbar2-speech-icon").className = "fa fa-microphone microphone-ico";
    currentlyRecording = false;
}



function startRecording() {
    if (!currentlyRecording) {
        document.getElementById("navbar-speech-icon").className = "speech-active fa fa-microphone microphone-ico";
        document.getElementById("navbar2-speech-icon").className = "speech-active fa fa-microphone microphone-ico";
        currentlyRecording = true;
        recognition.start();
    }


}


/* Internal Search Engine */


function createSearchHref() {
    var searchQuery = document.getElementById("navbar-search-text").value;
    searchQuery = searchQuery.replace(/\s/g, '+');
    var href = "http://127.0.0.1:5501/search.html?" + searchQuery;
    location.replace(href);
}

function getQuery() {
    var url = window.location.href;
    var data = null;
    try {
        data = url.split('?')[1]; // Allows us to post data
        data = data.replace(/\+/g, ' ');
    }
    catch (error) {
        data = "Invalid Search Query";
    }
    document.getElementById("searchedFor").innerHTML = "You searched for: " + data;
}

function getPostedData() {
    var url = window.location.href;
    var data = null;
    try {
        data = url.split('?')[1]; // Allows us to post data
    }
    catch (error) {
        console.log("no search query received");
    }
    if (data != null) {
        searchInternalPages(data);
    }

}

function searchInternalPages(data) {
    var pages = [
        "index.html",
        "filters.html",
        "locations.html",
        "weather.html",
        "location.html",
        "food.html",
        "hotels.html",
        "wildlife.html"
    ]; // List of my pages
    var pagesTextName = [
        "Home",
        "Camera Filters",
        "Destinations",
        "Weather",
        "Where is Stamford",
        "Stamford Restraunts",
        "Stamford Hotels",
        "Stamford Wildlife"
    ]
    var pagesDescription =
        ["The home page, displaying all vital information, allowing you to assess your options.",
            "Dedicated to allowing you to take some the most interesting pictures while roaming around Stamford.",
            "Find all the most interesting locations for your visit to Stamford.",
            "Find forecast for the next five days in Stamford so you never get caught out in the rain.",
            "Find out how to get to Stamford, or maybe just utilise our inbuilt google map API to virtually take a tour of Stamford.",
            "Find out where to dine in Stamford, whether it's for a day out or just a meal.",
            "Need a place to stay? This page will tell you locations we recommend you stop for the night.",
            "Are you from the city, and you just want to see nature's true beauty? Well here's all our favourite animals from the Stamford area."];

    var arrayOfPageNamesMatchingSearch = [];
    var arrayOfPagesTextNamesMatchingSearch = [];
    var arrayOfPagesDescription = [];
    var searchQuery = data; //what we search
    searchQuery = searchQuery.replace(/\+/g, ' ');
    $.each(pages, function (index, value) {

        $.ajax({
            async: false,
            type: 'GET',
            url: value,
            success: function (data) {

                var body = $(data).text().replace(/\s+/gm, ' ');

                if (body.indexOf(searchQuery) >= 0) {
                    arrayOfPageNamesMatchingSearch.push(value);
                    arrayOfPagesDescription.push(pagesDescription[index]);
                    arrayOfPagesTextNamesMatchingSearch.push(pagesTextName[index]);
                }

            }
        });
    });

    if (arrayOfPageNamesMatchingSearch.length > 0) {
        document.getElementById("numOfResultsFound").innerHTML = "Number of results found: " + arrayOfPageNamesMatchingSearch.length;
        for (var i = 0; i < arrayOfPageNamesMatchingSearch.length; i++) {
            document.getElementById("pages-by-search").innerHTML += `
            <div class="container-search-result text-center">
            <div class="left-side-result">
                <a href="`+ arrayOfPageNamesMatchingSearch[i] + `"> ` + arrayOfPagesTextNamesMatchingSearch[i] + ` </a>
            </div>
            <div class="right-side-result">
            ` + arrayOfPagesDescription[i] + `
            </div>
        </div>`;
        }
    }

}