// --- basics ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- bubble system ---
const stage = document.getElementById("bubbleStage");

function stopBubbleLoop(){
  paused = true;
  if (bubbleTimer){
    clearInterval(bubbleTimer);
    bubbleTimer = null;
  }
}


const reasons = [
  "I love your smile 💗",
  "You’re the most beautiful person ever",
  "You make me want to grow",
  "Tilly is very cute (but Onyx is better) 😭",
  "Your eyes are so beautiful",
  "Your face is perfect",
  "You make my life better",
  "You make me feel calm",
  "You make me feel loved",
  "You’re my favorite person",
  "You’re literally my happy place",
  "You make everything more fun",
  "I love your laugh",
  "I love your voice",
  "You’re cute even when you’re mad",
  "You’re sweet without even trying",
  "You make hard days easier",
  "You’re always on my mind",
  "You’re my best thing",
  "I’m so lucky it’s you",
  "You’re my comfort",
  "You’re my peace",
  "You’re my favorite hello",
  "I love you, Ava 💖"
];

let bubbleTimer = null;
let paused = false;

function rand(min, max){ return Math.random() * (max - min) + min; }

function spawnBubble(text){
  if (!stage) return;

  const b = document.createElement("div");
  b.className = "bubble";
  b.textContent = text;

  // random position within stage
  const padding = 16;
  const stageW = stage.clientWidth;
  const stageH = stage.clientHeight;

  const x = rand(padding, Math.max(padding, stageW - 240));
  const y = rand(stageH * 0.55, stageH - 70);

  // random duration
  const dur = rand(3.2, 6.2).toFixed(2) + "s";
  b.style.setProperty("--dur", dur);

  b.style.left = x + "px";
  b.style.top = y + "px";

  stage.appendChild(b);

  // remove when animation ends
  b.addEventListener("animationend", () => b.remove());
}

function startBubbles(){
  if (bubbleTimer) return;
  paused = false;
  bubbleTimer = setInterval(() => {
    if (paused) return;
    const t = reasons[Math.floor(Math.random() * reasons.length)];
    spawnBubble(t);
  }, 550);
}

function stopBubbles(){
  paused = true;
}

function clearBubbles(){
  stage?.querySelectorAll(".bubble").forEach(b => b.remove());
}

document.getElementById("startBubblesBtn")?.addEventListener("click", startBubbles);
document.getElementById("moreBubblesBtn")?.addEventListener("click", () => {
  for (let i = 0; i < 8; i++){
    const t = reasons[Math.floor(Math.random() * reasons.length)];
    spawnBubble(t);
  }
});
document.getElementById("pauseBubblesBtn")?.addEventListener("click", () => {
  paused = !paused;
  document.getElementById("pauseBubblesBtn").textContent = paused ? "Resume" : "Pause";
});
document.getElementById("clearBubblesBtn")?.addEventListener("click", clearBubbles);

// start automatically after load
setTimeout(startBubbles, 600);

const status = document.getElementById("status");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Put your GIF filenames here (inside assets/)
const yesGifs = [
  "assets/art-licking-GIF.gif",
  "assets/Hello-Kitty-Pink-GIF.gif",
  "assets/I-Love-You-Valentine-GIF.gif",
  "assets/Proud-Of-You-GoodJob-GIF.gif"
];


function spawnGif(src){
  const el = document.createElement("img");
  el.src = src;
  el.alt = "Celebration gif";
  el.className = "gifPop";

  // random position
  const x = Math.random() * (window.innerWidth - 180);
  const y = Math.random() * (window.innerHeight - 220);

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  // random slight rotation + scale
  const rot = Math.random() * 18 - 9;
  const scale = 0.9 + Math.random() * 0.35;
  el.style.transform = `rotate(${rot}deg) scale(${scale})`;

  document.body.appendChild(el);

  // remove after animation
  el.addEventListener("animationend", () => el.remove());
}

yesBtn?.addEventListener("click", () => {
  status.textContent = "YAYYYYY 💖💖💖";

  // stop bubbles forever once she says yes
  stopBubbleLoop();
  clearBubbles(); // optional: removes the bubbles already on screen

  // (then your gif popping code continues...)
  for (let i = 0; i < 18; i++){
    const src = yesGifs[Math.floor(Math.random() * yesGifs.length)];
    setTimeout(() => spawnGif(src), i * 80);
  }
});


noBtn?.addEventListener("mouseenter", (e) => {
  const btn = e.currentTarget;
  btn.style.position = "relative";
  btn.style.left = Math.floor(Math.random() * 160 - 80) + "px";
  btn.style.top  = Math.floor(Math.random() * 40 - 20) + "px";
  status.textContent = "Nice try 😌";
});


