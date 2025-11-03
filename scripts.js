// copy & paste password
const PasswordInput = document.querySelector(".password_input");
const CopyPasteIcon = document.querySelector(".CopyPaste_icon");

CopyPasteIcon.addEventListener("click", () => {
  const password = PasswordInput.value.trim();

  if (password === "") {
    alert("No Password To Copy!");
    return;
  }

  navigator.clipboard
    .writeText(password)
    .then(() => {
      CopyPasteIcon.style.transform = "scale(1.2)";
      setTimeout(() => {
        CopyPasteIcon.style.transform = "scale(1)";
      }, 200);

      alert("Password Copied To Clipboard");
    })
    .catch((err) => {
      console.error("Copy faild: ", err);
    });
});

// chracter length incrise/decrise

const LengthRange = document.querySelector("#lengthRange");
const CharacterLengthNumber = document.querySelector(
  ".character_length_number"
);

LengthRange.addEventListener("input", () => {
  CharacterLengthNumber.textContent = LengthRange.value;
});

// password length

LengthRange.addEventListener("input", () => {
  const length = LengthRange.value;
  CharacterLengthNumber.textContent = length;

  PasswordInput.maxLength = length;

  if (PasswordInput.value.length > length) {
    PasswordInput.value = PasswordInput.value.slice(0, length);
  }
});

PasswordInput.maxLength = LengthRange.value;
CharacterLengthNumber.textContent = LengthRange.value;

// RADIO buttons

const IncludeUppercaseLetters = document.querySelector(
  ".include_uppercase_letters input"
);
const IncludeLowercaseLetters = document.querySelector(
  ".include_lowercase_letters input"
);
const IncludeNumbers = document.querySelector(".include_numbers input");
const IncludeSymbols = document.querySelector(".include_symbols input");

// როდესაც იწერება ან ჩაეწერება ტექსტი
PasswordInput.addEventListener("input", () => {
  let allowedChars = "";

  // ვამატებთ დაშვებულ სიმბოლოებს მონიშნული ჩექბოქსების მიხედვით
  if (IncludeUppercaseLetters.checked) allowedChars += "A-Z";
  if (IncludeLowercaseLetters.checked) allowedChars += "a-z";
  if (IncludeNumbers.checked) allowedChars += "0-9";
  if (IncludeSymbols.checked)
    allowedChars += "!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?";

  // თუ არცერთი ჩექბოქსი არ არის მონიშნული — არ დავუშვათ არაფერი
  if (allowedChars === "") {
    PasswordInput.value = "";
    return;
  }

  // ვქმნით დინამიკურ regex-ს
  const regex = new RegExp(`[^${allowedChars}]`, "g");

  // ვშლით ყველაფერს რაც დაშვებულ სიმბოლოებში არ ჯდება
  PasswordInput.value = PasswordInput.value.replace(regex, "");
});

// GENERATE Button

const GenerateBtn = document.querySelector(".GENERATE");

GenerateBtn.addEventListener("click", () => {
  const password = PasswordInput.value.trim();

  if (password === "") {
    alert("No Password Found! Please generate or type a password first.");
    return;
  }

  alert("Your Password Was Generated Successfully!");

  window.location.reload();
});
