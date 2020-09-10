
CREATE DATABASE urlsdb;

CREATE TABLE shortenedurls(
  id SERIAL PRIMARY KEY,
  original_url TEXT UNIQUE NOT NULL,
  shortened_url VARCHAR(10),
  times_used INTEGER DEFAULT 0
);