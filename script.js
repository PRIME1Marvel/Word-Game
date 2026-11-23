const WORDS=`ACE ACT AGE AIR ANT APE ARC ARM ART ASH ASK ATE BAD BAG BAN BAR BAT BAY BED BEE BET BIG BIN BIT BOG BOX BOY BUG BUS BUY CAN CAP CAR CAT COW CUP CUT DAY DEN DOG DOT DRY EAR EAT EGG END EYE FAN FAR FAT FIG FIN FIT FIX FLY FOG FOX FUN GAME GRID WORD PLAY CODE TWO TOO TOY TRY TEA TIE TOE TOW WON ONE TEN SIX NIL YES NOON MOON SOON FOOD GOOD WOOD LOOK BOOK COOK TOOK TOOL COOL POOL DOOR FLOOR DOG GOD OLD GOLD COLD BOLD HOLD TOLD SOLD ROW NOW HOW WOW LOW COW OWL GOD GOLD GOOD HAT HEN HER HIT HOT HOW ICE INK JAM JET JOB JOY KEY KID KIT MAN MAP MAT MAY MIX NET NEW ONE OWL PAN PEN PET PIG PIN POT RUN SAD SAT SEA SEE SET SIT SKY SON SUN TAP TEA TEN TIN TOP ABLE BACK BALL BANK BATH BEAR BEAT BIRD BLUE BOAT BOOK CALL CARD CARE CASE CHAT CITY CLUB COME COOK COOL CORN COST DATA DATE DEAL DEEP DESK EACH EAST EASY FACE FACT FAIR FALL FARM FAST FEAR FEEL FILE FIND FIRE FISH FIVE FOOD FORM FOUR FREE GATE GIFT GIRL GIVE GOAL GROW HAND HARD HAVE HEAD HEAR HEAT HELP HERE HIGH HOME HOPE HOUR IDEA INTO JOIN JUMP KEEP KIND KING KNOW LAND LAST LATE LEAD LEFT LIFE LIKE LINE LIVE LONG LOOK LOVE MADE MAKE MANY MARK MEAN MEET MIND MORE MOST MOVE NAME NEAR NEED NEWS NEXT NICE OPEN OVER PAGE PAIN PAIR PARK PART PAST PLAN PLUS POST PULL PUSH RACE RAIN RATE READ REAL REST RICH RIDE RING RISE RISK ROAD ROCK ROLE ROOM RULE SAFE SALE SAME SAVE SEAT SEED SEEK SEEM SELL SEND SHIP SHOP SHOW SIDE SIGN SITE SIZE SLOW SNOW SOME SONG SOON SORT SOUL STAR STAY STEP STOP SURE TAKE TALK TEAM TELL TERM TEST TEXT THAN THAT THEM THEN THEY THIS TIME TOLD TOOL TOUR TOWN TREE TRIP TRUE TURN TYPE UNIT USER VERY VIEW VOTE WAIT WAKE WALK WALL WANT WARM WASH WAVE WAYS WEAR WEEK WELL WENT WERE WEST WHAT WHEN WIFE WILD WILL WIND WINE WISE WISH WITH WOOD WORK YARD YEAR YOUR ABOUT ABOVE ACTOR ADMIT AFTER AGAIN AGENT AGREE ALARM ALBUM ALERT ALIEN ALIVE ALLOW ALONE ALONG AMONG ANGER ANGLE APPLE APPLY ARENA ARGUE ASIDE AUDIO AWARD AWARE BASIC BEACH BEGIN BEING BELOW BIRTH BLACK BLAME BLIND BLOCK BLOOD BOARD BRAIN BRAND BREAD BREAK BRING BROAD BROWN BUILD CARRY CATCH CAUSE CHAIN CHAIR CHART CHASE CHECK CHEST CHIEF CHILD CLAIM CLASS CLEAN CLEAR CLICK CLOCK CLOSE COACH COAST COULD COUNT COURT COVER CRASH CREAM CRIME CROSS CROWD CYCLE DAILY DANCE DEATH DELAY DOING DOUBT DRAFT DRAMA DREAM DRESS DRINK DRIVE EARLY EARTH EIGHT EMPTY ENEMY ENJOY ENTER EQUAL ERROR EVENT EVERY EXACT EXIST EXTRA FAITH FALSE FAULT FIELD FIGHT FINAL FIRST FIXED FLASH FLOOR FOCUS FORCE FOUND FRAME FRESH FRONT FRUIT FUNNY GIANT GIVEN GLASS GLOBE GOING GRACE GRADE GRAND GRASS GREAT GREEN GROUP GUARD GUESS GUEST GUIDE HAPPY HEART HEAVY HORSE HOTEL HOUSE HUMAN IDEAL IMAGE INDEX INPUT ISSUE JOINT JUDGE KNOWN LABEL LARGE LATER LAUGH LAYER LEARN LEAST LEAVE LEGAL LEVEL LIGHT LIMIT LOCAL LOGIC LOWER LUCKY LUNCH MAGIC MAJOR MAKER MARCH MATCH MAYBE MAYOR MEANT MEDIA METAL MIGHT MINOR MODEL MONEY MONTH MORAL MOTOR MOUNT MOUSE MOUTH MOVIE MUSIC NEEDS NEVER NEWLY NIGHT NOISE NORTH NOVEL NURSE OCEAN OFFER OFTEN ORDER OTHER PAINT PANEL PAPER PARTY PEACE PHASE PHONE PHOTO PIECE PILOT PITCH PLACE PLAIN PLANE PLANT PLATE POINT POWER PRESS PRICE PRIDE PRIME PRINT PRIZE PROOF PROUD PROVE QUEEN QUICK QUIET QUITE RADIO RAISE RANGE RAPID RATIO REACH READY RIGHT RIVER ROUGH ROUND ROUTE ROYAL SCALE SCENE SCOPE SCORE SENSE SERVE SEVEN SHALL SHAPE SHARE SHARP SHEET SHELL SHIFT SHIRT SHOCK SHOOT SHORT SHOWN SIGHT SINCE SIXTH SKILL SLEEP SLIDE SMALL SMART SMILE SMOKE SOLID SOLVE SORRY SOUND SOUTH SPACE SPARE SPEAK SPEED SPEND SPLIT SPORT STAFF STAGE STAKE STAND START STATE STEAM STEEL STICK STILL STOCK STONE STORE STORM STORY STUDY STUFF STYLE SUGAR SUPER SWEET TABLE TAKEN TASTE TEACH TEETH THANK THEIR THEME THERE THESE THICK THING THINK THIRD THOSE THREE THROW TIGHT TIMES TIRED TITLE TODAY TOPIC TOTAL TOUCH TOUGH TOWER TRACK TRADE TRAIN TREAT TREND TRIAL TRIED TRUCK TRULY TRUST TRUTH TWICE UNDER UNION UNITY UNTIL UPPER UPSET URBAN USUAL VALID VALUE VIDEO VIRUS VISIT VITAL VOICE WASTE WATCH WATER WHEEL WHERE WHICH WHILE WHITE WHOLE WHOSE WOMAN WOMEN WORLD WORRY WORSE WORST WORTH WOULD WRITE WRONG YIELD YOUNG YOUTH`;

