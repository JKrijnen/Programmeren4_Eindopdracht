//
// CRUD operations on person
//
const Person = require('../model/Person')
const ApiError = require('../model/ApiError')
const assert = require('assert')

let personlist = []

module.exports = {

    /**
     * Create a new person and add it to the list.
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    createPerson(req, res, next) {
        // console.log('personcontroller.createPerson')
        
        try {
            assert(typeof (req.body.name) === 'object', 'name must be an object containing firstname and lastname.')
            assert(typeof (req.body.name.firstname) === 'string', 'firstname must be a string.')
            assert(typeof (req.body.name.lastname) === 'string', 'lastname must be a string.')
        }
        catch(ex) {
            const error = new ApiError(ex.toString(), 422)
            next(error)
            return
        }

        const firstname = req.body.name.firstname
        const lastname = req.body.name.lastname

        let user = new Person(firstname, lastname)
        personlist.push(user)

        res.status(200).json(user).end();
    },

    /**
     * Get the current list of persons.
     * 
     * @param {*} req The incoming request. No properties required. 
     * @param {*} res Respond contains the list as an array.
     * @param {*} next Unused here (no errors expected.)
     */
    getAllPersons(req, res, next) {
        res.status(200).json(personlist).end();
    },

    /**
     * Get a person by given id. The id is the index in the personlist.
     * 
     * @param {*} req req.params.id is the person's id in the personlist.
     * @param {*} res The requested person object.
     * @param {*} next ApiError when id is invalid.
     */
    getPersonById(req, res, next) {
        const id = req.params.id
        try {
            assert(!isNaN(id) && id >= 0 && id < personlist.length, 'parameter id is invalid: ' + id)
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 404)
            next(error)
            return
        }
        res.status(200).json(personlist[id]).end();
    },

    //
    //
    
    /**
     * Replace an existing person in the list. We need an id and a new person 
     * object. The new person will be stored at index id.
     * 
     * @param {*} req req.params.id is the person's id in the personlist. req.body contains the new person object.
     * @param {*} res The updated person object.
     * @param {*} next ApiError when id and/or person object are invalid.
     */
    updatePersonById(req, res, next) {
        const id = req.params.id
        const person = req.body
        try {
            // We need a valid id 
            assert(!isNaN(id) && id >= 0 && id < personlist.length, 'parameter id is invalid: ' + id)
            // And we need a valid person
            assert(typeof (person) === 'object', 'name must be a valid object')
            assert(person.hasOwnProperty('name'), 'A person must hava a name object')
            assert(typeof (person.name.firstname) === 'string', 'firstname must be a string')
            assert(typeof (person.name.firstname) === 'string', 'firstname must be a string')
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 404)
            next(error)
            return
        }

        let user = new Person(req.body.name.firstname, req.body.name.lastname)
        personlist[id] = user
        res.status(200).json(user).end();
    },
    
    deletePersonById(req, res, next) {
        const id = req.params.id
        try {
            // We need a valid id 
            assert(!isNaN(id) && id >= 0 && id < personlist.length, 'parameter id is invalid: ' + id)
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 404)
            next(error)
            return
        }

        // delete die person
        const removedPerson = personlist.splice(id, 1)
        if(removedPerson.length === 1) {
            // gelukt; status = 200
            res.status(200).json(removedPerson).end();
        } else {
            // mislukt; fout -> next(error)
            let error = {
                message: "Person was not found"
            }
            next(error)
        }
    }
}