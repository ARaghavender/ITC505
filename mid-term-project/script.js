function playAudio() {
  var audio = document.getElementById("bgAudio");
  audio.play();
  var container = document.getElementById("container");
  container.classList.add("hidden");
  setTimeout(() => {
    container.style.display = "none";
  }, 3000);
}

function startGame() {
  document.getElementById("content0").classList.remove("active");
  document.getElementById("content0").style.opacity = 0;

  setTimeout(() => {
    document.getElementById("content0").style.display = "none";
    document.getElementById("content1").style.display = "block";
    setTimeout(() => {
      document.getElementById("content1").classList.add("active");
      document.getElementById("content1").style.opacity = 1;
    }, 50);
  }, 1000);
}

const story = [
  {
    text: "Lets The Adventure Begin",
    choices: [{ text: "Start The Game", next: 1 }],
    image:
      "https://www.bhmpics.com/downloads/mysterious-wallpapers-/32.adventure-ai-1112023th.png",
  },
  {
    text: "You find yourself at the edge of an ancient forest. Ahead, a mystical bridge spans a wide river, adorned with glowing runes. Beyond the bridge, majestic mountains tower over the landscape, and you can hear the soothing sound of a distant waterfall. Birds are singing, and the air is filled with the scent of blooming flowers.",
    choices: [
      { text: "Cross the bridge", next: 2 },
      { text: "Follow the river upstream", next: 3 },
    ],
    image: "https://magical-story-game.netlify.app/guardian.jpg",
  },
  {
    text: "As you step onto the bridge, the runes glow brighter. Halfway across, a guardian spirit appears and asks you to solve a riddle to pass. Do you accept the challenge or try to run past the spirit?",
    choices: [
      { text: "Accept the challenge", next: 4 },
      { text: "Run past the spirit", next: 5 },
    ],
    image: "https://magical-story-game.netlify.app/spirit.jpg",
  },
  {
    text: "You walk along the riverbank, enjoying the sight of colorful flowers and listening to the chirping birds. Suddenly, you see a small boat tied to a tree. Do you take the boat downstream or continue walking upstream?",
    choices: [
      { text: "Take the boat downstream", next: 6 },
      { text: "Continue walking upstream", next: 7 },
    ],
    image: "https://magical-story-game.netlify.app/riverbank.jpg",
  },
  {
    text: "The spirit presents a riddle: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind.' You think carefully and answer: 'An echo.' The spirit smiles and allows you to pass. You continue across the bridge and find a treasure chest.",
    choices: [
      { text: "Open the chest", next: 8 },
      { text: "Leave the chest and explore further", next: 9 },
    ],
    image: "https://magical-story-game.netlify.app/spirit1.jpg",
  },
  {
    text: "You dash forward, but the spirit summons a magical barrier. Unable to pass, you are forced back. The spirit warns you to respect the ancient rules. Do you apologize and accept the challenge, or retreat and take another path?",
    choices: [
      { text: "Apologize and accept the challenge", next: 4 },
      { text: "Retreat and take another path", next: 3 },
    ],
    image: "https://magical-story-game.netlify.app/spirit2.jpg",
  },
  {
    text: "You untie the boat and start rowing downstream. The river becomes turbulent, and you see a waterfall ahead. Do you steer towards a calm inlet or brace yourself for the waterfall?",
    choices: [
      { text: "Steer towards the inlet", next: 10 },
      { text: "Brace for the waterfall", next: 11 },
    ],
    image: "https://magical-story-game.netlify.app/boat.jpg",
  },
  {
    text: "As you walk upstream, you find a hidden cave behind a waterfall. Inside, you discover ancient carvings that hint at a powerful artifact hidden nearby. Do you explore the cave further or return to the bridge?",
    choices: [
      { text: "Explore the cave", next: 12 },
      { text: "Return to the bridge", next: 3 },
    ],
    image: "https://magical-story-game.netlify.app/cave.jpg",
  },
  {
    text: "You open the chest and find it filled with gold and jewels. Among the treasures is a magical amulet. As you put it on, you feel a surge of power. You have found the Enchanted Amulet and your adventure ends in triumph.",
    choices: [{ text: "Congratulations Restart", next: 0 }],
    image: "https://magical-story-game.netlify.app/chest.jpg",
  },
  {
    text: "You leave the chest and continue exploring. Beyond the bridge, you find an ancient temple. Inside, you encounter a wise sage who offers to teach you powerful magic. Your journey takes a new and exciting turn.",
    choices: [{ text: "Congratulations Restart", next: 0 }],
    image: "https://magical-story-game.netlify.app/sage1.jpg",
  },
  {
    text: "You steer the boat towards the inlet and find a peaceful lagoon. On the shore, you discover a small village. The villagers welcome you and share their knowledge of the enchanted forest. You decide to stay and learn their ways.",
    choices: [{ text: "Congratulations Restart", next: 0 }],
    image: "https://magical-story-game.netlify.app/village.jpg",
  },
  {
    text: "You brace yourself as the boat plunges over the waterfall. Miraculously, you survive and find yourself in a hidden valley filled with rare and magical creatures. You decide to explore this new world.",
    choices: [{ text: "Congratulations Restart", next: 0 }],
    image: "https://magical-story-game.netlify.app/pulging.jpg",
  },
  {
    text: "You delve deeper into the cave and find a hidden chamber filled with glowing crystals. In the center, a powerful artifact pulses with energy. You claim the artifact and feel its power flowing through you.",
    choices: [{ text: "Congratulations Restart", next: 0 }],
    image: "https://magical-story-game.netlify.app/chamber.jpg",
  },
];

let currentStage = story[0];
function updateGame() {
  const gameContainer = document.getElementById("gameContainer");
  gameContainer.innerHTML = `
      <div class="innerContent">
        <h1>${currentStage.text}</h1>
        <div id="choices" class="choices" style="display:flex;justify-content: space-evenly">
          ${currentStage.choices
            .map(
              (choice) => `
            <button class="button-85" onClick="makeChoice(${choice.next})">${choice.text}</button>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  const mainElements = document.getElementsByClassName("main");

  if (mainElements.length > 0) {
    mainElements[0].style.backgroundImage = `url("${currentStage.image}")`;
  }
}

function makeChoice(nextStageIndex) {
  currentStage = story[nextStageIndex];
  updateGame();
}

// Initial game setup
updateGame();
