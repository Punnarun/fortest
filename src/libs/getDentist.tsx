export default async function getDentist(id:string) {
  
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`https://backend-deploy-mu.vercel.app/api/dentists/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Hospitals');
    } 
    return await response.json();
}