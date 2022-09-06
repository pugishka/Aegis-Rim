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

var descriptions = {
    "Makoto Naegi" : "Makoto Naegi (\u{82D7}\u{6728} \u{8AA0}), is a student in Hope's Peak Academy's Class 78th, and a participant of the Killing School Life featured in Danganronpa: Trigger Happy Havoc. His title is the Ultimate Lucky Student (\u{8D85}\u{9AD8}\u{6821}\u{7D1A}\u{306E}\u{300C}\u{5E78}\u{904B}\u{300D}Chou Koukou Kyuu no \"Kou'un\" lit. Super High School Level Good Luck).",
    "Byakuya Togami" : "Byakuya Togami (\u{5341}\u{795E} \u{767D}\u{591C}) is a student in Hope's Peak Academy's Class 78th, and a participant of the Killing School Life featured in Danganronpa: Trigger Happy Havoc. His title is the Ultimate Affluent Progeny (\u{8D85}\u{9AD8}\u{6821}\u{7D1A}\u{306E}\u{300C}\u{5FA1}\u{66F9}\u{53F8}\u{300D}lit. Super High School Level Heir).",
    "Toko Fukawa" : "Toko Fukawa (\u{8150}\u{5DDD} \u{51AC}\u{5B50}), is a student in Hope's Peak Academy's Class 78th, and a participant of the Killing School Life featured in Danganronpa: Trigger Happy Havoc. Her title is the Ultimate Writing Prodigy (\u{8D85}\u{9AD8}\u{6821}\u{7D1A}\u{306E}\u{300C}\u{6587}\u{5B66}\u{5C11}\u{5973}\u{300D} lit. Super High School Level Literary Girl).",
    "Genocide Jack" : "Genocide Jack, who is also known as Genocide Jill, and as Genocider Sho (\u{30B8}\u{30A7}\u{30CE}\u{30B5}\u{30A4}\u{30C0}\u{30FC}\u{7FD4}) in the original Japanese version, is a student by proxy in Hope's Peak Academy's Class 78th, and a participant by proxy of the Killing School Life featured in Danganronpa: Trigger Happy Havoc. Her title is the Ultimate Murderous Fiend (\u{8D85}\u{9AD8}\u{6821}\u{7D1A}\u{306E}\u{300C}\u{6BBA}\u{4EBA}\u{9B3C}\u{300D} lit. Super High School Level Murderer), though it is unknown if this was given officially by Hope's Peak or is a self-given talent.",
    "Aoi Asahina" : "Aoi Asahina (\u{671D}\u{65E5}\u{5948} \u{8475}), also known as Hina, is a student in Hope's Peak Academy's Class 78th, and a participant of the Killing School Life featured in Danganronpa: Trigger Happy Havoc. Her title is the Ultimate Swimming Pro (\u{8D85}\u{9AD8}\u{6821}\u{7D1A}\u{306E}\u{300C}\u{30B9}\u{30A4}\u{30DE}\u{30FC}\u{300D}lit. Super High School Level Swimmer).",
    "Yasuhiro Hagakure" : "Yasuhiro Hagakure (\u{8449}\u{96A0} \u{5EB7}\u{6BD4}\u{5442}), also known as Hiro, is a student in Hope's Peak Academy's Class 78th, and a participant of the Killing School Life featured in Danganronpa: Trigger Happy Havoc. His title is the Ultimate Clairvoyant (\u{8D85}\u{9AD8}\u{6821}\u{7D1A}\u{306E}\u{300C}\u{5360}\u{3044}\u{5E2B}\u{300D} lit. Super High School Level Fortune-Teller).",
    "Kyoko Kirigiri" : "Kyoko Kirigiri (\u{9727}\u{5207} \u{97FF}\u{5B50}), is a student in Hope's Peak Academy's Class 78th, and a participant of the Killing School Life featured in Danganronpa: Trigger Happy Havoc. She doesn't remember her talent at the beginning of the Killing Game, so her title is the Ultimate ??? (\u{8D85}\u{9AD8}\u{6821}\u{7D1A}\u{306E}\u{300C}???\u{300D} lit. Super High School Level ???)."
}



