import { redirect } from 'react-router';
export const genericApiAction = async ({ request }: {request: Request} )=> {
    const contentType = request.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    const payloadData = isJson
        ? await request.json()
        : Object.fromEntries((await request.formData()).entries());
    
    const redirectTo = payloadData.redirectTo || "/";
    const { redirectTo: _, ...data } = payloadData;
    
    const url = new URL(request.url);
    const pathname = url.pathname;

    try{
        const requestBody = JSON.stringify(data);
        
        const response = await fetch(`http://localhost:8000${pathname}`, {
            method: request.method,
            headers: isJson ? {"Content-Type": "application/json"} : {},
            body: requestBody,
            credentials: "include",
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Une erreur est survenue" }));
            throw new Error(errorData.error || "Une erreur est survenue");
        };
    
    return redirect(redirectTo);
} catch (error: any ) {
    
    console.error(`Erreur sur ${pathname} : `, error.message);
    return { error: error.message};
}
};