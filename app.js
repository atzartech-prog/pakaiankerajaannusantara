/**
 * Logic Aplikasi Museum Busana Nusantara
 * Mengontrol linimasa sejarah, perbandingan evolusi, perpustakaan wastra, dan sistem bookmark.
 */

// State Global
let currentTab = 'timeline';
let activeEraId = 'klasik';
let bookmarks = [];
let currentSelectedId = null;

// Inisialisasi saat aplikasi dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadBookmarks();
    renderTimelineSteps();
    switchEra(activeEraId);
    initCompareSelects();
    renderWastraLibrary();
    updateBookmarkCount();
});

// ==========================================================================
// DYNAMIC SVG ILLUSTRATION GENERATOR
// Menghasilkan representasi pakaian adat sejarah secara prosedural (statis & detail)
// ==========================================================================
function getHistoricalClothingSVG(id, palette, size = "100%") {
    const primary = palette.primary || "#8B2635";
    const secondary = palette.secondary || "#C5A059";
    const accent = palette.accent || "#2E5A44";
    
    let svgHeader = `<svg viewBox="0 0 200 240" width="${size}" height="${size}" class="clothing-svg-card" xmlns="http://www.w3.org/2000/svg">`;
    let svgBackground = `
        <defs>
            <linearGradient id="grad-hist-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1E2225" />
                <stop offset="100%" stop-color="#14171A" />
            </linearGradient>
            <linearGradient id="gold-hist-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFEFA6" />
                <stop offset="50%" stop-color="#C5A059" />
                <stop offset="100%" stop-color="#8C6B23" />
            </linearGradient>
            <linearGradient id="shading-hist-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#000000" stop-opacity="0.35" />
                <stop offset="35%" stop-color="#000000" stop-opacity="0" />
                <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.1" />
            </linearGradient>
            <filter id="shadow-hist-${id}" x="-20%" y="-20%" width="140%" height="140%">
                <drop-shadow dx="0" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.3" />
            </filter>
        </defs>
        <!-- Latar Belakang Kartu Gelap Elegan -->
        <rect width="200" height="240" rx="12" fill="url(#grad-hist-${id})" />
        <circle cx="100" cy="115" r="55" fill="${secondary}" opacity="0.04" />
        
        <!-- Penyangga Stand Museum Kayu Antik -->
        <path d="M100,50 L100,210 M70,210 L130,210" stroke="#5E4E42" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M74,60 C90,52 110,52 126,60" stroke="#5E4E42" stroke-width="4" stroke-linecap="round" fill="none" />
        <circle cx="100" cy="40" r="5" stroke="#5E4E42" stroke-width="3" fill="none" />
    `;
    
    let svgCostumeContent = '';
    let svgHeadwear = '';
    
    switch (id) {
        // --- ERA KERAJAAN KLASIK ---
        case 'sriwijaya_aesan':
            // Aesan Gede: Jubah Merah Emas mewah & Mahkota Kesuho Sriwijaya
            svgCostumeContent = `
                <g filter="url(#shadow-hist-${id})">
                    <!-- Dodot Songket Merah-Emas -->
                    <path d="M66,110 C58,145 68,185 75,200 C85,205 115,205 125,200 C132,185 142,145 134,110 Z" fill="url(#gold-hist-${id})" />
                    <!-- Detail Motif Songket Merah -->
                    <path d="M68,125 Q100,130 132,125 M70,145 Q100,150 130,145 M72,165 Q100,170 128,165 M74,185 Q100,190 126,185" fill="none" stroke="${primary}" stroke-width="2.5" stroke-opacity="0.8" />
                    <!-- Teratai Hiasan Dada Melingkar Besar -->
                    <path d="M72,110 C75,82 125,82 128,110 C120,122 80,122 72,110 Z" fill="${primary}" />
                    <path d="M72,110 C75,82 125,82 128,110" fill="none" stroke="url(#gold-hist-${id})" stroke-width="3" />
                    <!-- Kalung Kebomungkur emas -->
                    <circle cx="100" cy="115" r="9" fill="url(#gold-hist-${id})" />
                    <path d="M93,122 L100,132 L107,122 Z" fill="url(#gold-hist-${id})" />
                    <!-- Shading Overlay -->
                    <path d="M66,110 C58,145 68,185 75,200 C85,205 115,205 125,200 C132,185 142,145 134,110 Z" fill="url(#shading-hist-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Kesuho Crown emas melati -->
                <g filter="url(#shadow-hist-${id})">
                    <path d="M82,50 C80,30 90,20 100,16 C110,20 120,30 118,50 Z" fill="url(#gold-hist-${id})" />
                    <path d="M86,50 C86,36 94,28 100,24 C106,28 114,36 114,50 Z" fill="${primary}" />
                    <circle cx="100" cy="15" r="4" fill="#FFFFFF" />
                    <circle cx="82" cy="46" r="3" fill="#FFFFFF" />
                    <circle cx="118" cy="46" r="3" fill="#FFFFFF" />
                </g>
            `;
            break;
            
        case 'majapahit_dodot':
            // Dodot Kemben Majapahit: Tubh Terbuka & Lilitan Kain Batik Kuno
            svgCostumeContent = `
                <g filter="url(#shadow-hist-${id})">
                    <!-- Tubuh Mannequin Cokelat Kulit -->
                    <path d="M82,90 C78,112 85,138 88,145 C92,148 108,148 112,145 C115,138 122,112 118,90 Z" fill="#D2B48C" />
                    <!-- Kain Kemben Sutra Merah melilit dada wanita -->
                    <path d="M82,98 C72,110 75,135 84,142 C92,142 108,142 116,142 C125,135 128,110 118,98 Z" fill="${primary}" />
                    <!-- Kain Dodot Bawah bermotif batik cokelat prada -->
                    <path d="M72,142 C65,165 70,195 76,218 C85,222 115,222 124,218 C130,195 135,165 128,142 Z" fill="#6E4720" />
                    <!-- Pola batik garis serong emas prada -->
                    <path d="M76,155 L124,185 M78,175 L122,205 M80,195 L118,220" stroke="url(#gold-hist-${id})" stroke-width="2" stroke-opacity="0.8" />
                    <!-- Sabuk Kulit dengan gesper emas kuningan -->
                    <rect x="76" y="142" width="48" height="10" fill="#422E1A" rx="2" />
                    <rect x="94" y="139" width="12" height="16" fill="url(#gold-hist-${id})" rx="1" />
                    <path d="M82,90 C78,112 85,138 88,145 C92,148 108,148 112,145 C115,138 122,112 118,90 Z" fill="url(#shading-hist-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Sumping Hiasan Telinga Daun Emas Majapahit -->
                <g filter="url(#shadow-hist-${id})">
                    <!-- Sumping kiri dan kanan -->
                    <path d="M72,50 Q60,40 68,36 C72,36 74,45 74,50 Z" fill="url(#gold-hist-${id})" />
                    <path d="M128,50 Q140,40 132,36 C128,36 126,45 126,50 Z" fill="url(#gold-hist-${id})" />
                    <!-- Hiasan dahi melingkar emas -->
                    <path d="M80,48 Q100,42 120,48" fill="none" stroke="url(#gold-hist-${id})" stroke-width="2.5" />
                </g>
            `;
            break;

        // --- ERA KESULTANAN & KOLONIAL ---
        case 'jawa_surjan':
            // Surjan Mataram & Kebaya Beludru Hitam + Blangkon
            svgCostumeContent = `
                <g filter="url(#shadow-hist-${id})">
                    <!-- Beskap Hitam Beludru -->
                    <path d="M62,95 Q52,135 62,185 Q100,192 138,185 Q148,135 138,95 Z" fill="${primary}" />
                    <!-- Lengan melengkung luwes -->
                    <path d="M62,95 Q42,115 50,145 Q58,145 60,130" stroke="${primary}" stroke-width="10" stroke-linecap="round" fill="none" />
                    <path d="M138,95 Q158,115 150,145 Q142,145 140,130" stroke="${primary}" stroke-width="10" stroke-linecap="round" fill="none" />
                    <!-- Kerah Shanghai Khas Keraton -->
                    <path d="M90,95 C90,80 110,80 110,95 Z" fill="url(#gold-hist-${id})" />
                    <path d="M93,95 C93,85 107,85 107,95 Z" fill="${primary}" />
                    <!-- Baris Kancing Emas -->
                    <line x1="106" y1="95" x2="106" y2="185" stroke="url(#gold-hist-${id})" stroke-width="2" />
                    <circle cx="106" cy="110" r="3" fill="url(#gold-hist-${id})" />
                    <circle cx="106" cy="125" r="3" fill="url(#gold-hist-${id})" />
                    <circle cx="106" cy="140" r="3" fill="url(#gold-hist-${id})" />
                    <!-- Kain Jarik Batik Cokelat Wiru -->
                    <path d="M70,185 L130,185 L124,232 L76,232 Z" fill="#6E4720" />
                    <!-- Motif Lereng Jarik -->
                    <path d="M80,185 L100,232 M92,185 L112,232 M104,185 L124,232" stroke="${secondary}" stroke-width="1.5" stroke-opacity="0.6" />
                    <!-- Wiru Tengah -->
                    <path d="M98,185 L98,232 L104,232 L104,185 Z" fill="#8B5A2B" stroke="url(#gold-hist-${id})" stroke-width="1" />
                    <path d="M62,95 Q52,135 62,185 Q100,192 138,185 Q148,135 138,95 Z" fill="url(#shading-hist-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Blangkon dengan Mondolan belakang -->
                <g filter="url(#shadow-hist-${id})">
                    <path d="M80,51 C80,42 120,42 120,51 Z" fill="#6E4720" />
                    <path d="M82,48 L100,40 L118,48" fill="none" stroke="${secondary}" stroke-width="1" stroke-opacity="0.5" />
                    <circle cx="100" cy="45" r="5.5" fill="#422911" />
                    <circle cx="100" cy="45" r="3.5" fill="none" stroke="url(#gold-hist-${id})" stroke-width="1" />
                </g>
            `;
            break;
            
        case 'kolonial_noni':
            // Kebaya Noni: Katun Renda Putih & Kain Sarung Batik Pesisir Lasem Merah Cerah
            svgCostumeContent = `
                <g filter="url(#shadow-hist-${id})">
                    <!-- Kebaya Putih Renda longgar -->
                    <path d="M64,95 Q54,135 68,180 L100,198 L132,180 Q146,135 136,95 Z" fill="#FFFFFF" />
                    <!-- Detail Renda Eropa Bergerigi Putih Abu -->
                    <path d="M86,95 L100,135 L114,95 L132,180 L100,198 L68,180 Z" fill="none" stroke="#D1D6DB" stroke-width="1.5" stroke-dasharray="2,3" />
                    <!-- Lengan baju melengkung -->
                    <path d="M64,95 Q48,115 54,142 Q60,142 62,130" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round" fill="none" />
                    <path d="M136,95 Q152,115 146,142 Q140,142 138,130" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round" fill="none" />
                    <!-- Ujung Lengan Renda -->
                    <path d="M43,138 L54,143" stroke="#D1D6DB" stroke-width="2" stroke-dasharray="2,2" />
                    <path d="M157,138 L146,143" stroke="#D1D6DB" stroke-width="2" stroke-dasharray="2,2" />
                    <!-- Sarung Batik Pesisir Merah Cerah (Lasem) -->
                    <path d="M72,188 C76,202 78,212 80,232 L120,232 C122,212 124,202 128,188 Z" fill="${primary}" />
                    <!-- Detail Motif Bunga Sarung Pesisir -->
                    <circle cx="92" cy="205" r="4.5" fill="${secondary}" opacity="0.8" />
                    <circle cx="110" cy="218" r="4.5" fill="${secondary}" opacity="0.8" />
                    <path d="M72,188 Q100,192 128,188" fill="none" stroke="url(#gold-hist-${id})" stroke-width="2" />
                    <!-- Shading -->
                    <path d="M64,95 Q54,135 68,180 L100,198 L132,180 Q146,135 136,95 Z" fill="url(#shading-hist-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Sanggul Cina/Eropa Rendah dengan Hiasan Giok Hijau -->
                <g filter="url(#shadow-hist-${id})">
                    <circle cx="100" cy="46" r="10" fill="#151515" />
                    <!-- Tusuk Konde Giok Hijau melintang asimetris -->
                    <path d="M86,43 Q102,32 118,43" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" />
                </g>
            `;
            break;

        // --- ERA KEMERDEKAAN & NASIONAL ---
        case 'merdeka_kartini':
            // Kebaya Kartini: Katun Biru Navy, Selendang Merah Menyilang dada, Peci Hitam
            svgCostumeContent = `
                <g filter="url(#shadow-hist-${id})">
                    <!-- Kebaya Biru Navy Tua -->
                    <path d="M64,95 Q54,135 66,180 L100,195 L134,180 Q146,135 136,95 Z" fill="${accent}" />
                    <!-- Kerah lipat menyambung lurus khas Kartini -->
                    <path d="M88,95 L88,145 C88,160 100,170 100,170 C100,170 112,160 112,145 L112,95 Z" fill="none" stroke="#FFFFFF" stroke-width="2" />
                    <!-- Selendang Merah Perjuangan Menyilang Dada -->
                    <path d="M68,100 Q84,120 118,165 C124,175 120,180 114,180 Q92,145 64,115 Z" fill="${primary}" />
                    <!-- Kain Batik Rakyat Sederhana bawah (Cokelat Tua) -->
                    <path d="M72,180 C76,202 78,212 80,232 L120,232 C122,212 124,202 128,180 Z" fill="#5E3E23" />
                    <path d="M80,180 L100,232 M95,180 L115,232" stroke="#422C1A" stroke-width="1.5" />
                    <path d="M64,95 Q54,135 66,180 L100,195 L134,180 Q146,135 136,95 Z" fill="url(#shading-hist-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Peci Hitam Nasional Khas Pejuang Kemerdekaan -->
                <g filter="url(#shadow-hist-${id})">
                    <path d="M82,51 L118,51 L116,36 L84,36 Z" fill="#0A0A0A" />
                    <line x1="84" y1="36" x2="116" y2="36" stroke="#222222" stroke-width="1" />
                </g>
            `;
            break;

        // --- ERA RETRO & MODERNISASI ---
        case 'retro_kutubaru':
            // Kebaya Kutu Baru: Orange Satin, Bef Dada Tengah, Kain Batik Wiron
            svgCostumeContent = `
                <g filter="url(#shadow-hist-${id})">
                    <!-- Kebaya Orange Satin -->
                    <path d="M64,95 Q54,135 66,180 L100,195 L134,180 Q146,135 136,95 Z" fill="${primary}" />
                    <!-- Lengan baju melengkung -->
                    <path d="M64,95 Q46,115 52,142" fill="none" stroke="${primary}" stroke-width="9" stroke-linecap="round" />
                    <path d="M136,95 Q154,115 148,142" fill="none" stroke="${primary}" stroke-width="9" stroke-linecap="round" />
                    <!-- Bef Dada Tengah (Kutu Baru) berwarna emas bermotif -->
                    <rect x="88" y="105" width="24" height="60" fill="url(#gold-hist-${id})" />
                    <line x1="88" y1="105" x2="88" y2="165" stroke="#FFFFFF" stroke-width="1.5" />
                    <line x1="112" y1="105" x2="112" y2="165" stroke="#FFFFFF" stroke-width="1.5" />
                    <!-- Bros Emas Bersusun Tiga di Bef Dada -->
                    <circle cx="100" cy="115" r="3.5" fill="${secondary}" />
                    <circle cx="100" cy="128" r="3" fill="${secondary}" />
                    <circle cx="100" cy="140" r="2" fill="${secondary}" />
                    <!-- Kain Batik Parang Oranye-Cokelat -->
                    <path d="M72,180 C76,202 78,212 80,232 L120,232 C122,212 124,202 128,180 Z" fill="#8B5A2B" />
                    <path d="M80,180 L100,232 M95,180 L115,232" stroke="${primary}" stroke-width="1.5" stroke-opacity="0.6" />
                    <path d="M64,95 Q54,135 66,180 L100,195 L134,180 Q146,135 136,95 Z" fill="url(#shading-hist-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Selendang Sifon Hijau di pundak menyampir anggun -->
                <g filter="url(#shadow-hist-${id})">
                    <path d="M60,95 Q68,85 75,95 L72,145 Q64,152 58,142 Z" fill="${accent}" fill-opacity="0.85" />
                    <path d="M60,95 Q68,85 75,95" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.4" />
                </g>
            `;
            break;

        // --- ERA KONTEMPORER & MODERN FUSION ---
        case 'modern_fusion':
            // Modern Fusion: Jaket Bomber Denim + Tenun NTT Asimetris + Sneakers
            svgCostumeContent = `
                <g filter="url(#shadow-hist-${id})">
                    <!-- Jaket Bomber Hijau Rimba (Modern) -->
                    <path d="M60,95 C52,110 52,145 64,165 Q100,175 136,165 C148,145 148,110 140,95 Z" fill="${primary}" />
                    <path d="M60,95 C52,110 52,145 64,165 Q100,175 136,165 C148,145 148,110 140,95 Z" fill="none" stroke="${secondary}" stroke-width="1" />
                    <!-- Kerah Rib Jaket Bomber -->
                    <path d="M85,95 Q100,110 115,95 Z" fill="#1C1C1C" />
                    <!-- Lengan Jaket Menggelembung Kerutan (Puffy) -->
                    <path d="M60,95 C40,110 38,135 52,150" fill="none" stroke="${primary}" stroke-width="12" stroke-linecap="round" />
                    <path d="M140,95 C160,110 162,135 148,150" fill="none" stroke="${primary}" stroke-width="12" stroke-linecap="round" />
                    <!-- Selempang Wastra Tenun Ikat NTT (Asimetris Modern) -->
                    <path d="M85,95 Q110,135 128,185 L116,192 Q92,140 76,105 Z" fill="url(#gold-hist-${id})" />
                    <!-- Pola garis tenun geometris oranye/hitam -->
                    <path d="M85,95 L128,185" stroke="${accent}" stroke-width="2" stroke-dasharray="2,3" />
                    <path d="M76,105 L116,192" stroke="${accent}" stroke-width="2" stroke-dasharray="2,3" />
                    <!-- Celana Jogger Modern di bagian bawah -->
                    <path d="M72,165 L128,165 L122,230 L78,230 Z" fill="#222222" />
                    <path d="M72,165 Q100,170 128,165" fill="none" stroke="${secondary}" stroke-width="2" />
                    <path d="M60,95 C52,110 52,145 64,165 Q100,175 136,165 C148,145 148,110 140,95 Z" fill="url(#shading-hist-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Topi Beanie/Kacamata Hitam Modern minimalis di hanger -->
                <g filter="url(#shadow-hist-${id})">
                    <!-- Kacamata Hitam Modern bertengger -->
                    <rect x="84" y="44" width="14" height="8" fill="#111111" rx="1" />
                    <rect x="102" y="44" width="14" height="8" fill="#111111" rx="1" />
                    <line x1="98" y1="48" x2="102" y2="48" stroke="#111111" stroke-width="2" />
                </g>
            `;
            break;

        default:
            // Standar Mannequin
            svgCostumeContent = `
                <g filter="url(#shadow-hist-${id})">
                    <path d="M66,95 Q56,135 66,185 Q100,192 134,185 Q144,135 134,95 Z" fill="${primary}" />
                    <path d="M80,95 L100,120 L120,95 Z" fill="url(#gold-hist-${id})" />
                    <path d="M66,95 Q56,135 66,185 Q100,192 134,185 Q144,135 134,95 Z" fill="url(#shading-hist-${id})" />
                </g>
            `;
            break;
    }
    
    return svgHeader + svgBackground + svgCostumeContent + svgHeadwear + `</svg>`;
}

