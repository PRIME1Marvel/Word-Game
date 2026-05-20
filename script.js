const WORDS=`ACE ACT AGE AIR ANT APE ARC ARM ART ASH ASK ATE BAD BAG BAN BAR BAT BAY BED BEE BET BIG BIN BIT BOG BOX BOY BUG BUS BUY CAN CAP CAR CAT COW CUP CUT DAY DEN DOG DOT DRY EAR EAT EGG END EYE FAN FAR FAT FIG FIN FIT FIX FLY FOG FOX FUN GAME GRID WORD PLAY CODE TWO TOO TOY TRY TEA TIE TOE TOW WON ONE TEN SIX NIL YES NOON MOON SOON FOOD GOOD WOOD LOOK BOOK COOK TOOK TOOL COOL POOL DOOR FLOOR DOG GOD OLD GOLD COLD BOLD HOLD TOLD SOLD ROW NOW HOW WOW LOW COW OWL GOD GOLD GOOD HAT HEN HER HIT HOT HOW ICE INK JAM JET JOB JOY KEY KID KIT MAN MAP MAT MAY MIX NET NEW ONE OWL PAN PEN PET PIG PIN POT RUN SAD SAT SEA SEE SET SIT SKY SON SUN TAP TEA TEN TIN TOP ABLE BACK BALL BANK BATH BEAR BEAT BIRD BLUE BOAT BOOK CALL CARD CARE CASE CHAT CITY CLUB COME COOK COOL CORN COST DATA DATE DEAL DEEP DESK EACH EAST EASY FACE FACT FAIR FALL FARM FAST FEAR FEEL FILE FIND FIRE FISH FIVE FOOD FORM FOUR FREE GATE GIFT GIRL GIVE GOAL GROW HAND HARD HAVE HEAD HEAR HEAT HELP HERE HIGH HOME HOPE HOUR IDEA INTO JOIN JUMP KEEP KIND KING KNOW LAND LAST LATE LEAD LEFT LIFE LIKE LINE LIVE LONG LOOK LOVE MADE MAKE MANY MARK MEAN MEET MIND MORE MOST MOVE NAME NEAR NEED NEWS NEXT NICE OPEN OVER PAGE PAIN PAIR PARK PART PAST PLAN PLUS POST PULL PUSH RACE RAIN RATE READ REAL REST RICH RIDE RING RISE RISK ROAD ROCK ROLE ROOM RULE SAFE SALE SAME SAVE SEAT SEED SEEK SEEM SELL SEND SHIP SHOP SHOW SIDE SIGN SITE SIZE SLOW SNOW SOME SONG SOON SORT SOUL STAR STAY STEP STOP SURE TAKE TALK TEAM TELL TERM TEST TEXT THAN THAT THEM THEN THEY THIS TIME TOLD TOOL TOUR TOWN TREE TRIP TRUE TURN TYPE UNIT USER VERY VIEW VOTE WAIT WAKE WALK WALL WANT WARM WASH WAVE WAYS WEAR WEEK WELL WENT WERE WEST WHAT WHEN WIFE WILD WILL WIND WINE WISE WISH WITH WOOD WORK YARD YEAR YOUR ABOUT ABOVE ACTOR ADMIT AFTER AGAIN AGENT AGREE ALARM ALBUM ALERT ALIEN ALIVE ALLOW ALONE ALONG AMONG ANGER ANGLE APPLE APPLY ARENA ARGUE ASIDE AUDIO AWARD AWARE BASIC BEACH BEGIN BEING BELOW BIRTH BLACK BLAME BLIND BLOCK BLOOD BOARD BRAIN BRAND BREAD BREAK BRING BROAD BROWN BUILD CARRY CATCH CAUSE CHAIN CHAIR CHART CHASE CHECK CHEST CHIEF CHILD CLAIM CLASS CLEAN CLEAR CLICK CLOCK CLOSE COACH COAST COULD COUNT COURT COVER CRASH CREAM CRIME CROSS CROWD CYCLE DAILY DANCE DEATH DELAY DOING DOUBT DRAFT DRAMA DREAM DRESS DRINK DRIVE EARLY EARTH EIGHT EMPTY ENEMY ENJOY ENTER EQUAL ERROR EVENT EVERY EXACT EXIST EXTRA FAITH FALSE FAULT FIELD FIGHT FINAL FIRST FIXED FLASH FLOOR FOCUS FORCE FOUND FRAME FRESH FRONT FRUIT FUNNY GIANT GIVEN GLASS GLOBE GOING GRACE GRADE GRAND GRASS GREAT GREEN GROUP GUARD GUESS GUEST GUIDE HAPPY HEART HEAVY HORSE HOTEL HOUSE HUMAN IDEAL IMAGE INDEX INPUT ISSUE JOINT JUDGE KNOWN LABEL LARGE LATER LAUGH LAYER LEARN LEAST LEAVE LEGAL LEVEL LIGHT LIMIT LOCAL LOGIC LOWER LUCKY LUNCH MAGIC MAJOR MAKER MARCH MATCH MAYBE MAYOR MEANT MEDIA METAL MIGHT MINOR MODEL MONEY MONTH MORAL MOTOR MOUNT MOUSE MOUTH MOVIE MUSIC NEEDS NEVER NEWLY NIGHT NOISE NORTH NOVEL NURSE OCEAN OFFER OFTEN ORDER OTHER PAINT PANEL PAPER PARTY PEACE PHASE PHONE PHOTO PIECE PILOT PITCH PLACE PLAIN PLANE PLANT PLATE POINT POWER PRESS PRICE PRIDE PRIME PRINT PRIZE PROOF PROUD PROVE QUEEN QUICK QUIET QUITE RADIO RAISE RANGE RAPID RATIO REACH READY RIGHT RIVER ROUGH ROUND ROUTE ROYAL SCALE SCENE SCOPE SCORE SENSE SERVE SEVEN SHALL SHAPE SHARE SHARP SHEET SHELL SHIFT SHIRT SHOCK SHOOT SHORT SHOWN SIGHT SINCE SIXTH SKILL SLEEP SLIDE SMALL SMART SMILE SMOKE SOLID SOLVE SORRY SOUND SOUTH SPACE SPARE SPEAK SPEED SPEND SPLIT SPORT STAFF STAGE STAKE STAND START STATE STEAM STEEL STICK STILL STOCK STONE STORE STORM STORY STUDY STUFF STYLE SUGAR SUPER SWEET TABLE TAKEN TASTE TEACH TEETH THANK THEIR THEME THERE THESE THICK THING THINK THIRD THOSE THREE THROW TIGHT TIMES TIRED TITLE TODAY TOPIC TOTAL TOUCH TOUGH TOWER TRACK TRADE TRAIN TREAT TREND TRIAL TRIED TRUCK TRULY TRUST TRUTH TWICE UNDER UNION UNITY UNTIL UPPER UPSET URBAN USUAL VALID VALUE VIDEO VIRUS VISIT VITAL VOICE WASTE WATCH WATER WHEEL WHERE WHICH WHILE WHITE WHOLE WHOSE WOMAN WOMEN WORLD WORRY WORSE WORST WORTH WOULD WRITE WRONG YIELD YOUNG YOUTH`;
const DIRS=[[0,1],[1,0],[1,1],[1,-1]],LIMIT=30;
let rows=5,cols=5,minWord=3,grid=[],turn="A",timeLeft=LIMIT,scores={A:0,B:0},claimedWords=new Set(),lastWords=[],history=[],dictionary=new Set(WORDS.split(/\s+/)),gameStarted=false,timerId=null,selectedCell=null;
const $=id=>document.getElementById(id);
function makeGrid(){grid=Array.from({length:rows},()=>Array(cols).fill(""))}
function norm(t){return[...new Set(t.toUpperCase().split(/[^A-Z]+/).filter(w=>w.length>=3))]}
function full(){return grid.every(r=>r.every(Boolean))}
function scan(){
  let found=[];
  const cleanDictionary=new Set([...dictionary].map(w=>String(w).trim().toUpperCase()).filter(Boolean));

  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      for(const[dr,dc]of DIRS){
        let text="";
        let cells=[];
        let rr=r;
        let cc=c;

        while(rr>=0&&rr<rows&&cc>=0&&cc<cols&&grid[rr][cc]){
          text+=String(grid[rr][cc]).trim().toUpperCase();
          cells.push([rr,cc]);

          if(text.length>=minWord&&cleanDictionary.has(text)&&!claimedWords.has(text)){
            found.push({word:text,cells:[...cells]});
          }

          rr+=dr;
          cc+=dc;
        }
      }
    }
  }

  const unique=[];
  const seen=new Set();
  for(const item of found){
    if(!seen.has(item.word)){
      seen.add(item.word);
      unique.push(item);
    }
  }
  return unique;
}
function draw(){
  let b=$("board");
  b.innerHTML="";
  b.style.gridTemplateColumns=`repeat(${cols},minmax(0,1fr))`;
  let hi=new Set(lastWords.flatMap(w=>w.cells.map(([r,c])=>r+","+c)));

  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    let cell=document.createElement("button");
    cell.type="button";
    cell.className="cell";
    cell.textContent=grid[r][c]||"";
    cell.dataset.r=r;
    cell.dataset.c=c;

    if(hi.has(r+","+c))cell.classList.add("highlight");
    if(selectedCell&&selectedCell.r===r&&selectedCell.c===c)cell.classList.add("selected");

    cell.disabled=!gameStarted||!!grid[r][c]||full();
    if(cell.disabled)cell.classList.add("disabled");

    cell.onclick=()=>selectCell(r,c);
    b.appendChild(cell);
  }
}
function selectCell(r,c){
  if(!gameStarted||grid[r][c]||full())return;
  selectedCell={r,c};
  ui();
}

