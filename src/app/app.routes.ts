import { Routes } from '@angular/router';
import {QuizComponent} from './components/quiz-component/quiz-component';
import {HomePageComponent} from './components/home-page-component/home-page-component';
import {WordGuesserComponent} from './components/word-guesser-component/word-guesser-component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'quiz',
    component: QuizComponent,
    data: {
      title: 'Quiz'
    }
  },
  {
    path: 'word',
    component: WordGuesserComponent,
    data: {
      title: 'Word'
    }
  }
];
