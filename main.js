const pwLengthSlider = document.getElementById("pw-length-slider");
const pwLengthInput = document.getElementById("pw-length-input");
const pwUseNumbers = document.getElementById("pw-use-numbers");
const pwUseSymbols = document.getElementById("pw-use-symbols");
const pwResults = document.getElementsByClassName("pw-result");

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

let resultLength = 15;

document.getElementById("the-button").addEventListener("click", (e) => {
    let charsToUse = [];
    charsToUse.push(...letters);
    if (pwUseNumbers.checked) {
        charsToUse.push(...numbers);
    }
    if (pwUseSymbols.checked) {
        charsToUse.push(...symbols);
    }
    
    resultLength = pwLengthInput.value;

    for (const elem of pwResults) {
        elem.textContent = getPassword(charsToUse);
    };
});

function getPassword(arr) {
    let getChar = () => arr[Math.floor(Math.random() * arr.length)];
    let result = "";
    for (let i = 0; i < resultLength; i++) {
        result += getChar();
    }
    return result;
}

// syncing between slider and number input
pwLengthSlider.addEventListener("input", (e) => {
    pwLengthInput.value = e.target.value;
});
pwLengthInput.addEventListener("input", (e) => {
    pwLengthSlider.value = e.target.value;
});

// copy to clipboard when a password result is clicked
for (const pwResult of pwResults) {
    pwResult.addEventListener("click", (e) => {
        navigator.clipboard.writeText(e.target.textContent);
        showNotif("Copied to clipboard");
    });
}

function showNotif(message, duration = 3000) {
    // create a new notif element inside the box
    const box = document.getElementById("notif-box");
    const notif = document.createElement("div");
    notif.className = "notif";
    notif.textContent = message;
    box.appendChild(notif);
    
    // so the slide in animation can play
    void notif.offsetHeight;
    
    requestAnimationFrame(() => {
        notif.classList.add("show");
    });
    
    // slide out after duration, and remove the notif element
    setTimeout(() => {
        notif.classList.remove("show");
        notif.addEventListener("transitionend", (e) => {
            if (e.propertyName === "transform") notif.remove();
        });
    }, duration);
}
