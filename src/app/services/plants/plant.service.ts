import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlantModel} from '../../models/alert';


@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) {
  }

  getAllPlants(offset: number = 0, limit: number = 15 ): Observable<PlantModel[]> {

    return this.http.get<PlantModel[]>(environment.baseUrl,
      {params: {$limit: limit.toString(), $offset: offset.toString()}}
    );
  }

  getSearchPlants(searchQuery): Observable<PlantModel[]> {
    return this.http.get<PlantModel[]>(environment.baseUrl, {params: searchQuery});
  }
}
