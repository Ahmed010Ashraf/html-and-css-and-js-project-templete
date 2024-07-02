// check if there is a color on localStorage
let color = localStorage.getItem('color');
if(color !== null){
    document.documentElement.style.setProperty('--main-color' , color)
}
else {
    localStorage.setItem('color',"#ffeb3b")
    document.documentElement.style.setProperty('--main-color' , "#ffeb3b")
}
// random background option
let randomBackgroundOption = true;
// variable for background interval
let bgInterval ;

// check on localStorage
if(localStorage.getItem('bg_options') !== null){
    if(localStorage.getItem('bg_options')=="true"){
        randomBackgroundOption = true;
    }
    else {
        randomBackgroundOption = false;
        document.querySelector(".random-bg .no").classList.add("active");
        document.querySelector(".random-bg .yes").classList.remove("active");

    }
}
// chek on li to put active class
document.querySelectorAll(".colors li").forEach(li => {
    if(localStorage.getItem("color") == li.dataset.color){
        li.classList.add("active")
    }
})
// select landing page element
let landingPage = document.querySelector(".landing-page");

// get arr of images
let arrofimages = ["هكر.png","مبرمج.png","فلوس2.png","network.png","فلوس.png"];




// function to randomize images
function randomizeImages (){
    if(randomBackgroundOption == true){
        bgInterval = setInterval(() => {
            // get rand num 
            let randnum = Math.floor(Math.random() * arrofimages.length);
            
            // change background image url
            landingPage.style.backgroundImage = `url(images/${arrofimages[randnum]})`;
            
        }, 1000);
    }
}
randomizeImages ()
// settings-box 
/////when click on the icon the calss will toggle
document.querySelector(".settings-box i").onclick = function(){
    document.querySelector(".settings-box").classList.toggle("open");
    this.classList.toggle("rotate-color");
}
// colors-settings
let colors = document.querySelectorAll(".colors li")
console.log(colors);
colors.forEach(e => {
    e.addEventListener("click", (ele) =>{
        colors.forEach (e => {
            e.classList.remove("active")
        })
        ele.target.classList.toggle("active");
        // console.log(ele);
        // console.log(ele.target);
        // console.log(ele.target.dataset.color);
        /*
        take the color form data-color attribute and give it as 
        a value to the property main-color in the root and 
        the main-color will be applied in the web site
        */ 
        document.documentElement.style.setProperty('--main-color' , ele.target.dataset.color)
        localStorage.setItem("color", ele.target.dataset.color);
    })
});
// ranodm-bg 
//change the active class when click
let rand = document.querySelectorAll(".random-bg span")
rand.forEach(span => {
    span.addEventListener("click",function(e) {
        rand.forEach(span => {
            span.classList.remove("active")
        })
        e.target.classList.add("active")
        
        if(e.target.dataset.background == "yes"){
            randomBackgroundOption = true;
            randomizeImages ()
            localStorage.setItem('bg_options',true);
        }
        else {
            randomBackgroundOption = false;
            clearInterval(bgInterval);
            localStorage.setItem('bg_options',false)
        }
    })
})
// chose your image 

    document.querySelectorAll(".img-box img").forEach(img => {
                img.addEventListener("click",function(e){
                let attr_img = e.target.getAttribute("src");
                landingPage.style.backgroundImage = `url(${attr_img})`;
                randomBackgroundOption = false;
                clearInterval(bgInterval);
                localStorage.setItem('bg_options',false)
                document.querySelector(".random-bg .no").classList.add("active");
                document.querySelector(".random-bg .yes").classList.remove("active");
                console.log(attr_img);
            })
    })
// make the skills move when you arrive to the skill slide
let section = document.querySelector(".our-skills");
let spans = document.querySelectorAll(".our-skills .skill-progress span");
window.onscroll = function(){
    if(window.scrollY >= section.offsetTop - 400){
        spans.forEach(function(span){
            span.style.width = span.dataset.width;
        });
    }
    // console.log(window.scrollY);
    //window.innerHeight => the height of the window 
    //section.offsetHeight => the height of the section including padding and margin
    //section.offsetTop => the height of the website from the top to the section
    //window.scrollY => the value of the scroll Y it change of scroll
}

