const API_URL = 'https://seido-webservice-307d89e1f16a.azurewebsites.net/api/MusicGroup/Read?seeded=true&flat=true&pageNr=0&pageSize=1000';
let allGroups = [];

document.addEventListener('DOMContentLoaded', () => {
    loadMusicGroups();

    document.getElementById('prev-page-btn').onclick = prevPage;
    document.getElementById('next-page-btn').onclick = nextPage;
    document.getElementById('search-input').addEventListener('input', onSearchInput);
});

async function loadMusicGroups() {
    const res = await fetch(API_URL);
    const data = await res.json();

    allGroups = data.pageItems || [];
    renderMusicGroups(allGroups.slice(0, 10));
    updatePagination(0, Math.ceil(allGroups.length / 10));
}

function renderMusicGroups(groups) {
    const container = document.getElementById('music-groups-container');
    container.innerHTML = '';
    if (!groups.length) {
        container.innerHTML = '<div class="text-center p-4">Inga musikgrupper hittades.</div>';
        return;
    }
    groups.forEach(group => {
        const div = document.createElement('div');
        div.className = 'list-group-item d-flex justify-content-between align-items-center';
        div.innerHTML = `
            <div>
                <strong>${group.name}</strong> 
                <span style="margin-left:10px;">(${group.establishedYear || 'Okänt år'})</span>
                <span style="margin-left:10px;">${group.strGenre || 'Okänd'}</span>
            </div>
            <button class="btn btn-info btn-sm" onclick="window.location.href='MusicDetail.html?id=${group.musicGroupId}'">Detalj</button>
        `;
        container.appendChild(div);
    });
}

let currentPage = 0;

function updatePagination(pageNr, pageCount) {
    document.getElementById('page-info').textContent = `Sida ${pageNr + 1} av ${pageCount}`;
    document.getElementById('prev-page-btn').disabled = pageNr <= 0;
    document.getElementById('next-page-btn').disabled = pageNr >= pageCount - 1;
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showCurrentPage();
    }
}

function nextPage() {
    if ((currentPage + 1) * 10 < allGroups.length) {
        currentPage++;
        showCurrentPage();
    }
}

function showCurrentPage() {
    const pageCount = Math.ceil(allGroups.length / 10);
    const start = currentPage * 10;
    const end = start + 10;
    renderMusicGroups(allGroups.slice(start, end));
    updatePagination(currentPage, pageCount);
}

function onSearchInput() {
    const searchValue = document.getElementById('search-input').value.trim().toLowerCase();
    if (!searchValue) {
        showCurrentPage();
        return;
    }
    const matches = allGroups.filter(g => g.name.toLowerCase().includes(searchValue));
    renderMusicGroups(matches.slice(0, 10));
    updatePagination(0, Math.ceil(matches.length / 10));
    currentPage = 0;
}