export default async function getBookings(token: string) {

    const response = await fetch('https://backend-deploy-mu.vercel.app/api/bookings', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }})

    // console.log(response)

    if (!response.ok) throw new Error('Failed to fetch User Profile')

    return await response.json()
}   