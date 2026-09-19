import { createFileRoute } from '@tanstack/react-router';
import { EditableText } from '@/components/cms/EditableText';
import { EditableGallery } from '@/components/cms/EditableGallery';
import { EditableEmbed } from '@/components/cms/EditableEmbed';
import { SaveBar } from '@/components/cms/SaveBar';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-bangla pb-20">
      {/* ফ্লোটিং অ্যাডমিন সেভ বার */}
      <SaveBar />
      
      {/* হিরো সেকশন (Hero Section) */}
      <section className="relative pt-24 pb-12 px-4 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="max-w-4xl mx-auto space-y-6 glass-strong p-8 md:p-12 rounded-3xl">
          <EditableText as="h1" id="home-hero-title" className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-tight text-primary">
            GrowVelo-তে স্বাগতম
          </EditableText>
          
          <EditableText as="p" id="home-hero-subtitle" className="text-[clamp(1.1rem,2vw,1.5rem)] text-muted-foreground max-w-2xl mx-auto">
            এটি আপনার নতুন ওয়েবসাইটের হোমপেজ। অ্যাডমিন প্যানেল থেকে আপনি এই লেখাগুলো সরাসরি পরিবর্তন করতে পারবেন।
          </EditableText>
        </div>
      </section>

      {/* ভিডিও সেকশন (Video Section) */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <EditableText as="h2" id="home-video-title" className="text-3xl font-bold mb-2">
            আমাদের সম্পর্কে জানুন
          </EditableText>
        </div>
        {/* এখানে অ্যাডমিন ইউটিউব লিঙ্ক বসালেই ভিডিও চালু হবে */}
        <EditableEmbed slotId="home-intro-video" />
      </section>

      {/* গ্যালারি সেকশন (Gallery Section) */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <EditableText as="h2" id="home-gallery-title" className="text-3xl font-bold mb-2">
            ফটো গ্যালারি
          </EditableText>
          <EditableText as="p" id="home-gallery-subtitle" className="text-muted-foreground">
            আমাদের কিছু চমৎকার মুহূর্তের ছবি নিচে দেওয়া হলো
          </EditableText>
        </div>
        <EditableGallery />
      </section>
    </div>
  );
}
