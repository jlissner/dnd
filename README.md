#### Architecture

## DB - Tables

# Campaigns
- id_pk bigserial
- name text
- maps bigint[]

# People
- id_pk bigserial
- name text

# Characters
- id_pk bigserial
- person_fk bigserial
- name text
- attributes jsonb

# Parties
- id_pk bigserial
- campaign_fk bigint
- person_fk bigint
- character_fk bigint
- role enum (player|dm)

# Maps
- id_pk bigserial
- person_fk bigint
- url text
- height int
- width int

# Boards
- id_pk bigserial
- campaign_fk bigint
- maps jsonb -- { map_fk, x, y, z, scale }
- characters jsonb -- { character_fk, x, y, }
