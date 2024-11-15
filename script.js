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


function locomotive_st(){
    // locomotive scrolltrigger 
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
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
locomotive_st()
cursor(page_1)
menu_btn_animation()

addEventListener("DOMContentLoaded",function(){
    home_timeline();
})
