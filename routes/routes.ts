import express from 'express';
import { addStudent } from '../services/addStudent';
import {getStudent} from '../services/getStudentDetails'
import {getStudentById} from '../services/getStudentById'
import { deleteStudentByID } from '../services/deletesStudentById';

const router = express.Router();

router.post('/addStudent', (req, res) => {
    const studentData = req.body;
    if (!studentData || Object.keys(studentData).length === 0) {
        return res.status(400).send("Invalid student data");
    }
    addStudent(studentData);
    res.send("Student Added");
});

router.get('/getStudentDetails',(req,res)=>{
    getStudent()
        .then(studentDetails => {
            res.send(studentDetails);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
});

router.get('/getStudentById',(req,res)=>{
    const id:number=req.body.id;
    getStudentById(id)
        .then((student: object) => {
            res.send(student);
        })
        .catch((error:Error) => {
            res.status(500).send({ error: error.message });
        });
});

router.delete('/deleteStudentByID',(req,res)=>{
    const id:number=req.body.id;
    deleteStudentByID(id)
        .then((updatedStudents: object) => {
            res.send(updatedStudents);
        })
        .catch((error:Error) => {
            res.status(500).send({ error: error.message });
        });
});

export default router;