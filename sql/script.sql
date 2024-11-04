--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cv; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cv (
    id integer NOT NULL,
    idpersonne integer,
    titre character varying(100),
    typecv character varying(50),
    date_reception date DEFAULT CURRENT_DATE
);



ALTER TABLE public.cv OWNER TO postgres;

--
-- Name: cv_archive; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cv_archive (
    id integer NOT NULL,
    cv_id integer NOT NULL,
    date_ajout date DEFAULT CURRENT_DATE
);


ALTER TABLE public.cv_archive OWNER TO postgres;

--
-- Name: cv_archive_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cv_archive_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cv_archive_id_seq OWNER TO postgres;

--
-- Name: cv_archive_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cv_archive_id_seq OWNED BY public.cv_archive.id;


--
-- Name: cv_description; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cv_description (
    id integer NOT NULL,
    cv_id integer NOT NULL,
    note integer DEFAULT 0,
    commentaire character varying DEFAULT 0
);


ALTER TABLE public.cv_description OWNER TO postgres;

--
-- Name: cv_description_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cv_description_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cv_description_id_seq OWNER TO postgres;

--
-- Name: cv_description_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cv_description_id_seq OWNED BY public.cv_description.id;


--
-- Name: cv_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cv_id_seq OWNER TO postgres;

--
-- Name: cv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cv_id_seq OWNED BY public.cv.id;


--
-- Name: diplomeobtention; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.diplomeobtention (
    id integer NOT NULL,
    idpersonne integer,
    diplome character varying,
    dateobtention character varying,
    etablissement character varying(100)
);


ALTER TABLE public.diplomeobtention OWNER TO postgres;

--
-- Name: diplomeobtention_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.diplomeobtention_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.diplomeobtention_id_seq OWNER TO postgres;

--
-- Name: diplomeobtention_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.diplomeobtention_id_seq OWNED BY public.diplomeobtention.id;


--
-- Name: experience; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experience (
    id integer NOT NULL,
    idpersonne integer,
    poste character varying(100) NOT NULL,
    entreprise character varying(100),
    debut character varying,
    fin character varying,
    description character varying
);


ALTER TABLE public.experience OWNER TO postgres;

--
-- Name: experience_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.experience_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.experience_id_seq OWNER TO postgres;

--
-- Name: experience_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.experience_id_seq OWNED BY public.experience.id;


--
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    nom character varying(50) NOT NULL
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genre_id_seq OWNER TO postgres;

--
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genre_id_seq OWNED BY public.genre.id;


--
-- Name: language_de_programmation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.language_de_programmation (
    id integer NOT NULL,
    idpersonne integer,
    language character varying,
    niveau character varying
);


ALTER TABLE public.language_de_programmation OWNER TO postgres;

--
-- Name: language_de_programmation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.language_de_programmation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.language_de_programmation_id_seq OWNER TO postgres;

--
-- Name: language_de_programmation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.language_de_programmation_id_seq OWNED BY public.language_de_programmation.id;


--
-- Name: personne; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personne (
    id integer NOT NULL,
    idutilisateur integer,
    nom character varying,
    date_naissance character varying,
    adresse character varying,
    email character varying NOT NULL,
    telephone character varying,
    genre character varying,
    statutmatrimonial character varying,
    profil character varying
);


ALTER TABLE public.personne OWNER TO postgres;

--
-- Name: personne_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personne_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personne_id_seq OWNER TO postgres;

--
-- Name: personne_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personne_id_seq OWNED BY public.personne.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    nom character varying(50) NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying(300) NOT NULL,
    idrole integer
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- Name: utilisateur_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.utilisateur_id_seq OWNER TO postgres;

--
-- Name: utilisateur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;


--
-- Name: cv id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv ALTER COLUMN id SET DEFAULT nextval('public.cv_id_seq'::regclass);


--
-- Name: cv_archive id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv_archive ALTER COLUMN id SET DEFAULT nextval('public.cv_archive_id_seq'::regclass);


