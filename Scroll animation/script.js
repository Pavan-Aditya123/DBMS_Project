// Ensure GSAP and ScrollTrigger are registered
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    // Create a timeline for the scrolling animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".wrapper",
            start: "top top",
            end: "+=200%",  // Adjust this value as needed
            pin: true,
            scrub: true,
            markers: true,
            onUpdate: (self) => {
                // Add the text overlay when scrolled to the end
                if (self.progress === 1) {
                    document.querySelector(".text-overlay").classList.add("show");
                } else {
                    document.querySelector(".text-overlay").classList.remove("show");
                }
            }
        }
    });

    // Zoom the image on scroll
    tl.to(".image-container img", { scale: 2, z: 350 });

    // Slightly scale the hero section
    tl.to(".section.hero", { scale: 1.1 }, "<");

    // Array of background images for each section
    const backgroundImages = [
        "url('https://static.vecteezy.com/system/resources/previews/016/265/425/original/movie-theater-with-white-screen-curtains-seats-free-vector.jpg')",
        "url('https://static.vecteezy.com/system/resources/previews/016/265/425/original/movie-theater-with-white-screen-curtains-seats-free-vector.jpg')"
    ];

    // Create ScrollTrigger instances for each section
    gsap.utils.toArray(".section").forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            onEnter: () => changeImageOnEnter(i),
            onLeave: () => changeImageOnLeave(i),
            markers: true
        });
    });

    let imageChanged = false; // Flag to track if the image has been changed

    // Function to change the background image when entering a section
    function changeImageOnEnter(index) {
        if (!imageChanged && index === backgroundImages.length - 1) {
            document.querySelector(".image-container").style.backgroundImage = backgroundImages[index];
            imageChanged = true; // Set flag to prevent changing back
        }
    }

    // Function to revert to the previous image when leaving a section
    function changeImageOnLeave(index) {
        // No action needed to revert image
    }
});
    