// ==========================================================================
// TIMELINE TAB RENDERING & LOGIC
// ==========================================================================
function renderTimelineSteps() {
    const container = document.getElementById('timeline-steps');
    if (!container) return;
    
    container.innerHTML = '';
    
    HISTORY_DATA.eras.forEach((era, idx) => {
        const step = document.createElement('button');
        step.className = `timeline-step-btn ${era.id === activeEraId ? 'active' : ''}`;
        step.onclick = () => switchEra(era.id);
        
        // Ikon representatif per era
        let iconClass = 'fa-solid fa-landmark';
        if (era.id === 'klasik') iconClass = 'fa-solid fa-crown';
        else if (era.id === 'kesultanan') iconClass = 'fa-solid fa-mosque';
        else if (era.id === 'kemerdekaan') iconClass = 'fa-solid fa-star';
        else if (era.id === 'retro') iconClass = 'fa-solid fa-record-vinyl';
        else if (era.id === 'kontemporer') iconClass = 'fa-solid fa-masks-theater';
        
        step.innerHTML = `
            <i class="${iconClass}"></i>
            <span class="timeline-step-label">${era.name.split(' ').slice(1).join(' ')}</span>
            <span class="timeline-step-period">${era.period.split(' ')[0] === 'Abad' ? 'Abad ' + era.period.split(' ')[1] : era.period.split(' ')[0]}</span>
        `;
        
        container.appendChild(step);
    });
}

