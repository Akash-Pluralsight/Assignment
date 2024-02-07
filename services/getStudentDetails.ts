import fs from 'fs';

export function getStudent(): Promise<object[]> {
    const filePath = 'students.txt';

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve([]);
                } else {
                    reject(`Error reading file: ${err.message}`);
                }
            } else {
                try {
                    const studentDetails = JSON.parse(data);
                    if (Array.isArray(studentDetails)) {
                        resolve(studentDetails);
                    } else {
                        reject(`Error: File content is not an array`);
                    }
                } catch (parseError) {
                    reject(`Error parsing JSON data`);
                }
            }
        });
    });
}
