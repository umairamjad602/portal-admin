import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@app/core/class/baseAPI.class';

@Injectable()
export class UserService {
  constructor(protected httpClient: HttpClient) {}
}
