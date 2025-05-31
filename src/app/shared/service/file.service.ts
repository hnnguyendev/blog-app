import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINT, getEndpoint } from '@Core/config/endpoint.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
  private readonly http = inject(HttpClient);

  public uploadFile(file: FormData): Observable<any> {
    return this.http.post<any>(getEndpoint(ENDPOINT.FILE.UPLOAD_IMAGE), file);
  }
}
