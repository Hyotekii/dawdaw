document.getElementById("customForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const day = document.getElementById("day").value;
  const workout = document.getElementById("workout").value;

  if (day && workout) {
    const rows = document.querySelectorAll("#customTable tbody tr");
    rows.forEach(row => {
      if (row.cells[0].textContent === day) {
        row.cells[1].textContent = workout;
      }
    });

    document.getElementById("workout").value = "";
  }
});

/* pag pinindot yung share button sa pgrogram (it will appear on communities just change the word "alert") */
function shareSchedule() {
  const table = document.getElementById("custom-schedule-table");
  let rows = table.querySelectorAll("tbody tr");

  if (rows.length === 0) {
    alert("No schedule to share!");
    return;
  }

  let sharedData = [];
  rows.forEach(row => {
    let day = row.cells[0].innerText;
    let workout = row.cells[1].innerText;
    sharedData.push(`${day}: ${workout}`);
  });

  alert("Your custom schedule:\n\n" + sharedData.join("\n"));
}