// Get Data from token

import jwt from 'jsonwebtoken'


export const getDataFromToken = async(req)=>
{
    try {
        const token = req.cookies.get('token').value;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;

    } catch (error) {
        console.log('Error: ', error.message);
        throw new Error('User not found!');
    }
}