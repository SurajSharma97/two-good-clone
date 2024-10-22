
const locomotiveSt=()=>{
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

locomotiveSt()

const navbarAni =()=>{
    gsap.to(".nav-svg1 svg",{
        transform:"translateY(-110%)",
        transition:"all 0.2s ",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 0",
            end:"top -5%",
            scrub:true,
        }
    })
    gsap.to(".nav-part .links",{
        transform:"translateY(-110%)",
        opacity:0,
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 0",
            end:"top -5%",
            scrub:true,
        }
    })
}
navbarAni()

const videoconanimation = ()=>{
    const videoCon=document.querySelector("#video-container");
const playBtn=document.querySelector("#play");
videoCon.addEventListener("mouseenter",()=>{
   gsap.to(playBtn,{
    opacity:1,
    scale:1,
   })
},
videoCon.addEventListener("mouseleave",()=>{
   gsap.to(playBtn,{
    opacity:0,
    scale:0,
   })
}
));


videoCon.addEventListener("mousemove",(dets)=>{
gsap.to(playBtn,{
    top:dets.y-70,
    left:dets.x-80
})
})
};
videoconanimation();


const loadingAnimation= ()=>{
    gsap.from("#page1 h1",{
        opacity:0,
        duraration:0.2,
        y:100,
        stagger:1,
    }),
    gsap.from("#page1 #video-container",{
        opacity:0,
        delay:1.5,
        duraration:0.9,
        // y:50,
    })
}
loadingAnimation()

const mouseAnimation=()=>{
    document.addEventListener("mousemove",(dets)=>{
        gsap.to(".cursor",{
            left:dets.clientX,
            top:dets.clientY,
        
        }) 
        })
        
        document.querySelectorAll(".child").forEach((a)=>{
        a.addEventListener("mouseenter",()=>{
            gsap.to(".cursor",{
                transform:"translate(-50%,-50%)",
                scale:1,
        
            })
        })
        })

        document.querySelectorAll(".child").forEach((a)=>{
        a.addEventListener("mouseleave",()=>{
            gsap.to(".cursor",{
                transform:"translate(-50%,-50%)",
                scale:0,
        
            })
        })
        })
}
mouseAnimation()