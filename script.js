const BASE_DICTIONARY = [
  "ACE","ACT","AGE","AIR","ANT","APE","ARC","ARM","ART","ASH","ASK","ATE",
  "BAD","BAG","BAN","BAR","BAT","BAY","BED","BEE","BET","BIG","BIN","BIT","BOG","BOX","BOY","BUG","BUS","BUY",
  "CAN","CAP","CAR","CAT","COW","CUP","CUT","DAY","DEN","DOG","DOT","DRY","EAR","EAT","EGG","END","EYE",
  "FAN","FAR","FAT","FIG","FIN","FIT","FIX","FLY","FOG","FOX","FUN","GAME","GRID","WORD","PLAY","CODE",
  "HAT","HEN","HER","HIT","HOT","HOW","ICE","INK","JAM","JET","JOB","JOY","KEY","KID","KIT",
  "MAN","MAP","MAT","MAY","MIX","NET","NEW","ONE","OWL","PAN","PEN","PET","PIG","PIN","POT",
  "RUN","SAD","SAT","SEA","SEE","SET","SIT","SKY","SON","SUN","TAP","TEA","TEN","TIN","TOP",
  "ABLE","BACK","BALL","BANK","BATH","BEAR","BEAT","BIRD","BLUE","BOAT","BOOK","CALL","CARD","CARE","CASE",
  "CHAT","CITY","CLUB","CODE","COME","COOK","COOL","CORN","COST","DATA","DATE","DEAL","DEEP","DESK",
  "EACH","EAST","EASY","FACE","FACT","FAIR","FALL","FARM","FAST","FEAR","FEEL","FILE","FIND","FIRE",
  "FISH","FIVE","FOOD","FORM","FOUR","FREE","GAME","GATE","GIFT","GIRL","GIVE","GOAL","GOOD","GROW",
  "HAND","HARD","HAVE","HEAD","HEAR","HEAT","HELP","HERE","HIGH","HOME","HOPE","HOUR","IDEA","INTO",
  "JOIN","JUMP","KEEP","KIND","KING","KNOW","LAND","LAST","LATE","LEAD","LEFT","LIFE","LIKE","LINE",
  "LIVE","LONG","LOOK","LOVE","MADE","MAKE","MANY","MARK","MEAN","MEET","MIND","MORE","MOST","MOVE",
  "NAME","NEAR","NEED","NEWS","NEXT","NICE","OPEN","OVER","PAGE","PAIN","PAIR","PARK","PART","PAST",
  "PLAN","PLAY","PLUS","POST","PULL","PUSH","RACE","RAIN","RATE","READ","REAL","REST","RICH","RIDE",
  "RING","RISE","RISK","ROAD","ROCK","ROLE","ROOM","RULE","SAFE","SALE","SAME","SAVE","SEAT","SEED",
  "SEEK","SEEM","SELL","SEND","SHIP","SHOP","SHOW","SIDE","SIGN","SITE","SIZE","SLOW","SNOW","SOME",
  "SONG","SOON","SORT","SOUL","STAR","STAY","STEP","STOP","SURE","TAKE","TALK","TEAM","TELL","TERM",
  "TEST","TEXT","THAN","THAT","THEM","THEN","THEY","THIS","TIME","TOLD","TOOL","TOUR","TOWN","TREE",
  "TRIP","TRUE","TURN","TYPE","UNIT","USER","VERY","VIEW","VOTE","WAIT","WAKE","WALK","WALL","WANT",
  "WARM","WASH","WAVE","WAYS","WEAR","WEEK","WELL","WENT","WERE","WEST","WHAT","WHEN","WIFE","WILD",
  "WILL","WIND","WINE","WISE","WISH","WITH","WOOD","WORD","WORK","YARD","YEAR","YOUR",
  "ABOUT","ABOVE","ACTOR","ADMIT","AFTER","AGAIN","AGENT","AGREE","ALARM","ALBUM","ALERT","ALIEN",
  "ALIVE","ALLOW","ALONE","ALONG","AMONG","ANGER","ANGLE","APPLE","APPLY","ARENA","ARGUE","ASIDE",
  "AUDIO","AWARD","AWARE","BASIC","BEACH","BEGIN","BEING","BELOW","BIRTH","BLACK","BLAME","BLIND",
  "BLOCK","BLOOD","BOARD","BRAIN","BRAND","BREAD","BREAK","BRING","BROAD","BROWN","BUILD","CARRY",
  "CATCH","CAUSE","CHAIN","CHAIR","CHART","CHASE","CHECK","CHEST","CHIEF","CHILD","CLAIM","CLASS",
  "CLEAN","CLEAR","CLICK","CLOCK","CLOSE","COACH","COAST","COULD","COUNT","COURT","COVER","CRASH",
  "CREAM","CRIME","CROSS","CROWD","CYCLE","DAILY","DANCE","DEATH","DELAY","DOING","DOUBT","DRAFT",
  "DRAMA","DREAM","DRESS","DRINK","DRIVE","EARLY","EARTH","EIGHT","EMPTY","ENEMY","ENJOY","ENTER",
  "EQUAL","ERROR","EVENT","EVERY","EXACT","EXIST","EXTRA","FAITH","FALSE","FAULT","FIELD","FIGHT",
  "FINAL","FIRST","FIXED","FLASH","FLOOR","FOCUS","FORCE","FOUND","FRAME","FRESH","FRONT","FRUIT",
  "FUNNY","GIANT","GIVEN","GLASS","GLOBE","GOING","GRACE","GRADE","GRAND","GRASS","GREAT","GREEN",
  "GROUP","GUARD","GUESS","GUEST","GUIDE","HAPPY","HEART","HEAVY","HORSE","HOTEL","HOUSE","HUMAN",
  "IDEAL","IMAGE","INDEX","INPUT","ISSUE","JOINT","JUDGE","KNOWN","LABEL","LARGE","LATER","LAUGH",
  "LAYER","LEARN","LEAST","LEAVE","LEGAL","LEVEL","LIGHT","LIMIT","LOCAL","LOGIC","LOWER","LUCKY",
  "LUNCH","MAGIC","MAJOR","MAKER","MARCH","MATCH","MAYBE","MAYOR","MEANT","MEDIA","METAL","MIGHT",
  "MINOR","MODEL","MONEY","MONTH","MORAL","MOTOR","MOUNT","MOUSE","MOUTH","MOVIE","MUSIC","NEEDS",
  "NEVER","NEWLY","NIGHT","NOISE","NORTH","NOVEL","NURSE","OCEAN","OFFER","OFTEN","ORDER","OTHER",
  "PAINT","PANEL","PAPER","PARTY","PEACE","PHASE","PHONE","PHOTO","PIECE","PILOT","PITCH","PLACE",
  "PLAIN","PLANE","PLANT","PLATE","POINT","POWER","PRESS","PRICE","PRIDE","PRIME","PRINT","PRIZE",
  "PROOF","PROUD","PROVE","QUEEN","QUICK","QUIET","QUITE","RADIO","RAISE","RANGE","RAPID","RATIO",
  "REACH","READY","RIGHT","RIVER","ROUGH","ROUND","ROUTE","ROYAL","SCALE","SCENE","SCOPE","SCORE",
  "SENSE","SERVE","SEVEN","SHALL","SHAPE","SHARE","SHARP","SHEET","SHELL","SHIFT","SHIRT","SHOCK",
  "SHOOT","SHORT","SHOWN","SIGHT","SINCE","SIXTH","SKILL","SLEEP","SLIDE","SMALL","SMART","SMILE",
  "SMOKE","SOLID","SOLVE","SORRY","SOUND","SOUTH","SPACE","SPARE","SPEAK","SPEED","SPEND","SPLIT",
  "SPORT","STAFF","STAGE","STAKE","STAND","START","STATE","STEAM","STEEL","STICK","STILL","STOCK",
  "STONE","STORE","STORM","STORY","STUDY","STUFF","STYLE","SUGAR","SUPER","SWEET","TABLE","TAKEN",
  "TASTE","TEACH","TEETH","THANK","THEIR","THEME","THERE","THESE","THICK","THING","THINK","THIRD",
  "THOSE","THREE","THROW","TIGHT","TIMES","TIRED","TITLE","TODAY","TOPIC","TOTAL","TOUCH","TOUGH",
  "TOWER","TRACK","TRADE","TRAIN","TREAT","TREND","TRIAL","TRIED","TRUCK","TRULY","TRUST","TRUTH",
  "TWICE","UNDER","UNION","UNITY","UNTIL","UPPER","UPSET","URBAN","USUAL","VALID","VALUE","VIDEO",
  "VIRUS","VISIT","VITAL","VOICE","WASTE","WATCH","WATER","WHEEL","WHERE","WHICH","WHILE","WHITE",
  "WHOLE","WHOSE","WOMAN","WOMEN","WORLD","WORRY","WORSE","WORST","WORTH","WOULD","WRITE","WRONG",
  "YIELD","YOUNG","YOUTH"
];

