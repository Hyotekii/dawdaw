document.getElementById("applyBtn").addEventListener("click", function () {
    const name = document.getElementById("nameInput").value;
    const social = document.getElementById("socialInput").value;
    const availability = document.getElementById("availabilityInput").value;
    const costs = document.getElementById("costsInput").value;

    if (name.trim() === "" || social.trim() === "" || availability.trim() === "" || costs.trim() === "") {
        alert("Please fill out all fields.");
        return;
    }

    const list = document.getElementById("trainerList");

    const newItem = document.createElement("li");
    newItem.textContent = `${name} — ${social} — ${availability} — ${costs}`;

    list.appendChild(newItem);

    // Clear after submit
    document.getElementById("nameInput").value = "";
    document.getElementById("socialInput").value = "";
    document.getElementById("availabilityInput").value = "";
    document.getElementById("costsInput").value = "";
});