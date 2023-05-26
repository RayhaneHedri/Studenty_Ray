const express = require("express");
const participantRouter = express.Router();
const Participant = require("../Models/ParticipantModel");
const User = require("../Models/UserModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images/Participant");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jfif" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("le fichier doit etre jpeg, jfif, jpg ou png"), null, false);
  }
};

const image = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
//http://localhost:9091/Participant/getAll
participantRouter.route("/getAll").get((req, res) => {
    Participant.find({masquer: false}, (err, participants) => {
    if (err) {
      console.log(err)
      res.status(400).json(err);
    } else {
      res.status(200).json(participants);
    }
  }).populate("user", "nom prenom profileImage").populate("commentaires");
});

//http://localhost:9091/Participant/addParticipant/id
participantRouter.route("/addParticipant/:idUser").post((req, res) => {
  User.findById(req.params.idUser ,(err,user)=>{
    const participant = new Participant({
      full_name: req.body.full_name,
      CIN: req.body.CIN,
      date_naissance : req.body.date_naissance,
      email: req.body.email,
      phone_num: req.body.phone_num,
      university: req.body.university,
      field: req.body.field,
      occupation: req.body.occupation,
      user: req.params.idUser,
      masquer: false
    });
    if(err){
      res.status(400).send({message:"Participant add failed"})
    } else {
      event.save();
      return res.status(200).send({message:"Participant add failed"})
    }
  })
});
/*
//http://localhost:9091/Event/ajouterEvent/idUser
eventRouter.route("/ajouterEvent/:idUser").post((req, res) => {
  User.findById(req.params.idUser ,(err,user)=>{
    const event = new Event({
      titre: req.body.titre,
      description: req.body.description,
      masquer: false,
      user: req.params.idUser,
    });
    if(err){
      res.status(400)
    } else {
      event.save();
      return res.status(200).json(event)
    }
  })
});
*/


//http://localhost:9091/Participant/update/idParticipant
participantRouter.route("/update/:idParticipant").put((req, res) => {
    Participant.findById(req.params.idParticipant, (err, event) => {
    if (participant) {
        participant.full_name = req.body.full_name,
        participant.CIN= req.body.CIN,
        participant.date_naissance = req.body.date_naissance,
        participant.email= req.body.email,
        participant.phone_num=req.body.phone_num,
        participant.university= req.body.university,
        participant.field=req.body.field,
        participant.occupation= req.body.occupation,
        participant.save()  ;
      res.status(200).send({message: "Participant updated"});
      if (err) {
        res.status(400).send({message: "update failed"});
    } else {
        participant = new Participant(req.body);
        participant.save();
      res.status(201);
    }
    res.json(participant);
  }
  });
});

//http://localhost:9091/Participant/getById/idParticipant
participantRouter.route("/getById/:idParticipant").get((req, res) => {
    Participant.findById(req.params.idParticipant, (err, participant) => {
    if (err) {
      res.status(401).json(err);
      console.log(err);
    } else {
      res.status(200).json(participant);
    }
  }).populate("user", "nom prenom profileImage");
});


//http://localhost:9091/Participant/getByUserId/idUser
participantRouter.route("/getByUserId/:idUser").get((req, res) => {
    Participant.find({user: req.params.idUser}, (err, participant) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(participant);
    }
  }).populate("user", "nom prenom image");
});

//http://localhost:9091/Participant/delete/idParticipant
participantRouter.route("/delete/:idParticipant").delete((req, res) => {
    Participant.findByIdAndDelete((req.params.idParticipant),(err, participant) => {
    if(err){
      res.status(400).json(err);
    } else {
      Commentaire.deleteMany({event: req.params.idEvent}, (errr, commentaire) => {
        if(errr) {
          res.status(400).json(errr)
        } else {
          res.status(200).json(participant);
        }
      });
    }
  });
});

//http://localhost:9091/Event/CountParticipantByIdUser/idUser
participantRouter.route("/CountParticipantByIdUser/:idUser").get((req, res) => {
    Participant.count({user: req.params.idUser},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});

//http://localhost:9091/Event/CountParticipant
participantRouter.route("/CountParticipant").get((req, res) => {
    Participant.count({},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});
/*
//http://localhost:9091/Participant/LikeParticipant/idParticipant
eventRouter.route("/LikeEvent/:idEvent").put((req, res) => {
  Event.findByIdAndUpdate(req.params.idEvent,{},{ new: true },(err, event) => {
    if(err){
      res.status(400) 
    } else {
      event.like = event.like + 1;
      event.save();
      res.status(200).json(event);
    }
  });
});
*/
/*
//http://localhost:9091/Event/LikeEvent/idEvent
eventRouter.route("/disLikeEvent/:idEvent").put((req, res) => {
  Event.findByIdAndUpdate(req.params.idEvent,{},{ new: true },(err, event) => {
    if(err){
      res.Status(400) 
    } else {
      event.like = event.like - 1;
      event.save();
      res.status(200).json(event);
    }
  });
});
*/
//http://localhost:9091/Participant/masquer/idParticipant
participantRouter.route("/masquer/:idParticipant").put((req, res) => {
    Participant.findByIdAndUpdate(req.params.idParticipant,{},{ new: true },(err, participant) => {
      if (!err) {
        participant.masquer = !event.masquer;
        participant.save();
        res.send(participant);
      } else {
        console.log("Error in User Update :" + JSON.stringify(err, undefined, 2));
      }
    }
  ).populate("user", "-__v");
});

module.exports = participantRouter;
