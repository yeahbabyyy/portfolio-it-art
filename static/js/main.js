gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. INTERAKTYWNY PARALLAX 3D NA RUCH MYSZKĄ (przed scrollem) ---
    const heroSection = document.getElementById("hero-section");
    
    heroSection.addEventListener("mousemove", (e) => {
        const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
        const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

        // Pierwszy plan (kremowa korona) reaguje najmocniej
        gsap.to("#layer-front", {
            x: xNorm * 22,
            y: yNorm * 14,
            duration: 0.8,
            ease: "power2.out"
        });

        // Środkowy plan (gotyckie arkady) porusza się umiarkowanie
        gsap.to("#layer-mid", {
            x: xNorm * 10,
            y: yNorm * 7,
            duration: 0.8,
            ease: "power2.out"
        });

        // Tylny plan (ciemne iglice) porusza się subtelnie w przeciwną stronę, dając głębię
        gsap.to("#layer-back", {
            x: -xNorm * 8,
            y: -yNorm * 5,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // --- 2. GŁÓWNY EFEKT SCROLLOWANIA: PRZELOT PRZEZ BRAMĘ + EFEKT WIDMA/MGŁY ---
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-parallax",
            start: "top top",
            end: "+=175%",
            scrub: 1.4,
            pin: true
        }
    });

    // Pierwszy plan rozchodzi się najszybciej na boki (wrażenie wchodzenia do środka)
    heroTl.to("#layer-front", {
        scale: 3.8,
        opacity: 0,
        ease: "power2.in"
    }, 0);

    // Środkowy plan (z rozetką) przybliża się w stronę widza i rozmywa we mgle
    heroTl.to("#layer-mid", {
        scale: 2.6,
        opacity: 0,
        ease: "power2.in"
    }, 0);

    // Głębokie tło (iglice) przybliża się najwolniej i tonie w ciemnościach
    heroTl.to("#layer-back", {
        scale: 1.7,
        opacity: 0,
        ease: "power1.in"
    }, 0);

    // Całe SVG dostaje silnego rozmycia (blur) oraz falowania filtra turbulencji (efekt widma)
    heroTl.to("#hero-svg", {
        filter: "url(#phantom-filter) blur(18px)",
        ease: "power2.in"
    }, 0);

    heroTl.to("#displacement", {
        attr: { scale: 140 },
        ease: "power1.in"
    }, 0);

    // Zagęszczenie mgły i wygaszenie poświaty
    heroTl.to("#mist-layer", {
        opacity: 1,
        scale: 1.15,
        ease: "none"
    }, 0);

    heroTl.to("#glow-layer", {
        scale: 2.2,
        opacity: 0,
        ease: "none"
    }, 0);

    // Tytuł unosi się jak dym i znika
    heroTl.to("#hero-text", {
        y: -70,
        scale: 1.2,
        filter: "blur(12px)",
        opacity: 0,
        duration: 0.45,
        ease: "power1.in"
    }, 0);

    // --- 3. WYŁONIENIE SEKCJI "O MNIE" ---
    gsap.from(".about-container", {
        scrollTrigger: {
            trigger: "#about-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.2,
        ease: "power3.out"
    });
});