--
-- Name: cv_description id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv_description ALTER COLUMN id SET DEFAULT nextval('public.cv_description_id_seq'::regclass);


--
-- Name: diplomeobtention id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diplomeobtention ALTER COLUMN id SET DEFAULT nextval('public.diplomeobtention_id_seq'::regclass);


--
-- Name: experience id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experience ALTER COLUMN id SET DEFAULT nextval('public.experience_id_seq'::regclass);


--
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre ALTER COLUMN id SET DEFAULT nextval('public.genre_id_seq'::regclass);


--
-- Name: language_de_programmation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.language_de_programmation ALTER COLUMN id SET DEFAULT nextval('public.language_de_programmation_id_seq'::regclass);


--
-- Name: personne id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personne ALTER COLUMN id SET DEFAULT nextval('public.personne_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: utilisateur id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);

--
-- Data for Name: personne; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personne (id, idutilisateur, nom, date_naissance, adresse, email, telephone, genre, statutmatrimonial, profil)
FROM stdin;
1	1	Alexis Broussard	1990-05-15	123 Rue du Soleil, Paris	alexisbroussard@email.com	0606060606	Homme	Célibataire	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
2	2	Laurent Rochefort	1985-12-20	456 Rue de la Mer, Marseille	laurentrochefort@email.com	0612345678	Homme	Marié	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
3	3	Marie Duval	1992-03-12	789 Boulevard des Champs, Lyon	marieduval@email.com	0611223344	Femme	Célibataire	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
4	4	Jean Martinez	1983-07-23	12 Avenue du Port, Toulouse	jeanmartinez@email.com	0654321098	Homme	Marié	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
5	5	Sophie Gonzalez	1995-11-02	34 Rue des Lilas, Bordeaux	sophiegonzalez@email.com	0678564321	Femme	Célibataire	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
6	6	Julien Charpentier	1988-04-18	9 Impasse des Fleurs, Lille	juliencharpentier@email.com	0687456321	Homme	Divorcé	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
7	7	Emilie Vasseur	1996-09-27	21 Quai des Bateaux, Nantes	emilievasseur@email.com	0699876543	Femme	Mariée	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
8	8	Antoine Leblanc	1991-02-10	14 Rue des Ecoles, Strasbourg	antoineleblanc@email.com	0632145678	Homme	Célibataire	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
9	9	Isabelle Fournier	1989-06-05	8 Avenue des Pins, Montpellier	isabellefournier@email.com	0643219876	Femme	Célibataire	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
10	10	Thomas Perrin	1987-10-30	50 Boulevard des Arènes, Nice	thomasperrin@email.com	0623456789	Homme	Marié	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
\.



--
-- Data for Name: cv; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cv (id, idpersonne, titre, typecv, date_reception) FROM stdin;
1	1	Développeur Full Stack	Développement Web	2023-01-01
2	2	Analyste de données	Science des données	2023-03-15
3	3	Gestionnaire de Projet	Gestion de projet	2023-06-10
4	4	Architecte Cloud	Infrastructures Cloud	2023-07-25
5	5	Ingénieur DevOps	DevOps	2023-08-05
6	6	Développeur Backend	Développement Backend	2023-02-10
7	7	Consultant IT	Consultant stratégie IT	2023-04-20
8	8	Développeur Frontend	Développement Frontend	2023-05-15
9	9	Chef de Projet Technique	Gestion de projet technique	2023-06-30
10	10	Ingénieur Réseau	Réseaux et sécurité	2023-09-01
\.


--
-- Data for Name: cv_archive; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cv_archive (id, cv_id, date_ajout) FROM stdin;
\.


--
-- Data for Name: cv_description; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cv_description (id, cv_id, note, commentaire) FROM stdin;
1	2	2	Peu d'experience
\.


--
-- Data for Name: diplomeobtention; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diplomeobtention (id, idpersonne, diplome, dateobtention, etablissement) FROM stdin;
1	1	Master en Informatique	2015	Université Paris-Saclay
2	2	Master en Science des Données	2014	Université de Marseille
3	3	Master en Gestion de Projet	2013	Université de Lyon
4	4	Master en Cloud Computing	2016	Université de Toulouse
5	5	Master en DevOps	2018	École Polytechnique
6	6	Master en Développement Web	2017	Université de Lille
7	7	Master en Informatique	2020	Université de Nantes
8	8	Master en Développement Frontend	2019	Université de Strasbourg
9	9	Master en Gestion de Projet	2015	Université de Montpellier
10	10	Master en Réseaux Informatiques	2016	Université de Nice
11	1	Formation Développement Web	2016	OpenClassrooms
12	1	Certification DevOps	2017	Cloud Academy
13	1	Certification Gestion de projet	2018	PMI Institute
\.


--
-- Data for Name: experience; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.experience (id, idpersonne, poste, entreprise, debut, fin, description) FROM stdin;
1	1	Développeur Full Stack	TechCorp	2018-01-15	2022-06-30	Création d'applications web en utilisant React et Node.js, gestion des bases de données.
2	2	Analyste de données	DataAnalytics	2015-09-01	2023-05-01	Analyse de grands volumes de données, création de rapports et visualisation des données.
3	3	Gestionnaire de Projet	PMO Solutions	2017-03-01	2021-12-15	Gestion de projets IT, coordination des équipes et suivi des plannings.
4	4	Architecte Cloud	CloudWorks	2016-08-15	2023-02-28	Conception et déploiement d'architectures cloud sécurisées pour des entreprises multinationales.
5	5	Ingénieur DevOps	DevOps Solutions	2019-04-10	2023-09-15	Intégration continue, automatisation des pipelines et gestion des environnements serveurs.
6	6	Développeur Backend	WebSystems	2017-10-01	2022-04-20	Développement de microservices avec Java et Spring, optimisation des bases de données.
7	7	Consultant IT	IT Consulting Group	2020-05-01	2023-08-01	Consulting en stratégie IT, audits et recommandations pour l'optimisation des systèmes d'information.
8	8	Développeur Frontend	WebDesigners	2019-11-05	2022-12-31	Développement d'interfaces utilisateurs avec React et Angular, optimisation UX/UI.
9	9	Chef de Projet Technique	TechLead Solutions	2016-02-01	2023-07-01	Coordination des équipes techniques pour la mise en œuvre des solutions logicielles complexes.
10	10	Ingénieur Réseau	NetSecure	2018-06-15	2023-03-01	Conception, gestion et sécurisation des réseaux d'entreprise, surveillance des infrastructures.
11	1	Consultant IT	ITConsult	2016-05-01	2017-12-31	Conseil en stratégie IT pour la transformation digitale.
12	1	Ingénieur DevOps	CloudWorks	2019-01-01	2021-08-31	Intégration continue et déploiement d'architectures cloud.
13	1	Chef de Projet Technique	TechLead	2020-02-15	2023-05-01	Coordination des équipes pour la mise en œuvre des solutions logicielles complexes.
\.


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (id, nom) FROM stdin;
1	Homme
2	Femme
\.


--
-- Data for Name: language_de_programmation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.language_de_programmation (id, idpersonne, language, niveau) FROM stdin;
1	1	JavaScript	7
2	1	Python	6
3	2	Java	5
4	2	JavaScript	6
5	3	Java	7
6	3	PHP	5
7	4	Java	6
8	4	JavaScript	7
9	5	Java	6
10	5	PHP	7
11	6	Java	7
12	6	PHP	6
13	7	Java	7
14	7	JavaScript	6
15	8	JavaScript	8
16	8	PHP	7
17	9	Java	7
18	9	PHP	6
19	10	Java	5
20	10	PHP	5
\.



--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, nom) FROM stdin;
1	ADMIN
2	client
\.


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur (id, email, password, idrole) FROM stdin;
1	alexisbroussard@email.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	2
2	laurentrochefort@email.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	2
3	marieduval@email.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	2
4	jeanmartinez@email.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	2
5	sophiegonzalez@email.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	2
6	juliencharpentier@email.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	2
7	emilievasseur@email.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	2
8	antoineleblanc@email.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	2
9	isabellefournier@email.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	2
10	thomasperrin@email.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	2
11	lalafrederic.com	$2a$10$KT7svtZ.gnOVXseO2oa.eOpB5K4dSq97sFSpsWKZu8VNc4YgX8m9i	1
\.


