import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { TimeOfDay } from "../types/domain";

export const measurements = sqliteTable("measurements", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    systolic: integer("systolic").notNull(),
    diastolic: integer("diastolic").notNull(),
    pulse: integer("pulse").notNull(),
    timeOfDay: text("time_of_day").$type<TimeOfDay>().notNull(),
    createdAt: text("created_at")
        .notNull()
        .$defaultFn(() => new Date().toISOString()),

    note: text("note", { length: 40 })
});

export type Measurements = typeof measurements.$inferSelect;
export type NewMeasurements = typeof measurements.$inferInsert;