const DIRS=[[0,1],[1,0],[1,1],[1,-1]],LIMIT=30;
let rows=5,cols=5,minWord=3,grid=[],turn="A",timeLeft=LIMIT,scores={A:0,B:0},claimedWords=new Set(),lastWords=[],history=[],dictionary=new Set(WORDS.split(/\s+/)),gameStarted=false,timerId=null,selectedCell=null;
// modes: "local" (same device), "bot", "online" (host = A, guest = B)
let mode="local",me=null,isHost=false,botLevel="normal",botTimer=null,peer=null,conn=null,netNote="";
const $=id=>document.getElementById(id);

function makeGrid(){grid=Array.from({length:rows},()=>Array(cols).fill(""))}
function norm(t){return[...new Set(t.toUpperCase().split(/[^A-Z]+/).filter(w=>w.length>=3))]}
function full(){return grid.every(r=>r.every(Boolean))}

/* ---------- who is allowed to move ---------- */
function nameFor(p){return mode==="local"?`Player ${p}`:mode==="bot"?(p==="A"?"You":"Bot"):(p===me?"You":"Opponent")}
function labelFor(p){return mode==="local"?`Player ${p}`:`${nameFor(p)} (${p})`}
function canAct(){
  if(!gameStarted||full())return false;
  if(mode==="local")return true;
  if(mode==="bot")return turn==="A";
  return turn===me&&!!conn&&conn.open;
}

