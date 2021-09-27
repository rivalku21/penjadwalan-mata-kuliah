--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-09-26 14:36:56

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
-- TOC entry 202 (class 1259 OID 16856)
-- Name: mahasiswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mahasiswa (
    id uuid NOT NULL,
    nama character varying NOT NULL,
    create_at timestamp without time zone NOT NULL,
    update_at timestamp without time zone,
    mata_kuliah character varying[]
);


ALTER TABLE public.mahasiswa OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16848)
-- Name: matkul; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.matkul (
    id character varying NOT NULL,
    nama_matkul character varying NOT NULL,
    kode_matkul character varying NOT NULL,
    create_at timestamp without time zone NOT NULL,
    update_at timestamp without time zone,
    jadwal_hari character varying,
    jadwal_jam time without time zone
);


ALTER TABLE public.matkul OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16840)
-- Name: users_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_table (
    id uuid NOT NULL,
    nama character varying NOT NULL,
    nip character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    create_at date NOT NULL,
    last_login timestamp with time zone,
    role character varying,
    mk character varying
);


ALTER TABLE public.users_table OWNER TO postgres;

--
-- TOC entry 2997 (class 0 OID 16856)
-- Dependencies: 202
-- Data for Name: mahasiswa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.mahasiswa (id, nama, create_at, update_at, mata_kuliah) VALUES ('082b8400-e065-4259-9c1e-bf19c8c3af63', 'Akbar', '2021-09-24 00:00:00', NULL, '{DTH1A2,DTH1B3}');
INSERT INTO public.mahasiswa (id, nama, create_at, update_at, mata_kuliah) VALUES ('52241fab-094b-4233-ab6b-69079ecf9273', 'Surya', '2021-09-25 00:00:00', NULL, '{DTH1B3}');
INSERT INTO public.mahasiswa (id, nama, create_at, update_at, mata_kuliah) VALUES ('d05897b6-67b0-4ae8-a198-6d10014da501', 'Ali', '2021-09-24 00:00:00', NULL, '{DTH1A2}');
INSERT INTO public.mahasiswa (id, nama, create_at, update_at, mata_kuliah) VALUES ('f86907c8-5558-4822-9d17-366dbfa1608c', 'Lisa', '2021-09-25 17:24:07.76424', NULL, '{DTH1B3}');
INSERT INTO public.mahasiswa (id, nama, create_at, update_at, mata_kuliah) VALUES ('6f7fcfa0-9d7d-4923-817a-553103b565cb', 'Kurniawan', '2021-09-25 17:24:49.678346', '2021-09-25 17:28:01.682209', '{DTH1B3,DTH1C3}');
INSERT INTO public.mahasiswa (id, nama, create_at, update_at, mata_kuliah) VALUES ('fd5ad552-cee4-42bf-ac1a-83fc0275c415', 'Anggun', '2021-09-26 13:51:14.706983', NULL, '{DTH1F3}');


--
-- TOC entry 2996 (class 0 OID 16848)
-- Dependencies: 201
-- Data for Name: matkul; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.matkul (id, nama_matkul, kode_matkul, create_at, update_at, jadwal_hari, jadwal_jam) VALUES ('dae79a99-7613-4f9d-b955-61808da60295', 'MATEMATIKA TELEKOMUNIKASI I', 'DTH1B3', '2021-09-24 00:00:00', NULL, 'kamis', '09:00:00');
INSERT INTO public.matkul (id, nama_matkul, kode_matkul, create_at, update_at, jadwal_hari, jadwal_jam) VALUES ('386c5384-eea7-4a8c-84d5-43587b88d5f2', 'K3 DAN LINGKUNGAN HIDUP', 'DTH1A2', '2021-09-25 17:10:05.051741', NULL, 'Rabu', '12:00:00');
INSERT INTO public.matkul (id, nama_matkul, kode_matkul, create_at, update_at, jadwal_hari, jadwal_jam) VALUES ('e883c940-f6ae-4d41-963d-f7adbf16f1d8', 'DASAR TEKNIK KOMPUTER DAN PEMROGRAMAN', 'DTH1F3', '2021-09-26 13:50:59.513668', NULL, 'Rabu', '13:00:00');


--
-- TOC entry 2995 (class 0 OID 16840)
-- Dependencies: 200
-- Data for Name: users_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users_table (id, nama, nip, username, password, create_at, last_login, role, mk) VALUES ('4f0b3a7f-1908-4e63-b498-dfd2ea847cb9', 'Rizal Kurniawan', '6705184324', 'rizaku', '$2b$10$qL3fMFkSIT.cDMd.xGjplOeo.tmCu0wOX6f9g7phVDx7hbmnvS5X6', '2021-09-24', NULL, 'dosen', 'DTH1B3');
INSERT INTO public.users_table (id, nama, nip, username, password, create_at, last_login, role, mk) VALUES ('ab1116f7-f43a-4bf0-98b2-dfcdefd3fc77', 'Rival Fauzi', '6705184127', 'rivalfauzi', '$2b$10$PT3tC8GiZBdkUP.TnhzWu.gANAIgjFiaiI/96PP0BLXH2Gm3731Km', '2021-09-24', '2021-09-25 17:06:09.468674+07', 'dosen', 'DTH1A2');
INSERT INTO public.users_table (id, nama, nip, username, password, create_at, last_login, role, mk) VALUES ('d0ac6b39-5c2d-4621-9685-c0b8bdbcac88', 'Admin Puti', '012345678', 'adminputi123', '$2a$10$grUgPrLvOx9xeD0bnkY7YuBXir8guZE1X31NhUe4KK3D/iQ9Fvb/i', '2021-09-24', '2021-09-26 13:50:34.820994+07', 'admin', NULL);
INSERT INTO public.users_table (id, nama, nip, username, password, create_at, last_login, role, mk) VALUES ('2b6110d2-b91b-4483-95b6-25b6c03c8b47', 'Jhon doe', '123456789', 'jhondoe', '$2b$10$3IsJP5tpFMfS6/aqpCgj0u77/GrcsTRtySoE9wfUeXKVzqoKk.7p.', '2021-09-26', '2021-09-26 13:51:48.071965+07', 'dosen', 'DTH1F3');


--
-- TOC entry 2864 (class 2606 OID 16863)
-- Name: mahasiswa mahasiswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mahasiswa
    ADD CONSTRAINT mahasiswa_pkey PRIMARY KEY (id);


--
-- TOC entry 2862 (class 2606 OID 16855)
-- Name: matkul matkul_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matkul
    ADD CONSTRAINT matkul_pkey PRIMARY KEY (id);


--
-- TOC entry 2860 (class 2606 OID 16847)
-- Name: users_table users_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_table
    ADD CONSTRAINT users_table_pkey PRIMARY KEY (id);


-- Completed on 2021-09-26 14:36:56

--
-- PostgreSQL database dump complete
--

