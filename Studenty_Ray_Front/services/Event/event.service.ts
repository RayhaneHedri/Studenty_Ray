import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  

  baseURL = "http://localhost:9091/Event"

  constructor(private eventhttp: HttpClient) { }

  getEventByUserId(id: any): Observable<any> {
    return this.eventhttp.get<any>(this.baseURL + "/getByUserId/" + id);
  }

  findById(id: number): Observable<any> {
    return this.eventhttp.get(this.baseURL + "/getById/" + id);
  }
  

  getAllEvents(): Observable<any> {
    return this.eventhttp.get(this.baseURL + "/getAll");
  }

  addEvent(event: any, id: any): Observable<any> {

    return this.eventhttp.post<any>(this.baseURL + "/addEvent/" + id, event);
  }

  ajouterEvent(event: any, id: any): Observable<any> {

    return this.eventhttp.post<any>(this.baseURL + "/ajouterEvent/" + id, event);
  }

  deleteEvent(id: any): Observable<any> {
    return this.eventhttp.delete(this.baseURL + "/delete/" + id);
  }

  getEventById(id: any): Observable<any> {
    return this.eventhttp.get<any>(this.baseURL + "/getById/" + id);
  }

  countEventByIdUser(id: any): Observable<any> {
    return this.eventhttp.get(this.baseURL + "/CountEventByIdUser/" + id);
  }

  countEvent(): Observable<any> {
    return this.eventhttp.get(this.baseURL + "/CountEvent");
  }

  likeEvent(id: any): Observable<any> {
    return this.eventhttp.put<any>(this.baseURL + "/LikeEvent/" + id, null);
  }
  disLikeEvent(id: any): Observable<any> {
    return this.eventhttp.put<any>(this.baseURL + "/disLikeEvent/" + id, null);
  }

  addImage(file: any, id: any): Observable<any> {
    return this.eventhttp.put<any>(this.baseURL + "/Image/" + id, file);
  }

  masquerEvent(id: any): Observable<any> {
    return this.eventhttp.put(this.baseURL + "/masquer/" + id, null);
  }

  updateEvent(id: any, event: any): Observable<any> {
    return this.eventhttp.put(this.baseURL + "/update/" + id, event);
  }

}

