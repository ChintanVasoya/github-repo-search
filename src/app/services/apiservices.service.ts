import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Repository } from '../repository';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
  getRepositoryDetails!: Repository;
  
  constructor(private http: HttpClient) { }

  getRepositoryResponse(githubUsername: string) {
    interface ApiRepositoryResponse {
      name:string;
      html_url:string;
      description:string;
      created_at:Date;
      language:string;
    }

    let repositoryPromise = new Promise<void>((resolve, reject) => {
      this.http
        .get<ApiRepositoryResponse>(
          environment.apiUrl +
            '/' +
            githubUsername +
            '/repos?sort=created&direction=asc?access_token=' +
            environment.apiKey
        )
        .toPromise()
        .then(
          (response:any) => {
            resolve(response);
          },
          (error) => {
            reject(error);
            console.log(error);
          }
        );
    });
    return repositoryPromise;
  }

  

}
