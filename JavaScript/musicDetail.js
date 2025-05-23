const BASE_API_URL = 'https://seido-webservice-307d89e1f16a.azurewebsites.net/api';
const musicGenres = {
    0: "Okänd",
    1: "Rock",
    2: "Pop",
    3: "Jazz"
};

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function loadGroupDetails() {
    const groupId = getQueryParam('id');
    if (!groupId) {
        document.getElementById('group-details').innerHTML = '<div class="alert alert-danger">Ingen grupp vald.</div>';
        return;
    }
    try {
        const res = await fetch(`${BASE_API_URL}/MusicGroup/ReadItem?id=${groupId}&flat=false`);
        if (!res.ok) throw new Error('Kunde inte hämta gruppdetaljer');
        const group = await res.json();

        document.getElementById('group-name').textContent = group.name || 'Okänd grupp';
        document.getElementById('group-details').innerHTML = `
            <div><strong>Etablerad:</strong> ${group.establishedYear || 'Okänt år'}</div>
            <div><strong>Genre:</strong> ${musicGenres[group.genre] || 'Okänd'}</div>
        `;

        // Render artists
        const artistsContainer = document.getElementById('artists-container');
        artistsContainer.innerHTML = '';
        (group.artists || []).forEach(artist => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6 mb-3';
            let birthDate = 'Okänt';
            if (artist.birthDay) {
                const date = new Date(artist.birthDay);
                birthDate = date.toLocaleDateString();
            }
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

        // Render albums
        const albumsContainer = document.getElementById('albums-container');
        albumsContainer.innerHTML = '';
        (group.albums || []).forEach(album => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6 mb-3';
            const formattedSales = album.copiesSold ? new Intl.NumberFormat().format(album.copiesSold) : 'Okänt';
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
        document.getElementById('group-details').innerHTML = '<div class="alert alert-danger">Kunde inte hämta gruppdetaljer.</div>';
    }
}

document.addEventListener('DOMContentLoaded', loadGroupDetails);