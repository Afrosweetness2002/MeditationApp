const app = function () {
  let song = document.querySelector(".song");
  let play = document.querySelector(".play");
  let outline = document.querySelector(".moving-outline circle");
  let video = document.querySelector(".vid-container video");

  // sounds
  let sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  let timeSelect = document.querySelectorAll(".time-select button");
  let timeDisplay = document.querySelector(".time-display");
  //Get the length of the outline:
  let outlineLength = outline.getTotalLength();
  //Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Pick Different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //Play Sound
  play.addEventListener("click", function () {
    checkPlaying(song);
  });

  //Select Sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  // Create a function specific to stop and play the sounds
  let checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  // We can animate the circle
  song.ontimeupdate = function () {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // animate the Circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animate the textAlign:
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = `./svg/play.svg`;
      video.pause();
    }
  };
};

app();
