```
-- Connect as postgres
psql -U postgres

-- Create template owned by app_user
CREATE DATABASE tenant_template
  OWNER app_user
  IS_TEMPLATE true;

-- Connect and set up schema
\c tenant_template
ALTER SCHEMA public OWNER TO app_user;

-- Now all new tenant databases use this template
CREATE DATABASE tenant_newclient
  WITH TEMPLATE tenant_template
  OWNER app_user;

```
