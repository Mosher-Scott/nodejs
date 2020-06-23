/* Create clients table */
CREATE TABLE public.client (
 id SERIAL NOT NULL PRIMARY KEY,
 first_name varchar(80) NOT NULL,
 last_name varchar(80) NOT NULL,
 email varchar(80) NOT NULL,
 phone varchar(10) NOT NULL
);

/* Create the training session table */
CREATE TABLE public.trainingSessions (
	id SERIAL NOT NULL PRIMARY KEY,
	sessionName varchar(80) NOT NULL,
	setReps varchar(20) NOT NULL,
	sessionDescription VARCHAR(255) NOT NULL
);

/* Creates the table that holds what training sessions are assigned to which clien */
CREATE TABLE public.clientTrainingSessions (
	id SERIAL NOT NULL PRIMARY KEY,
	sessionId int NOT NULL REFERENCES public.trainingSessions(id),
	clientId int NOT NULL REFERENCES public.client(id)
);

/* Create the table that hold the different muscle group categories */
CREATE TABLE public.muscleGroups (
	id SERIAL NOT NULL PRIMARY KEY,
	name varchar(80) NOT NULL
);

/* The table holding all the exercises in the database */
CREATE TABLE public.exercises (
	id SERIAL NOT NULL PRIMARY KEY,
	name varchar(50) NOT NULL,
	instructions varchar(255) NOT NULL,
	muscleGroup int NOT NULL REFERENCES public.muscleGroups(id)
);

/* Table for holding all the exercises that are assigned to a specific workout */
CREATE TABLE public.sessionExercises (
	id SERIAL NOT NULL PRIMARY KEY,
	sessionId int NOT NULL REFERENCES public.trainingSessions(id),
	exerciseId int NOT NULL REFERENCES public.exercises(id)
);