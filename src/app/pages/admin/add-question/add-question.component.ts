import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { QuizService } from 'src/app/services/quiz.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

interface Quiz{
  qId:any;
}

interface Question{
  quiz:Quiz;
  content:string;
  option1:string;
  option2:string;
  option3:string;
  option4:string;
  answer:string;

}
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId: string | null = null;
  qTitle: string | null = null;
  question: Question = {
    quiz: {
      qId: null,
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'] as string;
    this.qTitle = this._route.snapshot.params['title'] as string;
    this.question.quiz.qId = this.qId;
  }

  onEditorChange(event: any) {
    this.question.content = event.editor.getData();
  }

  formSubmit() {
    if (
      !this.question.content?.trim() ||
      !this.question.option1?.trim() ||
      !this.question.option2?.trim() ||
      !this.question.answer?.trim()
    ) {
      return;
    }

    // Form submit
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question Added. Add Another one', 'success');
        this.resetForm();
      },
      (error) => {
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }

  resetForm() {
    this.question.content = '';
    this.question.option1 = '';
    this.question.option2 = '';
    this.question.option3 = '';
    this.question.option4 = '';
    this.question.answer = '';
  }
}
