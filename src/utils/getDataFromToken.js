import jwt from 'jsonwebtoken'


const getDataFromToken = (req)=>
{
    try{
        console.log('GDFT: ', req);
        const token = req.cookies.get("token") || ''; 
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        return decodedToken.id;

    }catch(error){
        throw new Error(error.message)
    }
}

export default getDataFromToken;