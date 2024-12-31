-- Update the aioutput table schema
ALTER TABLE aioutput
  ALTER COLUMN formdata TYPE text,
  ALTER COLUMN templateslug TYPE varchar(255),
  ALTER COLUMN createby TYPE varchar(255),
  ALTER COLUMN createdat TYPE timestamp USING createdat::timestamp,
  ALTER COLUMN createdat SET DEFAULT NOW(),
  ALTER COLUMN createdat SET NOT NULL;

