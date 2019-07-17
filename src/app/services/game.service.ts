import { Injectable } from '@angular/core';
import { Choice } from '../interface/choice';
import { Game } from '../interface/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  modal: boolean = false;
  gameStart: boolean = false;
  playerPick: string = '';
  computerPick: string = '';
  playerResult: number = 0;
  computerResult: number = 0;
  gameResult: string = '';
  gameOption: string = '';
  playerName: string = '';
  inputError: boolean = false;
  choices: Choice[] = [
    {
      'name': 'rock',
      'strengths': ['scissors'],
      'weaknesses': ['paper'],
    },
    {
      'name': 'paper',
      'strengths': ['rock'],
      'weaknesses': ['scissors'],
    },
    {
      'name': 'scissors',
      'strengths': ['paper'],
      'weaknesses': ['rock'],
    }
  ]

  constructor() { }

  newGame(): void {
    this.modal = true;
  }

  restartGame(): void {
    this.gameStart = false;
    this.playerName = '';
    this.gameOption = '';
    this.playerPick = '';
    this.computerPick = '';
    this.playerResult = 0;
    this.computerResult = 0;
    this.gameResult = '';
    this.scoreBoard;

    localStorage.removeItem('game');
  }

  closeModal(): void {
    this.modal = false;
    this.gameOption = '';
  }

  chooseGame(option: string): void {
    if(option == 'computer') {
      this.playerName = 'Comp1'
      this.modal = false;
      this.gameStart = true;
    }
    this.gameOption = option;
    this.setLocalStorage();
  }

  playGame(): any {
    if(this.playerName.trim().length === 0) {
      return this.inputError = true;
    }

    this.inputError = false;
    this.modal = false;
    this.gameStart = true;
    this.setLocalStorage();
  }

  playComputerGame():void {
    const c1 = this.computerChoice();
    const c2 = this.computerChoice();

    this.playerPick = c1.name;
    this.computerPick = c2.name;

    this.gameChoicesResult(c1.name, c2);
    this.setLocalStorage();
  }

  choice(choice):void {
    const c = this.computerChoice();

    this.playerPick = choice;
    this.computerPick = c.name;

    this.gameChoicesResult(choice, c);
    this.setLocalStorage();
  }

  gameChoicesResult(pick1: string, pick2: Choice): void {
    if(pick1 === pick2.name) {
      this.gameResult = 'Tie'

    } else if (pick2.strengths.includes(pick1)) {
      this.computerResult++
      this.gameOption == 'player' ? this.gameResult = 'You lose' : this.gameResult = 'Comp2 wins'

    } else {
      this.playerResult++
      this.gameOption == 'player' ? this.gameResult = 'You win' : this.gameResult = 'Comp1 wins'
    }
  }

  setLocalStorage(): void {
    const game: Game = {
      'gameStart': this.gameStart,
      'gameOption': this.gameOption,
      'playerName': this.playerName,
      'playerPick': this.playerPick,
      'computerPick': this.computerPick,
      'gameResult': this.gameResult,
      'playerResult': this.playerResult,
      'computerResult': this.computerResult,
      'scoreBoard': this.scoreBoard()
    }

    localStorage.setItem('game', JSON.stringify(game));
  }

  computerChoice(): Choice {
    return this.choices[Math.floor(Math.random() * this.choices.length)]
  }

  scoreBoard(): number {
    if(this.gameStart) {
      return this.playerResult / (this.playerResult + this.computerResult) * 100
    }
    return 0;
  }
}
