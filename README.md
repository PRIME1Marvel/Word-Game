# Word-Game
Game Concept

Word Grid Duel is designed for two local players.

Player A and Player B take turns placing one alphabet letter into an empty grid cell. After every move, the game checks whether a valid word has been formed.

The player who completes a valid word gets the point.
<img width="776" height="848" alt="image" src="https://github.com/user-attachments/assets/ad720506-fdb5-496a-a92a-a2276519a33f" />


Features
Two-Player Gameplay
Player A and Player B take turns.
The active player is shown clearly on the screen.
Background color changes based on the current player.
Scores are tracked separately for both players.
Custom Grid Size

The board size can be changed before or during setup.

Supported grid size:

Minimum: 3 × 3
Maximum: 9 × 9

Default board:

5 × 5
Word Detection

The game checks for valid words in straight lines:

Left to right
Top to bottom
Diagonal

When a word is found in the dictionary, the player who placed the final letter gets a point.

Dictionary Support

The game includes a built-in starter dictionary.

You can also import your own dictionary file.

Supported dictionary format:

.txt

Recommended format:

ONE
TWO
THREE
GAME
WORD
PLAYER

One word per line works best.

The game automatically:

Converts words to uppercase
Removes invalid characters
Filters usable words
Adds imported words to the active dictionary
Custom Words

Players can manually add extra words using the custom word input box.

Example:

REACT, CODE, INDIA, GRID

These words are added to the active dictionary immediately.

No Repeated Word Scoring

Each valid word can score only once per game.

For example, if TWO is formed once and already scored, forming TWO again later will not give another point.

30-Second Turn Timer

Each player gets 30 seconds per turn.

If a player does not place a letter before the timer ends:

Their turn is skipped
The next player gets the turn
The timer resets to 30 seconds

The timer starts only after the Start Game button is clicked.

Cell Locking

Players click an empty cell to select it.

After selecting a cell:

The cell is locked for the current player
The player presses one alphabet key
The letter is placed into that cell
The cell becomes permanently locked
The turn changes automatically
Move History

The game records recent moves, including:

Which player moved
Which letter was placed
The cell position
Whether the move scored a word
Timeout events
Responsive UI

The game is designed to work on:

Desktop
Laptop
Tablet
Mobile browser
Tech Stack

This project uses only frontend web technologies:

Technology	Purpose
HTML	Page structure
CSS	Styling, layout, responsive design
JavaScript	Game logic, scoring, timer, dictionary import
GitHub Pages	Hosting and deployment

No backend server is required.

Project Structure
word-grid-duel/
│
├── index.html
├── style.css
├── script.js
└── README.md
index.html

Contains the main structure of the game page.

style.css

Contains all visual styling, including:

Layout
Player themes
Score cards
Board design
Timer bar
Responsive design
script.js

Contains the full game logic:

Board creation
Turn handling
Timer
Word scanning
Dictionary import
Score calculation
Move history
Reset and setup controls
How to Play
Open the game.
Click Start Game.
Player A selects an empty cell.
Player A presses one alphabet key.
The letter is placed.
The game checks for valid words.
If a word is completed, Player A scores.
Turn changes to Player B.
Continue until the board is full.
The player with the highest score wins.
Scoring Rules

A player earns points when a valid dictionary word is completed.

Example:

T W O

If TWO exists in the dictionary, the player who placed the completing letter earns 1 point.

Rules:

Words must exist in the active dictionary.
Words must meet the minimum word length.
Each word scores only once per game.
Reverse words are not counted by default.
Words can be horizontal, vertical, or diagonal.
Timer Rules

Each turn has a 30-second limit.

If the timer reaches zero:

Current player's turn is skipped.

Then:

Next player gets 30 seconds.
Dictionary File Format

You can import a .txt dictionary file.

Best format:

APPLE
BALL
CAT
DOG
GAME
GRID
WORD

The game also supports files where words are separated by spaces, commas, or new lines.

Example:

APPLE, BALL, CAT, DOG
Deployment on GitHub Pages

This project can be deployed directly using GitHub Pages.

Steps
Create a GitHub repository.
Upload these files:
index.html
style.css
script.js
README.md
Go to repository Settings.
Open Pages.
Under Build and deployment, select:
Source: Deploy from a branch
Branch: main
Folder: / root
Click Save.
Wait 1–2 minutes.
Open your GitHub Pages URL.

Example:

https://your-username.github.io/your-repository-name/
Future Improvements

Possible future upgrades:

Online multiplayer mode
Room code system
Firebase or Supabase integration
AI opponent
Sound effects
Word animation effects
Better dictionary API support
Leaderboard
Player names
Dark mode
Difficulty levels
Reverse-word detection option
More word directions
Game saving and replay system
Known Limitations
The current version is local two-player only.
Online multiplayer requires a backend or realtime database.
Dictionary accuracy depends on the imported word list.
Oxford Dictionary cannot be bundled directly because it is proprietary.
GitHub Pages only supports static frontend hosting.
License

This project is open for learning, personal use, and improvement.

If you use an external dictionary file, make sure the dictionary source allows reuse.

Author

Created by PRIME1Marvel

GitHub:

https://github.com/PRIME1Marvel
Project Status

Current status:

Playable browser game

Main features completed:

Two-player local gameplay
Custom grid
Timer
Dictionary import
Custom words
Word scoring
Move history
GitHub Pages deployment
