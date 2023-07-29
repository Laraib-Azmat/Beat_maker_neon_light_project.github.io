
class DrumKit{

    constructor() {
    
        this.pads = document.querySelectorAll(".pad");
        this.playButton = document.querySelector(".play-button");
        this.kickSound = document.querySelector(".kick-audio");
        this.snareSound = document.querySelector(".snare-audio");
        this.hihatSound = document.querySelector(".hihat-audio");
        this.tomSound = document.querySelector(".tom-audio");
        this.tomTrack = document.querySelector(".tom-track");
        this.selects = document.querySelectorAll("select");
        this.muteButton = document.querySelectorAll(".mute-button");
        this.tempoSlider = document.querySelector("#tempo-slider");
        this.moreButton = document.querySelector(".more-audio");
        this.isPlaying = false;
        this.index = 0;
        this.ply = null;
        this.bpm = 150;

}

    activePad() {
        this.classList.toggle("active");
    }

    repeate() {
        let step = this.index % 8;
        const beats = document.querySelectorAll(`.b${step}`);
        beats.forEach(beat => {
            beat.style.animation = `playTrack 0.3s alternate ease 2 `;
            if (beat.classList.contains("active")) {
                if (beat.classList.contains("kickpad")) {
                    this.kickSound.currentTime = 0;
                    this.kickSound.play();
                }
                if (beat.classList.contains("snarepad")) {
                    this.snareSound.currentTime = 0;
                    this.snareSound.play();
                }
                if (beat.classList.contains("hihatpad")) {
                    this.hihatSound.currentTime = 0;
                    this.hihatSound.play();
                }
                if (beat.classList.contains("tompad")) {
                    this.tomSound.currentTime = 0;
                    this.tomSound.play();
                }
            }
            
           
        });

        this.index++;
    }

    start() {

        const interval = 60 / (this.bpm)* 1000;

        if (this.isPlaying) {
         this.ply = setInterval(() => {
                this.repeate();
            }, interval);
        }
        else {
            clearInterval(this.ply);
        }

        
    }

    update() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.playButton.classList.remove("active");
            this.playButton.innerText = "Play";
        }
        else {
            this.isPlaying = true;
            this.playButton.classList.add("active");  
            this.playButton.innerText = "Stop";
        }
     }

    changeSound(e) {
        const selectName = e.target.name;
        const selectValue = e.target.value;

        switch (selectName) {
            case "kick-select":
                this.kickSound.src = selectValue;
               
                break;
            case "snare-select":
                this.snareSound.src = selectValue;
                break;
            case "hihat-select":
                this.hihatSound.src = selectValue;
                break;
            case "tom-select":
                this.tomSound.src = selectValue;
                break;
        }

    }

    mute(e) {
        const muteIndex = e.target.getAttribute("track");
        e.target.classList.toggle("active");
        e.target.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        if (e.target.classList.contains("active")) {
            switch (muteIndex) {
                case "0":
                    this.kickSound.volume=0;
                    break;
                case "1":
                    this.snareSound.volume = 0;
                    break;
                case "2":
                    this.hihatSound.volume=0;
                    break;
                case "3":
                    this.tomSound.volume=0;
                    break;
            }
        } else {
            e.target.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
            switch (muteIndex) {
                case "0":
                    this.kickSound.volume=1;
                    break;
                case "1":
                    this.snareSound.volume = 1;
                    break;
                case "2":
                    this.hihatSound.volume=1;
                    break;
                case "3":
                    this.tomSound.volume=1;
                    break;
            }
        }
    }

        changeTempo(e) {
        const changeText = document.querySelector(".tempo-text");
        changeText.innerText = e.target.value;
    }

    updateTempo(e) {

        this.bpm = e.target.value;
        clearInterval(this.ply);
        this.start();
      
    }

    moreLess() {
        
        this.moreButton.classList.toggle("active");

        if (this.moreButton.classList.contains("active")) {
            this.moreButton.innerText = "Less";
            this.tomTrack.style.display = "flex";
            
        }
        else {
            this.moreButton.innerText = "More";
            this.tomTrack.style.display = "none";
        }

    }


}

//event listners

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    
    pad.addEventListener("click",   drumKit.activePad);
    pad.addEventListener("animationend", function() {
        this.style.animation = "";
      });
});

drumKit.playButton.addEventListener("click",  () => {
    drumKit.update();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener("change", e => {
        drumKit.changeSound(e);
    });
});


drumKit.muteButton.forEach(btn => {
   
    btn.addEventListener("click", e => {
        drumKit.mute(e); 
    });
});

drumKit.tempoSlider.addEventListener("input", e => {
    drumKit.changeTempo(e); 
});


drumKit.tempoSlider.addEventListener("change", e => {
    drumKit.updateTempo(e); 
});

drumKit.moreButton.addEventListener("click", () => {
    drumKit.moreLess();
});

document.addEventListener("DOMContentLoaded", () => {
      drumKit.tomTrack.style.display = "none";
});