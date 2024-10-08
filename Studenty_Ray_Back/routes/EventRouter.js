const express = require("express");
const eventRouter = express.Router();
const Event = require("../Models/EventModel");
const User = require("../Models/UserModel");
const Commentaire = require("../Models/CommentaireModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images/Event");
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
//http://localhost:9091/Event/getAll
eventRouter.route("/getAll").get((req, res) => {
  Event.find({masquer: false}, (err, events) => {
    if (err) {
      console.log(err)
      res.status(400).json(err);
    } else {
      res.status(200).json(events);
    }
  }).populate("user", "nom prenom profileImage").populate("commentaires");
});

//http://localhost:9091/Event/addEvent/id
eventRouter.route("/addEvent/:idUser").post((req, res) => {
  User.findById(req.params.idUser ,(err,user)=>{
    const event = new Event({
      titre: req.body.titre,
      description: req.body.description,
      date : req.body.date,
      category: req.body.category,
      user: req.params.idUser,
      masquer: false
    });
    if(err){
      res.status(400).send({message:"Event add failed"})
    } else {
      event.save();
      return res.status(200).send({message:"Event add failed"})
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
//http://localhost:9091/Event/Image/idEvent
eventRouter.route("/Image/:idEvent").put(image.single("image"), (req, res) => {
  event.findById(req.params.idEvent, (err, event) => {
    event.image = req.file.originalname;
    event.masquer = false;
    event.save();
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(event);
    }
  });
});

//http://localhost:9091/Event/update/idEvent
eventRouter.route("/update/:idEvent").put((req, res) => {
  Event.findById(req.params.idEvent, (err, event) => {
    if (event) {
      event.titre = req.body.titre,
      event.description = req.body.description,
      event.date = new Date().toLocaleDateString();
      event.save()  ;
      res.status(200).send({message: "Event updated"});
      if (err) {
        res.status(400).send({message: "update failed"});
    } else {
      event = new Event(req.body);
      event.save();
      res.status(201);
    }
    res.json(event);
  }
  });
});

//http://localhost:9091/event/getById/idEvent
eventRouter.route("/getById/:idEvent").get((req, res) => {
  Event.findById(req.params.idEvent, (err, event) => {
    if (err) {
      res.status(401).json(err);
      console.log(err);
    } else {
      res.status(200).json(event);
    }
  }).populate("user", "nom prenom profileImage");
});


//http://localhost:9091/event/getByUserId/idUser
eventRouter.route("/getByUserId/:idUser").get((req, res) => {
  Event.find({user: req.params.idUser}, (err, event) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(event);
    }
  }).populate("user", "nom prenom image");
});

//http://localhost:9091/event/delete/idEvent
eventRouter.route("/delete/:idEvent").delete((req, res) => {
  Event.findByIdAndDelete((req.params.idEvent),(err, event) => {
    if(err){
      res.status(400).json(err);
    } else {
      Commentaire.deleteMany({event: req.params.idEvent}, (errr, commentaire) => {
        if(errr) {
          res.status(400).json(errr)
        } else {
          res.status(200).json(event);
        }
      });
    }
  });
});

//http://localhost:9091/Event/CountEventByIdUser/idUser
eventRouter.route("/CountEventByIdUser/:idUser").get((req, res) => {
  Event.count({user: req.params.idUser},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});

//http://localhost:9091/Event/CountEvent
eventRouter.route("/CountEvent").get((req, res) => {
  Event.count({},(err, number) => {
        if(err){
            res.Status(400) 
        } else {
            return res.status(200).json(number);
        }
    });
});

//http://localhost:9091/Event/LikeEvent/idEvent
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

//http://localhost:9091/event/masquer/idEvent
eventRouter.route("/masquer/:idEvent").put((req, res) => {
  Event.findByIdAndUpdate(req.params.idEvent,{},{ new: true },(err, event) => {
      if (!err) {
        event.masquer = !event.masquer;
        event.save();
        res.send(event);
      } else {
        console.log("Error in User Update :" + JSON.stringify(err, undefined, 2));
      }
    }
  ).populate("user", "-__v");
});

module.exports = eventRouter;
