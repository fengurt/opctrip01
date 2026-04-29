CREATE TABLE `activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dayId` int NOT NULL,
	`time` varchar(64),
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activity_translations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`activityId` int NOT NULL,
	`lang` varchar(8) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `activity_translations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `day_translations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dayId` int NOT NULL,
	`lang` varchar(8) NOT NULL,
	`title` varchar(256) NOT NULL,
	`date` varchar(64),
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `day_translations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `days` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tripId` int NOT NULL,
	`dayNumber` int NOT NULL,
	`image` varchar(512),
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `days_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trip_translations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tripId` int NOT NULL,
	`lang` varchar(8) NOT NULL,
	`title` varchar(256) NOT NULL,
	`subtitle` varchar(512),
	`location` varchar(128) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trip_translations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trips` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(128) NOT NULL,
	`heroImage` varchar(512) NOT NULL,
	`accentColor` varchar(16) NOT NULL DEFAULT '#F59E0B',
	`dates` varchar(64) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isPublished` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trips_id` PRIMARY KEY(`id`),
	CONSTRAINT `trips_slug_unique` UNIQUE(`slug`)
);
