import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  public getQuestionsOfQuiz(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question: { quiz: { qId: null; }; content: string; option1: string; option2: string; option3: string; option4: string; answer: string; }) {
    return this._http.post(`${baseUrl}/question/`, question);
  }
  //delete question
  public deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //eval quiz
  public evalQuiz(questions: any) {
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions);
  }
}