function switchEra(eraId) {
    activeEraId = eraId;
    
    // Highlight step aktif
    const steps = document.querySelectorAll('.timeline-step-btn');
    HISTORY_DATA.eras.forEach((era, idx) => {
        if (era.id === eraId) {
            steps[idx]?.classList.add('active');
        } else {
            steps[idx]?.classList.remove('active');
        }
    });
    
    // Update Deskripsi Era
    const era = HISTORY_DATA.eras.find(x => x.id === eraId);
    if (era) {
        document.getElementById('era-display-name').innerText = era.name;
        document.getElementById('era-display-period').innerText = era.period;
        document.getElementById('era-display-desc').innerText = era.description;
        
        // Update warna aksen garis era
        const card = document.getElementById('era-info-card');
        card.style.setProperty('--color-secondary', era.themeColor);
    }
    
    // Render Koleksi Pakaian era terpilih
    renderTimelineCatalog();
}

function renderTimelineCatalog() {
    const grid = document.getElementById('timeline-catalog-grid');
    if (!grid) return;
    
    const data = HISTORY_DATA.clothes.filter(x => x.eraId === activeEraId);
    
    // Update count text
    document.getElementById('catalog-count-text').innerText = `Menampilkan ${data.length} koleksi pakaian`;
    
    grid.innerHTML = '';
    data.forEach(item => {
        grid.appendChild(createCardElement(item));
    });
}

