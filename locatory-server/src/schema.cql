CREATE TABLE IF NOT EXISTS users (
  phone_no TEXT,
  favourites SET<TEXT>,
  PRIMARY KEY (phone_no)
);

CREATE TABLE IF NOT EXISTS tokens (
  phone_no TEXT,
  tkn TEXT,
  PRIMARY KEY (phone_no)
);