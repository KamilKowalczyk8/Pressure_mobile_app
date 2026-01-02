CREATE TABLE `measurements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`systolic` integer NOT NULL,
	`diastolic` integer NOT NULL,
	`pulse` integer NOT NULL,
	`time_of_day` text NOT NULL,
	`created_at` text NOT NULL,
	`note` text(40)
);