function createCardElement(item) {
    const isBookmarked = bookmarks.includes(item.id);
    const card = document.createElement('div');
    card.className = 'card animate-fade-in';
    card.onclick = () => openModal(item.id);
    
    const svgHTML = getHistoricalClothingSVG(item.id, item.colorPalette);
    
    card.innerHTML = `
        <div class="card-image-wrapper">
            <span class="card-badge">${item.origin.split(' ')[0]}</span>
            <button class="card-fav-btn ${isBookmarked ? 'active' : ''}" onclick="event.stopPropagation(); toggleBookmark('${item.id}', this)">
                <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
            </button>
            ${svgHTML}
        </div>
        <div class="card-info">
            <span class="card-origin">${item.origin}</span>
            <h3 class="card-title">${item.name}</h3>
            <p class="card-desc">${item.description}</p>
            <div class="card-footer">
                <span class="card-tag">${item.textile.split(' ')[0]}</span>
                <span class="card-action-text">Pelajari <i class="fa-solid fa-circle-info"></i></span>
            </div>
        </div>
    `;
    
    return card;
}

// ==========================================================================
// COMPARATOR / EVOLUTION SIMULATOR LOGIC
// ==========================================================================
function initCompareSelects() {
    const sel1 = document.getElementById('compare-select-1');
    const sel2 = document.getElementById('compare-select-2');
    if (!sel1 || !sel2) return;
    
    sel1.innerHTML = '';
    sel2.innerHTML = '';
    
    // Masukkan data klasik ke select 1, data kolonial/modern ke select 2
    HISTORY_DATA.clothes.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.innerText = `[${item.origin}] ${item.name}`;
        
        if (item.eraId === 'klasik' || item.eraId === 'kesultanan') {
            sel1.appendChild(opt.cloneNode(true));
        }
        if (item.eraId === 'kesultanan' || item.eraId === 'kemerdekaan' || item.eraId === 'retro' || item.eraId === 'kontemporer') {
            sel2.appendChild(opt);
        }
    });
    
    // Pilih default awal: Sriwijaya vs Modern Fusion
    if (sel1.options.length > 0) sel1.selectedIndex = 0;
    if (sel2.options.length > 0) sel2.selectedIndex = sel2.options.length - 1;
    
    runComparison();
}

