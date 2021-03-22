import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface Feedback {
  mood: string,
  input: string,
  score: number
}

interface PlatformReviewRequest {
  data:  {
    platform_ux:  {
      feedback: string,
      score: number 
    },
    url: string,
    is_support: boolean
  }
}


@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  baseUrl: string = "http://localhost:5000/feedbacks/";
  jwt: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSJ9.VzqrIt7rU5JEQzVsgk-hxGr56VphfQF9h5KnpOhyYvk";

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  postNewPlatformReview(feedback: Feedback): Observable<any> {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.jwt,
    })


    let body: PlatformReviewRequest = {
      "data": {
      "platform_ux": {
        "feedback": feedback.input,
        "score": feedback.score
      },
        "url": this.router.url,
      "is_support": true
    }
    }

    return this.httpClient.post(this.baseUrl, body, {headers: httpHeaders} )
  }
}
