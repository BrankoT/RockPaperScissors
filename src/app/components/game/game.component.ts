import { Component, OnInit } from '@angular/core';
import { Choice } from '../../interface/choice';
import { Game } from '../../interface/game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameService]
})
export class GameComponent implements OnInit {

  newGame(): void {
    this.gameService.newGame();
  }
  restartGame(): void {
    this.gameService.restartGame();
  }
  closeModal(): void {
    this.gameService.closeModal();
  }
  chooseGame(option: string): void {
    this.gameService.chooseGame(option);
  }
  playGame(): void {
    this.gameService.playGame();
  }
  playComputerGame(): void {
    this.gameService.playComputerGame();
  }
  choice(choice): void {
    this.gameService.choice(choice);
  }
  gameChoicesResult(pick1: string, pick2: Choice): void {
    this.gameService.gameChoicesResult(pick1, pick2);
  }
  setLocalStorage(): void {
    this.gameService.setLocalStorage();
  }

  constructor(private gameService: GameService) {}

  ngOnInit() {
    const game: Game = JSON.parse(localStorage.getItem("game"));

    if(game) {
      this.gameService.gameStart = game.gameStart
      this.gameService.gameOption = game.gameOption
      this.gameService.playerName = game.playerName
      this.gameService.playerPick = game.playerPick
      this.gameService.computerPick = game.computerPick
      this.gameService.gameResult = game.gameResult
      this.gameService.playerResult = game.playerResult
      this.gameService.computerResult = game.computerResult
    }
  }

}
