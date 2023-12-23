import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../models/Job.js";
import { StatusCodes } from 'http-status-codes';
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from 'moment'

export const createJob = async (req, res) => {
    const { position, company } = req.body;
    if (!position || !company) {
        console.log('All fields are required!');
        throw new BadRequestError('All fields are required!');
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

export const getAllJobs = async (req, res) => {
    console.log(req.query);
    const { search, status, jobType, sort } = req.query;
    const queryObject = {
        createdBy: req.user.userId,
    }
    if (search) {
        // queryObject.position = req.query.search
        queryObject.$or = [
            { position: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } }
        ]
    }

    if (status && status !== 'all') queryObject.status = status;
    if (jobType && jobType !== 'all') queryObject.jobType = jobType;
    // position:req.query.search
    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        ascending: "position",
        descending: "-position",
        lastModified: "-updatedAt",
    }

    const sortKey = sortOptions[sort] || sortOptions.newest;
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);

    const totalJobs = await Job.countDocuments(queryObject)

    const numOfPages = Math.ceil(totalJobs / limit)

    // console.log(jobs);
    // res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
    res.status(StatusCodes.OK).json({ totalJobs, numOfPages, currentPage: page,  jobs });
}

export const updateJob = async (req, res) => {
    // res.send('update job');
    const { id: jobId } = req.params;
    const { company, position } = req.body;
    if (!company || !position) {
        throw new BadRequestError("All fields are required!");
    }

    const job = await Job.findOne({ _id: jobId });
    if (!job) {
        throw new NotFoundError('No job found!');
    }
    // check permissions
    // console.log(req.user.userId);
    // console.log(job.createdBy);

    checkPermissions(req.user, job.createdBy);
    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true
    })
    return res.status(StatusCodes.OK).json({ updatedJob })
}

export const deleteJob = async (req, res) => {
    // res.send('create job');
    const { id: jobId } = req.params;

    const job = await Job.findOne({ _id: jobId });
    // console.log(job);
    if (!job) {
        throw new NotFoundError('No job found with id: ', jobId);
    }

    checkPermissions(req.user, job.createdBy);

    try {
        await Job.deleteOne({ _id: jobId })
    } catch (error) {
        console.log(error);
    }

    res.status(StatusCodes.OK).json({ msg: 'Job removed successfully!' })

}

export const showStats = async (req, res) => {

    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        // console.log(acc, curr);
        return acc
    }, {})
    console.log(stats);
    const defaultStats = {
        // pending: 22,
        // interview: 12,
        // declined: 25
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 }
            },

        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 }
    ]);

    // console.log(monthlyApplications._id.year, 'year');
    // console.log(monthlyApplications._id.month, 'month');

    monthlyApplications = monthlyApplications.map(item => {
        const { _id: { year, month }, count } = item;

        const date = moment()
            .month(month - 1)
            .year(year)
            .format('MMM YYYY');

        // console.log(date);
        return { date, count }
    })
        .reverse();
    console.log(monthlyApplications);
    // let monthlyApplications = [
    //     {
    //         date: 'May 23',
    //         count: 12
    //     },
    //     {
    //         date: 'Jun 23',
    //         count: 15
    //     },
    //     {
    //         date: 'Jul 23',
    //         count: 14
    //     },
    // ]
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
}