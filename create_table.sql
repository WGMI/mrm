-- MRM Trivia Game Results Table
CREATE TABLE mrm_game_results (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    email VARCHAR(255),
    score INTEGER NOT NULL
);
