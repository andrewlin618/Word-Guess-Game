var wordsBankNow = [];
var userWinsID = document.getElementById("user-wins");
var userLossesID = document.getElementById("user-losses");
var notificationID = document.getElementById("notification");
var currentWordID = document.getElementById("current-word");
var userRemainingID = document.getElementById("user-remaining");
var userGuessesID = document.getElementById("user-guesses");
var wordsPictureID = document.getElementById("words-picture");
var audioElement = document.getElementById('music-tag');
var musicPlaying = document.getElementById('music-playing');

// var audio = new Audio;
// audio.src = "assets/music/halo.mp3"
// audio.play();

const CHANCESTOTAL = 8;
var userGuesses = [];
var currentWord = [];
var wins = 0;
var losses = 0;
var remaining = CHANCESTOTAL;
var wordsPicked = "";
var index;

//Play the music when user guessed the right word;
function playMusic() {
    switch (wordsPicked) {
        case "havana":
            wordsPictureID.src = "assets/images/songs/havana.jpg"
            musicPlaying.src = "./assets/music/havana.mp3"
            audioElement.load();
            audioElement.play();
            break;
        case "senorita":
            wordsPictureID.src = "assets/images/songs/senorita.jpg"
            musicPlaying.src = "./assets/music/senorita.mp3"
            audioElement.load();
            audioElement.play();
            break;
        case "believer":
            wordsPictureID.src = "assets/images/songs/believer.jpg"
            musicPlaying.src = "./assets/music/believer.mp3"
            audioElement.load();
            audioElement.play();
            break;
        case "lucky":
            wordsPictureID.src = "assets/images/songs/lucky.jpg"
            musicPlaying.src = "./assets/music/lucky.mp3"
            audioElement.load();
            audioElement.play();
            break;
        case "natural":
            wordsPictureID.src = "assets/images/songs/natural.jpg"
            musicPlaying.src = "./assets/music/natural.mp3"
            audioElement.load();
            audioElement.play();
            break;
        case "sunrise":
            wordsPictureID.src = "assets/images/songs/sunrise.jpg"
            musicPlaying.src = "./assets/music/sunrise.mp3"
            audioElement.load();
            audioElement.play();
            break;
        case "everybody":
            wordsPictureID.src = "assets/images/songs/everybody.jpg"
            musicPlaying.src = "./assets/music/everybody.mp3"
            audioElement.load();
            audioElement.play();
            break;
        case "halo":
            wordsPictureID.src = "assets/images/songs/halo.jpg"
            musicPlaying.src = "./assets/music/halo.mp3"
            audioElement.load();
            audioElement.play();
            break;
        case "supreme":
            wordsPictureID.src = "assets/images/songs/supreme.jpg"
            musicPlaying.src = "./assets/music/supreme.mp3"
            audioElement.load();
            audioElement.play();
            break;
    }
}

function notifyCongratulations() {
    notificationID.textContent = "Congratulations!"
}

function notifySorry() {
    notificationID.textContent = "Bad luck..."
}

function notifyReset() {
    notificationID.textContent = "Next song:"

}

function guessTheNextWord() {
    //Reset Everything;
    wordsBankNow.splice(index, 1);
    remaining = CHANCESTOTAL;
    userGuesses = [];
    currentWord = [];

    userRemainingID.textContent = remaining;
    userWinsID.textContent = wins;
    userLossesID.textContent = losses;
    userGuessesID.textContent = "";
    wordsPictureID.src = "assets/images/start.gif"

    //Get a random word again;
    index = Math.floor(Math.random() * wordsBankNow.length);
    wordsPicked = wordsBankNow[index];

    //Set currentGuess to"_ _ _ _ _ _ _ _"
    for (var i = 0; i < wordsPicked.length; i++) {
        currentWord.push("_");
    }
    currentWordID.textContent = currentWord.join("");
    notifyReset();



}

//————————Initialization————————//
function reset() {
    userRemainingID.textContent = CHANCESTOTAL;
    userWinsID.textContent = 0;
    userLossesID.textContent = 0;
    userGuessesID.textContent = "";
    wordsBankNow = wordsBank;
    userGuesses = [];
    currentWord = [];
    wins = 0;
    losses = 0;
    remaining = CHANCESTOTAL;
    wordsPictureID.src = "assets/images/start.gif"
    wordsBankNow = ["havana", "senorita", "believer", "lucky", "natural", "sunrise", "everybody", "halo", "supreme"]

    notifyReset();

    //Get a random word;
    index = Math.floor(Math.random() * wordsBankNow.length);
    wordsPicked = wordsBankNow[index];

    //Set currentGuess to"_ _ _ _ _ _ _ _"
    for (var i = 0; i < wordsPicked.length; i++) {
        currentWord.push("_");
    }
    currentWordID.textContent = currentWord.join("");
    notificationID.textContent = "Next song:"
}

reset();

//————————Game start——————//

document.onkeyup = function (event) {
    //Check if lose
    if (losses == 3 || wins == 5) {
        if (confirm("play again")) {
            reset();
        }
        else {
            return;
        }
    }

    //Check weird input
    if (event.keyCode == 8 || event.keyCode == 13 || event.keyCode == 16 || event.keyCode == 17 || event.keyCode == 18 || event.keyCode == 27 || event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 91 || event.keyCode == 93) {
        return;
    }
    var currentLetter = event.key.toLowerCase();
    if (currentLetter.charCodeAt() < 97 || currentLetter.charCodeAt() > 122) {
        alert("Guess a letter please!!");
        return;
    }

    //Check duplicated guess;
    if (userGuesses.indexOf(currentLetter) >= 0) {
        alert("You already guessed this letter!!");
        return;
    }
    else {
        //updated user's guessed letter;
        userGuesses.push(currentLetter);
        userGuessesID.textContent = userGuesses;

        // Replace "_" with right letter;
        for (var i = 0; i < wordsPicked.length; i++) {
            if (currentLetter == wordsPicked[i]) {
                currentWord[i] = currentLetter;
                currentWordID.textContent = currentWord;
            }
        }
        //Guessed the wrong letter;
        if (currentWord.indexOf(currentLetter) < 0) {
            remaining--;
            userRemainingID.textContent = remaining;

            //Used up the Chances
            if (remaining == 0) {
                notifySorry();
                losses++;
                playMusic();
                currentWord = wordsPicked;
                currentWordID.textContent = currentWord;
                setTimeout(
                    guessTheNextWord, 4000
                )
            }
        }

        //Guessed the whole word;
        else if (currentWord.indexOf("_") < 0) {
            playMusic();
            currentWord = wordsPicked;
            currentWordID.textContent = currentWord;
            wins++;
            notifyCongratulations();
            //Check if win
            if (wins == 5) {
                userWinsID.textContent = 5;
                wordsPictureID.src = "assets/images/win.png"
                return;
            }
            setTimeout(
                guessTheNextWord, 4000
            )
        }

        //Guessed the right letter but not the hole words
        else {
            currentWordID.textContent = currentWord.join("");
        }
    }
}
