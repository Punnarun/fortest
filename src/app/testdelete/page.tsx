"use client"
import { getServerSession } from "next-auth";
import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { bookItem } from "../../../interface";
import deleteBooking from "@/libs/deleteBooking";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import updateBooking from "@/libs/updateBooking";

export default function MyBooking(){

    const [bookings, setBookings] = useState([]);
    const [count , setCount] = useState()
    const session = useSession()
    const token = session.data?.user.token
    if (!session || !session.data?.user.token) return null

    // if (token)
    console.log(token)
    if (!token) return null


    useEffect(() => {
        if (token) {
            getBook();
        }
    }, [token]);

    const getBook = async () => {
        const bookings = await getBookings(token)
        setBookings(bookings.data)
        setCount(bookings.count)
        console.log(bookings.data)
    }

    //handle delete function
    const handleDelete = async (id:string , token1:string) => {
        deleteBooking(id , token1)
    }

    const handleUpdate = async () => {
        updateBooking("65e34d60a22b281923032d16", token , new Date() , "65e2cb7e59f39afbf0a43fa6")
    }

    return(
        <div>
            <h1>{count}</h1>
            <div className="mb-5"></div>
            {
                bookings.map((bookItem)=>(
                    <div className="bg-slate-200 roundex px-5 mx-5 py-2 my-2"> 
                        <div className="text-xl">{bookItem.user}</div>
                        <div className="text-xl">{bookItem.bookDate}</div>

                        <button onClick={() => handleDelete(bookItem._id, token)}>Delete</button>
                        <button onClick={() => handleUpdate()}>Edit</button>
                    </div>
                ))
            }
        </div>
    )
}