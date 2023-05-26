import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { EventService } from 'src/app/Services/Event/event.service';
import { CommentaireService } from 'src/app/Services/Commentaire/commentaire.service';
import { faHeart, faTrash, faComment, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import { Commentaire } from 'src/app/Models/Commentaire';
//hi
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  id: any;
  idUser = localStorage.getItem("Id");
  commentaire: any;
  event: any;
  category: String;
  location: String;
  user: any;
  reponse: any;
  nComment: number;
  faHeart = faHeart;
  faTrash = faTrash;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faThumbsDown = faThumbsDown;
  comment: any = {};
  listReponse: any;
  hideCommentform = true;

  hamClick: boolean

  hamburgerClick(){
    this.hamClick = !this.hamClick;
  }
  constructor(private eventservice: EventService,private renderer: Renderer2, private commentaireservice: CommentaireService, private router: Router, private userservice: UserService) { }

  ngOnInit(): void {
    this.getEventById();
    //this.getCommentaireByEventId();
    //this.CountCommentaireByEventId();
    this.findUserById(localStorage.getItem("Id"));
    this.hideSupp(this.id);
    this.hideCommentForm();
  }

  getEventById() {
    this.id = sessionStorage.getItem("IdEvent")
    this.eventservice.getEventById(this.id).subscribe(
      data => {
        this.event = data;
        return this.event;
      }
    )
  }
/*
  getCommentaireByEventId() {
    this.id = sessionStorage.getItem("IdEvent")
    this.commentaireservice.getCommentaireByEventId(this.id).subscribe(
      data => {
        this.commentaire = data;
        return this.commentaire;
      }
    )
  }
*/
  /*CountCommentaireByEventId() {
    this.id = sessionStorage.getItem("IdEvent");
    this.commentaireservice.countCommentaireByEventId(this.id).subscribe(
      data => {
        this.nComment = data;
        return this.nComment;
      }
    )
  }
  */
  @ViewChild('like') like: ElementRef;
  likeEvent() {
    const buttonLike = this.like.nativeElement.classList.contains('is-active');
    if(buttonLike) {
      this.renderer.removeClass(this.like.nativeElement, 'is-active');
    } else {
      this.renderer.addClass(this.like.nativeElement, 'is-active');
    }
    this.hamClick = !this.hamClick;
    this.id = sessionStorage.getItem("IdEvent");
    this.eventservice.likeEvent(this.id).subscribe(
      data => {
        return data;
      }
    )
  }

  dislikeBlog() {
    this.id = sessionStorage.getItem("IdEvent");
    this.eventservice.disLikeEvent(this.id).subscribe(
      data => {
        return data;
      }
    )
  }

  findUserById(id: any) {
    this.id = localStorage.getItem("Id");
    this.userservice.findById(this.id).subscribe(
      data => {
        this.user = data;
        return this.user;
      }
    )
  }

  addComment(comment: Commentaire) {
    this.id = sessionStorage.getItem("IdEvent");
    this.idUser = localStorage.getItem("Id")
    this.commentaireservice.addCommentaire(this.id, this.idUser, comment).subscribe(
      data => {
        comment = data;
        console.log(comment)
        return comment;
      }
    )
  }

  deleteCommentaire(id: any) {
    this.commentaireservice.deleteCommentaire(id).subscribe(
      data => {
        return data;
      }
    )
  }

  hideSupp(id: any) {
    if (id == localStorage.getItem("Id")) {
      return false
    } else {
      return true
    }
  }

  hideCommentForm() {
    if (localStorage.length > 2) {
      this.hideCommentform = false;
    }
  }
}
