import response from "../Helpers/ResponseBoilerPlateHelper.js";
import Diary from "../Models/DairyModel.js";
import User from "../Models/UserModel.js";
import { userIdChecker, pageIdChecker } from "../Helpers/MongoDocumentChecker.js"

// functions for diary creation

export async function createDiary(req, res) {
    try {
        const user = req.user;
        const { name, giveAccessTo, visibility } = req.body;
        if (!name || !visibility) {
            return response(res, "Name and Visibility mode are required", false);
        }
        const data = {
            name,
            visibility: visibility,
        }
        const ifTheDiaryAlreadyExists = await Diary.findOne({ name: name });

        if (ifTheDiaryAlreadyExists) {
            return response(res, "Name already exists ", false);
        }
        const newDiary = new Diary(data);
        await newDiary.save();

        await User.findByIdAndUpdate(
            user._id, { $push: { dairies: newDiary._id } }
        )

        if (giveAccessTo) {
            const doesGiveAccessToUserExists = giveAccessTo.filter(userId => userIdChecker(userId));
            await Diary.findByIdAndUpdate(
                newDiary._id,
                { $push: { giveAccessTo: { $each: doesGiveAccessToUserExists } } }
            );
            await User.findByIdAndUpdate(
                user._id,
                { $push: {accessTo: newDiary._id} });
        }

        return response(res, "New Diary Added", true, newDiary._id);

    } catch (error) {
        return response(res, "Api Error for creating new Diary", false);
    }
}

// function for updating diary

export async function updateDiary(req, res) {
    try {
        const {diaryId} = req.params.diaryId;
        const { name, pages, giveAccessTo, visibility } = req.body;

        if (diaryId) {
            if (name) {
                await Diary.findByIdAndUpdate(
                    diaryId,
                    {
                        name: name
                    }
                )
            }

            if (visibility) {
                await Diary.findByIdAndUpdate(
                    diaryId,
                    {
                        visibility: visibility
                    }
                )
            }

            if (pages) {
                const doesPagesExists = pages.filter(page => pageIdChecker(page));
                await Diary.findByIdAndUpdate(
                    diaryId,
                    { push: { pages: { $each: doesPagesExists } } }
                )
            }

            if (giveAccessTo) {
                const doesGiveAccessToUserExists = giveAccessTo.filter(userId => userIdChecker(userId));
                await Diary.findByIdAndUpdate(
                    diaryId,
                    { $push: { giveAccessTo: { $each: doesGiveAccessToUserExists } } }
                );
            }

            return response(res, "Diary Updated", true);

        } else {
            return response(res, "Unable to find the diary", false);
        }
    } catch (error) {
        return response(res, "Api Error for updating Diary", false);
    }
}

// Function for deleting diary

export async function deleteDiary(req, res) {
    try {
        const deleteDiary = await Diary.findByIdAndDelete(req.params.diaryId);
        if(deleteDiary){
            return response(res, "Diary Deleted", true);
        }else{
            return response(res, "Unable to find the diary", false);
        }
    } catch (error) {
        return response(res, "Api Error for deleting Diary", false);
    }
}