import redFlagRecords from '../models/incidents';
import db from '../database/main';

/**
 * @file This is the middleware file for validating
 * API calls before passing to controllers.
 * @param {object} req
 * @param {object} res
 * @param {func} next
 *
 * @return {void}
 */

const completeBody = (req, res, next) => {
  let errorMessage;

  if (!req.body.createdBy) {
    errorMessage = {
      status: 400,
      error: 'Include creator\'s username as createdBy in body of request',
    };
  }

  if (!req.body.type) {
    errorMessage = {
      status: 400,
      error: 'Include record type as type in body of request',
    };
  }

  if (!req.body.dateOfIncident) {
    errorMessage = {
      status: 400,
      error: 'Include date of incident as dateOfIncident in body of request',
    };
  }

  if (!req.body.title) {
    errorMessage = {
      status: 400,
      error: 'Include short title as title in body of request',
    };
  }

  if (!req.body.comment) {
    errorMessage = {
      status: 400,
      error: 'Include narration of incident as comment in body of request',
    };
  }

  if (!req.body.images) {
    errorMessage = {
      status: 400,
      error: 'Specify image locations as images in body of request',
    };
  }

  if (!req.body.videos) {
    errorMessage = {
      status: 400,
      error: 'Specify video locations as videos in body of request',
    };
  }

  if (!req.body.location) {
    errorMessage = {
      status: 400,
      error: 'Specify location of incident as location in body of request',
    };
  }

  if (req.body.status) {
    if (req.body.createdBy !== 'admin') {
      errorMessage = {
        status: 403,
        error: 'Only admins can modify record status, please remove status from body of request',
      };
    }
  }

  if (errorMessage) return res.status(errorMessage.status).send(errorMessage);

  return next();
};

const validID = (req, res, next) => {
  //  Check that a valid record id is supplied
  const requestId = parseInt(req.params.id, 10);

  if (Number.isNaN(requestId)) {
    return res.status(400).send({
      status: 400,
      error: 'Include numeric ID of record in parameter',
    });
  }

  return next();
};

const findRedFlagRecord = (req, res, next) => {
  // Find RedFlagRecord
  const requestId = parseInt(req.params.id, 10);

  const recordFound = ([...redFlagRecords.keys()].includes(requestId)
    && redFlagRecords.get(requestId) !== null);

  if (!recordFound) {
    return res.status(404).send({
      status: 404,
      error: 'Record not found',
    });
  }
  return next();
};

async function findInterventionRecord(req, res, next) {
  // Find Intervention Record
  const requestId = parseInt(req.params.id, 10);

  const findInterventionRecordQuery = `SELECT * FROM incidents WHERE type = 'intervention' AND id=$1`;

  try {
    const { rows } = await db.query(findInterventionRecordQuery, [requestId]);
    if (!rows[0]) {
      return res.status(404).send({
        status: 404,
        error: 'Record not found',
      });
    }
  } catch (err) {
    return res.status(400).send(err);
  }

  return next();
}

const checkLocation = (req, res, next) => {
  let errorMessage;

  if (!req.body.location) {
    errorMessage = {
      status: 400,
      error: 'Include new location in body of request',
    };
  }

  if (errorMessage) return res.status(errorMessage.status).send(errorMessage);

  return next();
};

const checkComment = (req, res, next) => {
  let errorMessage;

  if (!req.body.comment) {
    errorMessage = {
      status: 400,
      error: 'Include new comment as comment in body of request',
    };
  }

  if (errorMessage) return res.status(errorMessage.status).send(errorMessage);

  return next();
};

export {
  completeBody,
  validID,
  findRedFlagRecord,
  findInterventionRecord,
  checkLocation,
  checkComment,
};
