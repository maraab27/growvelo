import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 font-bangla">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">GrowVelo</h1>
      <p className="text-lg text-muted-foreground text-center">
        আপনার সাইটটি সফলভাবে রিস্টোর হয়েছে। এখন আমরা মূল ডিজাইন যুক্ত করব।
      </p>
    </div>
  );
}
