// API-url för att hämta alla musikgrupper (1000 st per anrop)
const API_URL = 'https://seido-webservice-307d89e1f16a.azurewebsites.net/api/MusicGroup/Read?seeded=true&flat=true&pageNr=0&pageSize=1000';

// Array som håller alla hämtade musikgrupper
let allGroups = [];

// Körs när sidan laddats klart
document.addEventListener('DOMContentLoaded', () => {
    loadMusicGroups(); // Hämta och visa första sidan

    // Koppla knappar och sökfält till sina funktioner
    document.getElementById('prev-page-btn').onclick = prevPage;
    document.getElementById('next-page-btn').onclick = nextPage;
    document.getElementById('search-input').addEventListener('input', onSearchInput);
});

// Hämtar alla musikgrupper från API och visar första sidan
async function loadMusicGroups() {
    const res = await fetch(API_URL);
    const data = await res.json();

    allGroups = data.pageItems || []; // Spara alla grupper i arrayen
    renderMusicGroups(allGroups.slice(0, 10)); // Visa första 10 grupper
    updatePagination(0, Math.ceil(allGroups.length / 10)); // Uppdatera sidnavigering
}

// Visar en lista med musikgrupper på sidan
function renderMusicGroups(groups) {
    const container = document.getElementById('music-groups-container');
    container.innerHTML = '';
    if (!groups.length) {
        // Om inga grupper hittades, visa meddelande
        container.innerHTML = '<div class="text-center p-4">Inga musikgrupper hittades.</div>';
        return;
    }
    // Skapa en rad för varje grupp
    groups.forEach(group => {
        const div = document.createElement('div');
        div.className = 'list-group-item d-flex justify-content-between align-items-center';
        div.innerHTML = `
            <div>
                <strong>${group.name}</strong> 
                <span style="margin-left:10px;">(${group.establishedYear || 'Okänt år'})</span>
                <span style="margin-left:10px;">${group.strGenre || 'Okänd'}</span>
            </div>
            <!-- Detalj-knapp som leder till detaljsidan för gruppen -->
            <button class="btn btn-info btn-sm" onclick="window.location.href='MusicDetail.html?id=${group.musicGroupId}'">Detalj</button>
        `;
        container.appendChild(div);
    });
}

// Håller reda på vilken sida som visas
let currentPage = 0;

// Uppdaterar sidnavigeringen (sidnummer och knappstatus)
function updatePagination(pageNr, pageCount) {
    document.getElementById('page-info').textContent = `Sida ${pageNr + 1} av ${pageCount}`;
    document.getElementById('prev-page-btn').disabled = pageNr <= 0;
    document.getElementById('next-page-btn').disabled = pageNr >= pageCount - 1;
}

// Visar föregående sida
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showCurrentPage();
    }
}

// Visar nästa sida
function nextPage() {
    if ((currentPage + 1) * 10 < allGroups.length) {
        currentPage++;
        showCurrentPage();
    }
}

// Visar rätt grupper för aktuell sida
function showCurrentPage() {
    const pageCount = Math.ceil(allGroups.length / 10);
    const start = currentPage * 10;
    const end = start + 10;
    renderMusicGroups(allGroups.slice(start, end));
    updatePagination(currentPage, pageCount);
}

// Filtrerar grupper baserat på sökfältet och visar matchande grupper
function onSearchInput() {
    const searchValue = document.getElementById('search-input').value.trim().toLowerCase();
    if (!searchValue) {
        // Om sökfältet är tomt, visa aktuell sida
        showCurrentPage();
        return;
    }
    // Filtrera grupper som innehåller sökordet i namnet
    const matches = allGroups.filter(g => g.name.toLowerCase().includes(searchValue));
    renderMusicGroups(matches.slice(0, 10)); // Visa första 10 träffar
    updatePagination(0, Math.ceil(matches.length / 10)); // Uppdatera sidnavigering för sökresultat
    currentPage = 0; // Återställ till första sidan vid ny sökning
}