const welcomeButton = document.querySelector("#welcomeButton");
const status = document.querySelector("#status");

welcomeButton.addEventListener("click", () => {
  status.textContent = "JavaScript is working!";
});