document.addEventListener("keydown",e=>{
  if(!gameStarted||!selectedCell)return;
  if(e.key==="Escape"){
    selectedCell=null;
    ui();
    return;
  }
  if(/^[a-zA-Z]$/.test(e.key)){
    e.preventDefault();
    place(selectedCell.r,selectedCell.c,e.key);
  }
});
function ui(){$("scoreA").textContent=scores.A;$("scoreB").textContent=scores.B;$("turn").textContent=turn;$("timerText").textContent=gameStarted?`${timeLeft}s left`:"30s ready";$("timerBar").style.width=(timeLeft/LIMIT*100)+"%";$("boardSize").textContent=`${rows} × ${cols} board`;$("timerBox").classList.toggle("danger",gameStarted&&timeLeft<=5);$("status").textContent=!gameStarted?"Press Start Game to begin":selectedCell?`Cell (${selectedCell.r+1}, ${selectedCell.c+1}) locked for Player ${turn}. Type one alphabet key.`:`Player ${turn}: click any empty cell to lock it`;$("completedWords").innerHTML=lastWords.length?lastWords.map(w=>`<span class="chip">+1 ${w.word}</span>`).join(""):"No new word on the latest move.";$("history").innerHTML=history.length?history.map(h=>`<div class="move"><strong>${h.player}</strong>: ${h.text}<br><span>${h.detail}</span></div>`).join(""):"Start the game, then click any empty cell and type a letter.";let win=full()?(scores.A===scores.B?"Draw":scores.A>scores.B?"Player A":"Player B"):null;if(win){$("winnerBox").classList.remove("hidden");$("winnerBox").textContent=win==="Draw"?`It is a draw! Final score: A ${scores.A} — B ${scores.B}`:`${win} wins! Final score: A ${scores.A} — B ${scores.B}`;stop()}else $("winnerBox").classList.add("hidden");$("startBtn").disabled=gameStarted||full();document.body.classList.toggle("player-a-bg",turn==="A");document.body.classList.toggle("player-b-bg",turn==="B");draw()}
function stop(){if(timerId)clearInterval(timerId);timerId=null}
function timer(){stop();timerId=setInterval(()=>{if(!gameStarted||full())return;timeLeft--;if(timeLeft<=0){history.unshift({player:`Player ${turn}`,text:"time ran out",detail:"Turn skipped."});history=history.slice(0,10);selectedCell=null;turn=turn==="A"?"B":"A";timeLeft=LIMIT}ui()},1000)}
function start(){if(gameStarted)return;gameStarted=true;timeLeft=LIMIT;timer();ui()}
function place(r,c,ch){selectedCell=null;grid[r][c]=ch;let nw=scan();lastWords=nw;if(nw.length){scores[turn]+=nw.length;nw.forEach(w=>claimedWords.add(w.word))}history.unshift({player:`Player ${turn}`,text:`placed "${ch}" at (${r+1}, ${c+1})`,detail:nw.length?`Scored ${nw.length}: ${nw.map(w=>w.word).join(", ")}`:"No score — no new dictionary word found"});history=history.slice(0,10);turn=turn==="A"?"B":"A";timeLeft=LIMIT;ui()}
function reset(){stop();selectedCell=null;makeGrid();turn="A";timeLeft=LIMIT;scores={A:0,B:0};claimedWords=new Set();lastWords=[];history=[];gameStarted=false;ui()}
function apply(){rows=Math.max(3,Math.min(9,Number($("rowsInput").value)||5));cols=Math.max(3,Math.min(9,Number($("colsInput").value)||5));minWord=Math.max(3,Math.min(8,Number($("minInput").value)||3));reset()}
function addWords(){let words=norm($("customWords").value);words.forEach(w=>dictionary.add(w));$("dictionaryInfo").textContent=`Dictionary: ${dictionary.size.toLocaleString()} words loaded.`;history.unshift({player:"System",text:`added ${words.length} custom words`,detail:`Dictionary now has ${dictionary.size.toLocaleString()} words.`});history=history.slice(0,10);ui()}
function importFile(file){if(!file)return;let r=new FileReader();r.onload=e=>{let words=norm(String(e.target.result||""));words.map(w=>w.toUpperCase().trim()).forEach(w=>dictionary.add(w));$("dictionaryInfo").textContent=`Dictionary: loaded ${words.length.toLocaleString()} words from ${file.name}. Total ${dictionary.size.toLocaleString()} words. Example check: TWO = ${dictionary.has("TWO") ? "found" : "not found"}.`;history.unshift({player:"System",text:"imported dictionary file",detail:`Loaded ${words.length.toLocaleString()} words from ${file.name}.`});history=history.slice(0,10);ui()};r.readAsText(file)}
$("settingsToggle").onclick=()=>{let s=$("settings"),sp=document.querySelector("#settingsToggle span");s.classList.toggle("hidden");sp.textContent=s.classList.contains("hidden")?"+":"−"};
$("startBtn").onclick=start;$("resetBtn").onclick=reset;$("applyBtn").onclick=apply;$("addWordsBtn").onclick=addWords;$("dictionaryFile").onchange=e=>importFile(e.target.files[0]);reset();