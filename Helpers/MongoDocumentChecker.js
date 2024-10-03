import Diary from "../Models/DairyModel.js";
import Page from "../Models/PageModel.js";
import User from "../Models/UserModel.js";
import Person from "../Models/PersonModel.js"

export async function pageIdChecker(pageId) {
    const pageExists = await Page.findById(pageId);
    if (pageExists) {
        return true;
    } else {
        return false;
    }
}

export async function userIdChecker(userId) {
    const userExists = await User.findById(userId);
    if (userExists) {
        return true;
    } else {
        return false;
    }
}

export async function personIdChecker(personId) {
    const personExists = await Person.findById(personId);
    if (personExists) {
        return true;
    } else {
        return false;
    }
}

export async function diaryIdChecker(diaryId){
    const diaryExists = await Diary.findById(diaryId);
    if(diaryExists) {
        return true;
    } else {
        return false;
    }
}