/* =====================================================
   ELEMENTS
===================================================== */

const authModal = document.querySelector(".auth-modal");
const authCard = document.querySelector(".auth-card");

const loginBtnModal = document.querySelector(".login-btn-modal");
const heroLoginBtn = document.querySelector("#heroLoginBtn");

const closeBtnModal = document.querySelector(".close-btn-modal");

const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

const portfolioBox = document.querySelector(".portfolio-box");
const avatarBtn = document.querySelector("#avatarBtn");

const profileDropdown = document.querySelector("#profileDropdown");

const accountBtn = document.querySelector("#accountBtn");
const accountModal = document.querySelector("#accountModal");
const accountClose = document.querySelector("#accountClose");

const logoutBtn = document.querySelector("#logoutBtn");
const accountLogout = document.querySelector("#accountLogout");

const themeBtn = document.querySelector("#themeBtn");

const exploreBtn = document.querySelector("#exploreBtn");
const contactBtn = document.querySelector("#contactBtn");

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

const loginMessage = document.querySelector("#loginMessage");
const registerMessage = document.querySelector("#registerMessage");


/* =====================================================
   STORAGE KEYS
===================================================== */

const USERS_KEY = "myWebsiteUsers";
const SESSION_KEY = "myWebsiteLoggedInUser";
const THEME_KEY = "myWebsiteTheme";


/* =====================================================
   HELPER FUNCTIONS
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


function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem(SESSION_KEY)
        );

    } catch (error) {

        return null;

    }

}


function saveCurrentUser(user) {

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(user)
    );

}


function removeCurrentUser() {

    localStorage.removeItem(SESSION_KEY);

}


function getInitial(name) {

    if (!name) {
        return "U";
    }

    return name
        .trim()
        .charAt(0)
        .toUpperCase();

}


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(element, message, type) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.className =
        "form-message " + type;

}


function clearMessages() {

    if (loginMessage) {

        loginMessage.textContent = "";

        loginMessage.className = "form-message";

    }

    if (registerMessage) {

        registerMessage.textContent = "";

        registerMessage.className = "form-message";

    }

}


/* =====================================================
   AUTH MODAL
===================================================== */

function openLoginModal() {

    clearMessages();

    authModal.classList.add("show");

    authCard.classList.remove("slide");

}


function openRegisterModal() {

    clearMessages();

    authModal.classList.add("show");

    authCard.classList.add("slide");

}


function closeAuthModal() {

    authModal.classList.remove("show");

    authCard.classList.remove("slide");

    clearMessages();

}


/* =====================================================
   LOGIN BUTTONS
===================================================== */

if (loginBtnModal) {

    loginBtnModal.addEventListener(
        "click",
        openLoginModal
    );

}


if (heroLoginBtn) {

    heroLoginBtn.addEventListener(
        "click",
        openLoginModal
    );

}


/* =====================================================
   CLOSE AUTH
===================================================== */

if (closeBtnModal) {

    closeBtnModal.addEventListener(
        "click",
        closeAuthModal
    );

}


/* =====================================================
   SWITCH LOGIN / REGISTER
===================================================== */

if (registerLink) {

    registerLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openRegisterModal();

        }
    );

}


if (loginLink) {

    loginLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openLoginModal();

        }
    );

}


/* =====================================================
   REGISTER
===================================================== */

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const formData =
                new FormData(registerForm);

            const name =
                formData.get("name").trim();

            const email =
                formData.get("email")
                    .trim()
                    .toLowerCase();

            const password =
                formData.get("password");


            /* Validation */

            if (name.length < 2) {

                showMessage(
                    registerMessage,
                    "Please enter a valid name.",
                    "error"
                );

                return;

            }


            if (password.length < 6) {

                showMessage(
                    registerMessage,
                    "Password must be at least 6 characters.",
                    "error"
                );

                return;

            }


            const users = getUsers();


            /* Duplicate email */

            const existingUser =
                users.find(
                    user =>
                        user.email === email
                );


            if (existingUser) {

                showMessage(
                    registerMessage,
                    "This email is already registered.",
                    "error"
                );

                return;

            }


            /* Create user */

            const newUser = {

                id: Date.now(),

                name: name,

                email: email,

                password: password

            };


            users.push(newUser);

            saveUsers(users);


            showMessage(
                registerMessage,
                "Account created successfully!",
                "success"
            );


            /* Clear form */

            registerForm.reset();


            /* Open login after short delay */

            setTimeout(
                function () {

                    openLoginModal();

                },
                1000
            );

        }
    );

}


/* =====================================================
   LOGIN
===================================================== */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const formData =
                new FormData(loginForm);

            const email =
                formData.get("email")
                    .trim()
                    .toLowerCase();

            const password =
                formData.get("password");


            const users = getUsers();


            const user =
                users.find(
                    item =>
                        item.email === email &&
                        item.password === password
                );


            if (!user) {

                showMessage(
                    loginMessage,
                    "Invalid email or password.",
                    "error"
                );

                return;

            }


            /* Save session */

            saveCurrentUser({

                id: user.id,

                name: user.name,

                email: user.email

            });


            showMessage(
                loginMessage,
                "Login successful!",
                "success"
            );


            loginForm.reset();


            setTimeout(
                function () {

                    closeAuthModal();

                    renderAuthState();

                },
                500
            );

        }
    );

}


