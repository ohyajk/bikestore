export const convertToIST = (utcDate: string) => {
    const date = new Date(utcDate);
    return date.toLocaleDateString('en-IN', { 
        timeZone: 'Asia/Kolkata', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};