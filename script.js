
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyBf3pg_vGRXuUrpS9jEajIWOseOUArHwVE",

    authDomain: "ai-resume-screening-ats.firebaseapp.com",

    projectId: "ai-resume-screening-ats",

    storageBucket: "ai-resume-screening-ats.firebasestorage.app",

    messagingSenderId: "872445329312",

    appId: "1:872445329312:web:4fdc16c25b16941c946ec5",

    measurementId: "G-M78PQT6HHQ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

/* -------------------------- */
/* LOGIN / SIGNUP TOGGLE */
/* -------------------------- */

let isSignup = false;

const loginTab =
document.getElementById("loginTab");

const signupTab =
document.getElementById("signupTab");

const nameField =
document.getElementById("nameField");

const submitBtn =
document.querySelector(".login-btn");

loginTab.addEventListener("click", () => {

    isSignup = false;

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    nameField.style.display = "none";

    submitBtn.textContent =
    "Enter Dashboard";
});

signupTab.addEventListener("click", () => {

    isSignup = true;

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    nameField.style.display = "block";

    submitBtn.textContent =
    "Create Account";
});

/* -------------------------- */
/* LOGIN / SIGNUP FORM */
/* -------------------------- */

document
.getElementById("loginForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    try {

        if(isSignup){

            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert(
                "Account Created Successfully!"
            );

        }
        else{

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert(
                "Login Successful!"
            );
        }

        window.location.href =
        "dashboard.html";

    }

    catch(error){

        alert(error.message);

        console.error(error);
    }
});

/* -------------------------- */
/* FORGOT PASSWORD */
/* -------------------------- */

const forgotPasswordBtn =
document.getElementById("forgotPassword");

if(forgotPasswordBtn){

    forgotPasswordBtn.addEventListener(
        "click",
        async (e) => {

            e.preventDefault();

            const email =
            document.getElementById("email").value;

            if(!email){

                alert(
                    "Please enter your email address first."
                );

                return;
            }

            try{

                await sendPasswordResetEmail(
                    auth,
                    email
                );

                alert(
                    "Password reset email sent successfully! Check your inbox."
                );

            }

            catch(error){

                alert(error.message);

                console.error(error);
            }
        }
    )
}