const DIRS = [[0,1], [1,0], [1,1], [1,-1]];
const TURN_TIME_LIMIT = 30;

let rows = 5;
let cols = 5;
let minWord = 3;
let grid = [];
let turn = "A";
let timeLeft = TURN_TIME_LIMIT;
let scores = { A: 0, B: 0 };
let claimed = new Set();
let lastWords = [];
let history = [];
let dictionary = new Set(BASE_DICTIONARY);
let gameStarted = false;
let timerId = null;

const boardEl = document.getElementById("board");
const scoreAEl = document.getElementById("scoreA");
const scoreBEl = document.getElementById("scoreB");
const turnEl = document.getElementById("turn");
const timerEl = document.getElementById("timer");
const timerBox = document.getElementById("timerBox");
const statusEl = document.getElementById("status");
const boardSizeEl = document.getElementById("boardSize");
const completedWordsEl = document.getElementById("completedWords");
const historyEl = document.getElementById("history");
const winnerBox = document.getElementById("winnerBox");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

function makeGrid() {
  grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""));
}

function normalizeWords(text) {
  return [...new Set(
    text.toUpperCase()
      .split(/[^A-Z]+/)
      .map(w => w.trim())
      .filter(w => w.length >= 3)
  )];
}

function scanWords() {
  const found = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of DIRS) {
        let text = "";
        const cells = [];
        let rr = r;
        let cc = c;

        while (rr >= 0 && rr < rows && cc >= 0 && cc < cols && grid[rr][cc]) {
          text += grid[rr][cc];
          cells.push([rr, cc]);

          if (text.length >= minWord && dictionary.has(text)) {
            found.push({
              word: text,
              cells: [...cells],
              key: `${text}:${cells.map(([a,b]) => `${a},${b}`).join("|")}`
            });
          }

          rr += dr;
          cc += dc;
        }
      }
    }
  }

  return found;
}

