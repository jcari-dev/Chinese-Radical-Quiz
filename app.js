let matches = [];
let score = 0;
let tries = 0;

async function populateTables(quizNo) {
  const response = await fetch("./data/radicals-data.json");
  const data = await response.json();

  let tbodyRadicals = document.getElementById("tbody-radicals");
  let tbodyEnglish = document.getElementById("tbody-english");

  if (quizNo === 1) {
    let questions = data.slice(0, 35);
    let questionsRadicals = data.slice(0, 35);
    let questionsEnglish = data.slice(0, 35);
    let counter = 0;
    let rowRadicals = document.createElement("tr");
    let rowEnglish = document.createElement("tr");
    for (let i = 0; i < questions.length; i++) {
      let randomIndexRadical = Math.floor(
        Math.random() * questionsRadicals.length
      );
      let randomIndexEnglish = Math.floor(
        Math.random() * questionsEnglish.length
      );

      let randomQuestionRadical = questionsRadicals.splice(
        randomIndexRadical,
        1
      )[0];
      let randomQuestionEnglish = questionsEnglish.splice(
        randomIndexEnglish,
        1
      )[0];

      let matchingIdentifierRadical = `match_${randomQuestionRadical.English.replace(
        / /g,
        "_"
      )}`;
      let matchingIdentifierEnglish = `match_${randomQuestionEnglish.English.replace(
        / /g,
        "_"
      )}`;

      matchingIdentifierEnglish = md5(matchingIdentifierEnglish);
      matchingIdentifierRadical = md5(matchingIdentifierRadical)
        .split("")
        .reverse()
        .join("");

      if (i === 0 || i % 5 === 0) {
        rowRadicals = document.createElement("tr");
        tbodyRadicals.appendChild(rowRadicals);

        rowEnglish = document.createElement("tr");
        tbodyEnglish.appendChild(rowEnglish);
      }
      let tdRadical = document.createElement("td");
      let buttonRadical = document.createElement("BUTTON");

      let tdEnglish = document.createElement("td");
      let buttonEnglish = document.createElement("BUTTON");

      buttonRadical.classList.add(
        `${randomQuestionRadical["Radical No."]}`,
        "btn",
        "shadow-sm",
        matchingIdentifierRadical
      );
      buttonRadical.innerText = randomQuestionRadical.Radical;
      buttonRadical.setAttribute(
        "onclick",
        "checkMatch(this); playPronunciation(this);"
      );

      buttonEnglish.classList.add(
        "btn",
        "shadow-sm",
        matchingIdentifierEnglish
      );
      buttonEnglish.innerText = randomQuestionEnglish.English;
      buttonEnglish.setAttribute("onclick", "checkMatch(this);");

      tdRadical.appendChild(buttonRadical);
      rowRadicals.appendChild(tdRadical);

      tdEnglish.appendChild(buttonEnglish);
      rowEnglish.appendChild(tdEnglish);

      counter++;
    }
  }
}

function checkMatch(element) {
  if (
    !matches.includes(element) &&
    element.style.backgroundColor != "gainsboro"
  ) {
    matches.push(element);
    element.style.backgroundColor = "MistyRose";
  }
  let scored = false;
  if (matches.length === 2) {
    let classMatchOne = matches[0].className.split(" ").at(-1);
    let classMatchTwo = matches[1].className.split(" ").at(-1);

    let reversedClassMatchOne = classMatchOne.split("").reverse().join("");
    let reversedClassMatchTwo = classMatchTwo.split("").reverse().join("");

    // console.log(classMatchOne, classMatchTwo, reversedClassMatchOne, reversedClassMatchTwo)

    if (
      classMatchOne === reversedClassMatchTwo ||
      classMatchTwo === reversedClassMatchOne
    ) {
      if (matches[0] === matches[1]) {
        // they can't be the same. Just have the same class name.
      } else {
        matches[0].style.backgroundColor = "Gainsboro";
        matches[1].style.backgroundColor = "Gainsboro";
        scored = true;
      }

      matches = [];
    }
    let buttons = document.getElementsByClassName("shadow-sm");

    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      if (button.style.backgroundColor === "mistyrose") {
        button.style.backgroundColor = "";
      }
    }
    matches = [];
    if (scored) {
      let scoreElement = document.getElementById("score");
      scored = true;
      score++;
      scoreElement.innerHTML = score;
    } else {
      let triesElement = document.getElementById("tries");
      tries++;
      triesElement.innerHTML = tries;
    }
  }
}

populateTables(1);

function playPronunciation(element) {
  const audioToggle = document.getElementById("audio-toggle");
  if (audioToggle.checked) {
    const audioId = element.className.split(" ")[0];
    const audioTrack1 = document.getElementById("audio-track-1");
    let pronunciation;
    if (audioTrack1.checked) {
      pronunciation = new Audio(`./audio/tacotron/${audioId}.wav`);
    } else {
      pronunciation = new Audio(`./audio/fastspeech2/${audioId}.wav`);
    }
    pronunciation.play();
  }
}

function handleAudioTracks(element) {
  if (element.checked) {
    let audioTrack1 = document.getElementById("audio-track-1");
    let audioTrack2 = document.getElementById("audio-track-2");
    audioTrack1.disabled = false;
    audioTrack2.disabled = false;
  } else {
    let audioTrack1 = document.getElementById("audio-track-1");
    let audioTrack2 = document.getElementById("audio-track-2");
    audioTrack1.disabled = true;
    audioTrack2.disabled = true;
  }
}

function toggleAudioTracks(element) {
  if (element.id === "audio-track-1") {
    let audioTrack2 = document.getElementById("audio-track-2");
    audioTrack2.checked = false;
  } else if (element.id === "audio-track-2") {
    let audioTrack1 = document.getElementById("audio-track-1");
    audioTrack1.checked = false;
  }
}
