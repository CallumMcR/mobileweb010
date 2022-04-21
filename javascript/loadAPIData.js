function loadAPIData(method, url) {
    return new Promise(function (resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open(method, url, true);
        //xmlhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
        xmlhttp.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xmlhttp.response);
            }
            else {
                reject({
                    status: this.status,
                    statusText: xmlhttp.statusText
                });
            }
        };
        xmlhttp.onerror = function () {
            reject({
                status: this.status,
                statusText: xmlhttp.statusText
            });
        };
        xmlhttp.send();
    });

}
