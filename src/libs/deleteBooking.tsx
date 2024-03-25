export default async function deleteBooking(bookingId: string, token: string) {

    const response = await fetch(`https://backend-deploy-mu.vercel.app/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            // "Content-Type": "application/json" 
        }
    });

    if (!response.ok) {
        console.log(response.status);
        const errorResponse = await response.json();
        console.log(errorResponse);
        throw new Error("Failed to delete booking");
    }

    return await response.json();
}
