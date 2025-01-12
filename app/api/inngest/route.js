import { serve } from "inngest/next";
import { CreateNewUser, GenerateNotes, GenerateStudyTypeContent } from "@/inngest/functions";
import { inngest } from "@/inngest/client";

export const runtime = 'edge'

// Ensure functions are correctly imported and defined
export const { GET, POST, PUT } = serve({
    client: inngest,
    streaming:'allow',
    functions: [
        CreateNewUser,
        GenerateNotes,
        GenerateStudyTypeContent  // Ensure these functions are correctly defined
    ],
});
