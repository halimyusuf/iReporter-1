import express from 'express';
import * as checkIncidentPost from '../middlewares/checkIncidentPost';
import * as redFlagController from '../controllers/redFlagController';
import * as interventionController from '../controllers/interventionController';

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
  redFlagController.getAllRedFlagRecords,
);

//  API route to get single Red-flag record
router.get(
  '/records/red-flags/:id',
  checkIncidentPost.validID,
  checkIncidentPost.findRedFlagRecord,
  redFlagController.getSingleRedFlagRecord,
);

//  API route to get single intervention record
router.get(
  '/records/interventions/:id',
  checkIncidentPost.validID,
  interventionController.getSingleInterventionRecord,
);

//  API route to get all intervention record
router.get(
  '/records/interventions',
  interventionController.getAllInterventionRecords,
);


// // POST Routes:
// API route to post a single Red-flag record
router.post(
  '/records/red-flags',
  checkIncidentPost.completeBody,
  redFlagController.postSingleRedFlagRecord,
);

// API route to sign up
router.post(
  '/auth/signup',
  signUp,
);

// API route to sign in
router.post(
  '/auth/signin',
  signIn,
);

// API route to post single intervention record
router.post(
  '/records/interventions',
  checkIncidentPost.completeBody,
  interventionController.postSingleInterventionRecord,
);

// // PATCH Routes:
// API route to update a single Red-flag record location
router.patch(
  '/records/red-flags/:id/location',
  checkIncidentPost.validID,
  checkIncidentPost.findRedFlagRecord,
  checkIncidentPost.checkLocation,
  redFlagController.patchRedFlagRecordLocation,
);

// API route to update a single intervention record location
router.patch(
  '/records/interventions/:id/location',
  checkIncidentPost.validID,
  checkIncidentPost.findInterventionRecord,
  checkIncidentPost.checkLocation,
  interventionController.patchInterventionRecordLocation,
);

// API route to update a single intervention record comment
router.patch(
  '/records/interventions/:id/comment',
  checkIncidentPost.validID,
  checkIncidentPost.findInterventionRecord,
  checkIncidentPost.checkComment,
  interventionController.patchInterventionRecordComment,
);

// API route to update a single Red-flag record comment
router.patch(
  '/records/red-flags/:id/comment',
  checkIncidentPost.validID,
  checkIncidentPost.findRedFlagRecord,
  checkIncidentPost.checkComment,
  redFlagController.patchRedFlagRecordComment,
);

// // PUT Routes
//  API route to update a single Red-flag record
router.put(
  '/records/red-flags/:id',
  checkIncidentPost.validID,
  checkIncidentPost.completeBody,
  redFlagController.putRedFlagRecord,
);

// // DELETE Routes
// API route to delete a single Red-flag record
router.delete(
  '/records/red-flags/:id',
  checkIncidentPost.validID,
  checkIncidentPost.findRedFlagRecord,
  redFlagController.deleteRedFlagRecord,
);

module.exports = router;
