# :spades::diamonds: Poker Hour :hearts::clubs:

Poker Hour is a one-player video poker game app. This game is built for complete beginners who want to get a hands-on practice on analyzing the best condition to win their poker cards hand. A score board is available for the player to compare the winning coin prizes.

# App Demo

![1](https://github.com/vivienphang/video-poker-game/assets/101629147/de89ec6b-76ca-4f4f-bb25-62671204e473)
![2](https://github.com/vivienphang/video-poker-game/assets/101629147/5fb9066a-ff6f-4b3b-8e08-be29dcef643a)
![3](https://github.com/vivienphang/video-poker-game/assets/101629147/9102e70f-fb5b-45a8-93eb-53f76bb8b120)
![4](https://github.com/vivienphang/video-poker-game/assets/101629147/b2dac8af-680e-4820-bfde-f74dca7eafdd)
![5](https://github.com/vivienphang/video-poker-game/assets/101629147/f3a530cf-f5fa-42d1-9622-893f15ecfd7a)


# Game Flow

**1. Initialise Game**

  Click here to play: https://vivienphang.github.io/video-poker-game/

**2. Start Bet**

  Player has the option to bet from 1 to 5 coins. Otherwise, bet of 1 coin is set by default.

**3. Deal 5 Cards**

  Click deal to start game. Start analzying the cards and strategize your winning condition.

**4. Select and swap the cards to discard**

  Select the cards that you want to swap and click the swap button to swap cards. The check for win conditions will be executed.

**5. Winning announcement**

  Player either win any one of the hand conditions or lose this round. They have the option to click deal button to replay or refresh page to restart game.
  
# Technologies Used

**Client-side**

<ul>
<li>JavaScript</li>
<li>HTML</li>
<li>CSS</li>
</ul>



# Learning Outcomes

The biggest outcome was to containerize the logic of the game flow into multiple game states, e.g: `initGame()`, `startGame()`, `swapCards()`, `checkWin()`, and `endGame()`. Additionally, the logic for `bet` and `coins` were relatively challenging for me as I wanted to manage the `coins` value dynamically when the player wins or loses the game every round.

I have also included in my repo `logic.txt` which has helped me throughout the building of the game logic whenever I am lost in between the lines of codes. Pseudo-coding the small details has helped me understand my logic written many days later. 

**_Project Schedule_**

| Week 1   | Week 2  | Week 3       |
| -------- | ------- | ----------   |
| Ideation | MVP     | Presentation |

# Getting Started

**1. Clone the repo**

  `git clone https://github.com/vivienphang/video-poker-game.git`

**2. Open with Live Server**

  `index.html`




