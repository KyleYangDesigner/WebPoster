document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
    
    document.addEventListener('mouseenter', () => {
        gsap.to(cursor, { opacity: 1 });
    });
    
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 0 });
    });
    
    // Scroll indicator fade out on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollY > 100) {
            gsap.to(scrollIndicator, {
                opacity: 0,
                duration: 0.5
            });
        } else {
            gsap.to(scrollIndicator, {
                opacity: 1,
                duration: 0.5
            });
        }
    });
    
    // Circle decoration animations
    gsap.to(".circle-decoration", {
        scrollTrigger: {
            trigger: ".circle-decoration",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        scale: 1.5,
        opacity: 0.7,
        ease: "none"
    });
    
    // Split screen animations
    const splitScreens = document.querySelectorAll('.split-screen');
    
    splitScreens.forEach((screen, index) => {
        // Animate the content
        gsap.from(screen.querySelector('.overlay-content'), {
            scrollTrigger: {
                trigger: screen,
                start: "top 80%",
                end: "top 30%",
                scrub: 1
            },
            y: 50,
            opacity: 0
        });
        
        // Animate the image
        if (screen.querySelector('.split-image')) {
            gsap.to(screen.querySelector('.split-image'), {
                scrollTrigger: {
                    trigger: screen,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                scale: 1.1
            });
        }
    });
    
    // Schedule header animation
    gsap.from(".schedule-header", {
        scrollTrigger: {
            trigger: ".horizontal-scroll-container",
            start: "top 80%",
            end: "top 30%",
            scrub: 1
        },
        y: -50,
        opacity: 0
    });
    
    // Horizontal scroll for schedule
    const horizontalScroll = gsap.to(".horizontal-scroll", {
        scrollTrigger: {
            trigger: ".horizontal-scroll-container",
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
            onUpdate: self => {
                // Calculate which day is active based on scroll progress
                const progress = self.progress;
                const dayIndex = Math.floor(progress * 5);
                
                // Remove active class from all days
                document.querySelectorAll('.day-content').forEach(day => {
                    day.classList.remove('active');
                });
                
                // Add active class to current day
                const days = document.querySelectorAll('.day-content');
                if (days[dayIndex]) {
                    days[dayIndex].classList.add('active');
                }
                
                // Hide horizontal scroll indicator after some scrolling
                const scrollIndicatorHorizontal = document.querySelector('.scroll-indicator-horizontal');
                if (progress > 0.1) {
                    gsap.to(scrollIndicatorHorizontal, {
                        opacity: 0,
                        duration: 0.5
                    });
                } else {
                    gsap.to(scrollIndicatorHorizontal, {
                        opacity: 1,
                        duration: 0.5
                    });
                }
            }
        },
        x: "-400vw",
        ease: "none"
    });
    
    // Schedule day background animations
    document.querySelectorAll('.day-content').forEach((day, index) => {
        // Subtle parallax effect on background images
        gsap.to(day.querySelector('.day-bg'), {
            scrollTrigger: {
                trigger: ".horizontal-scroll-container",
                start: "top top",
                end: "+=400%",
                scrub: 1
            },
            y: -30,
            scale: 1.1,
            ease: "none"
        });
    });
    
    // Notice section animations
    gsap.from("#notice-section .section-content", {
        scrollTrigger: {
            trigger: "#notice-section",
            start: "top 80%",
            end: "top 30%",
            scrub: 1
        },
        y: 50,
        opacity: 0
    });
    
    // Add to Calendar functionality
    const calendarBtn = document.querySelector('.calendar-btn');
    
    calendarBtn.addEventListener('click', () => {
        // Create calendar event data
        const eventTitle = "GradEx 110 - OCAD University's Annual Graduate Exhibition";
        const eventStart = "20250507T090000";
        const eventEnd = "20250511T170000";
        const eventDescription = "Toronto's largest free art and design exhibition featuring the work of more than 800 emerging artists and designers.";
        const eventLocation = "OCAD University, 100 McCaul St, Toronto";
        
        // Create iCalendar file content
        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "BEGIN:VEVENT",
            `SUMMARY:${eventTitle}`,
            `DTSTART:${eventStart}`,
            `DTEND:${eventEnd}`,
            `DESCRIPTION:${eventDescription}`,
            `LOCATION:${eventLocation}`,
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\n");
        
        // Create a blob and download link
        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "gradex110.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});