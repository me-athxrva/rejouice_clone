var page_1 = document.querySelector(".page1");
var page1_content = document.querySelector(".page1-content");
var reel_btn = document.querySelector(".play-reel button");
var menu_close_btn = document.querySelector(".menu-content-right button");
var menu_open_btn = document.querySelector(".menu button");
var a = document.getElementsByTagName("a");
var menu_span = document.getElementsByClassName("underline");
var menu_video = document.getElementById("menu_video"); 
var reel_video = document.getElementById("play-reel-video"); 
var bg_video = document.getElementById("bg_video");
var menu_take_seat_btn = document.getElementById("take_seat_btn"); 

// universal cursor function
function cursor(pg_src){
    pg_src.addEventListener("mousemove",function(pos){
        gsap.to(".cursor",{
            left: pos.x,
            top: pos.y,
            duration: 0.2,
        })
    })
    pg_src.addEventListener("mouseenter",function(){
        gsap.to(".cursor",{
            opacity: 1
        })
    })
    pg_src.addEventListener("mouseleave",function(){
        gsap.to(".cursor",{
            opacity: 0
        })
    })
}

// universal a hover function
function a_hover(target,span_n){
    target.addEventListener("mouseenter",function(){
        gsap.to(span_n,{
            left: "0%"
        })
    })
    target.addEventListener("mouseleave",function(){
        gsap.to(span_n,{
            left: "100%",
            onComplete: () => {
                gsap.set(span_n,{
                    left: "-100%",
                    delay: 0
                })
            }
        })
    })
}

// menu open close function
function menu_toggle(up_down){
    if (up_down=='open') {
        gsap.to(".menu-content",{
            top: "0%",
            duration: 1.1,
            ease: "power3.inOut",
            onComplete: () => {
                menu_video.play()
            }
        })
    } else {
        gsap.to(".menu-content",{
            top: "-100%",
            duration: 1,
            ease: "power3.inOut"
        })
        menu_video.pause()
    }
}

// page 1 all functions and calls

// menu button animation
function menu_btn_animation(){
    menu_take_seat_btn.addEventListener("mouseenter",function(){
        gsap.to(".menu-content-middle button span",{
            left: "0%"
        })  
        gsap.to(".menu-content-middle button h4",{
            color: "white"
        })
    })
    menu_take_seat_btn.addEventListener("mouseleave",function(){
        gsap.to(".menu-content-middle button span",{
            left: "-100%"
        })  
        gsap.to(".menu-content-middle button h4",{
            color: "black"
        })
    })
}

page1_content.addEventListener("click",function(){
    menu_toggle("close")
    gsap.fromTo(".play-reel",{
        left: "-100%",
    },{
        backgroundColor: "black",
        left: "0",
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
            reel_video.play()
        }
    })
})
reel_btn.addEventListener("click",function(){
    reel_video.pause()
    gsap.to(".play-reel",{
        left: "-100%",
        duration: 1.2,
        ease: "power3.inOut"
    })
})

// menu close on click event
menu_open_btn.addEventListener("click",function(){
    menu_toggle("open")
})
menu_close_btn.addEventListener("click",function(){
    menu_toggle("close")
})

// for loop for assigning functions to 'a' tags
for (let i = 0; i < menu_span.length; i++) {
    a_hover(a[i],menu_span[i])
}

// page1 function calls
cursor(page_1)
menu_btn_animation()