--
-- Name: cv_archive_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cv_archive_id_seq', 16, true);


--
-- Name: cv_description_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cv_description_id_seq', 12, true);


--
-- Name: cv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cv_id_seq', 14, true);


--
-- Name: diplomeobtention_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.diplomeobtention_id_seq', 9, true);


--
-- Name: experience_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.experience_id_seq', 14, true);


--
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genre_id_seq', 2, true);


--
-- Name: language_de_programmation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.language_de_programmation_id_seq', 14, true);


--
-- Name: personne_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personne_id_seq', 16, true);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 2, true);


--
-- Name: utilisateur_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_id_seq', 3, true);


--
-- Name: cv_archive cv_archive_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv_archive
    ADD CONSTRAINT cv_archive_pkey PRIMARY KEY (id);


--
-- Name: cv_description cv_description_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv_description
    ADD CONSTRAINT cv_description_pkey PRIMARY KEY (id);


--
-- Name: cv cv_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv
    ADD CONSTRAINT cv_pkey PRIMARY KEY (id);


--
-- Name: diplomeobtention diplomeobtention_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diplomeobtention
    ADD CONSTRAINT diplomeobtention_pkey PRIMARY KEY (id);


--
-- Name: experience experience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experience
    ADD CONSTRAINT experience_pkey PRIMARY KEY (id);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- Name: language_de_programmation language_de_programmation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.language_de_programmation
    ADD CONSTRAINT language_de_programmation_pkey PRIMARY KEY (id);


