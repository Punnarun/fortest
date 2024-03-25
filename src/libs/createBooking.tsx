export default async function createBooking(did: string, token: string, apptDate: Date) {

    const response = await fetch(`https://backend-deploy-mu.vercel.app/api/dentists/${did}/bookings`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            bookDate: apptDate,
        })
    });

    if (!response.ok) {
        // throw new Error("Cannot create reservation");
        console.log(response.status);
        console.log(response.json)
        // console.log(response.)
    }

    return await response.json();
}