function drawBoard() {
  boardEl.innerHTML = "";
  boardEl.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

  const highlighted = new Set(lastWords.flatMap(w => w.cells.map(([r,c]) => `${r},${c}`)));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const input = document.createElement("input");
      input.className = "cell";
      input.maxLength = 1;
      input.value = grid[r][c];

      if (grid[r][c]) input.classList.add("filled");
      if (highlighted.has(`${r},${c}`)) input.classList.add("highlight");

      input.disabled = !gameStarted || Boolean(grid[r][c]) || isBoardFull();
      input.addEventListener("input", e => placeLetter(r, c, e.target.value));

      boardEl.appendChild(input);
    }
  }
}

function isBoardFull() {
  return grid.every(row => row.every(Boolean));
}

function getWinner() {
  if (!isBoardFull()) return null;
  if (scores.A === scores.B) return "Draw";
  return scores.A > scores.B ? "Player A" : "Player B";
}

function updateTheme() {
  document.body.classList.toggle("player-a-bg", turn === "A");
  document.body.classList.toggle("player-b-bg", turn === "B");
}

function updateUI() {
  scoreAEl.textContent = scores.A;
  scoreBEl.textContent = scores.B;
  turnEl.textContent = turn;
  timerEl.textContent = `${timeLeft}s left`;
  boardSizeEl.textContent = `${rows} × ${cols} board`;

  timerBox.classList.toggle("danger", gameStarted && timeLeft <= 5);

  if (!gameStarted) {
    statusEl.textContent = "Press Start Game to begin";
  } else {
    statusEl.textContent = `Player ${turn}: click any empty cell and type a letter`;
  }

  if (lastWords.length) {
    completedWordsEl.innerHTML = lastWords
      .map(w => `<span class="chip">+1 ${w.word}</span>`)
      .join("");
  } else {
    completedWordsEl.textContent = "No new word on the latest move.";
  }

  if (history.length) {
    historyEl.innerHTML = history.map(h => `
      <div class="move">
        <strong>${h.player}</strong>: ${h.text}<br>
        <span>${h.detail}</span>
      </div>
    `).join("");
  } else {
    historyEl.textContent = "Start the game, then click any empty cell and type a letter.";
  }

  const winner = getWinner();
  if (winner) {
    winnerBox.classList.remove("hidden");
    winnerBox.textContent = winner === "Draw"
      ? `It is a draw! Final score: A ${scores.A} — B ${scores.B}`
      : `${winner} wins! Final score: A ${scores.A} — B ${scores.B}`;
    stopTimer();
  } else {
    winnerBox.classList.add("hidden");
  }

  startBtn.disabled = gameStarted || isBoardFull();

  updateTheme();
  drawBoard();
}

