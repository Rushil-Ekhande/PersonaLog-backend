import { personIdChecker } from "../Helpers/MongoDocumentChecker.js";
import response from "../Helpers/ResponseBoilerPlateHelper.js";
import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    console.log("ser controller");
    
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return response(res, "All fields are required", false);
        }
        else {
            const usernameExists = await User.findOne({ username });
            const emailExists = await User.findOne({ email });
            if (usernameExists || emailExists) {
                return response(res, "Username or Email Already Exists", false);
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const data = {
                    username,
                    email,
                    password: hashedPassword
                };
                const newUser = new User(data);
                await newUser.save();
                console.log("new yuser created");
                
                return response(res, "New User Account Created", true, newUser._id);
            }
        }
    } catch (error) {
        return response(res, "Unable to register a new user account", false);
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return response(res, "All fields are required", false);
        }
        else {
            const user = await User.findOne({ email });
            if (!user) {
                return response(res, "Unable to find user", false);
            }
            else {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return response(res, "Incorrect Password", false);
                } else {
                    const userData = {
                        _id: user._id,
                    }
                    jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                        if (err) {
                            console.log(err);
                        }
                        
                        return response(res, "User Logged in", true, {token, user});
                    });
                }
            }
        }
    } catch (error) {
        return response(res, "Unable to login to user account", false);
    }
}


export async function updateUser(req, res) {
    try {
        const user = req.user;
        const { username, password, people, dairies } = req.body;
        if (user) {
            if (username) {
                await User.findByIdAndUpdate(
                    user._id,
                    { username: username }
                )
            }
            
            if (password) {
                await User.findByIdAndUpdate(
                    user._id,
                    { password: password }
                )
            }

            if (people) {
                const doesPeopleIdExists = people.filter(personId => personIdChecker(personId));
                await User.findByIdAndUpdate(
                    user._id,
                    { $push: { people: { $each: doesPeopleIdExists } } }
                )
            }

            if (dairies) {
                const doesdairiesIdExists = dairies.filter(diaryId => diaryIdChecker(diaryId));
                await User.findByIdAndUpdate(
                    user._id,
                    { $push: { dairies: { $each: doesdairiesIdExists } } }
                )
            }

            return response(res, "Updated User", true);
        } else {
            return response(res, "Unable to find user", false);
        }
    } catch (error) {
        return response(res, "Unable to login to user account", false);
    }
}