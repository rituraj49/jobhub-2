import express from 'express';
import { createJob, deleteJob, getAllJobs, showStats, updateJob } from '../controllers/jobsController.js';import { checkForTestUser } from "../middleware/auth.js";

const router = express.Router();

router.route('/').post(checkForTestUser, createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').delete(checkForTestUser, deleteJob).patch(checkForTestUser, updateJob);

export default router;
