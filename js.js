window.addEventListener("load", loadFunction);
window.addEventListener('resize', windowResize);

var rotIcon;
var rotSep;
var styleTrsIcon1 = "rotateY("
var styleTrsIcon2 = "deg) translateY(var(--inclin-circle-floor)) translateZ(var(--size-circle-floor)) translateX(-50%)"
var ulImages
var images;
var ulSpots;
var spots;
var brightnessAddShadow;
var brightnessMultShadow;
var brightnessAddLight;
var brightnessMultLight;
var minBrightness = 40;
var maxBrightnessShadow = 70;
var maxPosShadow;
var speed;

function windowResize(){
    var a = window.innerHeight/950;
    var b = window.innerHeight/-7;
    document.getElementsByTagName("body")[0].style.transform = "scale(" + a + ")";
    if(b<-97){
        // var c = (840 - (window.innerHeight-840))/-20;
        var c = -97 + (window.innerHeight-679)/3.5;
        document.getElementsByTagName("body")[0].style.bottom = c + "px";
    } else {
        document.getElementsByTagName("body")[0].style.bottom = b + "px";
    }
}

function loadFunction(){
    windowResize();
    delayRays();
    rotIcon = 0;
    var droite = document.getElementById("droite");
    var gauche = document.getElementById("gauche");
    droite.onclick = function(event){rotateIcon("D");}
    gauche.onclick = function(event){rotateIcon("G");}

    ulSpots = document.getElementById("spots");

    ulImages = document.getElementById("images");
    images = ulImages.getElementsByTagName("LI");

    document.getElementById("chNameText").innerText = images[0].getAttribute("name");
    document.getElementById("chNameShadow").innerText = images[0].getAttribute("name");

    var htmlSpot = ""
    rotSep = 360 / images.length;
    for(var i = 0; i<images.length; i++){
        htmlSpot += "<li></li>\n";
    }
    ulSpots.innerHTML = htmlSpot;
    spots = ulSpots.getElementsByTagName("LI");
    speed = getComputedStyle(document.documentElement);
    speed = parseFloat(speed.getPropertyValue('--speed-rotate'));

    for(var i = 0; i<images.length; i++){
        // spots[i].id = "spot" + i;
        spots[i].style.transform = styleTrsIcon1 + (rotIcon+i*rotSep) + styleTrsIcon2;
        spots[i].style.transition = "transform var(--speed-rotate) ease";
    }
    // while(brightnessAddShadow === undefined){
    //     console.log("not");
    //     shadowInit();
    // }
    // console.log(brightnessAddShadow);
    // if(isNaN(brightnessAddShadow)){
    //     console.log("not");
    //     shadowInit();
    // }
    matrixInitLoop();
}

function matrixInitLoop(){
    var i=0;
    var intervalMatrix = setInterval(function() {
        matrixInit();
        i += 10;
        if(i==400){
            shadowInit();
        }
        // shadowInit();
    }, 10);
}

function shadowInit(){
    console.log("start");
    var max;
    var min;
    var spotStyle = window.getComputedStyle(spots[0], null);
    var spotTrans = spotStyle.getPropertyValue("transform");
    console.log("1 : " + spotStyle);
    console.log("2 : " + spotTrans);
    spotTrans = spotTrans.split(",")
    var pos = parseFloat(spotTrans[14]);
    if(isNaN(pos)){
        var rect = spots[0].getBoundingClientRect();
        pos = rect.top
    }
    max = pos;
    min = pos;
    console.log("3 : " + pos);
    for(var i = 1; i<spots.length; i++){
        spotStyle = window.getComputedStyle(spots[i], null);
        spotTrans = spotStyle.getPropertyValue("transform");
        spotTrans = spotTrans.split(",")
        console.log("2.1 : " + spotTrans);
        pos = parseFloat(spotTrans[14]);
        console.log("4 : " + pos);
        if(isNaN(pos)){
            var rect = spots[i].getBoundingClientRect();
            pos = rect.top
            console.log("5 : " + pos);
        }
        console.log("6 : " + max);
        if (pos >= max){
            max = pos;
        }
        if (pos < min){min = pos}
        // document.getElementById("debug").innerHTML += maxShadow + "<br>"
    }
    maxShadow = min;
    for(var i = 1; i<spots.length; i++){
        spotStyle = window.getComputedStyle(spots[i], null);
        spotTrans = spotStyle.getPropertyValue("transform");
        spotTrans = spotTrans.split(",")
        pos = parseFloat(spotTrans[14]);
        if(isNaN(pos)){
            var rect = spots[i].getBoundingClientRect();
            pos = rect.top
        }
        if (pos > maxShadow && pos < max){
            maxShadow = pos;
        }
        // document.getElementById("debug").innerHTML += maxShadow + "<br>"
    }

    brightnessMultShadow = (minBrightness - maxBrightnessShadow)/(min - maxShadow);
    brightnessAddShadow = minBrightness - min*brightnessMultShadow;

    brightnessMultLight = (maxBrightnessShadow - 100)/(maxShadow - max);
    brightnessAddLight = maxBrightnessShadow - maxShadow*brightnessMultLight;

    maxPosShadow = maxShadow;

    console.log(brightnessMultShadow);
    console.log(minBrightness);
    console.log(maxBrightnessShadow);
    console.log(min);
    console.log(maxShadow);

    // if(isNaN(maxPosShadow)){
    //     console.log(maxPosShadow + "   not")
    //     shadowInit()
    // } else {
    //     console.log(maxPosShadow)
    // }


    // document.getElementById("debug").innerHTML += (min + maxShadow) + "<br>"
    // document.getElementById("debug").innerHTML += (minBrightness + maxBrightnessShadow) + "<br>"
    // document.getElementById("debug").innerHTML += brightnessAddShadow + "<br>"

    // document.getElementById("debug").innerHTML += brightnessMultShadow + "<br>"
    // document.getElementById("debug").innerHTML += brightnessAddShadow + "<br>"
    // document.getElementById("debug").innerHTML += brightnessMultLight + "<br>"
    // document.getElementById("debug").innerHTML += brightnessAddLight + "<br>"

}

