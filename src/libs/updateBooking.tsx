export default async function updateBooking(bookingId: string, token: string , apptDate:Date , dentistId: string) {

    const response = await fetch(`https://backend-deploy-mu.vercel.app/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            bookDate: apptDate,
            dentist: dentistId
        })
    });

    if (!response.ok) {
        console.log(response.status);
        const errorResponse = await response.json();
        console.log(errorResponse);
        throw new Error("Failed to delete booking");
    }

    return await response.json();
}
