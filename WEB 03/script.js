const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

window.addEventListener("load", () => {
  setTimeout(() => $("#loader").classList.add("hide"), 500);
});

const intro = $("#intro");
const enterBtn = $("#enterBtn");
const bgm = $("#bgm");
const soundBtn = $("#soundBtn");
let audioStarted = false;

function startMusic(){
  bgm.volume = 0.42;
  bgm.play().then(()=>{
    audioStarted = true;
    soundBtn.textContent = "🔊 BGM ON";
  }).catch(()=>{});
}

enterBtn.addEventListener("click", () => {
  startMusic();
  intro.classList.add("hide");
});

soundBtn.addEventListener("click", () => {
  if (bgm.paused) {
    startMusic();
  } else {
    bgm.pause();
    soundBtn.textContent = "🔇 BGM OFF";
  }
});

const menuBtn = $("#menuBtn");
const navMenu = $("#navMenu");
menuBtn.addEventListener("click", () => navMenu.classList.toggle("open"));
$$("nav a").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("open")));

$("#year").textContent = new Date().getFullYear();

$("#discordBtn").addEventListener("click", e => {
  e.preventDefault();
  navigator.clipboard?.writeText("painpain01");
  alert("Discord username copied: painpain01");
});

const glow = $("#cursorGlow");
document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  if (Math.random() < 0.16) {
    const p = document.createElement("i");
    p.className = "particle";
    p.style.left = e.clientX + "px";
    p.style.top = e.clientY + "px";
    p.style.setProperty("--dx", (Math.random()*70-35)+"px");
    p.style.setProperty("--dy", (Math.random()*70-35)+"px");
    $("#particles").appendChild(p);
    setTimeout(()=>p.remove(),900);
  }
});


// =================================
// MOUSE / BUTTON CLICK SOUND
// =================================
const clickSound = new Audio("audio/cyber-click.wav");
clickSound.preload = "auto";
clickSound.volume = 0.55;

function playClickSound() {
  try {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  } catch (err) {
    console.log("Click sound unavailable:", err);
  }
}

document.addEventListener("click", e => {
  playClickSound();
  for(let i=0;i<10;i++){
    const p=document.createElement("i");
    p.className="particle";
    p.style.left=e.clientX+"px";
    p.style.top=e.clientY+"px";
    const a=Math.random()*Math.PI*2, d=35+Math.random()*90;
    p.style.setProperty("--dx",Math.cos(a)*d+"px");
    p.style.setProperty("--dy",Math.sin(a)*d+"px");
    $("#particles").appendChild(p);
    setTimeout(()=>p.remove(),900);
  }
});
