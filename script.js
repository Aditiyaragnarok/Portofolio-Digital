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
const alamatSurel = "aditiyanuralamsyah225@gmail.com";

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

let timerKetik;

function mulaiMengetik(elemen, teks, kecepatan = 18) {
  clearInterval(timerKetik);
  elemen.innerHTML = "";

  if (!teks) {
    elemen.classList.remove("efek-ketik");
    return;
  }

  elemen.classList.add("efek-ketik");
  let index = 0;
  let hasil = "";

  timerKetik = setInterval(() => {
    if (index < teks.length) {
      if (teks.slice(index, index + 4).toLowerCase() === "<br>") {
        hasil += "<br>";
        index += 4;
      } else {
        hasil += teks.charAt(index);
        index++;
      }
      elemen.innerHTML = hasil;
    } else {
      clearInterval(timerKetik);
      elemen.classList.remove("efek-ketik");
    }
  }, kecepatan);
}

kartuProyek.forEach((kartu) => {
  kartu.addEventListener("click", () => {
    const judul = kartu.getAttribute("data-judul");
    const tahun = kartu.getAttribute("data-tahun");
    const peran = kartu.getAttribute("data-peran");
    const detail = kartu.getAttribute("data-detail") || "";

    modalMeta.textContent = `${tahun} — ${peran}`;
    modalJudul.textContent = judul;

    modalProyek.classList.add("terbuka");
    modalProyek.setAttribute("aria-hidden", "false");

    mulaiMengetik(modalDeskripsi, detail, 18);
  });
});

function sembunyikanModal() {
  clearInterval(timerKetik);
  modalDeskripsi.classList.remove("efek-ketik");
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
const kanvasGear = document.createElement("canvas");
kanvasGear.style.cssText =
  "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;";
document.body.prepend(kanvasGear);

const wadahUtama = document.querySelector(".wadah");
if (wadahUtama) {
  wadahUtama.style.position = "relative";
  wadahUtama.style.zIndex = "1";
}

const ctx = kanvasGear.getContext("2d");
let lebarLayar, tinggiLayar;
let kecepatanScroll = 0;

function aturUkuranKanvas() {
  lebarLayar = kanvasGear.width = window.innerWidth;
  tinggiLayar = kanvasGear.height = window.innerHeight;
}
window.addEventListener("resize", aturUkuranKanvas);
aturUkuranKanvas();

window.addEventListener("scroll", () => {
  kecepatanScroll = 0.025;
});

function gambarRodaGigi(x, y, radiusLuar, jumlahGigi, sudut) {
  const radiusDalam = radiusLuar - 12;
  const langkah = (Math.PI * 2) / (jumlahGigi * 2);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(sudut);
  ctx.strokeStyle = "rgba(190, 242, 100, 0.14)";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  for (let i = 0; i < jumlahGigi * 2; i++) {
    const r = i % 2 === 0 ? radiusLuar : radiusDalam;
    const a = i * langkah;
    if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radiusDalam * 0.65, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radiusDalam * 0.22, 0, Math.PI * 2);
  ctx.stroke();

  for (let j = 0; j < 4; j++) {
    const sudutJari = (Math.PI / 2) * j;
    ctx.beginPath();
    ctx.moveTo(
      Math.cos(sudutJari) * (radiusDalam * 0.22),
      Math.sin(sudutJari) * (radiusDalam * 0.22),
    );
    ctx.lineTo(
      Math.cos(sudutJari) * (radiusDalam * 0.65),
      Math.sin(sudutJari) * (radiusDalam * 0.65),
    );
    ctx.stroke();
  }

  ctx.restore();
}

let sudutPutar = 0;
function animasiRodaGigi() {
  ctx.clearRect(0, 0, lebarLayar, tinggiLayar);

  sudutPutar += 0.002 + kecepatanScroll;
  kecepatanScroll *= 0.92;

  gambarRodaGigi(lebarLayar * 0.88, tinggiLayar * 0.22, 140, 18, sudutPutar);
  gambarRodaGigi(
    lebarLayar * 0.88 - 195,
    tinggiLayar * 0.22 + 115,
    95,
    12,
    -sudutPutar * 1.5,
  );
  gambarRodaGigi(
    lebarLayar * 0.1,
    tinggiLayar * 0.82,
    165,
    20,
    -sudutPutar * 0.8,
  );

  requestAnimationFrame(animasiRodaGigi);
}

animasiRodaGigi();
// Animasi muncul halus saat web dibuka & di-scroll
const elemenAnimasi = document.querySelectorAll(
  "nav, .kartu-bento, .kartu-proyek, .footer",
);

const pengamat = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("tampil");
        }, index * 80);
        pengamat.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

elemenAnimasi.forEach((el) => {
  el.classList.add("animasi-masuk");
  pengamat.observe(el);
});
// Animasi hitung angka otomatis pada kartu Pencapaian
const daftarAngka = document.querySelectorAll(".angka-besar[data-target]");

const pengamatAngka = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10);
        const akhiran = el.getAttribute("data-akhiran") || "";
        const durasi = 900;
        const waktuMulai = performance.now();

        const updateAngka = (waktuSekarang) => {
          const progres = Math.min((waktuSekarang - waktuMulai) / durasi, 1);
          const easeOut = 1 - Math.pow(1 - progres, 2);
          const nilaiSekarang = Math.round(easeOut * target);

          el.textContent = nilaiSekarang + (progres === 1 ? akhiran : "");

          if (progres < 1) {
            requestAnimationFrame(updateAngka);
          }
        };

        requestAnimationFrame(updateAngka);
        pengamatAngka.unobserve(el);
      }
    });
  },
  { threshold: 0.4 },
);

daftarAngka.forEach((angka) => pengamatAngka.observe(angka));