function windowResize(){
    var a = window.innerHeight/950;
    var b = window.innerHeight/-7;
    document.getElementsByTagName("body")[0].style.transform = "scale(" + a + ")";
    if(b<-97){
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

    var nameCh = images[0].getAttribute("name");
    document.getElementById("chNameText").innerText = nameCh;
    document.getElementById("chNameShadow").innerText = nameCh;
    topDescription(nameCh);

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
        spots[i].style.transform = styleTrsIcon1 + (rotIcon+i*rotSep) + styleTrsIcon2;
        spots[i].style.transition = "transform var(--speed-rotate) ease";
    }
    matrixInitLoop();
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function topDescription(name){
    var p = document.getElementById("textTop");
    var s = document.getElementById("textTopShadow")
    // var r = await fetch('descriptions.json');
    // r = await r.json();

    var r = descriptions;
    var textp = r[name];
    p.innerHTML = "<span class='visibleHalf'></span><span class='hiddenHalf'>" + textp + "</span>" ;
    s.innerHTML = p.innerHTML;
    var visibleHalfP = p.getElementsByTagName("span")[0]
    var hiddenHalfP = p.getElementsByTagName("span")[1]
    var visibleHalfS = s.getElementsByTagName("span")[0]
    var hiddenHalfS = s.getElementsByTagName("span")[1]
    for(var i=0; i<textp.length; i++){
        visibleHalfP.textContent = visibleHalfP.textContent.concat(hiddenHalfP.textContent.substring(0,1));
        hiddenHalfP.textContent = hiddenHalfP.textContent.substring(1, hiddenHalfP.textContent.length);
        visibleHalfS.textContent = visibleHalfS.textContent.concat(hiddenHalfS.textContent.substring(0,1));
        hiddenHalfS.textContent = hiddenHalfS.textContent.substring(1, hiddenHalfS.textContent.length);
        await sleep(15);
    }

}

function matrixInitLoop(){
    var i=0;
    var intervalMatrix = setInterval(function() {
        matrixInit();
        i += 10;
        if(i==400){
            shadowInit();
        }
    }, 10);
}

function shadowInit(){
    var max;
    var min;
    var spotStyle = window.getComputedStyle(spots[0], null);
    var spotTrans = spotStyle.getPropertyValue("transform");
    spotTrans = spotTrans.split(",")
    var pos = parseFloat(spotTrans[14]);
    if(isNaN(pos)){
        var rect = spots[0].getBoundingClientRect();
        pos = rect.top
    }
    max = pos;
    min = pos;
    for(var i = 1; i<spots.length; i++){
        spotStyle = window.getComputedStyle(spots[i], null);
        spotTrans = spotStyle.getPropertyValue("transform");
        spotTrans = spotTrans.split(",")
        pos = parseFloat(spotTrans[14]);
        if(isNaN(pos)){
            var rect = spots[i].getBoundingClientRect();
            pos = rect.top
        }
        if (pos >= max){
            max = pos;
        }
        if (pos < min){min = pos}
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
    }

    brightnessMultShadow = (minBrightness - maxBrightnessShadow)/(min - maxShadow);
    brightnessAddShadow = minBrightness - min*brightnessMultShadow;

    brightnessMultLight = (maxBrightnessShadow - 100)/(maxShadow - max);
    brightnessAddLight = maxBrightnessShadow - maxShadow*brightnessMultLight;

    maxPosShadow = maxShadow;

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
            images[indSuivant].classList.remove("spot-back");
            images[indSuivant].classList.add("spot-front");
            images[i].classList.remove("spot-front");
            images[i].classList.add("spot-back");
            changeFrontSpot = false;
            var nameCh = images[indSuivant].getAttribute("name");
            document.getElementById("chNameText").innerText = nameCh;
            document.getElementById("chNameShadow").innerText = nameCh;
            topDescription(nameCh);
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
        rays[i].style["width"] = 8 + Math.floor(Math.random() * 5) + "px";
        rays[i].style["height"] = 68 + Math.floor(Math.random() * 21) + "%";
        rays[i].style["background-image"] = "linear-gradient(var(--color-rays" + (1 + Math.floor(Math.random() * 3)) + ") 70%, #0000)";
        rays[i].style["animation-delay"] = i*0.18 + "s, " + i*0.18 + "s";
        var j = Math.random()*1.8 + 1.3;
        rays[i].style["animation-duration"] = j + "s, " + j + "s";
    }
}
