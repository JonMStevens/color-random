window.onload = () => {
  document
    .querySelector('#colorPicker')
    ?.addEventListener('input', colorPickerChanged, false);
  document
    .querySelector('#ratePicker')
    ?.addEventListener('input', ratePickerChanged, false);
  startRandomizing();
};

// color
function colorPickerChanged(e) {
  if (!e?.target?.value) {
    return;
  }

  setColorProperty(e?.target?.value);
}

function setColorProperty(value) {
  //todo: add validation, regex?
  document.documentElement.style.setProperty('--color-random', value);
}

function setColorPickerValue(value) {
  //todo: add validation, regex?
  const colorPicker = document.querySelector('#colorPicker');
  colorPicker.value = value;
}

function getRandomColor() {
  //first line from: https://css-tricks.com/snippets/javascript/random-hex-color/
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + '000000'.substring(color.length) + color;
}

// rate
function ratePickerChanged(e) {
  if (!e?.target?.value) {
    return;
  }

  stopRandomizing();
  if (e?.target?.value > 0) {
    startRandomizing();
  }
}

let randomizeInterval = null;
function startRandomizing() {
  const rate = document.querySelector('#ratePicker')?.value;
  if (rate) {
    randomizeInterval = setInterval(() => {
      const randomColor = getRandomColor();
      setColorPickerValue(randomColor);
      setColorProperty(randomColor);
    }, rate);
  }
}

function stopRandomizing() {
  clearInterval(randomizeInterval);
  randomizeInterval = null;
}
