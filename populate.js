import mongoose from "mongoose";
import { readFile } from 'fs/promises';
import dotenv from 'dotenv';
import User from "./models/User.js";
import Job from "./models/Job.js";
dotenv.config();

try {
    await mongoose.connect(process.env.MONGO_URL);
    const user = await User.findOne({email:'test@test.com'});
    const jobsData = JSON.parse(await readFile(new URL('./utils/mockData.json', import.meta.url)));

    console.log(user);
    const jobs = jobsData.map(job => {
        return {...job, createdBy: user._id}
    });

    await Job.deleteMany({createdBy: user._id});
    await Job.create(jobs);
    console.log('jobs created');
    process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
}