function matrixInit(){
    for(var i = 0; i<spots.length; i++){
        var spotStyle = window.getComputedStyle(spots[i], null);
        var imageStyle = window.getComputedStyle(images[i], null);
        var spotTrans = spotStyle.getPropertyValue("transform");
        var widthIm = parseInt(imageStyle.width);
        var heightIm = parseInt(imageStyle.height);
        spotTrans = spotTrans.split(",")
        spotTrans[12] = parseFloat(spotTrans[12]) - widthIm/2;
        spotTrans[13] = parseFloat(spotTrans[13]) - heightIm;
        var replace = "matrix3d(1, 0, 0, "
        for(var j=3; j<spotTrans.length-1; j++){
            replace += spotTrans[j] + ", "
        }
        replace += spotTrans[j];
        var pos = parseFloat(spotTrans[14]);
        var bright;
        var zIndex = 100;
        if(pos < maxPosShadow){
            bright = pos*brightnessMultShadow + brightnessAddShadow;
            zIndex = bright;
        } else {
            bright = pos*brightnessMultLight + brightnessAddLight;
        }
        images[i].style.transform = replace;
        images[i].style.filter = "brightness(" + bright + "%)";
        images[i].style["z-index"] = parseInt(zIndex);
        if(i==0){
            // document.getElementById("debug").innerHTML = bright + " _ " + zIndex;
        }
    }
}


function rotateIcon(dir) {
    if(dir == "G"){
        rotIcon += rotSep;
    } else {
        rotIcon -= rotSep;
    }
    var changeFrontSpot = true;
    for(var i = 0; i<spots.length; i++){
        spots[i].style.transform = styleTrsIcon1 + (rotIcon+i*rotSep) + styleTrsIcon2;
        if(changeFrontSpot && images[i].classList.contains("spot-front")){
            var indSuivant = -1;
            if(dir == "G"){
                if(i == 0){
                    indSuivant = spots.length-1;
                } else {
                    indSuivant = i-1;
                }
            } else {
                if(i == spots.length-1){
                    indSuivant = 0;
                } else {
                    indSuivant = i+1;
                }
            }
            // document.getElementById("debug").innerHTML += indSuivant + "<br>"
            images[indSuivant].classList.remove("spot-back");
            images[indSuivant].classList.add("spot-front");
            images[i].classList.remove("spot-front");
            images[i].classList.add("spot-back");
            changeFrontSpot = false;
            document.getElementById("chNameText").innerText = images[indSuivant].getAttribute("name");
            document.getElementById("chNameShadow").innerText = images[indSuivant].getAttribute("name");
        }

    }
} 

function delayRays(){
    var raysBack = document.getElementById("raysLightBack");   
    var rays = raysBack.getElementsByClassName("ray");   
    for (var i=0; i<rays.length; i++){
        rays[i].style["animation-delay"] = i*0.33 + "s";
    }
    raysBack = document.getElementById("raysLightTop");   
    rays = raysBack.getElementsByClassName("ray");  
    for (var i=0; i<rays.length; i++){

        // rays[i].style["opacity"] = Math.floor(Math.random() * 16) + 10 + "%";
        var rayOpacity = parseFloat(rays[i].style["opacity"]);


        // rays[i].style["animation-delay"] = i*(Math.random()/1.5 + 0.05) + "s";
        rays[i].style["width"] = 8 + Math.floor(Math.random() * 5) + "px";
        rays[i].style["height"] = 68 + Math.floor(Math.random() * 21) + "%";
        rays[i].style["background-image"] = "linear-gradient(var(--color-rays" + (1 + Math.floor(Math.random() * 3)) + ") 70%, #0000)";
        rays[i].style["animation-delay"] = i*0.18 + "s, " + i*0.18 + "s";
        var j = Math.random()*1.8 + 1.3;
        rays[i].style["animation-duration"] = j + "s, " + j + "s";
    }
}
