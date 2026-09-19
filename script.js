
window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(() => {

            preloader.classList.add("hidden");

        }, 700);

    }

});


const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

    });


    // Close menu after clicking a link

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

        });

    });

}

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    links.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);

const backToTop = document.getElementById("back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .about-info, .skill-card, .project-card, .timeline-item, .hobby-card, .goal-card, .contact-info, .contact-form"
);

revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (!name || !email || !message) {

            alert("Please fill in all fields.");

            return;

        }


        alert(
            "Thank you, " +
            name +
            "! Your message has been received."
        );


        contactForm.reset();

    });

}


const themeToggle =
    document.getElementById("theme-toggle");

let lightMode =
    localStorage.getItem("lightMode") === "true";


function applyTheme() {

    if (lightMode) {

        document.body.classList.add("light-mode");

    } else {

        document.body.classList.remove("light-mode");

    }

}


applyTheme();


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        lightMode = !lightMode;

        localStorage.setItem(
            "lightMode",
            lightMode
        );

        applyTheme();

    });

}


const threeContainer =
    document.getElementById("three-container");


if (
    threeContainer &&
    typeof THREE !== "undefined"
) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    threeContainer.appendChild(
        renderer.domElement
    );

    const geometry =
        new THREE.IcosahedronGeometry(
            1.35,
            2
        );


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x7c5cff,

            roughness: 0.25,

            metalness: 0.75,

            wireframe: true

        });

    const mainObject =
        new THREE.Mesh(
            geometry,
            material
        );

    mainObject.position.x = 1.3;

    scene.add(mainObject);

    const innerGeometry =
        new THREE.IcosahedronGeometry(
            0.85,
            1
        );

    const innerMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xa78bfa,

            wireframe: true,

            transparent: true,

            opacity: 0.35

        });

    const innerObject =
        new THREE.Mesh(
            innerGeometry,
            innerMaterial
        );

    innerObject.position.x = 1.3;

    scene.add(innerObject);

    const particleCount = 800;

    const particleGeometry =
        new THREE.BufferGeometry();

    const particlePositions =
        new Float32Array(
            particleCount * 3
        );

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particlePositions[i * 3] =
            (Math.random() - 0.5) * 12;

        particlePositions[i * 3 + 1] =
            (Math.random() - 0.5) * 8;

        particlePositions[i * 3 + 2] =
            (Math.random() - 0.5) * 8;

    }

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );

    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0xa78bfa,

            size: 0.018,

            transparent: true,

            opacity: 0.7

        });

    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );

    scene.add(particles);

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            0.7
        );

    scene.add(ambientLight);

    const pointLight =
        new THREE.PointLight(
            0x7c5cff,
            3,
            10
        );

    pointLight.position.set(
        2,
        2,
        3
    );

    scene.add(pointLight);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 2;

            mouseY =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 2;

        }
    );

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();

        mainObject.rotation.x =
            elapsed * 0.18 +
            mouseY * 0.25;

        mainObject.rotation.y =
            elapsed * 0.25 +
            mouseX * 0.25;

        innerObject.rotation.x =
            -elapsed * 0.25;

        innerObject.rotation.y =
            -elapsed * 0.35;

        particles.rotation.y =
            elapsed * 0.015;


        particles.rotation.x =
            mouseY * 0.03;


        camera.position.x +=
            (mouseX * 0.15 -
                camera.position.x) *
            0.03;

        camera.position.y +=
            (-mouseY * 0.1 -
                camera.position.y) *
            0.03;

        camera.lookAt(
            0,
            0,
            0
        );

        renderer.render(
            scene,
            camera
        );

    }


    animate();

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );

        }
    );

}

console.log(
    "%c MD Masum Parvej ",
    "background:#7c5cff;color:white;font-size:20px;padding:8px;"
);

console.log(
    "Premium Portfolio Loaded Successfully 🚀"
);