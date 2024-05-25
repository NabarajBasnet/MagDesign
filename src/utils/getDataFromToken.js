import jwt from 'jsonwebtoken'


export const getDataFromToken = async (req) => {
    try {
        const token = req.cookies.get('token').value
        console.log('Token: ', token);
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log('Decoded Token: ', decodedToken);

        return decodedToken.id
    } catch (error) {
        throw new Error('Token not found!');
    }
}