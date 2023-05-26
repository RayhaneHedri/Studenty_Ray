import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../Services/Event/event.service';
import { Event } from '../Models/Event';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  id: any;
  event: Event

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.getEventById();
    };
  

  getEventById() {
    this.id = sessionStorage.getItem("IdEvent")
    this.eventService.getEventById(this.id).subscribe(
      data => {
        this.event = data;
        return this.event;
      }
    )
  }
  
}




/*
import { Component, OnDestroy, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/User/user.service';
import { Event } from '../Models/Event';
import { EventService } from '../Services/Event/event.service';
import { faFlag, faMapMarker, faUniversity, faCalendar, faInfoCircle, faBrain, faObjectGroup, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  date = new Date().getUTCFullYear();
  nextYears = parseInt((this.date).toString()) + 1
  id: any = null;
  event: Event = null;
  nomInstitut = "Admin";
  faFlag = faFlag;
  faMapMarker = faMapMarker;
  faUniversity = faUniversity;
  faCalendar = faCalendar;
  faInfoCircle = faInfoCircle;
  faBrain = faBrain;
  faObjectGroup = faObjectGroup;
  faEnvelope = faEnvelope;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.findEventById();
  }
  findEventById() {
    this.id = localStorage.getItem("Id");
    this.eventService.findById(this.id).subscribe(data => {
      this.event = data;
      return this.event;
    })
  }
  
}
*/

