import bcrypt from 'bcryptjs';
const saltRounds = 10;
export const hashPassword = async (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};