function runComparison() {
    const id1 = document.getElementById('compare-select-1').value;
    const id2 = document.getElementById('compare-select-2').value;
    
    const item1 = HISTORY_DATA.clothes.find(x => x.id === id1);
    const item2 = HISTORY_DATA.clothes.find(x => x.id === id2);
    
    const container = document.getElementById('compare-display-grid');
    if (!container || !item1 || !item2) return;
    
    container.innerHTML = `
        <!-- Baju Awal -->
        <div class="compare-card animate-fade-in">
            <div class="compare-card-header">
                <span class="compare-era-badge">${HISTORY_DATA.eras.find(x => x.id === item1.eraId).name}</span>
                <h3 class="compare-name">${item1.name}</h3>
                <span class="compare-origin">${item1.origin}</span>
            </div>
            
            <div class="compare-svg-container">
                ${getHistoricalClothingSVG(item1.id, item1.colorPalette, "140px")}
            </div>

            <div class="compare-section">
                <h4><i class="fa-solid fa-scroll"></i> Bahan Tekstil (Wastra)</h4>
                <p>${item1.textile}</p>
            </div>

            <div class="compare-section">
                <h4><i class="fa-solid fa-eye"></i> Siluet & Bentuk Potongan</h4>
                <p>${item1.description}</p>
            </div>

            <div class="compare-section">
                <h4><i class="fa-solid fa-quote-left"></i> Filosofi Ornamen</h4>
                <p>${item1.philosophy}</p>
            </div>
        </div>

        <!-- Baju Penerus / Modern -->
        <div class="compare-card animate-fade-in">
            <div class="compare-card-header">
                <span class="compare-era-badge">${HISTORY_DATA.eras.find(x => x.id === item2.eraId).name}</span>
                <h3 class="compare-name">${item2.name}</h3>
                <span class="compare-origin">${item2.origin}</span>
            </div>
            
            <div class="compare-svg-container">
                ${getHistoricalClothingSVG(item2.id, item2.colorPalette, "140px")}
            </div>

            <div class="compare-section">
                <h4><i class="fa-solid fa-scroll"></i> Bahan Tekstil (Wastra)</h4>
                <p>${item2.textile}</p>
            </div>

            <div class="compare-section">
                <h4><i class="fa-solid fa-eye"></i> Siluet & Bentuk Potongan</h4>
                <p>${item2.description}</p>
            </div>

            <div class="compare-section">
                <h4><i class="fa-solid fa-quote-left"></i> Filosofi Ornamen</h4>
                <p>${item2.philosophy}</p>
            </div>
        </div>

        <!-- Ringkasan Hubungan Evolusi Sejarah (Di bawah memanjang) -->
        <div class="era-info-card" style="grid-column: 1 / -1; margin-top: 10px;">
            <div class="compare-section">
                <h4 style="color: var(--color-secondary); margin-bottom: 8px;"><i class="fa-solid fa-arrow-right-arrow-left"></i> Jembatan Transformasi Sejarah</h4>
                <p style="font-size: 14px; line-height: 1.7;">
                    <strong>Dari ${item1.name} menuju ${item2.name}:</strong> ${item2.evolution}
                </p>
            </div>
        </div>
    `;
}

