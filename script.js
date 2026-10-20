
"use strict";

// =====================================
// BREW & BLOOM - INTERACTIVE FEATURES
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile navigation toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close the mobile menu after a link is selected.
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
                menuToggle.textContent = "☰";
            });
        });

        // Reset the menu when returning to desktop width.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 600) {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
                menuToggle.textContent = "☰";
            }
        });
    }

    // 2. Interactive menu cards
    const menuCards = document.querySelectorAll(".menu-card");

    menuCards.forEach((card) => {
        const title = card.querySelector("h3");

        if (!title) return;

        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute(
            "aria-label",
            "Learn about " + title.textContent.trim()
        );

        const showMenuMessage = () => {
            const itemName = title.textContent.trim();
            const price = card.querySelector(".price");
            const priceText = price ? price.textContent.trim() : "";

            alert(
                "☕ " + itemName +
                (priceText ? "\nPrice: " + priceText : "") +
                "\n\nThanks for exploring Brew & Bloom!"
            );
        };

        card.addEventListener("click", showMenuMessage);

        card.addEventListener("keydown", (event) => {
            if (event.target !== card) return;

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                showMenuMessage();
            }
        });
    });

    // 3. Demo contact form
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document
                .getElementById("visitor-name")
                .value.trim();

            if (!name) {
                formStatus.textContent =
                    "Please enter your name.";
                return;
            }

            formStatus.textContent =
                "Thank you, " + name +
                "! Your demo enquiry was completed successfully. " +
                "This form does not send an actual email.";

            contactForm.reset();
        });
    }

    // 4. Footer year stays current
    const footer = document.querySelector(".footer");

    if (footer) {
        const footerParagraphs = footer.querySelectorAll("p");

        footerParagraphs.forEach((paragraph) => {
            if (paragraph.textContent.includes("©")) {
                paragraph.textContent =
                    "© " + new Date().getFullYear() +
                    " Brew & Bloom. A demo café website.";
            }
        });
    }

    console.log("Brew & Bloom is ready to serve! ☕");
});
