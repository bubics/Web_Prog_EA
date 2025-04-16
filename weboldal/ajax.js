const API_URL = "https://retoolapi.dev/D3eA0d/data";

function loadData() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("dataList");
            list.innerHTML = data.map(item => `
                <div>
                    <strong>ID: ${item.id}</strong> - ${item.name} (${item.height} cm)
                </div>`).join("");

            const heights = data.map(item => Number(item.height));
            const sum = heights.reduce((a, b) => a + b, 0);
            const avg = (sum / heights.length).toFixed(2);
            const max = Math.max(...heights);

            document.getElementById("sum").textContent = "Összeg: " + sum;
            document.getElementById("avg").textContent = "Átlag: " + avg;
            document.getElementById("max").textContent = "Legnagyobb: " + max;
        });
}

function createData() {
    const name = document.getElementById("nameCreate").value;
    const height = document.getElementById("heightCreate").value;

    if (!validateInputs(name, height)) return;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, height })
    })
        .then(res => res.json())
        .then(() => {
            showMessage("Sikeres létrehozás!");
            loadData();
        });
}

function getDataForId() {
    const id = document.getElementById("updateId").value;
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("nameUpdate").value = data.name;
            document.getElementById("heightUpdate").value = data.height;
        });
}

function updateData() {
    const id = document.getElementById("updateId").value;
    const name = document.getElementById("nameUpdate").value;
    const height = document.getElementById("heightUpdate").value;

    if (!validateInputs(name, height)) return;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, height })
    })
        .then(res => res.json())
        .then(() => {
            showMessage("Sikeres módosítás!");
            loadData();
        });
}

function deleteData() {
    const id = document.getElementById("deleteId").value;
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => {
            showMessage("Sikeres törlés!");
            loadData();
        });
}

function validateInputs(name, height) {
    if (!name || name.length > 30) {
        alert("Hibás név (üres vagy túl hosszú)");
        return false;
    }
    if (!height) {
        alert("Hibás magasság!");
        return false;
    }
    return true;
}

function showMessage(msg) {
    document.getElementById("message").textContent = msg;
    setTimeout(() => {
        document.getElementById("message").textContent = "";
    }, 3000);
}
