import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/api/public/enroll")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const schema = z.object({
            email: z.string().email(),
            courseSlug: z.string(),
            bkashNumber: z.string(),
            transactionId: z.string(),
            userId: z.string().uuid(),
          });
          
          const result = schema.safeParse(body);
          if (!result.success) {
            return new Response(JSON.stringify({ error: "Invalid request data" }), { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          
          const { email, courseSlug, bkashNumber, transactionId, userId } = result.data;
          
          // Import admin client to perform the insert
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          
          const { error } = await supabaseAdmin
            .from('course_enrollments')
            .insert([{
              user_id: userId,
              email: email,
              course_slug: courseSlug,
              payment_method: 'bkash',
              transaction_id: transactionId,
              status: 'pending'
            }]);

          if (error) {
            console.error("Enrollment error:", error);
            if (error.code === '23505') {
              return new Response(JSON.stringify({ error: "Duplicate enrollment" }), { 
                status: 409,
                headers: { 'Content-Type': 'application/json' }
              });
            }
            return new Response(JSON.stringify({ error: "Database error" }), { 
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          
          return new Response(JSON.stringify({ success: true }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          console.error("Server error:", err);
          return new Response(JSON.stringify({ error: "Internal server error" }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
  }
});
