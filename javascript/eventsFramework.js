function addEvents(data, numberOfStamfordEvents) {
    var htmlText = ``;
    for (var index = 0; index < (data).length; index++) {

        var description = "";
        if (data[index]._embedded.venues[0].name !== null || data[index]._embedded.venues[0].name !== undefined) {
            description += "Will be live at: " + data[index]._embedded.venues[0].name;
        }

        htmlText += `<div class="grid-item" id="` + data[index].id + `">


        <div class="event-container">
            <div class="fa-solid fa-circle-info" onclick="toggleEventPicture('`+ data[index].id + `-event-picture-container')">
            </div>
            <div class="click-box" onclick="redirect('`+ data[index].url + `')">
                <div class="event-container-body">
                    <div class="main-body">
                        <div class="event-fluid">
                            `+ data[index].name + `
                        </div>
                        <div class="event-fluid">
                            `+ description + `
                        </div>
                    </div>
                </div>

                <div class="event-picture-container" id="` + data[index].id + `-event-picture-container">
                    <div class="event-container-overlayText">
                        <div class="event-align">
                        `+ data[index].name + `
                        <br>
                        `+ new Date(data[index].dates.start.dateTime).toLocaleString('en-GB') + `
                        </div>
                        
                    </div>
                    <img src="`+ data[index].images[0].url + `" id="` + data[index].id + `-img">

                </div>

            </div>
        </div>

    </div>`;

    }

    document.getElementById("event-list").innerHTML = htmlText;
    if(numberOfStamfordEvents==0){
        document.getElementById("stamford-events").innerHTML = "No events were found around the Stamford Region. Instead, we have provided you with some events we found in the UK.";
    }
    else{
        document.getElementById("stamford-events").innerHTML = "Below are some of the events we found in the Stamford area.";
    }
    
}

function redirect(url) {
    window.location.replace(url);
}

function toggleEventPicture(id) {
    var doc = document.getElementById(id);
    if (doc.classList.contains("hide")) {
        doc.classList.remove("hide");
    }
    else {
        doc.classList.add("hide");
    }

}