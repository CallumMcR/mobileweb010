function getNavBar() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("navbar-header").innerHTML = this.responseText;
            
            document.getElementById("navbar2-search-text").addEventListener("keyup", function (e) {
                if (e.keyCode == 13) {
                    createSearchHref();
                }
            });
            document.getElementById("navbar-search-text").addEventListener("keyup", function (e) {
                if (e.keyCode == 13) {
                    createSearchHref();
                }
            });
        }
    };
    xmlhttp.open("GET", "../navbar.html", true);
    xmlhttp.send();

}

function getFooter() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("footer").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "../footer.html", true);
    xmlhttp.send();
}





function expandNavBar() {
    var x = document.getElementById("myNavBar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}