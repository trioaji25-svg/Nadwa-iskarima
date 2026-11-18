
// Mengambil data dari penyimpanan browser
let dataAbsensi = JSON.parse(
    localStorage.getItem("dataAbsensi")
) || [];

// Menampilkan tanggal
function tampilTanggal() {
    const sekarang = new Date();

    document.getElementById("tanggal").textContent =
        sekarang.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

// Menyimpan absensi
document.getElementById("formAbsensi")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const kelas = document.getElementById("kelas").value.trim();
    const status = document.getElementById("status").value;

    const sekarang = new Date();

    const tanggal = sekarang.toLocaleDateString("id-ID");
    const jam = sekarang.toLocaleTimeString("id-ID");

    // Mencegah absensi ganda pada hari yang sama
    const sudahAbsen = dataAbsensi.some(item =>
        item.nama.toLowerCase() === nama.toLowerCase() &&
        item.kelas.toLowerCase() === kelas.toLowerCase() &&
        item.tanggal === tanggal
    );

    if (sudahAbsen) {
        alert("Siswa ini sudah melakukan absensi hari ini!");
        return;
    }

    const dataBaru = {
        nama: nama,
        kelas: kelas,
        status: status,
        tanggal: tanggal,
        jam: jam
    };

    dataAbsensi.push(dataBaru);

    simpanData();
    tampilData();

    this.reset();

    alert("Absensi berhasil disimpan!");
});

// Menyimpan ke localStorage
function simpanData() {
    localStorage.setItem(
        "dataAbsensi",
        JSON.stringify(dataAbsensi)
    );
}

// Menampilkan data absensi
function tampilData() {

    const tabel = document.getElementById("tabelAbsensi");

    tabel.innerHTML = "";

    dataAbsensi.forEach((item, index) => {

        const baris = document.createElement("tr");

        const nilai = [
            index + 1,
            item.nama,
            item.kelas,
            item.status,
            item.tanggal,
            item.jam
        ];

        nilai.forEach(teks => {
            const kolom = document.createElement("td");
            kolom.textContent = teks;
            baris.appendChild(kolom);
        });

        const kolomAksi = document.createElement("td");
        const tombol = document.createElement("button");

        tombol.textContent = "Hapus";
        tombol.className = "delete-btn";
        tombol.onclick = function() {
            hapusData(index);
        };

        kolomAksi.appendChild(tombol);
        baris.appendChild(kolomAksi);

        tabel.appendChild(baris);
    });

    hitungStatistik();
}

// Menghitung jumlah kehadiran
function hitungStatistik() {

    const hariIni = new Date().toLocaleDateString("id-ID");

    const dataHariIni = dataAbsensi.filter(
        item => item.tanggal === hariIni
    );

    document.getElementById("totalSiswa").textContent =
        new Set(dataAbsensi.map(item =>
            item.nama.toLowerCase() + "|" + item.kelas.toLowerCase()
        )).size;

    document.getElementById("totalHadir").textContent =
        dataHariIni.filter(item => item.status === "Hadir").length;

    document.getElementById("totalIzin").textContent =
        dataHariIni.filter(item =>
            item.status === "Izin" || item.status === "Sakit"
        ).length;

    document.getElementById("totalAlfa").textContent =
        dataHariIni.filter(item => item.status === "Alfa").length;
}

// Menghapus data
function hapusData(index) {

    if (confirm("Apakah kamu yakin ingin menghapus data ini?")) {
        dataAbsensi.splice(index, 1);

        simpanData();
        tampilData();
    }
}

// Tombol logout
function logout() {
    function logout() {

    if (confirm("Apakah kamu yakin ingin logout?")) {

        sessionStorage.removeItem("adminLogin");
        sessionStorage.removeItem("adminName");

        window.location.href = "login.html";
    }
}
    if (confirm("Apakah kamu ingin keluar dari aplikasi?")) {
        alert("Terima kasih telah menggunakan Smart Attendance!");
    }
}

// Menjalankan aplikasi
tampilTanggal();
tampilData();