--
-- Name: personne personne_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personne
    ADD CONSTRAINT personne_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: cv_description unique_cv_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv_description
    ADD CONSTRAINT unique_cv_id UNIQUE (cv_id);


--
-- Name: utilisateur utilisateur_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_email_key UNIQUE (email);


--
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);


--
-- Name: idx_utilisateur_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_utilisateur_email ON public.utilisateur USING btree (email);


--
-- Name: cv_archive cv_archive_cv_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv_archive
    ADD CONSTRAINT cv_archive_cv_id_fkey FOREIGN KEY (cv_id) REFERENCES public.cv(id);


--
-- Name: cv_description cv_description_cv_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv_description
    ADD CONSTRAINT cv_description_cv_id_fkey FOREIGN KEY (cv_id) REFERENCES public.cv(id);


--
-- Name: cv cv_idpersonne_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv
    ADD CONSTRAINT cv_idpersonne_fkey FOREIGN KEY (idpersonne) REFERENCES public.personne(id) ON DELETE CASCADE;


--
-- Name: diplomeobtention diplomeobtention_idpersonne_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diplomeobtention
    ADD CONSTRAINT diplomeobtention_idpersonne_fkey FOREIGN KEY (idpersonne) REFERENCES public.personne(id) ON DELETE CASCADE;


--
-- Name: experience experience_idpersonne_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experience
    ADD CONSTRAINT experience_idpersonne_fkey FOREIGN KEY (idpersonne) REFERENCES public.personne(id) ON DELETE CASCADE;


--
-- Name: language_de_programmation language_de_programmation_idpersonne_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.language_de_programmation
    ADD CONSTRAINT language_de_programmation_idpersonne_fkey FOREIGN KEY (idpersonne) REFERENCES public.personne(id) ON DELETE CASCADE;


--
-- Name: personne personne_idutilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personne
    ADD CONSTRAINT personne_idutilisateur_fkey FOREIGN KEY (idutilisateur) REFERENCES public.utilisateur(id) ON DELETE CASCADE;


--
-- Name: utilisateur utilisateur_idrole_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_idrole_fkey FOREIGN KEY (idrole) REFERENCES public.role(id);


--
-- PostgreSQL database dump complete
--