/* =====================================================
   RENDER AUTH STATE
===================================================== */

function renderAuthState() {

    const user = getCurrentUser();


    if (user) {

        /* Logged in */

        loginBtnModal.style.display = "none";

        portfolioBox.style.display = "block";


        const initial =
            getInitial(user.name);


        avatarBtn.textContent = initial;


        const dropdownAvatar =
            document.querySelector(".dropdown-avatar");

        const dropdownName =
            document.querySelector("#dropdownName");

        const dropdownEmail =
            document.querySelector("#dropdownEmail");


        if (dropdownAvatar) {

            dropdownAvatar.textContent =
                initial;

        }


        if (dropdownName) {

            dropdownName.textContent =
                user.name;

        }


        if (dropdownEmail) {

            dropdownEmail.textContent =
                user.email;

        }


        /* Account */

        const accountAvatar =
            document.querySelector("#accountAvatar");

        const accountName =
            document.querySelector("#accountName");

        const accountEmail =
            document.querySelector("#accountEmail");

        const accountNameInfo =
            document.querySelector("#accountNameInfo");

        const accountEmailInfo =
            document.querySelector("#accountEmailInfo");


        if (accountAvatar) {

            accountAvatar.textContent =
                initial;

        }


        if (accountName) {

            accountName.textContent =
                user.name;

        }


        if (accountEmail) {

            accountEmail.textContent =
                user.email;

        }


        if (accountNameInfo) {

            accountNameInfo.textContent =
                user.name;

        }


        if (accountEmailInfo) {

            accountEmailInfo.textContent =
                user.email;

        }

    } else {

        /* Logged out */

        loginBtnModal.style.display =
            "block";

        portfolioBox.style.display =
            "none";

    }

}


/* =====================================================
   PROFILE DROPDOWN
===================================================== */

if (avatarBtn) {

    avatarBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            profileDropdown.classList.toggle("show");

        }
    );

}


/* Close dropdown when clicking outside */

document.addEventListener(
    "click",
    function () {

        if (profileDropdown) {

            profileDropdown.classList.remove("show");

        }

    }
);


/* Prevent dropdown closing */

if (profileDropdown) {

    profileDropdown.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );

}


/* =====================================================
   MY ACCOUNT
===================================================== */

if (accountBtn) {

    accountBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            profileDropdown.classList.remove(
                "show"
            );

            accountModal.classList.add(
                "show"
            );

        }
    );

}


/* =====================================================
   CLOSE ACCOUNT
===================================================== */

if (accountClose) {

    accountClose.addEventListener(
        "click",
        function () {

            accountModal.classList.remove(
                "show"
            );

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    removeCurrentUser();

    profileDropdown.classList.remove(
        "show"
    );

    accountModal.classList.remove(
        "show"
    );

    renderAuthState();

}


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            logout();

        }
    );

}


if (accountLogout) {

    accountLogout.addEventListener(
        "click",
        logout
    );

}


/* =====================================================
   PASSWORD SHOW / HIDE
===================================================== */

const passwordToggles =
    document.querySelectorAll(
        ".password-toggle"
    );


passwordToggles.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    button.dataset.target;

                const input =
                    document.getElementById(
                        targetId
                    );

                const icon =
                    button.querySelector("i");


                if (input.type === "password") {

                    input.type = "text";

                    icon.className =
                        "bxf bx-hide";

                } else {

                    input.type = "password";

                    icon.className =
                        "bxf bx-show";

                }

            }
        );

    }
);


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

function updateThemeIcon() {

    const icon =
        themeBtn.querySelector("i");


    if (document.body.classList.contains(
        "light-mode"
    )) {

        icon.className =
            "bxf bx-sun";

    } else {

        icon.className =
            "bxf bx-moon";

    }

}


function applySavedTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_KEY
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

    } else {

        document.body.classList.remove(
            "light-mode"
        );

    }


    updateThemeIcon();

}


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light-mode"
            );


            const isLight =
                document.body.classList.contains(
                    "light-mode"
                );


            localStorage.setItem(
                THEME_KEY,
                isLight ? "light" : "dark"
            );


            updateThemeIcon();

        }
    );

}


/* =====================================================
   EXPLORE BUTTON
===================================================== */

if (exploreBtn) {

    exploreBtn.addEventListener(
        "click",
        function () {

            document
                .querySelector("#collection")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

}


/* =====================================================
   CONTACT BUTTON
===================================================== */

if (contactBtn) {

    contactBtn.addEventListener(
        "click",
        function () {

            alert(
                "Contact section is ready. You can add your email or WhatsApp here."
            );

        }
    );

}


/* =====================================================
   CLOSE MODALS WITH ESC
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeAuthModal();

            accountModal.classList.remove(
                "show"
            );

            profileDropdown.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   CLOSE MODAL BY CLICKING OUTSIDE
===================================================== */

authModal.addEventListener(
    "click",
    function (event) {

        if (event.target === authModal) {

            closeAuthModal();

        }

    }
);


accountModal.addEventListener(
    "click",
    function (event) {

        if (event.target === accountModal) {

            accountModal.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

applySavedTheme();

renderAuthState();