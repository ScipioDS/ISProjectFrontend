import { Component, OnInit } from '@angular/core';
import {QuizDataService} from '../../services/quiz-data-service';
import {NgForOf, NgIf} from '@angular/common';
import {QuizDataDTO} from '../../services/quiz-data-service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-quiz-component',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './quiz-component.html',
  styleUrl: './quiz-component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class QuizComponent implements OnInit {
  questions: QuizDataDTO[] = [];
  selectedAnswer: string | undefined;
  gameOver: boolean = false;
  displayScore: boolean = false;
  currentQuestionIndex: number = 0;
  score: number = 0;

  constructor(
    private QuizDataService: QuizDataService
  ){}

  ngOnInit() {
    this.QuizDataService.getMockQuizTest().subscribe({
      next: (data) => {
        this.questions = data;
      }
    });
  }

  selectAnswer(answer: string, isCorrect: boolean) {
    if (this.gameOver) return;
    this.selectedAnswer = answer;
    this.gameOver = true;
    if (isCorrect) {
      this.score += 10;
    } else {
      this.score -= 5;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = undefined;
      this.gameOver = false;
    } else {
      this.displayScore = true;
    }
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
}
