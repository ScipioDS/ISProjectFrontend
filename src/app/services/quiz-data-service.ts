import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import * as mockData from '../../../mock-data-testing/mockdata.json';
@Injectable({
  providedIn: 'root'
})
export class QuizDataService {
  constructor() {}

  // getMockQuiz(): Observable<QuizDataDTO[]> {
  //   return of(mockData).pipe(
  //     map((data) => {
  //       const questions = [];
  //       for (const key in data){
  //         questions.push(key)
  //       }
  //       return questions;
  //     })
  //   );
  // }
  getMockQuizTest(): Observable<QuizDataDTO[]> {
    return of((mockData as any).default).pipe(
      map((data) => {
        const questions = [];
        for (const item of data){
          questions.push(item);
        }
        return questions;
      })
    );
  }
}

export interface QuizDataDTO {
  question: string;
  answers: {answer: string, isCorrect: boolean}[];
}
