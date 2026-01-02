import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import * as schema from "./schema";
//import migracji
import migrations from "../../drizzle/migrations";

const DATABASE_NAME = "blood_pressure.db";

const expoDb = openDatabaseSync(DATABASE_NAME);

export const db = drizzle(expoDb, { schema });

//inicjalizacaj bazy
export const initDatabase = async () => {
    try {
        console.log("Sprawdzam migracje")
        await migrate(db, migrations as any);
        console.log("Baza danych jest aktualna");
    }catch (error) {
        console.error("Bład podczas migracji");
        throw error;
    }
    
};
