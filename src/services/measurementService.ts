import { db } from "../db/client";
import { desc, eq } from "drizzle-orm";
import { measurements, NewMeasurements, Measurements } from "../db/schema";

export const addMeasurement = async (data: NewMeasurements) => {
    try{
        await db.insert(measurements).values(data)
        return { success: true };
    } catch (error) {
        console.error("Błąd zapisu", error);
        return { success: false, error};
    }
};

export const getAllMeasurements = async (): Promise<Measurements[]> => {
    try{
        const allData = await db
            .select()
            .from(measurements)
            .orderBy(desc(measurements.id));
        return allData;
    } catch (error) {
        console.error("Błąd pobierania: ", error)
        return [];
    }
};

export const deleteMeasurement = async (id: number) => {
    try{
        await db.delete(measurements).where(eq(measurements.id, id));
        return { success: true };
    } catch (error) {
        console.error("Usuwanie nie powiodło się", error);
        return { success: false, error };
    }
};

export const updateMeasurement = async(id: number, data: Partial<NewMeasurements>) => {
    try{
        await db
            .update(measurements)
            .set(data)
            .where(eq(measurements.id ,id));

        console.log(`Aktualizacja pomiaru ID: ${id}`);
        return { success: true };
    } catch (error) {
        console.error("Błąd aktualizacji: ", error);
        return { success: false, error};
    }
};

export const clearDatabase = async () => {
    try{
        await db.delete(measurements);
        console.log("Baza danych z pomiarami została wyczyszczona!");
        return { success: true };
    } catch (error) {
        console.error("Nie udało się wyczyścić bazy: ",error);
        return { success: false, error };
    }
};