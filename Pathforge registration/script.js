/* =========================================
   FORGE '26
   JAVASCRIPT
========================================= */


/* =========================================
   SUPABASE
========================================= */

const supabaseClient = supabase.createClient(
    "https://sqetaehdpycxzlxhzjry.supabase.co",
    "sb_publishable_GjMFoQCrVHUrPw0QHk713w_WuvBqSlW"
);


/* =========================================
   ELEMENTS
========================================= */

const registrationForm = document.getElementById("registrationForm");
const submitButton = document.getElementById("submitButton");
const successMessage = document.getElementById("successMessage");
const registerAnother = document.getElementById("registerAnother");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


/* =========================================
   FORM ELEMENTS
========================================= */

const emailInput = document.getElementById("email");
const fullNameInput = document.getElementById("fullName");
const emailError = document.getElementById("emailError");
const nameError = document.getElementById("nameError");
const categoryError = document.getElementById("categoryError");


/* =========================================
   MOBILE NAVIGATION
========================================= */

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* =========================================
   EMAIL VALIDATION
========================================= */

function isValidEmail(email) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =========================================
   GET SELECTED CATEGORY
========================================= */

function getSelectedCategory() {

    const selected = document.querySelector(
        'input[name="category"]:checked'
    );

    return selected ? selected.value : "";

}


/* =========================================
   CLEAR ERRORS
========================================= */

function clearErrors() {

    emailError.textContent = "";
    nameError.textContent = "";
    categoryError.textContent = "";

    emailInput.closest(".form-group").classList.remove("input-error");
    fullNameInput.closest(".form-group").classList.remove("input-error");

}


/* =========================================
   VALIDATE FORM
========================================= */

function validateForm() {

    clearErrors();

    let isValid = true;


    /* EMAIL */

    const email = emailInput.value.trim();

    if (email === "") {

        emailError.textContent = "Please enter your email address.";
        emailInput.closest(".form-group").classList.add("input-error");
        isValid = false;

    } else if (!isValidEmail(email)) {

        emailError.textContent = "Please enter a valid email address.";
        emailInput.closest(".form-group").classList.add("input-error");
        isValid = false;

    }


    /* FULL NAME */

    const fullName = fullNameInput.value.trim();

    if (fullName === "") {

        nameError.textContent = "Please enter your full name.";
        fullNameInput.closest(".form-group").classList.add("input-error");
        isValid = false;

    } else if (fullName.length < 2) {

        nameError.textContent = "Please enter a valid name.";
        fullNameInput.closest(".form-group").classList.add("input-error");
        isValid = false;

    }


    /* CATEGORY */

    const category = getSelectedCategory();

    if (!category) {

        categoryError.textContent = "Please select one category.";
        isValid = false;

    }


    return isValid;

}


/* =========================================
   FORM SUBMISSION (SAVES TO SUPABASE)
========================================= */

registrationForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    /* Stop if validation fails */

    if (!validateForm()) {
        return;
    }

    /* Get values */

    const formData = {
        email: emailInput.value.trim(),
        fullName: fullNameInput.value.trim(),
        category: getSelectedCategory()
    };

    /* Show loading state */

    submitButton.disabled = true;
    submitButton.classList.add("loading");

    /* Send to Supabase */

    const { error } = await supabaseClient
        .from("registrations")
        .insert([
            {
                email: formData.email,
                full_name: formData.fullName,
                category: formData.category
            }
        ]);

    /* Remove loading state */

    submitButton.disabled = false;
    submitButton.classList.remove("loading");

    /* Handle error */

    if (error) {
        console.error(error);
        categoryError.textContent =
            "Something went wrong. Please try again.";
        return;
    }

    /* Show success message */

    registrationForm.hidden = true;
    successMessage.hidden = false;

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =========================================
   REGISTER ANOTHER PERSON
========================================= */

registerAnother.addEventListener("click", () => {

    successMessage.hidden = true;
    registrationForm.hidden = false;

    registrationForm.reset();
    clearErrors();

    registrationForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =========================================
   LIVE ERROR CLEARING
========================================= */

emailInput.addEventListener("input", () => {

    if (emailInput.value.trim() !== "") {

        emailError.textContent = "";
        emailInput.closest(".form-group").classList.remove("input-error");

    }

});


fullNameInput.addEventListener("input", () => {

    if (fullNameInput.value.trim() !== "") {

        nameError.textContent = "";
        fullNameInput.closest(".form-group").classList.remove("input-error");

    }

});


document.querySelectorAll('input[name="category"]').forEach(radio => {

    radio.addEventListener("change", () => {

        categoryError.textContent = "";

    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

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


/* =========================================
   READY
========================================= */

console.log("FORGE '26 | The PathForge Foundation");
console.log("Registration system ready.");
