import {Request, Response, NextFunction} from 'express';
import passport from 'passport';
import mongoose from 'mongoose';

import User from '../Models/user';

/**
 * 
 * Method to Create a new user
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function ProcessRegistration (req:Request, res: Response, next: NextFunction): void {
    // Instantiate a user object
    let newUser = new User ({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName +  " " + req.body.lastName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err instanceof mongoose.Error.ValidationError) {
            console.error("All fields are required");
            return res.status(400).json({success:false, msg: "Error: User not registered. All fields are required"});
        }
        if(err) {
            console.error("Error while inserting user");
            if(err.name == "UserExistsError") {
                console.error("Error: User already exists");
            }
            return res.status(400).json({success:false, msg: "Error: User not registered.", data: null});
        }
        return passport.authenticate('local')(req, res, () => {
            return res.json({success:true, msg: "User Authenticated Successfully", data: newUser});
        });
    });
}


/**
 * 
 * Method to login with a user
 * @param req 
 * @param res 
 * @param next 
 */
export function ProcessLogin (req:Request, res: Response, next: NextFunction): void {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        // Is there any server errors.
        if(err) {
            console.error(err);
            return res.status(400). json({success:false, msg: "Error: Server Error", data: null});
        }
        // If there are any Login Errors
        if(!user) {
            console.error("Login error: User Credential Error or User not found");
            return res.status(400). json({success:false, msg: "Error: Login Error", data: null});
        }
        req.login(user, (err) =>  {
            // if any database error
            if(err) {
                console.error(err);
                return res.status(400). json({success:false, msg: "Error: Database Error", data: null}); 
            }
            return res.status(200). json({success:true, msg: "User Logged in Successfully", data: user});
        });
    })(req, res, next);
}

/**
 * Method to logout user
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function ProcessLogout (req:Request, res: Response, next:NextFunction): void {
    req.logOut(() =>{
        console.log("User logged out successfully");
        return res.json({success:true, msg: "User Logged out Successfully", data: null});
    });
}