function startTimer() {
  stopTimer();
  timerId = setInterval(() => {
    if (!gameStarted || isBoardFull()) return;

    timeLeft -= 1;

    if (timeLeft <= 0) {
      history.unshift({
        player: `Player ${turn}`,
        text: "time ran out",
        detail: "Turn skipped."
      });
      history = history.slice(0, 10);
      turn = turn === "A" ? "B" : "A";
      timeLeft = TURN_TIME_LIMIT;
    }

    updateUI();
  }, 1000);
}

function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
}

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  timeLeft = TURN_TIME_LIMIT;
  startTimer();
  updateUI();
}

function placeLetter(r, c, value) {
  if (!gameStarted || grid[r][c] || isBoardFull()) return;

  const clean = value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 1);
  if (!clean) {
    updateUI();
    return;
  }

  grid[r][c] = clean;

  const found = scanWords();
  const newWords = found.filter(item => !claimed.has(item.key));
  lastWords = newWords;

  if (newWords.length) {
    scores[turn] += newWords.length;
    newWords.forEach(w => claimed.add(w.key));
  }

  history.unshift({
    player: `Player ${turn}`,
    text: `placed "${clean}" at (${r + 1}, ${c + 1})`,
    detail: newWords.length ? `Scored ${newWords.length}: ${newWords.map(w => w.word).join(", ")}` : "No score"
  });
  history = history.slice(0, 10);

  turn = turn === "A" ? "B" : "A";
  timeLeft = TURN_TIME_LIMIT;

  updateUI();
}

function resetGame() {
  stopTimer();
  makeGrid();
  turn = "A";
  timeLeft = TURN_TIME_LIMIT;
  scores = { A: 0, B: 0 };
  claimed = new Set();
  lastWords = [];
  history = [];
  gameStarted = false;
  updateUI();
}

function applySettings() {
  rows = Math.max(3, Math.min(9, Number(document.getElementById("rowsInput").value) || 5));
  cols = Math.max(3, Math.min(9, Number(document.getElementById("colsInput").value) || 5));
  minWord = Math.max(3, Math.min(8, Number(document.getElementById("minInput").value) || 3));
  resetGame();
}

function addCustomWords() {
  const words = normalizeWords(document.getElementById("customWords").value);
  words.forEach(w => dictionary.add(w));
  history.unshift({
    player: "System",
    text: `added ${words.length} custom words`,
    detail: `Dictionary now has ${dictionary.size.toLocaleString()} words.`
  });
  history = history.slice(0, 10);
  updateUI();
}

document.getElementById("settingsToggle").addEventListener("click", () => {
  const settings = document.getElementById("settings");
  const span = document.querySelector("#settingsToggle span");
  settings.classList.toggle("hidden");
  span.textContent = settings.classList.contains("hidden") ? "+" : "−";
});

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
document.getElementById("applyBtn").addEventListener("click", applySettings);
document.getElementById("addWordsBtn").addEventListener("click", addCustomWords);

resetGame();