// ==========================================================================
// WASTRA LIBRARY RENDERING
// ==========================================================================
function renderWastraLibrary() {
    const grid = document.getElementById('wastra-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    HISTORY_DATA.wastras.forEach((w, idx) => {
        const card = document.createElement('div');
        card.className = 'wastra-card animate-fade-in';
        
        // Buat swatch SVG bermotif etnik sederhana
        let strokeColor = "#C5A059";
        let fillPattern = '';
        
        if (w.name === 'Batik Tulis') {
            strokeColor = "#8B5A2B";
            fillPattern = `
                <!-- Motif Parang Batik -->
                <path d="M10,10 L30,30 M20,10 L40,30 M30,10 L50,30 M10,20 L30,40" stroke="${strokeColor}" stroke-width="2" />
                <circle cx="25" cy="25" r="2" fill="${strokeColor}" />
            `;
        } else if (w.name === 'Songket') {
            strokeColor = "#C5A059";
            fillPattern = `
                <!-- Motif Intan Songket -->
                <polygon points="40,10 70,40 40,70 10,40" fill="none" stroke="${strokeColor}" stroke-width="2" />
                <polygon points="40,25 55,40 40,55 25,40" fill="none" stroke="${strokeColor}" stroke-width="1" />
            `;
        } else if (w.name === 'Tenun Ikat') {
            strokeColor = "#2E5A44";
            fillPattern = `
                <!-- Garis Geometris Zigzag Tenun -->
                <path d="M10,20 L25,40 L40,20 L55,40 L70,20" fill="none" stroke="${strokeColor}" stroke-width="3" />
                <path d="M10,35 L25,55 L40,35 L55,55 L70,35" fill="none" stroke="${strokeColor}" stroke-width="1.5" />
            `;
        } else if (w.name === 'Lurik') {
            strokeColor = "#8E98A0";
            fillPattern = `
                <!-- Garis Lurik Vertikal Klasik -->
                <line x1="15" y1="10" x2="15" y2="70" stroke="${strokeColor}" stroke-width="3" />
                <line x1="25" y1="10" x2="25" y2="70" stroke="#1A1D20" stroke-width="2" />
                <line x1="35" y1="10" x2="35" y2="70" stroke="${strokeColor}" stroke-width="3" />
                <line x1="45" y1="10" x2="45" y2="70" stroke="#1A1D20" stroke-width="2" />
                <line x1="55" y1="10" x2="55" y2="70" stroke="${strokeColor}" stroke-width="3" />
            `;
        }
        
        const swatchHTML = `
            <svg viewBox="0 0 80 80" width="80" height="80">
                <rect width="78" height="78" x="1" y="1" rx="6" fill="#1C1E22" stroke="#2C3136" stroke-width="1" />
                ${fillPattern}
            </svg>
        `;
        
        card.innerHTML = `
            <div class="wastra-swatch">
                ${swatchHTML}
            </div>
            <div class="wastra-info">
                <span class="wastra-origin">${w.origin}</span>
                <h3>${w.name}</h3>
                <p class="wastra-meaning">${w.meaning}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// ==========================================================================
// SYSTEM BOOKMARKS (LOCAL STORAGE)
// ==========================================================================
function loadBookmarks() {
    const saved = localStorage.getItem('nusantara_royal_bookmarks');
    if (saved) {
        try {
            bookmarks = JSON.parse(saved);
        } catch (e) {
            bookmarks = [];
        }
    }
}

function toggleBookmark(id, btnElement = null) {
    const idx = bookmarks.indexOf(id);
    if (idx === -1) {
        bookmarks.push(id);
    } else {
        bookmarks.splice(idx, 1);
    }
    
    // Simpan ke localstorage
    localStorage.setItem('nusantara_royal_bookmarks', JSON.stringify(bookmarks));
    
    // Update badge counter
    updateBookmarkCount();
    
    if (btnElement) {
        const isBookmarked = bookmarks.includes(id);
        if (isBookmarked) {
            btnElement.classList.add('active');
            btnElement.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
        } else {
            btnElement.classList.remove('active');
            btnElement.innerHTML = `<i class="fa-regular fa-bookmark"></i>`;
        }
    } else {
        // Render ulang linimasa catalog untuk keselarasan
        renderTimelineCatalog();
    }
    
    if (currentTab === 'favorites') {
        renderBookmarksTab();
    }
}

function updateBookmarkCount() {
    const badge = document.getElementById('fav-count');
    if (badge) {
        badge.innerText = bookmarks.length;
    }
}

function renderBookmarksTab() {
    const grid = document.getElementById('favorites-grid');
    const emptyState = document.getElementById('favorites-empty');
    if (!grid || !emptyState) return;
    
    grid.innerHTML = '';
    
    const favData = HISTORY_DATA.clothes.filter(x => bookmarks.includes(x.id));
    
    if (favData.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');
        
        favData.forEach(item => {
            grid.appendChild(createCardElement(item));
        });
    }
}

// ==========================================================================
// DETAIL MODAL CONTROL
// ==========================================================================
function openModal(id) {
    const item = HISTORY_DATA.clothes.find(x => x.id === id);
    if (!item) return;
    
    currentSelectedId = id;
    
    // Set teks
    document.getElementById('modal-origin').innerText = item.origin;
    document.getElementById('modal-wastra-type').innerText = item.textile;
    document.getElementById('modal-clothing-name').innerText = item.name;
    document.getElementById('modal-desc').innerText = item.description;
    document.getElementById('modal-philosophy').innerText = item.philosophy;
    document.getElementById('modal-evolution').innerHTML = `<strong>Latar Sejarah & Evolusi:</strong> ${item.evolution}`;
    
    // Set list komponen
    const list = document.getElementById('modal-components');
    list.innerHTML = '';
    item.components.forEach(comp => {
        const li = document.createElement('li');
        li.innerText = comp;
        list.appendChild(li);
    });
    
    // Set ilustrasi SVG besar
    document.getElementById('modal-img-container').innerHTML = getHistoricalClothingSVG(item.id, item.colorPalette, "100%");
    
    // Set swatches warna
    const palette = document.getElementById('modal-palette');
    palette.innerHTML = '';
    Object.entries(item.colorPalette).forEach(([key, color]) => {
        const swatch = document.createElement('div');
        swatch.className = 'palette-swatch';
        swatch.style.backgroundColor = color;
        swatch.setAttribute('data-color', color);
        palette.appendChild(swatch);
    });
    
    // Bookmark status button di modal
    const modalFavBtn = document.getElementById('modal-fav-btn');
    const isBookmarked = bookmarks.includes(id);
    if (isBookmarked) {
        modalFavBtn.classList.add('active');
        modalFavBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Tersimpan`;
    } else {
        modalFavBtn.classList.remove('active');
        modalFavBtn.innerHTML = `<i class="fa-regular fa-bookmark"></i> Simpan Halaman`;
    }
    
    // Tampilkan modal
    document.getElementById('detail-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(event) {
    document.getElementById('detail-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function toggleFavoriteCurrent() {
    if (!currentSelectedId) return;
    
    toggleBookmark(currentSelectedId);
    
    const isBookmarked = bookmarks.includes(currentSelectedId);
    const modalFavBtn = document.getElementById('modal-fav-btn');
    if (isBookmarked) {
        modalFavBtn.classList.add('active');
        modalFavBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Tersimpan`;
    } else {
        modalFavBtn.classList.remove('active');
        modalFavBtn.innerHTML = `<i class="fa-regular fa-bookmark"></i> Simpan Halaman`;
    }
    
    renderTimelineCatalog();
    if (currentTab === 'favorites') {
        renderBookmarksTab();
    }
}

// ==========================================================================
// NAVIGATION TABS & MOBILE
// ==========================================================================
function switchTab(tabId) {
    currentTab = tabId;
    
    // Navbar active button highlight
    const navButtons = document.querySelectorAll('.nav-links button');
    navButtons.forEach(btn => {
        if (btn.id === `nav-btn-${tabId}`) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Hide all tabs, show target tab
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        if (tab.id === `tab-${tabId}`) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    if (tabId === 'favorites') {
        renderBookmarksTab();
    } else if (tabId === 'timeline') {
        switchEra(activeEraId);
    }
    
    // Tutup mobile menu jika terbuka
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
