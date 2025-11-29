/* ---------- My Profile ---------- */

window.addEventListener("DOMContentLoaded", () => {

  /* ---------- Sidebar User Display (for all pages) ---------- */
  const user = JSON.parse(localStorage.getItem("user"));
  const sidebarName = document.querySelector(".user-detail h3");
  const sidebarRole = document.querySelector(".user-detail span");

  if (user && sidebarName && sidebarRole) {
    sidebarName.textContent = user.name;
    sidebarRole.textContent = user.role;
  } else if (!user) {
    console.log("No user logged in.");
  }

  /* ---------- Profile Display (realprofile.html) ---------- */
  const profileNameEl = document.getElementById("profile-name");
  const profileEmailEl = document.getElementById("profile-email");
  const profileRoleEl = document.getElementById("profile-role");

  if (profileNameEl && profileEmailEl && profileRoleEl) {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Loaded user from storage:", user);

    if (!user || !user.email) {
      // Not logged in → redirect to login page
      window.location.href = "profile.html";
      return;
    }

    // Show info from localStorage
    profileNameEl.textContent = user.name;
    profileEmailEl.textContent = `Email: ${user.email}`;
    profileRoleEl.textContent = `Role: ${user.role}`;

    // Fetch latest data from backend
    fetch(`http://localhost:3000/user/${user.email}`)
      .then(res => res.json())
      .then(data => {
        if (data.name) {
          profileNameEl.textContent = data.name;
          profileEmailEl.textContent = `Email: ${data.email}`;
          profileRoleEl.textContent = `Role: ${data.role}`;
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch(err => console.error("Error fetching user:", err));
  }

  /* ---------- Form Toggle ---------- */
  function showForm(formId) {
    document.querySelectorAll(".form-box").forEach(box => box.classList.remove("active"));
    document.getElementById(formId)?.classList.add("active");
  }

  // Make showForm global (so HTML onclick can access it)
  window.showForm = showForm;

  /* ---------- Register Form ---------- */
  const registerForm = document.querySelector("#register-form form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const role = e.target.role.value;

      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();
      alert(data.message);
    });
  }

  /* ---------- Login Form ---------- */
  const loginForm = document.querySelector("#login-form form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = e.target.email.value;
      const password = e.target.password.value;

      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        // Update sidebar immediately
        if (sidebarName && sidebarRole) {
          sidebarName.textContent = data.user.name;
          sidebarRole.textContent = data.user.role;
        }

        // Redirect to profile page
        window.location.href = "realprofile.html";
      } else {
        alert(data.message);
      }
    });
  }

});