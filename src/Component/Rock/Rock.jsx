import React, { useState } from "react";

export default function Rock() {
  const [playerHand, setPlayerHand] = useState("✊");
  const [computerHand, setComputerHand] = useState("✊");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const choices = ["rock", "paper", "scissors"];

  const playGame = (playerChoice) => {
    if (gameOver) return;

    const computerChoice = getComputerChoice();
    const gameResult = determineWinner(playerChoice, computerChoice);

    // Update hands
    setPlayerHand(getHandEmoji(playerChoice));
    setComputerHand(getHandEmoji(computerChoice));

    // Update result and scores
    setTimeout(() => {
      setResult(gameResult.message);
      if (gameResult.winner === "player") {
        setPlayerScore((prev) => prev + 1);
      } else if (gameResult.winner === "computer") {
        setComputerScore((prev) => prev + 1);
      }

      // Check for game over
      if (playerScore + 1 >= 5 || computerScore + 1 >= 5) {
        setGameOver(true);
        setResult(`${gameResult.message} Game Over!`);
      }
    }, 500);
  };

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  const getHandEmoji = (choice) => {
    if (choice === "rock") return "✊";
    if (choice === "paper") return "✋";
    if (choice === "scissors") return "✌️";
    return "";
  };

  const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      return { winner: "tie", message: "It's a tie!" };
    }
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      return { winner: "player", message: "You win!" };
    }
    return { winner: "computer", message: "Computer wins!" };
  };

  const resetGame = () => {
    setPlayerHand("✊");
    setComputerHand("✊");
    setPlayerScore(0);
    setComputerScore(0);
    setResult("");
    setGameOver(false);
  };

  return (
    <div id="game-container">
      <h1>Rock, Paper, Scissors</h1>
      <div id="choices">
        <button className="choice" onClick={() => playGame("rock")}>
          ✊ Rock
        </button>
        <button className="choice" onClick={() => playGame("paper")}>
          ✋ Paper
        </button>
        <button className="choice" onClick={() => playGame("scissors")}>
          ✌️ Scissors
        </button>
      </div>
      <div id="hands-display">
        <div id="player-hand" className="hand-display">
          {playerHand}
        </div>
        <div id="computer-hand" className="hand-display">
          {computerHand}
        </div>
      </div>
      <div id="result">{result}</div>
      <div id="score">
        Player: <span id="player-score">{playerScore}</span> | Computer:{" "}
        <span id="computer-score">{computerScore}</span>
      </div>
      <button id="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}
