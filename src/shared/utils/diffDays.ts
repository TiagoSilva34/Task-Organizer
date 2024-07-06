export const getDiffDaysBetweenDates = (startDate: any, endDate: any) => {
    const date1: any = new Date(startDate);
    const date2: any = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays
}

