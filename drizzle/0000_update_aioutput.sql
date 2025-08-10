/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name "Contentify" — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
-- Update the aioutput table schema
ALTER TABLE aioutput
  ALTER COLUMN formdata TYPE text,
  ALTER COLUMN templateslug TYPE varchar(255),
  ALTER COLUMN createby TYPE varchar(255),
  ALTER COLUMN createdat TYPE timestamp USING createdat::timestamp,
  ALTER COLUMN createdat SET DEFAULT NOW(),
  ALTER COLUMN createdat SET NOT NULL;

