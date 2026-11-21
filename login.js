
// Mengambil elemen form
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

// Mengambil data akun admin
function getUsers() {
    return JSON.parse(localStorage.getItem("adminUsers")) || [];
}

// Berpindah antara Login dan Register
function showForm(form) {

    message.textContent = "";

    if (form === "login") {
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");

        document.getElementById("loginTab").classList.add("active");
        document.getElementById("registerTab").classList.remove("active");

    } else {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");

        document.getElementById("registerTab").classList.add("active");
        document.getElementById("loginTab").classList.remove("active");
    }
}

// Menampilkan dan menyembunyikan password
function togglePassword(id, button) {

    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
        button.textContent = "Sembunyi";
    } else {
        input.type = "password";
        button.textContent = "Lihat";
    }
}

// Proses register
registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const nama = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const konfirmasi = document.getElementById("confirmPassword").value;

    if (password.length < 6) {
        message.textContent = "Password minimal 6 karakter!";
        return;
    }

    if (password !== konfirmasi) {
        message.textContent = "Konfirmasi password tidak cocok!";
        return;
    }

    let users = getUsers();

    const emailTerdaftar = users.some(
        user => user.email === email
    );

    if (emailTerdaftar) {
        message.textContent = "Email sudah terdaftar!";
        return;
    }

    users.push({
        nama: nama,
        email: email,
        password: password
    });

    localStorage.setItem("adminUsers", JSON.stringify(users));

    alert("Registrasi berhasil! Silakan login.");

    registerForm.reset();
    showForm("login");
});

// Proses login
loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();

    const akun = users.find(
        user => user.email === email &&
                user.password === password
    );

    if (akun) {

        // Menyimpan sesi login
        sessionStorage.setItem("adminLogin", "true");
        sessionStorage.setItem("adminName", akun.nama);

        alert("Login berhasil! Selamat datang, " + akun.nama);

        window.location.href = "Login.page.html";

    } else {
        message.textContent = "Email atau password salah!";
    }
});
