// Small interactions for the portfolio navigation and contact form.

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
        });
    });
}

// Keep the footer year current automatically.
const yearElement = document.querySelector("#year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// This is a mailto form: it prepares a message in the visitor's email app.
// It does not store submissions or send them to a server.
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (!name || !email || !message) {
            if (formStatus) formStatus.textContent = "Please complete all fields first.";
            return;
        }

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        if (formStatus) {
            formStatus.textContent = "Opening your email application...";
        }

        window.location.href = `mailto:earhlnash02@gmail.com?subject=${subject}&body=${body}`;
    });
}
