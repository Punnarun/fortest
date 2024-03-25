import { getServerSession } from "next-auth";
import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { bookItem } from "../../../interface";

export default async function MyBooking(){
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const bookings = await getBookings(session.user.token)
    console.log(bookings)

    return(
        <div>
            {
                bookings.data.map((bookItem:bookItem)=>(
                    <div className="bg-slate-200 roundex px-5 mx-5 py-2 my-2" key={bookItem.id}> 
                        <div className="text-xl">{bookItem.user}</div>
                        <div className="text-xl">{bookItem.bookDate}</div>
                        {/* <div className="text-xl">{bookItem.user}</div> */}
                        {/* <div className="text-sm">{bookItem.hotel.name}</div> */}
                        {/* <div className="text-sm">{bookItem.room?.roomNumber}</div> */}
                        {/* <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm" > */}
                        {/* </button> */}
                    </div>
                ))
            }
        </div>
    )
}