/* ---------- word scan (same rules as before: rows, columns, diagonals, forward) ---------- */
function scan(){
  const found=[],seen=new Set();
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)for(const[dr,dc]of DIRS){
    let text="",cells=[],rr=r,cc=c;
    while(rr>=0&&rr<rows&&cc>=0&&cc<cols&&grid[rr][cc]){
      text+=grid[rr][cc];cells.push([rr,cc]);
      if(text.length>=minWord&&dictionary.has(text)&&!claimedWords.has(text)&&!seen.has(text)){
        seen.add(text);found.push({word:text,cells:[...cells]});
      }
      rr+=dr;cc+=dc;
    }
  }
  return found;
}

/* ---------- drawing ---------- */
function draw(){
  const b=$("board");
  b.innerHTML="";
  b.style.gridTemplateColumns=`repeat(${cols},minmax(0,1fr))`;
  const hi=new Set(lastWords.flatMap(w=>w.cells.map(([r,c])=>r+","+c)));
  const act=canAct();
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    const cell=document.createElement("button");
    cell.type="button";cell.className="cell";
    cell.textContent=grid[r][c]||"";
    if(hi.has(r+","+c))cell.classList.add("highlight");
    if(selectedCell&&selectedCell.r===r&&selectedCell.c===c)cell.classList.add("selected");
    cell.disabled=!act||!!grid[r][c];
    if(cell.disabled)cell.classList.add("disabled");
    cell.onclick=()=>selectCell(r,c);
    b.appendChild(cell);
  }
}
function selectCell(r,c){
  if(!canAct()||grid[r][c])return;
  selectedCell={r,c};
  ui();
}
function statusText(){
  if(mode==="online"&&netNote)return netNote;
  if(!gameStarted)return mode==="online"&&!isHost?"Waiting for the host to start the game":"Press Start Game to begin";
  if(mode==="bot"&&turn==="B")return"Bot is thinking…";
  if(mode==="online"&&turn!==me)return"Opponent’s turn…";
  if(selectedCell)return`Cell (${selectedCell.r+1}, ${selectedCell.c+1}) selected. Type or tap a letter.`;
  return mode==="local"?`Player ${turn}: click any empty cell to lock it`:"Your turn: click any empty cell";
}
function ui(){
  $("scoreA").textContent=scores.A;$("scoreB").textContent=scores.B;
  $("nameA").textContent=labelFor("A");$("nameB").textContent=labelFor("B");
  $("turn").textContent=turn;
  $("timerText").textContent=gameStarted?`${timeLeft}s left`:"30s ready";
  $("timerBar").style.width=(timeLeft/LIMIT*100)+"%";
  $("boardSize").textContent=`${rows} × ${cols} board`;
  $("timerBox").classList.toggle("danger",gameStarted&&timeLeft<=5);
  $("status").textContent=statusText();
  $("completedWords").innerHTML=lastWords.length?lastWords.map(w=>`<span class="chip">+1 ${w.word}</span>`).join(""):"No new word on the latest move.";
  $("history").innerHTML=history.length?history.map(h=>`<div class="move"><strong>${h.p?nameFor(h.p):"System"}</strong>: ${h.text}<br><span>${h.detail}</span></div>`).join(""):"Start the game, then click any empty cell and type a letter.";
  const win=full()?(scores.A===scores.B?"Draw":scores.A>scores.B?"A":"B"):null;
  if(win){
    const w=$("winnerBox");w.classList.remove("hidden");
    const who=nameFor(win);
    w.textContent=win==="Draw"?`It is a draw! Final score: A ${scores.A} — B ${scores.B}`:`${who} ${who==="You"?"win":"wins"}! Final score: A ${scores.A} — B ${scores.B}`;
    stop();
  }else $("winnerBox").classList.add("hidden");
  const guest=mode==="online"&&!isHost;
  const noOpponent=mode==="online"&&isHost&&!(conn&&conn.open);
  $("startBtn").disabled=guest||noOpponent||gameStarted||full();
  $("resetBtn").disabled=guest;$("applyBtn").disabled=guest;
  document.body.classList.toggle("player-a-bg",turn==="A");
  document.body.classList.toggle("player-b-bg",turn==="B");
  draw();
  document.querySelectorAll("#pad button").forEach(b=>b.disabled=!selectedCell||!canAct());
}

