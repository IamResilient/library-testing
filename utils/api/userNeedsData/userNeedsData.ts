export const getUserNeeds = async () => {
    try {
        const response = await fetch(`https://mind2-doc.viento.ru/api/v2/user-needs-data/111222333444`);
        const data: any = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
