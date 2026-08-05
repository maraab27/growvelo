import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/api/public/enroll")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();
        const schema = z.object({
          email: z.string().email(),
          courseSlug: z.string(),
          bkashNumber: z.string(),
          transactionId: z.string(),
        });
        const result = schema.safeParse(body);
        if (!result.success) return new Response("Invalid request", { status: 400 });
        
        // This would interact with the database using supabaseAdmin
        // For now, this placeholder handles the logic flow
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
    }
  }
});