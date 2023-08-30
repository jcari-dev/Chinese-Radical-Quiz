async function populateTables(quizNo) {

    const response = await fetch("./data/radicals-data.json");
    const data = await response.json();

    let tbodyRadicals = document.getElementById('tbody-radicals');
    let tbodyEnglish = document.getElementById('tbody-english');




    if (quizNo === 1) {
        let questions = data.slice(0, 35);
        let questionsRadicals = data.slice(0, 35);
        let questionsEnglish = data.slice(0, 35);
        let counter = 0
        let rowRadicals = document.createElement("tr");
        let rowEnglish = document.createElement("tr");
        for (let i = 0; i < questions.length; i++) {

            let randomIndexRadical = Math.floor(Math.random() * questionsRadicals.length);
            let randomIndexEnglish = Math.floor(Math.random() * questionsEnglish.length);

            let randomQuestionRadical = questionsRadicals.splice(randomIndexRadical, 1)[0];
            let randomQuestionEnglish = questionsEnglish.splice(randomIndexEnglish, 1)[0];

            let matchingIdentifierRadical = `match_${randomQuestionRadical.English.replace(/ /g, "_")}`
            let matchingIdentifierEnglish = `match_${randomQuestionEnglish.English.replace(/ /g, "_")}`

            matchingIdentifierEnglish = md5(matchingIdentifierEnglish)
            matchingIdentifierRadical = md5(matchingIdentifierRadical).split("").reverse().join("")

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

            buttonRadical.classList.add("btn", "shadow-sm", matchingIdentifierRadical);
            buttonRadical.innerText = randomQuestionRadical.Radical;
            buttonRadical.setAttribute("onclick", "checkMatch(this)");

            buttonEnglish.classList.add("btn", "shadow-sm", matchingIdentifierEnglish);
            buttonEnglish.innerText = randomQuestionEnglish.English;
            buttonEnglish.setAttribute("onclick", "checkMatch(this)");

            tdRadical.appendChild(buttonRadical);
            rowRadicals.appendChild(tdRadical);

            tdEnglish.appendChild(buttonEnglish);
            rowEnglish.appendChild(tdEnglish);

            counter++;
        }
    }


}

let matches = []

function checkMatch(element) {
    if(!matches.includes(element) && element.style.backgroundColor != "gainsboro"){
        matches.push(element)
        element.style.backgroundColor = "MistyRose";
    }

    if(matches.length === 2){

        let classMatchOne = matches[0].className.split(' ').at(-1)
        let classMatchTwo = matches[1].className.split(' ').at(-1)

        let reversedClassMatchOne = classMatchOne.split("").reverse().join("")
        let reversedClassMatchTwo = classMatchTwo.split("").reverse().join("")

        console.log(classMatchOne, classMatchTwo, reversedClassMatchOne, reversedClassMatchTwo)

        if(classMatchOne === reversedClassMatchTwo || classMatchTwo === reversedClassMatchOne){
            if(matches[0] === matches[1]){
                // they can't be the same. Just have the same class name.
            } else {
  
                matches[0].style.backgroundColor = "Gainsboro";
                matches[1].style.backgroundColor = "Gainsboro";

            }

            matches = []

        }
        let buttons = document.getElementsByClassName("shadow-sm")

        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            if(button.style.backgroundColor === "mistyrose"){
                button.style.backgroundColor = ""
            }
        }
        matches = []
    }


}


populateTables(1);

