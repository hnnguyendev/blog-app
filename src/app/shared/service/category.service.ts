import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENDPOINT, getEndpoint } from '@Core/config/endpoint.constants';
import { ICategory } from '@Shared/interface/category/ICategory';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);

  public getCategoryOptions(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(getEndpoint(ENDPOINT.CATEGORY.GET_CATEGORY_OPTIONS));
  }
}
