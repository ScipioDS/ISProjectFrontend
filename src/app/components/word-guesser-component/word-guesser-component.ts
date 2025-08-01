import {Component, HostListener, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {getLocaleEraNames, NgForOf} from '@angular/common';

@Component({
  selector: 'app-word-guesser-component',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './word-guesser-component.html',
  styleUrl: './word-guesser-component.css'
})
export class WordGuesserComponent implements OnInit {
  gameWon: boolean = false;
  gameOver: boolean = false;
  wordToGuess: string = 'TESTY';
  indexExternal: number = 0;
  indexInternal: number = 0;
  guesses: Array<Array<LetterDTO>> = [];

  constructor() {
    // Initialization logic can go here if needed
  }
  ngOnInit() {
    this.guesses = Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ letter: '', status: '' }))
    );
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Handle enter key
      const currentRow = this.guesses[this.indexExternal];
      if (this.indexInternal === currentRow.length) {
        // Move to the next row if the current row is complete
        this.indexExternal++;
        this.indexInternal = 0;
        for (let i = 0; i < currentRow.length; i++) {
          const letter = currentRow[i];

          if (letter.letter == this.wordToGuess[i]) {
            letter.status = 'correct';
          } else if (this.wordToGuess.includes(letter.letter)) {
            letter.status = 'present';
          } else {
            letter.status = 'absent';
          }
        }
        if (!(currentRow.some((letter) => letter.status === 'absent' || letter.status === 'present'))) {
          console.log("YOU WON")
          this.gameWon = true;
          this.gameOver = true;
        } else if (this.indexExternal >= this.guesses.length) {
          console.log("GAME OVER");
          this.gameWon = false;
          this.gameOver = true;
        }
      }
    }
    if (event.key === 'Backspace') {
      // Handle backspace
      const currentRow = this.guesses[this.indexExternal];
      const currentIndex = this.indexInternal;
      if (currentIndex > 0) {
        currentRow[currentIndex - 1].letter = '';
        this.indexInternal--;
      }
    }
    if (event.key.length === 1 && /^[a-zA-Z]$/.test(event.key)) {
      // Handle letter input
      const currentRow = this.guesses[this.indexExternal];
      const currentIndex = this.indexInternal;
      if (currentIndex < currentRow.length) {
        currentRow[currentIndex].letter = event.key.toUpperCase();
        this.indexInternal++;
      }
    }
  }
}

interface LetterDTO {
  letter: string;
  status: 'correct' | 'present' | 'absent' | '';
}
