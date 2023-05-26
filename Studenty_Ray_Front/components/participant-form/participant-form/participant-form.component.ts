import { Component, OnInit } from '@angular/core';
import { ParticipantService } from 'src/app/Services/Participant/participant.service';

import { faThumbsUp, faThumbsDown, faTrash, faComment, faPlusCircle, faClosedCaptioning, faSlash } from '@fortawesome/free-solid-svg-icons';
import { CommentaireService } from 'src/app/Services/Commentaire/commentaire.service';
import { Participant } from 'src/app/Models/participant';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/Services/User/alert.service';

@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.css']
})
export class ParticipantFormComponent implements OnInit {
  id: any;
  ListParticipants: any;
  titre: string;
  date: string;
  user: string;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faTrash = faTrash;
  faComment = faComment;
  nComment: any;
  nParticipants: any;
  hideformparticipant = true;
  participant: any = {};
  selectedFile: File = null;
  hideimage = true;
  hideform = false;
  showmsg = true;
  msg = '';
  closeResult: string;
  faAdd=faPlusCircle;
  style1: string;
  isOpened: boolean;
  toggleStyle: string;
  faClose=faSlash;
  category: String;
  location: String;

  constructor(
    private modalService: NgbModal,
    private participantservice: ParticipantService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private commentaireservice: CommentaireService
  ) { }

  ngOnInit(): void {

    this.getAllParticipants();
    this.hideSupp(this.id);
    this.hideFormParticipant();
  }

  toggle(){
    this.style1="flex";
    // this.style2="none";
    this.isOpened=true;
    this.toggleStyle="flex";

  }
  closeNote(){
    this.style1="none"
    this.isOpened=false;
  }
  openalert(contentalert) {
    this.modalService.open(contentalert, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getAllParticipants() {
    this.participantservice.getAllParticipants().subscribe(
      data => {
        this.ListParticipants = data;
        this.nParticipants = this.ListParticipants.length;
      },
      error => {
        // Handle the error appropriately
        console.error('Failed to fetch participants:', error);
      }
    );
  }

  setParticipantId(id: any) {
    sessionStorage.setItem("IdParticipant", id);
  }

  SearchParticipantByTitre() {
    if (this.titre != "") {
      this.ListParticipants = this.ListParticipants.filter(res => {
        return res.titre.toLowerCase().match(this.titre.toLowerCase());
      });
    }
    else if (this.titre == "") {
      this.getAllParticipants();
    }
  }

  SearchParticipantByDate() {
    if (this.date != "") {
      this.ListParticipants = this.ListParticipants.filter(res => {
        return res.date.toLowerCase().match(this.date.toLowerCase());
      });
    }
    else if (this.date == "") {
      this.getAllParticipants();
    }
  }

  deleteParticipant() {
    this.participantservice.deleteParticipant(sessionStorage.getItem("IdParticipant")).subscribe(
      data => {
        return data;
      }
    );
  }

  hideSupp(id: any) {
    if (id == localStorage.getItem("Id")) {
      return false
    } else {
      return true
    }
  }

  /*CountCommentaireByEventId(id: any) {
    return this.commentaireservice.countCommentaireByEventId(id).subscribe(
      data => {
        this.nComment = data;
        return this.nComment;
      }
    );
  }
*/
/*
  likeParticipant(id: any) {
    this.participantservice.likeParticipant(id).subscribe(
      data => {
        let hidelike = true;
        let hidedislike = false;
        return data;
      }
    )
  }

  dislikeEvent(id: any) {
    this.eventservice.disLikeEvent(id).subscribe(
      data => {
        let hidelike = false;
        let hidedislike = true;
        return data;
      }
    )
  }
*/
  hideFormParticipant() {
    if (localStorage.length != 0) {
      this.hideformparticipant = false;
    }
  }

  addParticipant(participant: Participant) {
    this.id = localStorage.getItem("Id")
    this.participantservice.addParticipant(participant, this.id).subscribe(
      data => {
        participant = data;
        this.hideform = true;
        this.hideimage = false;
        sessionStorage.setItem("IdParticipant", participant._id)
        return participant;
      }
    )
  }

  onFileSelected(participant) {
    this.selectedFile = <File>participant.target.files[0];
    console.log(this.selectedFile);
  }
/*
  addImage() {
    this.id = sessionStorage.getItem("IdEvent");
    const file = new FormData();
    file.append('image', this.selectedFile, this.selectedFile.name)
    console.log(file);
    this.participantservice.addImage(file, this.id).subscribe(
      data => {
        this.showmsg = false;
        this.msg = "Enjoy ! "
        return data;
      });
  }

}

*/
}