// make and handle popup-box and overlay on the our-gallery
let allimages = document.querySelectorAll(".our-gallery img")
allimages.forEach(img=>{
    img.addEventListener("click",e=>{
        let overlay = document.createElement("div");
        overlay.className = "overlay-pop-up";
        document.body.appendChild(overlay);
        let pop_box = document.createElement("div");
        pop_box.className = "pop-box";
        if(e.target.alt !== null){
            let image_alt = document.createElement("h4");
            let textalt = document.createTextNode(e.target.alt)
            image_alt.appendChild(textalt)
            pop_box.appendChild(image_alt)
        }
        let image = document.createElement("img");
        image.src = e.target.getAttribute("src");
        pop_box.appendChild(image);
        document.body.appendChild(pop_box);
        // create close button
        let close_button = document.createElement("span");
        let text_close = document.createTextNode("X");
        close_button.appendChild(text_close);
        close_button.className = "close-button";
        pop_box.appendChild(close_button);
    })
})
// remove the popup box and overlay when you click on the close button
document.addEventListener("click", function(e){
    if(e.target.className == "close-button"){
        document.querySelector(".pop-box").remove();
        document.querySelector(".overlay-pop-up").remove();
    }
})
document.addEventListener("click", function(e){
    if(e.target.className == "overlay-pop-up"){
        document.querySelector(".pop-box").remove();
        document.querySelector(".overlay-pop-up").remove();
    }
})
// make the logic of the bollets
let allbollets = document.querySelectorAll(".nav-bullets")

let links = document.querySelectorAll(".landing-page ul li a")

function scrolltosection(allEle){
    allEle.forEach(ele=>{
        ele.addEventListener("click",e=>{
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:"smooth"
            })
        })
    })
}
scrolltosection(links);
scrolltosection(allbollets);

//handle show and hide bullets in page
let nav_bullets = document.querySelector(".nav-bullets")
let rand_bollit = document.querySelectorAll(".random-bolit span");
// handle localstorage 
if(localStorage.getItem("bul") !==null){
    rand_bollit.forEach(bul=>{
        bul.classList.remove("active")
    })
    if(localStorage.getItem("bul") == "show"){
        nav_bullets.style.display = "block"
        document.querySelector(".random-bolit .show").classList.add("active")
    }
    else if(localStorage.getItem("bul") == "hide"){ 
        nav_bullets.style.display = "none"
        document.querySelector(".random-bolit .hide").classList.add("active")
    }
}

rand_bollit.forEach(bol=>{
    bol.addEventListener("click",e=>{
        rand_bollit.forEach(bol=>{
            bol.classList.remove("active")
        })
        e.target.classList.add("active")
        if(e.target.dataset.display == "show"){
            nav_bullets.style.display = "block"
            localStorage.setItem("bul","show")
        }
        else if (e.target.dataset.display == "hide"){
            nav_bullets.style.display = "none"
            localStorage.setItem("bul","hide")
        }
        // console.log(e.target);
    })
})
let button_reset = document.querySelector(".reset_button");
button_reset.addEventListener("click",e=>{
    localStorage.clear();
    window.location.reload();
})

// handle the burger icon

document.querySelector(".header-area ul").addEventListener("click",e=>{
    /*
    to make click of the child of the element like click to the element
    */ 
    e.stopPropagation()
})
document.querySelector(".burgur-icon").addEventListener("click",e=>{
    document.querySelector(".header-area ul").classList.toggle("active");
    document.querySelector(".burgur-icon").classList.toggle("show");
    e.stopPropagation();
});

document.addEventListener("click",e=>{
    if(e.target !== document.querySelector(".header-area ul") && e.target !== document.querySelector(".burgur-icon")){
        if( document.querySelector(".header-area ul").classList.contains("active")){
            document.querySelector(".header-area ul").classList.toggle("active");
            document.querySelector(".burgur-icon").classList.toggle("show");
        }
    }
})