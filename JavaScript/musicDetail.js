// Bas-URL till API:et
const BASE_API_URL = 'https://seido-webservice-307d89e1f16a.azurewebsites.net/api';

// Objekt för att översätta genre-nummer till text
const musicGenres = {
    0: "Okänd",
    1: "Rock",
    2: "Pop",
    3: "Jazz"
};

// Funktion för att hämta ett query-parametervärde från URL:en (t.ex. id)
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Huvudfunktion som hämtar och visar detaljer om en musikgrupp
async function loadGroupDetails() {
    // Hämta gruppens id från URL:en
    const groupId = getQueryParam('id');
    if (!groupId) {
        // Om inget id finns, visa felmeddelande
        document.getElementById('group-details').innerHTML = '<div class="alert alert-danger">Ingen grupp vald.</div>';
        return;
    }
    try {
        // Hämta gruppens detaljer från API:et
        const res = await fetch(`${BASE_API_URL}/MusicGroup/ReadItem?id=${groupId}&flat=false`);
        if (!res.ok) throw new Error('Kunde inte hämta gruppdetaljer');
        const group = await res.json();

        // Visa gruppens namn i rubriken
        document.getElementById('group-name').textContent = group.name || 'Okänd grupp';
        // Visa etableringsår och genre
        document.getElementById('group-details').innerHTML = `
            <div><strong>Etablerad:</strong> ${group.establishedYear || 'Okänt år'}</div>
            <div><strong>Genre:</strong> ${musicGenres[group.genre] || 'Okänd'}</div>
        `;

        // Visa lista på artister i gruppen
        const artistsContainer = document.getElementById('artists-container');
        artistsContainer.innerHTML = '';
        (group.artists || []).forEach(artist => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6 mb-3';
            // Formatera födelsedatum om det finns
            let birthDate = 'Okänt';
            if (artist.birthDay) {
                const date = new Date(artist.birthDay);
                birthDate = date.toLocaleDateString();
            }
            // Skapa ett kort för varje artist
            col.innerHTML = `
                <div class="card h-100 artist-card">
                    <div class="card-body">
                        <h5 class="card-title">${artist.firstName || ''} ${artist.lastName || ''}</h5>
                        <p class="card-text">
                            <small class="text-muted">Födelsedatum: ${birthDate}</small>
                        </p>
                    </div>
                </div>
            `;
            artistsContainer.appendChild(col);
        });

        // Visa lista på album som gruppen släppt
        const albumsContainer = document.getElementById('albums-container');
        albumsContainer.innerHTML = '';
        (group.albums || []).forEach(album => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6 mb-3';
            // Formatera antal sålda exemplar
            const formattedSales = album.copiesSold ? new Intl.NumberFormat().format(album.copiesSold) : 'Okänt';
            // Skapa ett kort för varje album
            col.innerHTML = `
                <div class="card h-100 album-card">
                    <div class="card-body">
                        <h5 class="card-title">${album.name || 'Okänd titel'}</h5>
                        <div class="d-flex justify-content-between">
                            <span class="album-year">Utgiven ${album.releaseYear || 'Okänt år'}</span>
                            <span class="album-sales">${formattedSales} sålda</span>
                        </div>
                    </div>
                </div>
            `;
            albumsContainer.appendChild(col);
        });

    } catch (err) {
        // Vid fel, visa felmeddelande
        document.getElementById('group-details').innerHTML = '<div class="alert alert-danger">Kunde inte hämta gruppdetaljer.</div>';
    }
}

// Kör funktionen när sidan laddats klart
document.addEventListener('DOMContentLoaded', loadGroupDetails);