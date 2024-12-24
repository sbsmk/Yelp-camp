const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const Review = require("../models/review");
const multer = require("multer");
//Cloudinary storage//
const { storage } = require("../cloudinary");
//Image uploading
const upload = multer({ storage });

const Campground = require("../models/campground");

router.route("/").get(catchAsync(campgrounds.index)).post(
  isLoggedIn,
  upload.array("image"),
  // validateCampground,
  catchAsync(campgrounds.createCampground)
);

//Creat New//
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    // validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

//Edit//
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