/* ---------- timer & game flow ---------- */
function stop(){if(timerId)clearInterval(timerId);timerId=null}
function timer(){
  stop();
  timerId=setInterval(()=>{
    if(!gameStarted||full())return;
    timeLeft--;
    if(timeLeft<=0){
      history.unshift({p:turn,text:"time ran out",detail:"Turn skipped."});
      history=history.slice(0,10);selectedCell=null;
      turn=turn==="A"?"B":"A";timeLeft=LIMIT;
    }
    ui();sync();
  },1000);
}
function start(){if(gameStarted)return;gameStarted=true;timeLeft=LIMIT;timer();ui();sync()}

// One entry point for every move, from the keyboard, the letter pad or (online) the guest.
function submit(r,c,ch){
  if(!canAct()||grid[r][c]||!/^[a-zA-Z]$/.test(ch))return;
  ch=ch.toUpperCase();
  if(mode==="online"&&!isHost){selectedCell=null;conn.send({t:"move",r,c,ch});ui();return}
  place(r,c,ch);
}
function place(r,c,ch){
  selectedCell=null;grid[r][c]=ch;
  const nw=scan();lastWords=nw;
  if(nw.length){scores[turn]+=nw.length;nw.forEach(w=>claimedWords.add(w.word))}
  history.unshift({p:turn,text:`placed "${ch}" at (${r+1}, ${c+1})`,detail:nw.length?`Scored ${nw.length}: ${nw.map(w=>w.word).join(", ")}`:"No score — no new dictionary word found"});
  history=history.slice(0,10);
  turn=turn==="A"?"B":"A";timeLeft=LIMIT;
  ui();sync();
}
function reset(){
  stop();clearTimeout(botTimer);botTimer=null;selectedCell=null;
  makeGrid();turn="A";timeLeft=LIMIT;scores={A:0,B:0};claimedWords=new Set();lastWords=[];history=[];gameStarted=false;
  ui();sync();
}
function apply(){
  rows=Math.max(3,Math.min(9,Number($("rowsInput").value)||5));
  cols=Math.max(3,Math.min(9,Number($("colsInput").value)||5));
  minWord=Math.max(3,Math.min(8,Number($("minInput").value)||3));
  reset();
}
function addWords(){
  const words=norm($("customWords").value);
  words.forEach(w=>dictionary.add(w));
  $("dictionaryInfo").textContent=`Dictionary: ${dictionary.size.toLocaleString()} words loaded.`;
  history.unshift({p:null,text:`added ${words.length} custom words`,detail:`Dictionary now has ${dictionary.size.toLocaleString()} words.`});
  history=history.slice(0,10);ui();
}
function importFile(file){
  if(!file)return;
  const r=new FileReader();
  r.onload=e=>{
    const words=norm(String(e.target.result||""));
    words.forEach(w=>dictionary.add(w));
    $("dictionaryInfo").textContent=`Dictionary: loaded ${words.length.toLocaleString()} words from ${file.name}. Total ${dictionary.size.toLocaleString()} words. Example check: TWO = ${dictionary.has("TWO")?"found":"not found"}.`;
    history.unshift({p:null,text:"imported dictionary file",detail:`Loaded ${words.length.toLocaleString()} words from ${file.name}.`});
    history=history.slice(0,10);ui();
  };
  r.readAsText(file);
}

