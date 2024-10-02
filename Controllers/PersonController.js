import response from "../Helpers/ResponseBoilerPlateHelper.js";
import Person from "../Models/PersonModel.js";

export async function createPerson(req, res){
    try {
        const {personname, email, age, phoneNo, gender, dob, occupation, relation} = req.body;
        if(personname || email || age || phoneNo || gender || dob || occupation || relation){

            const data = {
                personname: personname ?? null,
                email: email ?? null,
                age: age ?? null,
                phoneNo: phoneNo ?? null,
                gender: gender ?? null,
                dob: dob ?? null,
                occupation: occupation ?? null,
                relation: relation ?? null,
            };

            const newPerson = new Person(data);
            await newPerson.save();
            
            return response(res, "Added New Person", true, newPerson._id);
        }else{
            return response(res, "You must provide atleast one field to create a new person");
        }
    } catch (error) {
        return response(res, "Unable to create a new person", false)
    }
}

export async function deletePerson(req, res){
    try {
        const deletePerson = await Person.findByIdAndDelete(req.params.personId);
        if(deletePerson){
            return response(res, "Deleted the person from your life", true);
        }else{
            return response(res, "Unable to find the person", false);
        }
    } catch (error) {
        return response(res, "Unable to delete the person from your life", false);
    }
}

export async function updatePerson(req, res) {
    // do this
}