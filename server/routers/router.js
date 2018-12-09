import express from 'express';
import checkIncidentPost from '../middlewares/checkIncidentPost';
import {
  getAllRedFlagRecords,
  postSingleRedFlagRecord,
  getSingleRedFlagRecord,
  patchRedFlagRecordLocation,
  patchRedFlagRecordComment,
  deleteRedFlagRecord,
  putRedFlagRecord,
} from '../controllers/redFlagController';

import { signUp, signIn } from '../controllers/userController';

const router = express.Router();

/**
 * @file  This files routes the different
 * API calls to middlewares and controllers.
 * It also conatins the initial welcome message.
 * @param {object} req
 * @param {object} res
 */

// // Welcome
// const welcomeMessage = (req, res) => {
//   const welcome = 'Welcome to Andela Bootcamp iReporter Project API, you can view the documentation here: https://olajideireporter.docs.apiary.io/';
//   res.status(200).send({
//     status: 200,
//     data: welcome,
//   });
// };
//
// router.get('/', welcomeMessage);

// // GET Routes:
// API route to get all Red-flag records
router.get(
  '/records/red-flags',
  getAllRedFlagRecords,
);

//  API route to get single Red-flag record
router.get(
  '/records/red-flags/:id',
  checkIncidentPost.validID,
  checkIncidentPost.findRedFlagRecord,
  getSingleRedFlagRecord,
);


// // POST Routes:
// API route to post a single Red-flag record
router.post(
  '/records/red-flags',
  checkIncidentPost.completeBody,
  postSingleRedFlagRecord,
);

// API route to sign up
router.post(
  '/auth/signup',
  signUp,
);

router.post(
  '/auth/signin',
  signIn,
);


// // PATCH Routes:
// API route to update a single Red-flag record location
router.patch(
  '/records/red-flags/:id/location',
  checkIncidentPost.validID,
  checkIncidentPost.findRedFlagRecord,
  checkIncidentPost.checkLocation,
  patchRedFlagRecordLocation,
);

// API route to update a single Red-flag record comment
router.patch(
  '/records/red-flags/:id/comment',
  checkIncidentPost.validID,
  checkIncidentPost.findRedFlagRecord,
  checkIncidentPost.checkComment,
  patchRedFlagRecordComment,
);

// // PUT Routes
//  API route to update a single Red-flag record
router.put(
  '/records/red-flags/:id',
  checkIncidentPost.validID,
  checkIncidentPost.completeBody,
  putRedFlagRecord,
);

// // DELETE Routes
// API route to delete a single Red-flag record
router.delete(
  '/records/red-flags/:id',
  checkIncidentPost.validID,
  checkIncidentPost.findRedFlagRecord,
  deleteRedFlagRecord,
);

module.exports = router;
