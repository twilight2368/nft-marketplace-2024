
CREATE TABLE IF NOT EXISTS users(
    user_id BIGSERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    account_name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INTEGER CHECK (age > 13),
    gender BOOLEAN,
    status BOOLEAN,
    amount INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS mint_transactions(
    mint_transaction_id BIGSERIAL PRIMARY KEY,
    block_number INTEGER NOT NULL,
    transaction_hash VARCHAR(255) NOT NULL,
    transaction_fee INTEGER NOT NULL,
    creator INTEGER REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS nfts(
    nft_id BIGSERIAL PRIMARY KEY,
    nft_name VARCHAR(255) NOT NULL,
    owner INTEGER REFERENCES users(user_id) NOT NULL,
    creator INTEGER REFERENCES users(user_id) NOT NULL,
    description VARCHAR(255) NOT NULL,
    token_url VARCHAR(255) NOT NULL,
    imagePath VARCHAR(255) NOT NULL,
    mint_transaction INTEGER REFERENCES mint_transactions(mint_transaction_id) NOT NULL,
    sale_status BOOLEAN NOT NULL,
    price INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS tags(
    tag_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS list_nft_tags(
    nft_id INTEGER REFERENCES nfts(nft_id),
    tag_id INTEGER REFERENCES tags(tag_id),
    PRIMARY KEY (nft_id, tag_id)
);

CREATE TABLE IF NOT EXISTS coin(
    price_in_usd NUMERIC(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS coin_transactions(
    transaction_id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    amount_coin INTEGER NOT NULL,
    transaction_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions(
    transaction_id BIGSERIAL PRIMARY KEY,
    from_user INTEGER REFERENCES users(user_id) NOT NULL,
    to_user INTEGER REFERENCES users(user_id) NOT NULL,
    transaction_date DATE NOT NULL,
    nft_id INTEGER REFERENCES nfts(nft_id) NOT NULL
);

