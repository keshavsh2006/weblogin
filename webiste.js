/* =====================================================
   ELEMENTS
===================================================== */

const authModal =
    document.querySelector(".auth-modal");

const loginBtnModal =
    document.querySelector(".login-btn-modal");

const openLoginBtn =
    document.querySelector(".open-login-btn");

const closeBtnModal =
    document.querySelector(".close-btn-modal");

const registerLink =
    document.querySelector(".register-link");

const loginLink =
    document.querySelector(".login-link");

const loginForm =
    document.querySelector(".login-form");

const registerForm =
    document.querySelector(".register-form");

const loginMessage =
    document.querySelector(".login-message");

const registerMessage =
    document.querySelector(".register-message");


/* PROFILE */

const portfolioBox =
    document.querySelector(".portfolio-box");

const avatarCircle =
    document.querySelector(".avatar-circle");

const dropdown =
    document.querySelector(".dropdown");

const dropdownName =
    document.querySelector(".dropdown-name");

const dropdownEmail =
    document.querySelector(".dropdown-email");

const accountBtn =
    document.querySelector(".account-btn");

const logoutBtn =
    document.querySelector(".logout-btn");


/* ACCOUNT MODAL */

const accountModal =
    document.querySelector(".account-modal");

const closeAccountBtn =
    document.querySelector(".close-account-btn");

const accountAvatar =
    document.querySelector(".account-avatar");

const accountName =
    document.querySelector(".account-name");

const accountEmail =
    document.querySelector(".account-email");


/* =====================================================
   STORAGE
===================================================== */

const USERS_KEY = "demoUsers";
const SESSION_KEY = "loggedInUser";


function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(USERS_KEY)
        ) || [];

    } catch {

        return [];

    }
}


function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


function getSession() {

    try {

        return JSON.parse(
            localStorage.getItem(SESSION_KEY)
        );

    } catch {

        return null;

    }
}


function saveSession(user) {

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
            name: user.name,
            email: user.email
        })
    );

}


function clearSession() {

    localStorage.removeItem(SESSION_KEY);

}


/* =====================================================
   MESSAGES
===================================================== */

function setMessage(
    element,
    message = "",
    type = ""
) {

    element.textContent = message;

    element.classList.remove(
        "error",
        "success"
    );

    if (type) {

        element.classList.add(type);

    }

}


/* =====================================================
   AUTH MODAL
===================================================== */

function openAuthModal(mode = "login") {

    authModal.classList.add("show");

    authModal.classList.toggle(
        "slide",
        mode === "register"
    );

    authModal.setAttribute(
        "aria-hidden",
        "false"
    );

    setMessage(loginMessage);
    setMessage(registerMessage);

}


function closeAuthModal() {

    /*
       IMPORTANT:
       Agar user logged-in nahi hai,
       modal close nahi hoga.

       Isse website bypass nahi hogi.
    */

    const user = getSession();

    if (!user) {

        authModal.classList.add("show");

        return;

    }

    authModal.classList.remove(
        "show",
        "slide"
    );

    authModal.setAttribute(
        "aria-hidden",
        "true"
    );

    loginForm.reset();
    registerForm.reset();

    setMessage(loginMessage);
    setMessage(registerMessage);

}


/* =====================================================
   DROPDOWN
===================================================== */

function closeDropdown() {

    dropdown.classList.remove("show");

    avatarCircle.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =====================================================
   AUTH STATE
===================================================== */

function renderAuthState() {

    const user = getSession();


    /* =========================================
       USER NOT LOGGED IN
    ========================================= */

    if (!user) {

        document.body.classList.remove(
            "logged-in"
        );

        loginBtnModal.style.display =
            "inline-block";

        portfolioBox.classList.remove(
            "show"
        );

        closeDropdown();


        /*
           Login screen show karo
        */

        authModal.classList.add("show");

        authModal.classList.remove("slide");

        authModal.setAttribute(
            "aria-hidden",
            "false"
        );

        return;

    }


    /* =========================================
       USER LOGGED IN
    ========================================= */

    document.body.classList.add(
        "logged-in"
    );

    loginBtnModal.style.display =
        "none";

    portfolioBox.classList.add(
        "show"
    );


    const initial =
        (
            user.name ||
            user.email ||
            "U"
        )
        .trim()
        .charAt(0)
        .toUpperCase();


    avatarCircle.textContent =
        initial;

    dropdownName.textContent =
        user.name;

    dropdownEmail.textContent =
        user.email;


    accountAvatar.textContent =
        initial;

    accountName.textContent =
        user.name;

    accountEmail.textContent =
        user.email;


    /*
       Login successful hone ke baad
       authentication modal close.
    */

    authModal.classList.remove(
        "show",
        "slide"
    );

    authModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =====================================================
   LOGIN BUTTON
===================================================== */

loginBtnModal.addEventListener(
    "click",
    () => {

        openAuthModal("login");

    }
);


openLoginBtn.addEventListener(
    "click",
    () => {

        openAuthModal("login");

    }
);


/* =====================================================
   CLOSE BUTTON
===================================================== */

closeBtnModal.addEventListener(
    "click",
    () => {

        /*
           Logged-out user modal close
           nahi kar sakta.
        */

        if (!getSession()) {

            setMessage(
                loginMessage,
                "Please login to explore the website.",
                "error"
            );

            return;

        }

        closeAuthModal();

    }
);


/* =====================================================
   REGISTER → LOGIN
===================================================== */

registerLink.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        authModal.classList.add(
            "slide"
        );

        setMessage(loginMessage);
        setMessage(registerMessage);

    }
);


