// Ensure GSAP and ScrollTrigger are registered
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".wrapper", // Element to trigger the animation
            start: "top top",    // Start when the top of wrapper hits top of viewport
            end: "+=150%",       // End after 150% of viewport height
            pin: true,           // Pin the element during scroll
            scrub: true,         // Synchronize animation with scroll
            markers: true        // Show start/end markers (for debugging)
        }
    });

    // Zoom the image on scroll
    tl.to(".image-container img", { scale: 2, z: 350 });

    // Slightly scale the hero section
    tl.to(".section.hero", { scale: 1.1 }, "<");  // "<" makes it run in parallel with the previous tween
});
