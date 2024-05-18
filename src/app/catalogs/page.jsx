'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Catalogs = () => {
    const searchedQuery = useSelector(state => state.searchedQueryWord);
    const [searchedData, setSearchedData] = useState([]);

    console.log('Found posts:', searchedData);

    const searchItemInServer = async () => {
        try {
            const req = await fetch(`http://localhost:3000/api/catalogs/?search=${searchedQuery}`);
            console.log('Request:', req);

            if (!req.ok) {
                throw new Error('Network response was not ok');
            }

            const res = await req.json();
            setSearchedData(res.result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (searchedQuery) {
            searchItemInServer();
        }
    }, [searchedQuery]);

    return (
        <section className="mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3">
                {searchedData.length > 0 ? (
                    searchedData.map((blog, index) => (
                        <div className="shadow-md p-4">
                            <Link href={'/blogs/' + blog._id} key={index} className="px-2 flex flex-col items-center justify-center">
                                <img src={blog.imageurl} alt={blog.title} className="rounded-md w-64 h-40" />
                                <h1 className="text-2xl font-bold py-2">{blog.title}</h1>
                                <p className="text-gray-500 font-semibold py-4">{blog.introduction}</p>
                                <div className="flex items-center">
                                    <div>
                                        <img src={blog.imageurl} className="w-16 p-2 h-16 rounded-full" />
                                    </div>
                                    <div>
                                        <h1>{blog.author}</h1>
                                        <h1>CEO and Founder</h1>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-3xl font-bold block  items-center justify-center">Not Found!</p>
                )}
            </div>
        </section>
    );
};

export default Catalogs;
