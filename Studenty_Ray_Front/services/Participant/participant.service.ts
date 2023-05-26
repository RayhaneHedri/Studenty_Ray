import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ParticipantService {
  

  baseURL = "http://localhost:9091/Participant"

  constructor(private participanthttp: HttpClient) { }

  getParticipantByUserId(id: any): Observable<any> {
    return this.participanthttp.get<any>(this.baseURL + "/getByUserId/" + id);
  }

  findById(id: number): Observable<any> {
    return this.participanthttp.get(this.baseURL + "/getById/" + id);
  }
  

  getAllParticipants(): Observable<any> {
    return this.participanthttp.get(this.baseURL + "/getAll");
  }

  addParticipant(participant: any, id: any): Observable<any> {

    return this.participanthttp.post<any>(this.baseURL + "/addParticipant/" + id, participant);
  }

  ajouterParticipant(participant: any, id: any): Observable<any> {

    return this.participanthttp.post<any>(this.baseURL + "/ajouterParticipant/" + id, participant);
  }

  deleteParticipant(id: any): Observable<any> {
    return this.participanthttp.delete(this.baseURL + "/delete/" + id);
  }

  getParticipantById(id: any): Observable<any> {
    return this.participanthttp.get<any>(this.baseURL + "/getById/" + id);
  }

  countParticipantByIdUser(id: any): Observable<any> {
    return this.participanthttp.get(this.baseURL + "/CountParticipantByIdUser/" + id);
  }

  countEvent(): Observable<any> {
    return this.participanthttp.get(this.baseURL + "/CountParticipant");
  }
/*
  likeEvent(id: any): Observable<any> {
    return this.eventhttp.put<any>(this.baseURL + "/LikeEvent/" + id, null);
  }
  disLikeEvent(id: any): Observable<any> {
    return this.participanthttp.put<any>(this.baseURL + "/disLikeEvent/" + id, null);
  }

  addImage(file: any, id: any): Observable<any> {
    return this.participanthttp.put<any>(this.baseURL + "/Image/" + id, file);
  }
*/
  masquerEvent(id: any): Observable<any> {
    return this.participanthttp.put(this.baseURL + "/masquer/" + id, null);
  }

  updateEvent(id: any, event: any): Observable<any> {
    return this.participanthttp.put(this.baseURL + "/update/" + id, event);
  }

}

