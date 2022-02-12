const textarea = document.querySelector("textarea");
const button = document.querySelector("button");
const output = document.getElementById("result");

async function main() {
  // prettier-ignore
  const regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  if (textarea.value.length <= 0) {
    alert("Please enter a valid URL");
    return;
  }
  if (!regexp.test(textarea.value)) {
    alert("Please enter a valid URL");
    return;
  }
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "text/plain");
  try {
    const res = await fetch("/api/new", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ url: textarea.value }),
    });
    const text = await res.text();
    textarea.value = "";
    output.textContent = text
  } catch (err) {
    alert("Error: " + err);
    console.error(err);
  }
}

button.addEventListener("click", async () => {
  main();
});

document.addEventListener("keydown", async (e) => {
  e = e || window.event || event;
  if (e.ctrlKey && e.key === "Enter") {
    e.preventDefault();
    main();
  }
});
