import response from "../Helpers/ResponseBoilerPlateHelper.js";
import Person from "../Models/PersonModel.js";
import User from "../Models/UserModel.js";

export async function createPerson(req, res) {
    try {
        const {user} = req.user;
        const { personname, email, age, phoneNo, gender, dob, occupation, relation } = req.body;
        if (personname || email || age || phoneNo || gender || dob || occupation || relation) {

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

            await User.findByIdAndUpdate(
                user._id,
                { $push: { people: newPerson._id } }
            )

            return response(res, "Created New Person", true, newPerson._id);
        } else {
            return response(res, "You must provide atleast one field to create a new person");
        }
    } catch (error) {
        return response(res, "Unable to create a new person", false)
    }
}

export async function deletePerson(req, res) {
    try {
        const deletePerson = await Person.findByIdAndDelete(req.params.personId);
        if (deletePerson) {
            return response(res, "Deleted the person", true);
        } else {
            return response(res, "Unable to find the person", false);
        }
    } catch (error) {
        return response(res, "Unable to delete the person", false);
    }
}

export async function updatePerson(req, res) {
    try {
        const { personId } = req.params.personId;
        const { personname, email, age, phoneNo, gender, dob, occupation, relation } = req.body;

        if (personId) {
            if (personname) {
                await Person.findByIdAndUpdate(
                    personId,
                    { personname: personname }
                )
            }

            if (email) {
                await Person.findByIdAndUpdate(
                    personId,
                    { email: email }
                )
            }

            if (age) {
                await Person.findByIdAndUpdate(
                    personId,
                    { age: age }
                )
            }

            if (phoneNo) {
                await Person.findByIdAndUpdate(
                    personId,
                    { phoneNo: phoneNo }
                )
            }

            if (gender) {
                await Person.findByIdAndUpdate(
                    personId,
                    { gender: gender }
                )
            }

            if (dob) {
                await Person.findByIdAndUpdate(
                    personId,
                    { dob: dob }
                )
            }

            if (occupation) {
                await Person.findByIdAndUpdate(
                    personId,
                    { occupation: occupation }
                )
            }

            if (relation) {
                await Person.findByIdAndUpdate(
                    personId,
                    { relation: relation }
                )
            }

            return response(res, "Updated person", true);
        } else {
            return response(res, "Person not found", false);
        }

    } catch (error) {
        return response(res, "Unable to update the person");
    }
}