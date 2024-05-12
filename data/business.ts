import { db } from "@/lib/db";

export const getBusinessByUserId = async (
    userId: string | undefined
) => {
    if (!userId) {
        return null;
    }
    try {
        const business = await db.business.findUnique({
            where: {
                userId
            }
        });
        return business;
    } catch {
        return null
    }
}
