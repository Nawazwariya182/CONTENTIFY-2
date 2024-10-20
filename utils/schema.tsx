import { imageGen } from './schemas/imagegenschema';
import { voiceGen } from './schemas/voicegenschema';
import { entityLinking } from './schemas/entitylinkingschema';
import { translate } from './schemas/translateschema';
import { credit } from './schemas/credit';

export {
    imageGen,
    voiceGen,
    entityLinking,
    translate,
    credit
};

// You can keep your existing aioutput schema here if needed
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const aioutput = pgTable('aioutput', {
    id: serial('id').primaryKey(),
    formdata: varchar('formdata').notNull(),
    airesponse: text('airesponse').notNull(),
    templateslug: varchar('slug').notNull(),
    createby: varchar('email').notNull(),
    createdat: varchar('createdat').notNull()
});