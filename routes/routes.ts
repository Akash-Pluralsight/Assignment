import express from 'express';
import { addStudent } from '../services/addStudent';
import {getStudent} from '../services/getStudentDetails'
import {getStudentById} from '../services/getStudentById'
import { deleteStudentByID } from '../services/deletesStudentById';

const router = express.Router();

router.post('/student', async (req, res) => {
    try {
        const studentData = req.body;
        if (!studentData || Object.keys(studentData).length === 0) {
            return res.status(400).send("Invalid student data");
        }
        addStudent(studentData);
        res.send("Student Added");
    } catch (error) {
        res.status(500).send({ error});
    }
});

router.get('/students', async (req, res) => {
    try {
        const studentDetails = await getStudent();
        res.send(studentDetails);
    } catch (error) {
        res.status(500).send({ error });
    }
});

router.get('/studentbyid/:id', async (req, res) => {
    try {
        const id = parseInt(req.params['id']);
        const student = await getStudentById(id);
        res.send(student);
    } catch (error) {
        res.status(500).send({ error });
    }
});


router.delete('/deleteStudentByID/:id', async (req, res) => {
    try {
        const id = parseInt(req.params['id']);
        const updatedStudents = await deleteStudentByID(id);
        res.send(updatedStudents);
    } catch (error) {
        res.status(500).send({ error });
    }
});


export default router;