/* =========================================
   1. EFEK SOROTAN KURSOR PADA KARTU BENTO
========================================= */
const gridBento = document.querySelector(".grid-bento");
const daftarKartuBento = document.querySelectorAll(".kartu-bento");

gridBento.addEventListener("mousemove", (acara) => {
  daftarKartuBento.forEach((kartu) => {
    const batas = kartu.getBoundingClientRect();
    const posisiX = acara.clientX - batas.left;
    const posisiY = acara.clientY - batas.top;
    kartu.style.setProperty("--posisi-x", `${posisiX}px`);
    kartu.style.setProperty("--posisi-y", `${posisiY}px`);
  });
});

/* =========================================
   2. PENUNJUK WAKTU LANGSUNG
========================================= */
function perbaruiJam() {
  const elemenJam = document.getElementById("jamLokal");
  const sekarang = new Date();
  const formatWaktu = sekarang.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  elemenJam.textContent = `${formatWaktu} WIB`;
}
setInterval(perbaruiJam, 1000);
perbaruiJam();

/* =========================================
   3. SALIN ALAMAT SUREL KE PAPAN KLIP
========================================= */
const tombolSalin = document.getElementById("tombolSalinSurel");
const alamatSurel = "halo@rakapratama.id";

tombolSalin.addEventListener("click", () => {
  navigator.clipboard.writeText(alamatSurel).then(() => {
    const teksAsli = tombolSalin.textContent;
    tombolSalin.textContent = "Surel Berhasil Disalin!";
    tombolSalin.style.borderColor = "var(--aksen-utama)";
    tombolSalin.style.color = "var(--aksen-utama)";

    setTimeout(() => {
      tombolSalin.textContent = teksAsli;
      tombolSalin.style.borderColor = "";
      tombolSalin.style.color = "";
    }, 2200);
  });
});

/* =========================================
   4. PENYARINGAN KATEGORI PROYEK
========================================= */
const tombolFilter = document.querySelectorAll(".tombol-filter");
const kartuProyek = document.querySelectorAll(".kartu-proyek");

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    tombolFilter.forEach((btn) => btn.classList.remove("aktif"));
    tombol.classList.add("aktif");

    const kategoriDipilih = tombol.getAttribute("data-filter");

    kartuProyek.forEach((kartu) => {
      const kategoriKartu = kartu.getAttribute("data-kategori");
      if (kategoriDipilih === "semua" || kategoriDipilih === kategoriKartu) {
        kartu.classList.remove("tersembunyi");
      } else {
        kartu.classList.add("tersembunyi");
      }
    });
  });
});

/* =========================================
   5. MODAL PRATINJAU STUDI KASUS PROYEK
========================================= */
const modalProyek = document.getElementById("modalProyek");
const tutupModal = document.getElementById("tutupModal");
const modalMeta = document.getElementById("modalMeta");
const modalJudul = document.getElementById("modalJudul");
const modalDeskripsi = document.getElementById("modalDeskripsi");
const modalTautanKontak = document.getElementById("modalTautanKontak");

kartuProyek.forEach((kartu) => {
  kartu.addEventListener("click", () => {
    const judul = kartu.getAttribute("data-judul");
    const tahun = kartu.getAttribute("data-tahun");
    const peran = kartu.getAttribute("data-peran");
    const detail = kartu.getAttribute("data-detail");

    modalMeta.textContent = `${tahun} — ${peran}`;
    modalJudul.textContent = judul;
    modalDeskripsi.textContent = detail;

    modalProyek.classList.add("terbuka");
    modalProyek.setAttribute("aria-hidden", "false");
  });
});

function sembunyikanModal() {
  modalProyek.classList.remove("terbuka");
  modalProyek.setAttribute("aria-hidden", "true");
}

tutupModal.addEventListener("click", sembunyikanModal);
modalTautanKontak.addEventListener("click", sembunyikanModal);
modalProyek.addEventListener("click", (acara) => {
  if (acara.target === modalProyek) {
    sembunyikanModal();
  }
});
