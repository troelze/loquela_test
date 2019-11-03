CREATE TABLE users (
    id SERIAL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    PRIMARY KEY (id)  
);