/* =====================================================
   LOGIN → REGISTER
===================================================== */

loginLink.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        authModal.classList.remove(
            "slide"
        );

        setMessage(loginMessage);
        setMessage(registerMessage);

    }
);


/* =====================================================
   REGISTER
===================================================== */

registerForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const formData =
            new FormData(registerForm);


        const name =
            formData
                .get("name")
                .trim();


        const email =
            formData
                .get("email")
                .trim()
                .toLowerCase();


        const password =
            formData.get("password");


        /* NAME */

        if (name.length < 2) {

            setMessage(
                registerMessage,
                "Name must be at least 2 characters.",
                "error"
            );

            return;

        }


        /* EMAIL */

        if (
            !registerForm.elements.email
                .checkValidity()
        ) {

            setMessage(
                registerMessage,
                "Please enter a valid email address.",
                "error"
            );

            return;

        }


        /* PASSWORD */

        if (password.length < 6) {

            setMessage(
                registerMessage,
                "Password must be at least 6 characters.",
                "error"
            );

            return;

        }


        /* EXISTING USER */

        const users = getUsers();


        const exists =
            users.some(
                user =>
                    user.email === email
            );


        if (exists) {

            setMessage(
                registerMessage,
                "An account with this email already exists.",
                "error"
            );

            return;

        }


        /* SAVE USER */

        users.push({
            name,
            email,
            password
        });


        saveUsers(users);


        setMessage(
            registerMessage,
            "Registration successful!",
            "success"
        );


        /*
           Register ke baad automatically
           login screen par.
        */

        setTimeout(() => {

            authModal.classList.remove(
                "slide"
            );

            loginForm.elements.email.value =
                email;

            loginForm.elements.password.focus();


            setMessage(
                registerMessage
            );


            setMessage(
                loginMessage,
                "Account created. Please login.",
                "success"
            );

        }, 700);

    }
);


/* =====================================================
   LOGIN
===================================================== */

loginForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const formData =
            new FormData(loginForm);


        const email =
            formData
                .get("email")
                .trim()
                .toLowerCase();


        const password =
            formData.get("password");


        const users =
            getUsers();


        const user =
            users.find(
                item =>
                    item.email === email &&
                    item.password === password
            );


        /* INVALID LOGIN */

        if (!user) {

            setMessage(
                loginMessage,
                "Invalid email or password.",
                "error"
            );

            return;

        }


        /* SAVE LOGIN SESSION */

        saveSession(user);


        /* UPDATE UI */

        renderAuthState();


        /*
           Main website automatically unlock.
        */

    }
);


/* =====================================================
   PROFILE DROPDOWN
===================================================== */

avatarCircle.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();


        const isOpen =
            dropdown.classList.toggle(
                "show"
            );


        avatarCircle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }
);


/* =====================================================
   MY ACCOUNT
===================================================== */

accountBtn.addEventListener(
    "click",
    () => {

        closeDropdown();


        accountModal.classList.add(
            "show"
        );

        accountModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }
);


/* =====================================================
   CLOSE ACCOUNT
===================================================== */

closeAccountBtn.addEventListener(
    "click",
    () => {

        accountModal.classList.remove(
            "show"
        );

        accountModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }
);


/* =====================================================
   LOGOUT
===================================================== */

logoutBtn.addEventListener(
    "click",
    () => {

        clearSession();

        closeDropdown();


        accountModal.classList.remove(
            "show"
        );


        accountModal.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
           Website immediately lock.
        */

        renderAuthState();


        /*
           Login screen par login form.
        */

        setTimeout(() => {

            openAuthModal("login");

        }, 100);

    }
);


/* =====================================================
   CLICK OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    (event) => {


        /* PROFILE DROPDOWN */

        if (
            !portfolioBox.contains(
                event.target
            )
        ) {

            closeDropdown();

        }


        /* ACCOUNT MODAL */

        if (
            event.target === accountModal
        ) {

            accountModal.classList.remove(
                "show"
            );

            accountModal.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        /*
           Auth modal:
           Logged-out user click outside
           se bhi close nahi kar sakta.
        */

        if (
            event.target === authModal &&
            getSession()
        ) {

            closeAuthModal();

        }

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        /*
           Logged-out user Escape se
           login screen bypass nahi karega.
        */

        if (getSession()) {

            if (
                accountModal.classList.contains(
                    "show"
                )
            ) {

                accountModal.classList.remove(
                    "show"
                );

                accountModal.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }
            else if (
                authModal.classList.contains(
                    "show"
                )
            ) {

                closeAuthModal();

            }

        }


        closeDropdown();

    }
);


/* =====================================================
   START WEBSITE
===================================================== */

renderAuthState();
// =========================
// PAGE LOADER
// =========================

window.addEventListener("load", () => {
    const pageLoader = document.getElementById("pageLoader");

    setTimeout(() => {
        pageLoader.classList.add("hide");
    }, 1200);
});