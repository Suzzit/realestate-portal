const {client} = require('./db.cjs')

const tables = {
    'users': `CREATE TABLE users (
        id            SERIAL        PRIMARY KEY,
        name          VARCHAR(100)  NOT NULL,
        email         VARCHAR(150)  NOT NULL UNIQUE,
        password_hash VARCHAR(255)  NOT NULL,
        phone         VARCHAR(20),
        is_verified   BOOLEAN       NOT NULL DEFAULT FALSE,
        is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
        created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_login_at TIMESTAMP     NULL
    );`,

    'favourites': `
        CREATE TABLE favourites (
            id            SERIAL           PRIMARY KEY,
            user_id       INT              NOT NULL,
            property_id   INT              NOT NULL,
            created_at    TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
            updated_at    TIMESTAMPTZ      NOT NULL DEFAULT NOW(),

            CONSTRAINT uq_user_property UNIQUE (user_id, property_id),

            CONSTRAINT fk_favourites_user
                FOREIGN KEY (user_id)
                REFERENCES users (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,

            CONSTRAINT fk_favourites_property
                FOREIGN KEY (property_id)
                REFERENCES properties (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        );

    `,

    'properties': `
        CREATE TABLE Properties (
            id            SERIAL PRIMARY KEY,
            title         VARCHAR(150)   NOT NULL,
            description   TEXT,
            price         NUMERIC(15, 2) NOT NULL,
            type          VARCHAR(20)    NOT NULL CHECK (type IN ('Apartment', 'Villa', 'Studio', 'Penthouse', 'Commercial')),
            status        VARCHAR(20)    NOT NULL DEFAULT 'For Sale' CHECK (status IN ('For Sale', 'For Rent', 'Sold', 'Rented')),
            beds          INT,
            baths         INT,
            area_sqft     INT,
            address       VARCHAR(255)   NOT NULL,
            city          VARCHAR(100)   NOT NULL,
            state         VARCHAR(100),
            country       VARCHAR(100)   NOT NULL DEFAULT 'India',
            pincode       VARCHAR(20),
            image_url     TEXT,
            agent_name    VARCHAR(150),
            agent_email   VARCHAR(150),
            agent_phone   VARCHAR(20),
            is_featured   BOOLEAN        NOT NULL DEFAULT FALSE,
            created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
            updated_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
        );
    `
}

async function setupDb() {
    await client.connect()

    for(let [tName, query] of Object.entries(tables)) {
        try {
            await client.query(query)

            console.log(`Successfully created table ${tName}`)
        } catch(err) {
            console.log(err.message)
        }
    }

    await client.end()
}

setupDb()