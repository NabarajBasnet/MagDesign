'use client'

import { useEffect, useState } from "react";

const OverView = (props)=>
{
    const [data, setData] = useState()
    
    useEffect(()=>
    {
        getDataFromServer()
    },[]);

    const getDataFromServer = async()=>
    {
        const req = await fetch('www.example.api/data');
        const res = await req.json()
        setData(res.results)
    }

    return(
        <>
        <div className="border-2 border-black rounded-xl h-80 w-80">
            <h1>
                {data}
            </h1>
        </div>
        </>
    )
}

export default OverView;