/* ---------- bot ---------- */
function botPick(){
  const empties=[];
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)if(!grid[r][c])empties.push([r,c]);
  if(!empties.length)return null;
  const L="ETAOINSRHLDCUMFPGWYBVKXJQZ".split("");
  const rnd=a=>a[Math.floor(Math.random()*a.length)];
  const randomMove=()=>{const[r,c]=rnd(empties);return{r,c,ch:rnd(L)}};
  if(botLevel==="easy"&&Math.random()<.6)return randomMove();
  const gain=(r,c,ch)=>{grid[r][c]=ch;const n=scan().length;grid[r][c]="";return n};
  let best=[],bestGain=0;
  for(const[r,c]of empties)for(const ch of L){
    const g=gain(r,c,ch);
    if(g>bestGain){bestGain=g;best=[{r,c,ch}]}else if(g===bestGain&&g>0)best.push({r,c,ch});
  }
  if(bestGain>0)return rnd(best);
  if(botLevel!=="hard"||empties.length<2)return randomMove();
  // Hard: no word available, so pick the move that leaves you the fewest scoring replies.
  let pick=randomMove(),pickThreat=Infinity;const t0=performance.now();
  while(performance.now()-t0<300){
    const m=randomMove();grid[m.r][m.c]=m.ch;
    let threat=0;
    for(const[r,c]of empties){
      if(r===m.r&&c===m.c)continue;
      for(const ch of L)threat=Math.max(threat,gain(r,c,ch));
      if(threat>=pickThreat)break;
    }
    grid[m.r][m.c]="";
    if(threat<pickThreat){pickThreat=threat;pick=m;if(!threat)break}
  }
  return pick;
}
function botSchedule(){
  if(mode!=="bot"||!gameStarted||full()||turn!=="B"||botTimer)return;
  botTimer=setTimeout(()=>{
    botTimer=null;
    if(mode!=="bot"||!gameStarted||full()||turn!=="B")return;
    const m=botPick();
    if(m)place(m.r,m.c,m.ch);
  },700+Math.random()*700);
}

/* ---------- online (PeerJS: browser-to-browser, no server of your own) ---------- */
const CODE_CHARS="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const genCode=()=>Array.from({length:5},()=>CODE_CHARS[Math.floor(Math.random()*CODE_CHARS.length)]).join("");
const netMsg=t=>{$("onlineMsg").textContent=t};
const snapshot=()=>({rows,cols,minWord,grid,turn,timeLeft,scores,claimed:[...claimedWords],lastWords,history,gameStarted});
function applySnapshot(s){
  rows=s.rows;cols=s.cols;minWord=s.minWord;grid=s.grid;turn=s.turn;timeLeft=s.timeLeft;scores=s.scores;
  claimedWords=new Set(s.claimed);lastWords=s.lastWords;history=s.history;gameStarted=s.gameStarted;
  if(selectedCell&&(!canAct()||grid[selectedCell.r]?.[selectedCell.c]))selectedCell=null;
  ui();
}
// Called after every change. The host pushes the full state to the guest; the bot reacts here too.
function sync(){
  if(mode==="online"&&isHost&&conn&&conn.open)conn.send({t:"state",s:snapshot()});
  botSchedule();
}
function cleanupOnline(){
  stop();clearTimeout(botTimer);botTimer=null;
  try{conn&&conn.close()}catch(e){}
  try{peer&&peer.destroy()}catch(e){}
  conn=peer=null;isHost=false;me=null;netNote="";
}
function failOnline(msg){cleanupOnline();mode="local";reset();netMsg(msg)}

