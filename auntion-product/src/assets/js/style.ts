setDefaultValue();

function createCap() {
  const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'
    , 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '+'];
  const a = alpha[Math.floor(Math.random() * 71)];
  const b = alpha[Math.floor(Math.random() * 71)];
  const c = alpha[Math.floor(Math.random() * 71)];
  const d = alpha[Math.floor(Math.random() * 71)];
  const e = alpha[Math.floor(Math.random() * 71)];
  const f = alpha[Math.floor(Math.random() * 71)];

  const final = a + b + c + d + e + f;
  return final;
}

function setDefaultValue() {
  document.getElementById('capt').innerHTML = createCap();
}

function cap() {
  document.getElementById('capt').innerHTML = createCap();
}

function validcap() {
  const stg1 = document.getElementById('capt').innerText;
  const stg2 = document.getElementById('textInput').innerText;
  if (stg1 === stg2) {
    alert('Form is validated Succesfully');
    return true;
  } else {
    alert('Please enter a valid captcha');
    return false;
  }
}
