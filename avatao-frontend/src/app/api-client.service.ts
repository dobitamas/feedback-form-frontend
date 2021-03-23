import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface Platform_Feedback {
  input: string,
  score: number
}

interface Task_Feedback {
  structureReview: {input: string, score: number},
  confidenceReview: {input: string, score: number}
}


interface Platform_Review_Request {
  data:  {
    platform_ux:  {
      feedback: string,
      score: number 
    },
    url: string,
    is_support: boolean
  }
}

interface Task_Review_Request {
  data: {
    user_effort: {
      feedback: string,
      score: number
    },
    educational_value: {
      feedback: string,
      score: number
    },
    url: string,
    is_support: boolean
  },
  challenge_id: string
}


@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  baseUrl: string = "http://localhost:5000/feedbacks/";
  /*

    I would not store this JWT here, localstorage or cookie is a better option 
    
  */
  jwt: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSJ9.VzqrIt7rU5JEQzVsgk-hxGr56VphfQF9h5KnpOhyYvk";

  httpHeaders?: HttpHeaders = undefined;
  body?: Object = undefined;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  postNewPlatformReview(feedback: Platform_Feedback): Observable<any> {
    this.httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.jwt,
    })


    this.body = {
      "data": {
        "platform_ux": {
          "feedback": feedback.input,
          "score": feedback.score
        },
        "url": this.router.url,
      "is_support": false
      }
    } as Platform_Review_Request;

    return this.httpClient.post(this.baseUrl, this.body, { headers: this.httpHeaders } )
  }

  postNewTaskReview(feedback: Task_Feedback): Observable<any> {
    this.httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.jwt,
    })



    this.body  = {
      "data": {
        "user_effort": {
          "feedback": feedback?.structureReview.input,
          "score": feedback?.structureReview.score
        },
        "educational_value": {
          "feedback": feedback?.confidenceReview.input,
          "score": feedback?.confidenceReview.score
        },
        "url": this.router.url,
        "is_support": false
      },
      "challenge_id": "ca92d318-e0b5-4ec4-aff7-9d265d7e22bb"
    } as Task_Review_Request;

    return this.httpClient.post(this.baseUrl, this.body, { headers: this.httpHeaders })
  }
}
