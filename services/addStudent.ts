import fs from 'fs';

export function addStudent(studentData: object) {
    const filePath: string = 'students.txt';
    let studentsArray: object[] = [];
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        studentsArray = JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
    }
    studentsArray.push(studentData);
    fs.writeFile(filePath, JSON.stringify(studentsArray), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Student details added to file successfully.');
        }
    });
}
