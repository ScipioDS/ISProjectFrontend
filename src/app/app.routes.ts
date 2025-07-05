import { Routes } from '@angular/router';
import {QuizComponent} from './components/quiz-component/quiz-component';
import {HomePageComponent} from './components/home-page-component/home-page-component';

export const routes: Routes = [
  {
    path: 'quiz',
    component: QuizComponent,
    data: {
      title: 'Quiz'
    }
  },
  {
    path: '',
    component: HomePageComponent,
    data: {
      title: 'Home'
    }
  },
];
