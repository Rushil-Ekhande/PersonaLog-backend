import response from "../Helpers/ResponseBoilerPlateHelper.js";
import Diary from "../Models/DairyModel.js";
import Page from "../Models/PageModel.js";

export async function createPage(req, res) {
    try {
        const { title, description } = req.body;
        if (!title) {
            return response(res, "Title must be provided", false);
        };

        if (!description) {
            return response(res, "Description must be provided", false);
        };

        const data = {
            title,
            description
        };

        const newPage = new Page(data);
        await newPage.save();

        return response(res, "Created new Page", true, newPage._id);

    } catch (error) {
        return response(res, "Api Error for creating new Page", false);
    }
}

export async function updatePage(req, res) {
    try {
        const { pageId } = req.params.pageId;
        const { title, description, diaryId } = req.body;
        if (!pageId) {
            return response(res, "Unable to find the page", false);
        } else {
            if (title) {
                await Page.findByIdAndUpdate(pageId, {
                    title: title
                });
            }
            if (description) {
                await Page.findByIdAndUpdate(pageId, {
                    description: description
                });
            }
            if (diaryId) {
                await Diary.findByIdAndUpdate(diaryId, {
                    $push: { pages: pageId }
                })
            }
            return response(res, "Diary Updated", true);
        }
    } catch (error) {
        return response(res, "Api Error for updating new Page", false);
    }
}

export async function deletePage(req, res) {
    try {
        const deletePage = await Page.findByIdAndDelete(req.params.pageId);
        if(deletePage){
            return response(res, "Deleted Page", true);
        }else{
            return response(res, "Unable to find the page", false);
        }
    } catch (error) {
        return response(res, "Api Error for deleting Page", false);
    }
}