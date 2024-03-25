"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/getBookings";
import deleteBooking from "@/libs/deleteBooking";
import updateBooking from "@/libs/updateBooking";
import Link from "next/link";
import getDentists from "@/libs/getDentists";
import DateReserve from "@/components/DateReserve";
import dayjs from "dayjs";

export default function MyBooking() {
    const [bookings, setBookings] = useState([]);
    const [count, setCount] = useState(0);
    const [editedBookingId, setEditedBookingId] = useState(null); // Track the ID of the booking being edited
    const [editedDentistId, setEditedDentistId] = useState(""); // State to track edited dentist ID
    const [dentists, setDentists] = useState([]); // State to store dentists data
    const session = useSession();
    const token = session.data?.user.token;
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (token) {
            getBook();
        }
        getDentists()
            .then(response => {
                if (Array.isArray(response.data)) {
                    setDentists(response.data); // Set dentists data to state
                } else {
                    console.error('Error: Response data is not an array');
                }
            })
            .catch(error => {
                console.error('Error fetching dentists:', error);
            });
    }, [token]);

    const getBook = async () => {
        const bookings = await getBookings(token);
        setBookings(bookings.data);
        setCount(bookings.count);
        console.log("Bookings:", bookings.data);
    };

    const handleDelete = async (id, token1) => {
        try {
            await deleteBooking(id, token1);
            console.log("Deleted booking with ID:", id);
            setBookings(prevBookings => prevBookings.filter(item => item._id !== id));
            setCount(prevCount => typeof prevCount === 'number' ? prevCount - 1 : 0);
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const handleUpdate = async (id , token , date , dentistId) => {
        try {
            // await updateBooking(id, token, name, email, dentistId);
            await updateBooking(id, token , new Date(date) , editedDentistId)
            console.log("Updated booking with ID:", id);
            getBook();
            // Reset edited booking ID after successful update
            setEditedBookingId(null);
            setEditedDentistId(""); // Reset edited dentist ID
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };

    const toggleEditMode = (id) => {
        setEditedBookingId(id === editedBookingId ? null : id);
        setEditedDentistId("");
    };

    return (
        <div className="p-5 rounded-md">
            {count > 0 ? (
                <div>
                    <h1 className="text-2xl font-bold">{count}</h1>
                    <div className="mb-5"></div>
                    {bookings.map((bookItem) => (
                        <div key={bookItem._id} className="bg-slate-200 rounded-md px-5 mx-5 py-2 my-2">
                            <div className="text-xl">{bookItem.user}</div>
                            <div className="text-xl">{new Date(bookItem.bookDate).toLocaleDateString()}</div>
                            {/* <div className="text-xl">{bookItem.dentistId}</div> */}
                            {editedBookingId === bookItem._id ? (
                                <div>
                                    <select
                                        value={editedDentistId}
                                        onChange={(e) => setEditedDentistId(e.target.value)}
                                    >
                                        <option value="">Select Dentist</option>
                                        {dentists.map(dentist => (
                                            <option key={dentist._id} value={dentist._id}>
                                            {dentist.name}
                                            </option>
                                        ))}
                                    </select>
                                    <DateReserve onDateChange={(value: Dayjs | null) => { setDate(value) }} />
                                    <button
                                        className="text-white bg-blue-500 rounded-md px-3 py-1"
                                        onClick={() => handleUpdate(bookItem._id, token, date , editedDentistId)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="text-white bg-gray-500 rounded-md px-3 py-1"
                                        onClick={() => toggleEditMode(bookItem._id)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="mr-2 text-white bg-red-500 rounded-md px-3 py-1"
                                        onClick={() => handleDelete(bookItem._id, token)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="text-white bg-blue-500 rounded-md px-3 py-1"
                                        onClick={() => toggleEditMode(bookItem._id)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h1 className="text-xl font-bold text-center mt-10">No bookings found</h1>
                    <Link href="/dentist" className="text-xl font-bold text-center mt-10">Check Our Dentist for a Booking</Link>
                </div>
            )}
        </div>
    );
}