function createRoom(attempt=0){
  if(typeof Peer==="undefined")return netMsg("Online play could not load. Check your internet connection.");
  cleanupOnline();
  const code=genCode();
  mode="online";isHost=true;me="A";
  reset();
  netNote=`Room ${code} is ready. Share the code and wait for your opponent…`;
  netMsg(`Room code: ${code}`);
  ui();
  peer=new Peer("wgd-"+code);
  peer.on("error",e=>{
    if(e.type==="unavailable-id"&&attempt<3)return createRoom(attempt+1);
    if(!(conn&&conn.open))failOnline(`Could not create the room (${e.type}). Try again.`);
  });
  peer.on("connection",c=>{
    if(conn&&conn.open){c.close();return}
    conn=c;
    c.on("open",()=>{netNote="";netMsg(`Room ${code}: opponent connected. Press Start Game.`);reset()});
    c.on("data",onGuestMessage);
    c.on("close",()=>{netNote="Your opponent left the game.";ui()});
  });
}
function onGuestMessage(m){
  if(!m||m.t!=="move")return;
  const{r,c,ch}=m;
  if(turn!=="B"||!gameStarted||full())return;
  if(!Number.isInteger(r)||!Number.isInteger(c)||r<0||c<0||r>=rows||c>=cols||grid[r][c]||typeof ch!=="string"||!/^[A-Za-z]$/.test(ch))return;
  place(r,c,ch.toUpperCase());
}
function joinRoom(){
  const code=$("joinCode").value.trim().toUpperCase();
  if(code.length!==5)return netMsg("Enter the 5-character room code.");
  if(typeof Peer==="undefined")return netMsg("Online play could not load. Check your internet connection.");
  cleanupOnline();
  mode="online";isHost=false;me="B";
  reset();
  netMsg("Connecting…");
  peer=new Peer();
  peer.on("error",e=>{
    if(conn&&conn.open)return;
    failOnline(e.type==="peer-unavailable"?"Room not found. Check the code and try again.":`Connection error (${e.type}).`);
  });
  peer.on("open",()=>{
    conn=peer.connect("wgd-"+code,{reliable:true});
    conn.on("open",()=>{netMsg(`Joined room ${code}. The host starts the game.`);ui()});
    conn.on("data",m=>{if(m&&m.t==="state")applySnapshot(m.s)});
    conn.on("close",()=>{netNote="The host left the game.";ui()});
  });
}

function setMode(m){
  $("botPanel").classList.toggle("hidden",m!=="bot");
  $("onlinePanel").classList.toggle("hidden",m!=="online");
  if(m==="online")return; // switches to online only once a room is created or joined
  cleanupOnline();mode=m;netMsg("");reset();
}

/* ---------- wiring ---------- */
document.addEventListener("keydown",e=>{
  if(["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName))return;
  if(!selectedCell)return;
  if(e.key==="Escape"){selectedCell=null;ui();return}
  if(/^[a-zA-Z]$/.test(e.key)&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
    e.preventDefault();submit(selectedCell.r,selectedCell.c,e.key);
  }
});
function buildPad(){
  const pad=$("pad");
  for(const ch of "ABCDEFGHIJKLMNOPQRSTUVWXYZ"){
    const b=document.createElement("button");
    b.type="button";b.textContent=ch;
    b.onclick=()=>{if(selectedCell)submit(selectedCell.r,selectedCell.c,ch)};
    pad.appendChild(b);
  }
}
$("settingsToggle").onclick=()=>{const s=$("settings"),sp=document.querySelector("#settingsToggle span");s.classList.toggle("hidden");sp.textContent=s.classList.contains("hidden")?"+":"−"};
$("startBtn").onclick=start;$("resetBtn").onclick=reset;$("applyBtn").onclick=apply;$("addWordsBtn").onclick=addWords;
$("dictionaryFile").onchange=e=>importFile(e.target.files[0]);
$("modeSelect").onchange=e=>setMode(e.target.value);
$("levelSelect").onchange=e=>{botLevel=e.target.value};
$("createRoomBtn").onclick=()=>createRoom();
$("joinBtn").onclick=joinRoom;
buildPad();reset();
