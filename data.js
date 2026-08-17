/**
 * Database Pakaian Kerajaan Nusantara sampai Modern
 * Menyimpan data sejarah, tekstil (wastra), filosofi, dan data evolusi pakaian.
 */

const HISTORY_DATA = {
  eras: [
    {
      id: "klasik",
      name: "Era Kerajaan Klasik",
      period: "Abad ke-4 - ke-15",
      description: "Masa kejayaan kerajaan Hindu-Buddha di Nusantara (seperti Kutai, Sriwijaya, Majapahit, dan Sunda Galuh). Pakaian dicirikan oleh penggunaan wastra lilitan tubuh (dodot/kemben), kain songket benang emas murni, ornamen logam kuningan tebal, serta tubuh bagian atas yang cenderung terbuka karena iklim tropis.",
      themeColor: "#C5A059"
    },
    {
      id: "kesultanan",
      name: "Era Kesultanan & Kolonial",
      period: "Abad ke-16 - ke-19",
      description: "Masuknya pengaruh Islam dan kolonial Eropa membawa pergeseran budaya berpakaian yang lebih tertutup. Lahir pakaian seperti Beskap, Surjan, Baju Kurung Melayu formal, serta Kebaya Noni/Peranakan yang memadukan renda Eropa dengan batik pesisir.",
      themeColor: "#8B2635"
    },
    {
      id: "kemerdekaan",
      name: "Era Kemerdekaan & Nasional",
      period: "1940-an - 1950-an",
      description: "Masa transisi pasca-kemerdekaan RI di mana pakaian berfungsi sebagai identitas pemersatu bangsa. Ditandai dengan penggunaan Kebaya Kartini berkerah lipat rapi, setelan jas Safari berkancing baris khas Soekarno, dan Peci Hitam nasional sebagai simbol kesetaraan kelas.",
      themeColor: "#2F4858"
    },
    {
      id: "retro",
      name: "Era Retro & Modernisasi",
      period: "1960-an - 1990-an",
      description: "Dekade eksplorasi mode di mana motif tradisional mulai dipadukan dengan tren barat. Kebaya Kutu Baru dengan bef dada tengah kembali populer, disusul kemeja Batik formal pria yang diresmikan oleh Ali Sadikin sebagai busana resmi, dan gaun batik bersiluet longgar (A-line).",
      themeColor: "#D18D1F"
    },
    {
      id: "kontemporer",
      name: "Era Kontemporer & Modern Fusion",
      period: "2000-an - Sekarang",
      description: "Era kebebasan berekspresi di mana wastra tradisional (Batik, Songket, Tenun) dilebur bersama fesyen modern. Lahir rancangan kebaya kontemporer berekor panjang, rompi tenun kasual, gaun modest/hijab modern, hingga perpaduan kain tradisional dengan jaket denim dan sneakers.",
      themeColor: "#2E5A44"
    }
  ],
  clothes: [
    {
      id: "sriwijaya_aesan",
      eraId: "klasik",
      name: "Aesan Gede Sriwijaya",
      origin: "Kerajaan Sriwijaya (Palembang)",
      textile: "Songket Benang Emas Murni & Sutra",
      description: "Pakaian kebesaran bangsawan Kerajaan Sriwijaya yang melambangkan kemegahan kerajaan maritim terbesar di Asia Tenggara. Didominasi warna merah delima dan kilau emas murni pada aksesoris dada.",
      philosophy: "Melambangkan kejayaan, keagungan kedudukan bangsawan, kemakmuran perdagangan rempah, dan asimilasi budaya India kuno pada era Sriwijaya.",
      evolution: "Dahulu dikenakan sebagai lilitan dodot sutra tanpa penutup lengan untuk menunjukkan kemurnian kasta. Di era modern, pakaian ini diadopsi sebagai busana pengantin Palembang dengan penyesuaian lengan panjang tertutup bagi wanita.",
      components: [
        "Kesuho (Mahkota emas bertingkat bermotif melati)",
        "Teratai Dada (Perisai emas penutup dada berbentuk lingkaran)",
        "Dodot Songket Emas (Tenun ikat sutra benang emas murni)",
        "Kaling Kebo Mungkur (Kalung leher simbol kekuatan perlindungan)",
        "Kelat Bahu (Gelang naga emas pada lengan atas)"
      ],
      colorPalette: { primary: "#A83232", secondary: "#C5A059", accent: "#1A1A1A" }
    },
    {
      id: "majapahit_dodot",
      eraId: "klasik",
      name: "Dodotan & Kemben Majapahit",
      origin: "Kerajaan Majapahit (Jawa Wetan)",
      textile: "Kain Jarik Batik Kuno (Prada Emas) & Kemben sutra",
      description: "Busana harian keluarga istana Majapahit. Pria mengenakan lilitan kain dodot batik panjang menyapu lantai dengan dada terbuka, sementara wanita mengenakan kain kemben pembungkus dada berbahan sutra prada emas.",
      philosophy: "Menunjukkan ketaatan pada strata sosial kasta, keindahan raga yang menyatu dengan alam tropis, serta kesucian jiwa.",
      evolution: "Bentuk lilitan kain dodot Majapahit berkembang menjadi pakaian pengantin Basahan Solo/Yogyakarta saat ini, yang mempertahankan lilitan dodot sutra prada namun dengan tambahan aksesoris modern.",
      components: [
        "Kain Dodot/Jarik motif batik kuno berserat prada emas",
        "Kemben sutra (kain pembungkus dada wanita)",
        "Sabuk Kulit dengan gesper kuningan terukir motif naga",
        "Keris Ligan (Keris tanpa warangka bagi ksatria)",
        "Sumping (Hiasan telinga dari daun emas ukir)"
      ],
      colorPalette: { primary: "#4B2810", secondary: "#D4AF37", accent: "#5C3A21" }
    },
    {
      id: "jawa_surjan",
      eraId: "kesultanan",
      name: "Surjan & Kebaya Beludru Keraton",
      origin: "Kesultanan Mataram / Kraton Ngayogyakarta",
      textile: "Kain Lurik Katun Kasar & Beludru (Velvet) Hitam",
      description: "Surjan diciptakan oleh Sunan Kalijaga sebagai baju takwa pria Jawa, sedangkan untuk wanita bangsawan mengenakan kebaya beludru hitam panjang dihiasi renda benang emas tipis.",
      philosophy: "Surjan memiliki kerah tegak dengan kancing baris melambangkan rukun Islam dan rukun iman. Warna hitam beludru melambangkan kewibawaan dan kesabaran menahan nafsu duniawi.",
      evolution: "Dahulu hanya dikenakan di dalam lingkungan kerabat keraton. Saat ini, Surjan Lurik dan Kebaya Beludru telah bertransformasi menjadi busana resmi pernikahan adat Jawa, wisuda kelulusan, dan hari peringatan budaya.",
      components: [
        "Surjan (Pria - kemeja lurik/sutra kerah shanghai tertutup)",
        "Kebaya Beludru Hitam (Wanita - kebaya panjang sulam emas)",
        "Blangkon Mataram (Ikat kepala dengan mondolan belakang)",
        "Kain Jarik Batik motif Parang Barong atau Sidomukti",
        "Keris Gayaman terselip di sabuk belakang"
      ],
      colorPalette: { primary: "#1C1B19", secondary: "#C5A059", accent: "#8B2635" }
    },
    {
      id: "kolonial_noni",
      eraId: "kesultanan",
      name: "Kebaya Noni & Baju Peranakan",
      origin: "Era Hindia Belanda & Asimilasi Tionghoa",
      textile: "Kain Katun Voile Renda Putih & Batik Pesisiran",
      description: "Perpaduan unik antara busana kolonial Eropa dan pribumi. Kebaya Noni berwarna putih bersih dihiasi renda-renda bordir halus khas Eropa Utara, dipadukan dengan sarung batik pesisir bermotif flora-fauna berwarna cerah.",
      philosophy: "Melambangkan asimilasi budaya, keterbukaan etnis peranakan-eropa, status sosial kelas menengah atas perkotaan Hindia Belanda, dan kenyamanan berpakaian di iklim tropis.",
      evolution: "Kebaya Noni berbahan putih renda inilah yang menjadi cikal bakal Kebaya Encim Betawi dan Kebaya Modern berkerah V-neck renda saat ini.",
      components: [
        "Kebaya Noni (Katun putih berenda Eropa halus di sepanjang tepian)",
        "Kain Sarung Batik Pesisir (motif Pekalongan atau Lasem berwarna cerah)",
        "Selop Hak Rendah berbordir manik-manik",
        "Sanggul rambut rendah bergaya Eropa/Cina dengan tusuk konde giok"
      ],
      colorPalette: { primary: "#F9F9F9", secondary: "#E85D04", accent: "#3A86C8" }
    },
    {
      id: "merdeka_kartini",
      eraId: "kemerdekaan",
      name: "Kebaya Kartini & Jas Safari Soekarno",
      origin: "Era Kemerdekaan RI (1945 - 1950-an)",
      textile: "Kain Brokat Katun Tipis & Drill/Kain Wool Kasar",
      description: "Kebaya Kartini dicirikan oleh lipatan kerah panjang lurus menyambung ke bawah dada. Jas Safari Soekarno dicirikan oleh potongan jas putih berkancing lima dengan saku berkantong empat bertutup.",
      philosophy: "Kebaya Kartini melambangkan kesederhanaan, perjuangan emansipasi perempuan, dan kedaulatan bangsa. Jas Safari Soekarno dan Peci Hitam melambangkan identitas nasionalisme revolusioner yang setara bagi seluruh rakyat Indonesia.",
      evolution: "Jas Safari Soekarno menginspirasi seragam resmi pegawai negeri sipil (PNS) saat ini. Kebaya Kartini bertransformasi menjadi kebaya wisuda klasik yang anggun tanpa payet berlebih.",
      components: [
        "Kebaya Kartini (Kerah lipat lurus panjang berbahan brokat polos)",
        "Jas Safari Drill (Koko-formal berkancing baris dengan 4 saku)",
        "Peci Hitam Nasional (bahan beludru hitam)",
        "Kain batik wiron tulis tanpa prada emas (gaya pejuang)"
      ],
      colorPalette: { primary: "#EAEAEA", secondary: "#111111", accent: "#2F4858" }
    },
    {
      id: "retro_kutubaru",
      eraId: "retro",
      name: "Kebaya Kutu Baru & Batik Formal",
      origin: "Era Orde Baru (1960-an - 1980-an)",
      textile: "Kain Sutra Satin, Chiffon Warna Cerah, & Batik Katun Primisima",
      description: "Kebaya Kutu Baru menggunakan potongan bef dada tengah yang menyambungkan sisi kiri dan kanan kebaya. Di era 1970-an, kemeja batik lengan panjang disahkan menjadi pakaian formal pria menggantikan jas barat oleh Gubernur DKI Jakarta Ali Sadikin.",
      philosophy: "Mencerminkan transisi modernisasi di perkotaan yang tetap mempertahankan kepribadian budaya bangsa di bawah regulasi formalitas negara.",
      evolution: "Kutu Baru kini menjadi model kebaya kasual terpopuler di kalangan generasi muda karena mudah dipadukan dengan celana panjang modern atau rok pendek denim.",
      components: [
        "Kebaya Kutu Baru bahan satin bermotif bunga warna kontras",
        "Kemeja Batik Lengan Panjang formal pria bermotif penuh",
        "Selendang sifon tipis yang tersampir di pundak wanita",
        "Kain Jarik Batik lilitan instan praktis"
      ],
      colorPalette: { primary: "#E63946", secondary: "#D18D1F", accent: "#1D3557" }
    },
    {
      id: "modern_fusion",
      eraId: "kontemporer",
      name: "Kebaya Avant-Garde & Wastra Streetwear",
      origin: "Era Digital / Kontemporer",
      textile: "Tenun Ikat NTT, Batik Tulis Pekalongan, Denim, & Organza",
      description: "Fashion peleburan budaya (fusion) di mana wastra tradisional dijadikan bahan pakaian streetwear modern seperti jaket bomber batik, rompi tenun asimetris, kebaya organza berekor panjang, dipadukan dengan sepatu kets/sneakers dan aksesoris metalik.",
      philosophy: "Melambangkan demokratisasi wastra nusantara. Batik dan tenun tidak lagi kaku hanya untuk acara sakral/kondangan, melainkan menjadi gaya hidup dinamis sehari-hari anak muda urban.",
      evolution: "Puncak evolusi busana nusantara yang melintasi batas-batas gender, formalitas, dan geografi. Pakaian etnik kini tampil di panggung fashion dunia (Paris/Milan Fashion Week) sebagai representasi modernitas Indonesia.",
      components: [
        "Jaket Bomber Denim bercampur kain tenun ikat NTT",
        "Kebaya asimetris berbahan organza transparan",
        "Kain sarung lilit pendek di atas celana jogger",
        "Aksesoris kalung perak bakar bermotif etnik minimalis",
        "Sepatu Sneakers putih dipadu kaos kaki motif batik"
      ],
      colorPalette: { primary: "#2E5A44", secondary: "#E5A93B", accent: "#2F2F2F" }
    }
  ],
  wastras: [
    {
      name: "Batik Tulis",
      origin: "Jawa",
      meaning: "Seni lukis kain menggunakan canting lilin malam. Motifnya seperti Parang melambangkan pantang menyerah, Sidomukti melambangkan kebahagiaan abadi, dan Truntum melambangkan cinta tulus yang tumbuh kembali."
    },
    {
      name: "Songket",
      origin: "Sumatera (Palembang, Minangkabau)",
      meaning: "Kain tenun mewah dengan sisipan benang emas atau perak. Dahulu melambangkan kejayaan niaga kemaritiman dan status sosial bangsawan."
    },
    {
      name: "Tenun Ikat",
      origin: "Nusa Tenggara, Toraja, Kalimantan",
      meaning: "Tenun tradisional yang dibuat dengan cara mengikat serat benang sebelum dicelup pewarna alami. Setiap motif geometris melambangkan leluhur, kekuatan fauna, dan pelindung tolak bala."
    },
    {
      name: "Lurik",
      origin: "Jawa Tengah (Pedalaman)",
      meaning: "Kain tenun sederhana bercorak garis-garis searah. Melambangkan kesederhanaan, kerendahan hati, dan perlindungan spiritual bagi rakyat jelata."
    }
  ]
};

// Ekspor data
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = HISTORY_DATA;
}
