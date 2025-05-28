import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENDPOINT, getEndpoint } from '@Core/config/endpoint.constants';
import { ITag } from '@Shared/interface/tag/ITag';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TagService {
  private readonly http = inject(HttpClient);

  public getTagOptions(): Observable<ITag[]> {
    return this.http.get<ITag[]>(getEndpoint(ENDPOINT.TAG.GET_TAG_OPTIONS));
  }
}
