function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function captureVideo() {
    if (hasGetUserMedia()) {
        const constraints = {
            video: true
        };

        const captureVideoButton = document.querySelector("#CaptureVideoButton");
        const screenshotButton = document.querySelector("#TakeScreenshotButton");
        const saveScreenshotButton = document.querySelector("#SaveScreenshotButton");
        const cssFiltersButton = document.querySelector("#ApplyCSSFiltersButton");
        const img = document.getElementById("screenshot-img");
        const video = document.querySelector("video");
        const canvas = document.createElement("canvas");


        var firstTime = true;
        let filterIndex = 0;
        const filters = [
            "grayscale",
            "sepia",
            "blur",
            "brightness",
            "contrast",
            "hue-rotate",
            "hue-rotate2",
            "hue-rotate3",
            "saturate",
            "invert",
            "",
        ];

        const filtersData = [
            "grayscale(1)",
            "sepia(1)",
            "blur(3px)",
            "brightness(5)",
            "contrast(8)",
            "hue-rotate(90deg)",
            "hue-rotate(180deg)",
            "hue-rotate(270deg)",
            "saturate(10)",
            "invert(1)",
            "",




        ];

        captureVideoButton.onclick = function () {
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(handleSuccess)
                .catch(handleError);
        };

        screenshotButton.onclick = video.onclick = function () {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            if (filterIndex !== filters.length && firstTime==false) {
                canvas.getContext("2d").filter = filtersData[filterIndex];
            }
            if (firstTime == true) {
                firstTime=false;
            }
            


            canvas.getContext("2d").drawImage(video, 0, 0);
            // Other browsers will fall back to image/png
            img.src = canvas.toDataURL("images/webp");

            saveScreenshotButton.disabled = false;
        };

        saveScreenshotButton.onclick = function () {
            download("StamfordImage.webp", canvas.toDataURL("images/webp"));
        };

        cssFiltersButton.onclick = video.onclick = function () {
            if (filterIndex == filters.length) {
                filterIndex = 0;
            }
            else {
                filterIndex++;
            }
            video.className = filters[filterIndex];
        };

        function handleSuccess(stream) {
            var initialMsg = document.getElementById("initial-display-video-button");
            initialMsg.parentNode.removeChild(initialMsg);
            screenshotButton.disabled = false;
            cssFiltersButton.disabled = false;
            video.srcObject = stream;

        }

        function handleError(error) {
            console.error('navigator.getUserMedia error: ', error);
        }
    }
}

captureVideo();

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', text);
    pom.setAttribute('download', filename);
    pom.click();
}