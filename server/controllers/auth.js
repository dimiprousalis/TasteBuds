import express from 'express';
import jwt from 'jsonwebtoken';
import brcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';



/*--------------------REGISTER---------------------- */
export const signup = async (req, res) => {
    const { email, username, password } = req.body;

    const user = await UserModel.findOne({ $or: [{ email }, { username }] });
    

    // If user exists return a message
    if (user) {
        return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the passowrd
    const hashedPassword = await brcrypt.hash(password, 10)

    const newUser = new UserModel({ email, username, password: hashedPassword });

    await newUser.save()
    res.json({ message: "User Registered Successfully" });
};

/*-----------------------LOGIN------------------------ */
export const login = async (req, res) => {
    const { email, username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: "user doesn't exist" });
    }

    const isPasswordValid = await brcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.json({ message: "Username of Password is Incorrect" })
    }

    // Generate a JSON Web Token (JWT) with the user's ID as the payload and a secret key
    const token = jwt.sign({ id: user._id }, "secret");

    // Send the JWT and the user ID back to the client
    res.json({ token, userID: user._id })
};

