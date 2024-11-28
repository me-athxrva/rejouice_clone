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

function lenis_scroll(){
    const lenis = new Lenis();

    // Listen for the 'scroll' event and log the event data to the console
    lenis.on('scroll', (e) => {
        console.log(e);
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
}

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
            left: "0%",
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
            ease: "power1.inOut",
            onComplete: () => {
                menu_video.play()
            }
        })
    } else {
        gsap.to(".menu-content",{
            top: "-100%",
            duration: 1,
            ease: "power1.inOut"
        })
        menu_video.pause()
    }
}

// menu animation timeline
function menu_timeline(action){
    let menu_tl = gsap.timeline({
        ease: "power1.inOut"
    });

    menu_tl.fromTo("#menu_video",{
        scale: 0,
        opacity: 0,
    },{
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power"
    })

    menu_tl.fromTo(".menu-content-middle ul li a",{
        y: 100,
        opacity: 0,
    },{
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
    },"-=1")

    menu_tl.fromTo("#take_seat_btn",{
        opacity: 0,
    },{
        opacity: 1,
        duration: 0.5,
    },"-=0.5")

    menu_tl.fromTo(".menu-line",{
        x: "-100%"
    },{
        x: "0%",
        duration: 1,
    },"-=1")

    menu_tl.fromTo(".menu-content-bottom h4",{
        opacity: 0
    },{
        opacity: 1,
        duration: 0.5
    },"-=0.8")

    if(action=="play"){
        menu_tl.play();
    } else {
        menu_tl.reverse(true);
    }
}

// home_timeline
function home_timeline(){
    const home_tl = gsap.timeline({
        paused: true
    });

    home_tl.to(".text span",{
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
        stagger: 0.2,
        onComplete: () => {
            home_tl.to(".text span",{
                opacity: 0,
                duration: 0.5,
                ease: "power3.inOut",
                stagger: 0.2,
                delay: 0.25
            })
            home_tl.to(".preloader",{
                opacity: 0,
                duration: 1,
                ease: "power1.inOut",
                delay: 0.25,
                onComplete: () => {
                    gsap.set(".preloader",{
                        display: "none",
                    })
                }
            })
            home_tl.fromTo(".rejouice-tag span",{
                y: 10,
                opacity: 0
            },{
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.7,
                delay: 0.1,
                ease: "linear"
            },"-=1")
            home_tl.fromTo("nav",{
                y: -70,
                opacity: 0
            },{
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power1.inOut"
            },"-=1")
        }
    })
    home_tl.play()
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
    menu_toggle("open");
    menu_timeline("play");
})
menu_close_btn.addEventListener("click",function(){
    menu_timeline();
    menu_toggle("close");
})

// for loop for assigning functions to 'a' tags
for (let i = 0; i < menu_span.length; i++) {
    a_hover(a[i],menu_span[i])
}

// page1 function calls

cursor(page_1)
menu_btn_animation()
lenis_scroll()

addEventListener("DOMContentLoaded",function(){
    home_timeline();
})
