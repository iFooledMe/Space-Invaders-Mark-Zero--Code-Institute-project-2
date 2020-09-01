# SPACE INVADERS MARK ZERO

<img src="images/../assets/images/spaceship_125.png">

## A CODE INSTITUTE STUDENT PROJECT

## Project #2 - User-Centric Frontend Development

<a href="https://ifooledme.github.io/SPACE-INVADERS-MARK-ZERO---Code-Institute-project-2/">
VIEW THE LATEST LIVE VERSION HERE
</a>
 
#### QUICKSTART
- In the main menu click "New game"
- Select a user-/screen name and klick "Start"
- In the game use UP- and DOWN-arrow to move your spaceship up and down to avoid the incoming meteorits.

<strong>PLEASE NOTE!</strong> This game is developed for desktops/laptops with the keyboard as game control, and for the latest versions of the most popular browsers (Google Chrome Version 83.0.4103.106, Microsoft Edge Version 83.0.478.54, Firefox version 77.0.1 and Opera Version 68.0.3618.173.
(I do not have access to a OS X computer so no testing has been done on the Safari browser).

<hr>

#### THIS IS AN EDUCATIONAL PROJECT

This is the second of four individual projects we are to make during the 3 months Full Stack Developer course at Code Institute. Beside HTML5 and CSS3 this project is restricted to use of Javascript.

Since this stage of the course is mostly about Javascript, my idea is to make a small game using the HTML5 canvas element. This approach assures that most focus falls on Javascript. I am not using anything other than ”Vanilla” javascript and JQuery (and of course HTML and css with Bootstrap framework).

As this Project is done as part of an educational program. I have without any regards for potential copyright infringements and such legal stuff, used and sometimes modified resources I found freely. Please don’t sue me! (All images, snippets of code and other resources, guides, videos, and inspiration used and sometimes modified in/for this project are listed in the Credits Section at the bottom of this document).

## THE GAME

The game I intend to build is my own interpretation of the very classical game ”Space Invaders” (<a href="https://en.wikipedia.org/wiki/Space_Invaders" target="_blank"> Created by Tomohiro Nishikado 1978</a>). By making yet another version of this game there is nothing new. My interpretation just happens to be;

### "THE SPACE INVADERS MARK-ZERO"

-   “M A R K” - Because this project aims to leave some kind of mark in the history of Space Invaders clones (Think; “Just another poorly made broken bronze ax found in an archeological dig site still has its pretty small Mark in the history of bronze axes”).
-   “Z E R O” - Because at the moment coming up with the name for the game the project's mark on the history of “Space Invader Clones” was pretty much Zero. And besides, it just sounds cool!

### GAME CONTENT - WHAT IS IT ABOUT?

The game is about a small spaceship fighting obstacles and possibly enemies in a complete 2d environment. While the classical ”Space Invader” had a bottom/up perspective, my version goes from the left side of the screen where the player spaceship can move up and down (on the vertical axis). From the right side of the screen obstacles and enemies are appearing and move towards the player. These obstacles appear in various random positions, directions, speed, size and appearance. The player has to avoid being struck by these enemy objects, or the game is over. The player can shoot at these enemies to destroy them. You can find more details about the game content in the “Game & Rules” section in the application (reachable from from the main menu).

## FEATURES

### PRELOAD OF RESOURCES

<img src="readme_img/features_1.jpg" alt="Preload page image">
All images used in the game are preloaded before opening the to the main menu (so that there is no risk of images not being loaded in the canvas). A preload page informs the user how many images are loaded out of the total to load.

<br>
<br>

### MAIN MENU

<img src="readme_img/features_2.jpg" alt="Main menu page image">
The main menu opens on top of the canvas as an absolute positioned element with a semi transparent background covering the complete screen.

<br>
<br>

### START A NEW GAME

<img src="readme_img/features_3.jpg" alt="New game page image">
When the user clicks on “New game” in the main menu, the player gets to choose a username for the game in a form. Clicking on “Start” starts a new game.

<br>
<br>

### THE GAME

<img src="readme_img/features_4.jpg" alt="The game page image">
The game is rendered in a html 5 canvas element in “2d” context calling “requestAnimationFrame” (a polyfill for browsers not supporting requestAnimationFrame is implemented but not fully tested).

<br>
<br>

#### CURRENT GAME FEATURES:

-   INCOMING ENEMY OBJECTS - Randomly created enemy objects move toward the player with various size, speed and location
-   PLAYER HEALTH POINTS - The player starts the game with a certain amount of health (for now set to 10). Each enemy hitting the player reduces the health points by a damage value calculated from speed and size of the enemy (larger and faster gives more damage).
-   PLAYER DESTRUCTION - If the players hit points reach 0, an explosion effect (for now a static image) triggers over the player spaceship, and over the enemy object causing the damage. This leads to “Game over” (see below).
-   SHOOTING BULLETS is done by pressing the “Space” key. A bullet hitting an enemy object reduces its hit points by a certain value (for now set to 1).
-   ENEMY DESTRUCTION - If the player's bullets hit an enemy object, a small explosion effect is triggered over the hit spot. If the enemy object's hit points reach 0, the object is destroyed and an explosion effect (for now a static image) triggers over the enemy.
-   ENERGY LEVEL - Each fired bullet from the player consumes a certain amount of energy (for now set to 1). The player has a certain amount of energy points at the start of each level. When the energy level reaches 0, there is not possible to fire any more bullets until an energy point has been recharged. Recharging of energy is done as soon as the energy level is less than the start amount. For now the Recharging of one energy point is set to 3 seconds.
-   LEVEL TIMER - is running in the information bar, informing the player of how long to stay alive until the next level.
-   CURRENT LEVEL - is updated on each new level.
-   GAME SCORE is updated on every frame.

<br>

### GAME OVER

<img src="readme_img/features_5.jpg" alt="Game Over page image">
When the players hit points reach 0, the “Game over” overlay gets visible and the game stops. The user can start a new game or return to the main menu.

<br>
<br>

### FINISHED LEVEL

<img src="readme_img/features_6.jpg" alt="Finished level page image">
When the level timer reaches 0, the “Finished Level” overlay gets visible with the total level game score shown, and the game stops. The user can start the next level or return to the main menu (At this release there are just one level in the game)

<br>
<br>

### IN GAME MENU / PAUSE

<img src="readme_img/features_7.jpg" alt="Finished level page image">
The player can reach the in game menu by pressing “Esc” key. The game pauses. From here the player can resume the game (by pressing “Esc” again or by pressing the "Resume" button, restart the game (from level 1) and get back to the main menu.
<br>
<br>
<img src="readme_img/features_8.jpg" alt="Finished level page image">
The player can also just pause the game by pressing the “P” key (Toggle back to continue the game with another press on “P” or “Esc” key).
<br>
<br>

## TECHNOLOGY AND DEPLOYMENT

### TECHNOLOGIES USED

-   HTML 5 (With use of the Canvas Element rendering in “2d” context)
-   CSS 3 (With Bootstrap 4.5.0 and Popper 16.0)
-   Javascript (With JQuery 3.5.1)
-   Google Fonts for the various text styles
-   GitHub for version control
-   GitHub Pages for publishing
-   Visual Studio Code 1.46.1 as IDE
-   GIMP 2.10.14 for image manipulation

### DEPLOYMENT

The application is hosted on GitHub Pages:
https://ifooledme.github.io/SPACE-INVADERS-MARK-ZERO---Code-Institute-project-2/

The public repository on GitHub:
https://github.com/iFooledMe/SPACE-INVADERS-MARK-ZERO---Code-Institute-project-2

#### GET A GITHUB REPOSITORY

The steps below require you to have a GitHub account where to push this project up to. If you don’t have one already, go here and follow the instructions for setting up a new account and install git bash locally on your computer locally in order to submit Git-commands in your terminal.

#### HOW TO RUN THIS PROJECT LOCALLY

If you wish to deploy this project of your own take the following steps to clone this project to your own working directory:

1. In this repository (as you’re reading this readme in it :-) on the top right click the green “Code” button.
2. Copy the given url by clicking on the copy icon (or open it up with GitHub Desktop if you have it installed)
3. In your local IDE open Git Bash (or whatever terminal you use to work with Git)
4. Change the current working directory to the location where you want the clone to be created
5. In the terminal type “git clone” and the paste the url you just copied
6. Press Enter. Your local clone will be created in the working directory you’re currently in
7. Find more details about this procedure <a href="https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository" target="_blank">here</a>

#### PUSH THE PROJECT UPON A GIT REPOSITORY

If you wish to deploy the project on GitGub pages, first take the following steps:

1. In Git Bash (or any other terminal where you issue Git commands), go to the root directory of the project you just cloned (above)
2. Then type “git init .”
3. Make some small changes to some file (for instance this readme file) in order to have something to commit and push to GitHub.
4. Then type command ‘ git add . ‘ to stage all files in the project for commit.
5. Then type command ‘ git commit -m “a message of you choosing” ‘
6. Then type command ‘ git push ‘ to push the project with all of it’s content to your git repository

#### DEPLOY THE PROJECT ON GITHUB PAGES

To deploy the project on GitHub Pages take the following steps:

1. In your repository on GitHub, go to settings.
1. Choose menu option “Manage Access” and make the repository public (You will need to type your GitHub password to access this area)
1. Then scroll down a bit to the section GitHub Pages, and in the dropdown menu for “source”, currently saying “none”, select the branch “master”, leave the second dropdown as it is (on /(root))
1. Now click the save button and the top of the section should now say: “Your site is ready to be published at (web address)”.
1. At this web address you find your newly deployed project (note it might take a couple of minutes before the deployment takes effect).

## TESTING

## USER STORIES

#### Minimum Viable product

-   “As a player I can add my username and start a new game”
-   “As a player I find it essential that there are some sort of playable narrative”
-   “As a player I find it essential that I can control my on screen avatar”
-   “As a player I must be able to lose the game”
-   “As a player I must be able to win the game”
-   “As a player I wish to some sort of high scores list” (locally cached)
-   “As a player I wish to get some more information about the game.”
-   “As a player I wish to get instructions on how to play.”

#### Possible Extensions 1

-   “As a player I would like to shoot at incoming objects making them disappear”
-   “As a player I wish to be able to Pause the game if I need to”
-   “As a player I expect some leveling to incrementally make it more challenging”
-   “As a player I expect the game to have some music and sound effects”

#### Possible Extensions 2

“As a Player would like some of the incoming enemy objects sometimes shoot back at me”
“As a player I’m bored! Please give me some upgrades and new game mechanics to play with”  
“As a player I would love some Game Story to make my journey a bit more meaningful”

## UX

Find complete UX-document <a href="https://docs.google.com/document/d/10LoTkbb2MxszL6pux7c2qsmfXaer6tYXAW2HK4vd0BU/edit?usp=sharing" target="_blank"> here</a>

## CREDITS

### CONTENT

### MEDIA

-   Bg-space-2460x1700.jpg - SOURCE: Wallpapersafari.com - https://img.wallpapersafari.com/tablet/2560/1700/19/51/a415uP.jpeg
-   spaceship2.[_100x50 to _1000x50].png - SOURCE: Wallpapersafari.com - https://cdn.wallpapersafari.com/11/9/bn9KIi.jpg
-   astroid1.[_20x20 to _400x400].png - SOURCE: Wallpapersafari.com - https://cdn.wallpapersafari.com/91/49/2uKRha.jpg

### AKNOWLEDGEMENTS

#### PRE-LOAD SOURCE CODE

loadImages() on top of main.js (I only made some small changes to this code to fit my purposes).
SOURCE: Derek Leung - http://jsfiddle.net/DerekL/uCQAH/
