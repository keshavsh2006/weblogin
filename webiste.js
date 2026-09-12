/* =====================================================
   SELECT ELEMENTS
===================================================== */

const authModal =
    document.querySelector(".auth-modal");

const loginBtnModal =
    document.querySelector(".login-btn-modal");

const closeBtnModal =
    document.querySelector(".close-btn-modal");

const registerLink =
    document.querySelector(".register-link");

const loginLink =
    document.querySelector(".login-link");


/* ================= FORMS ================= */

const loginForm =
    document.querySelector(".login-form");

const registerForm =
    document.querySelector(".register-form");


/* ================= MESSAGES ================= */

const loginMessage =
    document.querySelector(".login-message");

const registerMessage =
    document.querySelector(".register-message");


/* ================= PROFILE ================= */

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

const logoutBtn =
    document.querySelector(".logout-btn");

const accountBtn =
    document.querySelector(".account-btn");


/* ================= ACCOUNT MODAL ================= */

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


/* ================= WELCOME ================= */

const welcomeText =
    document.querySelector("section h1");


/* =====================================================
   LOCAL STORAGE KEYS
===================================================== */

const USERS_KEY = "demoUsers";

const SESSION_KEY = "loggedInUser";


/* =====================================================
   GET USERS
===================================================== */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(USERS_KEY)
        ) || [];

    } catch (error) {

        return [];

    }

}


/* =====================================================
   SAVE USERS
===================================================== */

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


/* =====================================================
   GET CURRENT SESSION
===================================================== */

function getSession() {

    try {

        return JSON.parse(
            localStorage.getItem(SESSION_KEY)
        );

    } catch (error) {

        return null;

    }

}


/* =====================================================
   SAVE SESSION
===================================================== */

function saveSession(user) {

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({

            name: user.name,

            email: user.email

        })
    );

}


/* =====================================================
   CLEAR SESSION
===================================================== */

function clearSession() {

    localStorage.removeItem(
        SESSION_KEY
    );

}


/* =====================================================
   MESSAGE FUNCTION
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
   OPEN AUTH MODAL
===================================================== */

function openAuthModal(
    mode = "login"
) {

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


/* =====================================================
   CLOSE AUTH MODAL
===================================================== */

function closeAuthModal() {

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
   CLOSE DROPDOWN
===================================================== */

function closeDropdown() {

    dropdown.classList.remove(
        "show"
    );

    avatarCircle.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =====================================================
   RENDER LOGIN STATE
===================================================== */

function renderAuthState() {

    const user = getSession();


    /* ================= LOGGED OUT ================= */

    if (!user) {

        loginBtnModal.style.display =
            "inline-block";

        portfolioBox.classList.remove(
            "show"
        );

        closeDropdown();

        welcomeText.textContent =
            "Welcome user!";

        return;

    }


    /* ================= LOGGED IN ================= */

    const initial =
        (
            user.name ||
            user.email ||
            "U"
        )
        .trim()
        .charAt(0)
        .toUpperCase();


    /* Hide login */

    loginBtnModal.style.display =
        "none";


    /* Show profile */

    portfolioBox.classList.add(
        "show"
    );


    /* Avatar */

    avatarCircle.textContent =
        initial;


    /* Dropdown */

    dropdownName.textContent =
        user.name;

    dropdownEmail.textContent =
        user.email;


    /* Welcome */

    welcomeText.textContent =
        `Welcome ${user.name}!`;


    /* Account modal */

    accountAvatar.textContent =
        initial;

    accountName.textContent =
        user.name;

    accountEmail.textContent =
        user.email;

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


/* =====================================================
   CLOSE AUTH MODAL
===================================================== */

closeBtnModal.addEventListener(
    "click",
    closeAuthModal
);


/* =====================================================
   REGISTER LINK
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
   LOGIN LINK
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


        /* ================= NAME VALIDATION ================= */

        if (name.length < 2) {

            setMessage(
                registerMessage,
                "Name must be at least 2 characters.",
                "error"
            );

            return;

        }


        /* ================= EMAIL VALIDATION ================= */

        if (
            !registerForm
                .elements
                .email
                .checkValidity()
        ) {

            setMessage(
                registerMessage,
                "Please enter a valid email address.",
                "error"
            );

            return;

        }


        /* ================= PASSWORD VALIDATION ================= */

        if (password.length < 6) {

            setMessage(
                registerMessage,
                "Password must be at least 6 characters.",
                "error"
            );

            return;

        }


        /* ================= GET USERS ================= */

        const users =
            getUsers();


        /* ================= CHECK DUPLICATE ================= */

        const exists =
            users.some(
                (user) =>
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


        /* ================= CREATE USER ================= */

        users.push({

            name: name,

            email: email,

            password: password

        });


        /* ================= SAVE USER ================= */

        saveUsers(users);


        /* ================= SUCCESS MESSAGE ================= */

        setMessage(
            registerMessage,
            "Registration successful. You can now log in.",
            "success"
        );


        /* ================= GO TO LOGIN ================= */

        setTimeout(
            () => {

                authModal.classList.remove(
                    "slide"
                );


                loginForm
                    .elements
                    .email
                    .value = email;


                loginForm
                    .elements
                    .password
                    .focus();


                setMessage(
                    registerMessage
                );


                setMessage(
                    loginMessage,
                    "Account created. Enter your password to log in.",
                    "success"
                );

            },
            700
        );

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


        /* ================= GET USERS ================= */

        const users =
            getUsers();


        /* ================= FIND USER ================= */

        const user =
            users.find(
                (item) =>
                    item.email === email &&
                    item.password === password
            );


        /* ================= INVALID LOGIN ================= */

        if (!user) {

            setMessage(
                loginMessage,
                "Invalid email or password.",
                "error"
            );

            return;

        }


        /* ================= SAVE SESSION ================= */

        saveSession(user);


        /* ================= CLOSE MODAL ================= */

        closeAuthModal();


        /* ================= UPDATE UI ================= */

        renderAuthState();

    }
);


/* =====================================================
   PROFILE AVATAR
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
   CLOSE ACCOUNT MODAL
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

        /* Clear login session */

        clearSession();


        /* Close dropdown */

        closeDropdown();


        /* Close account modal */

        accountModal.classList.remove(
            "show"
        );

        accountModal.setAttribute(
            "aria-hidden",
            "true"
        );


        /* Update UI */

        renderAuthState();

    }
);


/* =====================================================
   CLOSE DROPDOWN WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    (event) => {

        if (
            !portfolioBox.contains(
                event.target
            )
        ) {

            closeDropdown();

        }


        /* Close auth modal by clicking outside */

        if (
            event.target === authModal
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

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        /* Close account modal */

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


        /* Close auth modal */

        else if (
            authModal.classList.contains(
                "show"
            )
        ) {

            closeAuthModal();

        }


        /* Close dropdown */

        closeDropdown();

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

renderAuthState();