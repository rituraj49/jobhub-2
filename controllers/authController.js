import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import { promises as fs } from 'fs';
import cloudinary from 'cloudinary';

// export const register = async (req, res, next) => {
export const register = async (req, res) => {
    // try {
    const { name, email, password, lastName, location } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('please fill all fields!');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new BadRequestError(`user with email: '${email}' already exists`)
    }
    const user = await User.create({ name, email, password });

    const token = user.createJWT();
    // console.log(token, "tkn");
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location
        }, token, location: user.location
    });
    // } catch (error) {
    //     console.log(error);
    //     next(error);
    // }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log("pass", password);
    if (!email || !password) {
        throw new BadRequestError('please fill all fields!');
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials!');
    }
    // console.log(user);
    const isPasswordCorrect = await user.comparePassword(password);
    // console.log("compare", password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials!');
    }
    console.log(isPasswordCorrect);
    const token = user.createJWT();
    // user.password = undefined

    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

export const update = async (req, res) => {
    // console.log(req.user, 'update user ');
    console.log(req.file, 'image file');
    const { email, lastName, name, location } = req.body;
    let { avatar, avatarPublicId } = req.body;
    if (!email || !lastName || !name || !location) {
        throw new BadRequestError('Please fill all fields!');
    }
    try {
        if(req.file){
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        // const response = await cloudinary.v2.uploader.upload("https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg");
        console.log(response);
        await fs.unlink(req.file.path);
        avatar = response.secure_url;
        // avatar = response.url;
        avatarPublicId = response.public_id;
        }
    } catch (error) {
        console.log(error);
    }

    const user = await User.findOne({ _id: req.user.userId });
    user.email = email;
    user.lastName = lastName;
    user.name = name;
    user.location = location;
    user.avatar = avatar;
    user.avatarPublicId = avatarPublicId;

    // if(req.file && user.avatarPublicId){
    //     await cloudinary.v2.uploader.destroy(user.avatarPublicId)
    // }

    await user.save();
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}