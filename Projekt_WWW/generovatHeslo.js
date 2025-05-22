document.getElementById("length").addEventListener("input", e => {
  document.getElementById("lengthValue").textContent = e.target.value;
});

document.getElementById("generate").addEventListener("click", async () => {
  const length = parseInt(document.getElementById("length").value);
  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  const word = await fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then(res => res.json())
    .then(data => data[0])
    .catch(() => "password");

  let password = word;

  const symbols = "!@#$%^&*(){}[]ß<>;-_=+";
  const numbers = "0123456789";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";

  let allChars = "";
  if (useUpper) allChars += uppercase;
  if (useLower) allChars += lowercase;
  if (useNumbers) allChars += numbers;
  if (useSymbols) allChars += symbols;

  while (password.length < length) {
    const char = allChars.charAt(Math.floor(Math.random() * allChars.length));
    password += char;
  }

  document.getElementById("result").value = password;
});

document.getElementById("copy").addEventListener("click", () => {
  const result = document.getElementById("result");
  result.select();
  document.execCommand("copy");
});
