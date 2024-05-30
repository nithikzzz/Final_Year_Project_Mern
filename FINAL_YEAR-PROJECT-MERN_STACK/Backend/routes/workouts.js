const express = require('express');
const {
  createdata,
  getdatas,
  getdata,
  deleteWorkout,
  updateWorkout,
  searchBar,
  upWorkout,
  uplimit,
  credata,
  getdel
} = require('../controllers/workoutController');

const requireAuth = require('../middleware/requireAuth');
const upload = require('../controllers/workoutController').upload; //Import Multer middleware

const router = express.Router();

// Require auth for all workout routes
router.use(requireAuth);

// Search route
router.get('/search/:query', searchBar);

// POST a new workout with multiple image uploads
router.post('/', upload.array('files', 2), createdata);

// GET all workouts
router.get('/', getdatas);

// GET a single workout
router.get('/:id', getdata);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);

// update to add extra details
router.patch('/update/:id', upWorkout);

// update to add extra details
router.patch('/updatelimit/:id', uplimit);




module.exports = router;
