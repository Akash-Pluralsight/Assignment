import fs from 'fs';

export function deleteStudentByID(studentID: number): Promise<object> {
    const filePath: string = 'students.txt';

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    reject('File does not exist');
                } else {
                    reject(`Error reading file: ${err.message}`);
                }
            } else {
                try {
                    const studentDetails = JSON.parse(data);
                    if (!Array.isArray(studentDetails)) {
                        reject('File content is not an array');
                        return;
                    }
                    const updatedStudents = studentDetails.filter(student => student.id !== studentID);
                    fs.writeFile(filePath, JSON.stringify(updatedStudents), (err) => {
                        if (err) {
                            reject(`Error writing file: ${err.message}`);
                        } else {
                            resolve(updatedStudents);
                        }
                    });
                } catch (parseError) {
                    reject(`Error parsing JSON data`);
                }
            }
        });
    });
}
