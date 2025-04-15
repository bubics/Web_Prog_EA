const form = document.getElementById('form');
const tableBody = document.querySelector('#dataTable tbody');
const searchInput = document.getElementById('searchInput');

let data = [];
let editIndex = -1;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = parseInt(document.getElementById('age').value.trim());
    const country = document.getElementById('country').value.trim();

    if (!name || !email || !age || !country) {
        alert("Minden mezőt ki kell tölteni.");
        return;
    }

    const entry = { name, email, age, country };

    if (editIndex === -1) {
        data.push(entry);
    } else {
        data[editIndex] = entry;
        editIndex = -1;
    }

    form.reset();
    renderTable();
});

function renderTable(filter = '') {
    tableBody.innerHTML = '';

    data
        .filter(entry => Object.values(entry).some(value => value.toString().toLowerCase().includes(filter.toLowerCase())))
        .forEach((entry, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.age}</td>
                <td>${entry.country}</td>
                <td>
                    <button onclick="editRow(${index})">Szerkesztés</button>
                    <button onclick="deleteRow(${index})">Törlés</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
}

function editRow(index) {
    const entry = data[index];
    document.getElementById('name').value = entry.name;
    document.getElementById('email').value = entry.email;
    document.getElementById('age').value = entry.age;
    document.getElementById('country').value = entry.country;
    editIndex = index;
}

function deleteRow(index) {
    if (confirm("Biztosan törölni szeretnéd?")) {
        data.splice(index, 1);
        renderTable();
    }
}

searchInput.addEventListener('input', () => renderTable(searchInput.value));

document.querySelectorAll('#dataTable thead th[data-col]').forEach(th => {
    th.addEventListener('click', () => {
        const col = th.getAttribute('data-col');
        data.sort((a, b) => (a[col] > b[col]) ? 1 : -1);
        renderTable(searchInput.value);
    });
});
