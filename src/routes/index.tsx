import { createFileRoute } from "@tanstack/react-router";
import {
  SiteShell,
  Hero,
  SocialProof,
  CourseCategories,
  FeaturedCourses,
  StudentShowcase,
  Instructors,
  StudentReviews,
  FAQ,
  BigCTA,
} from "../components/site/sections";

// নতুন তৈরি করা অ্যাডমিন কম্পোনেন্টগুলো ইমপোর্ট করা হলো
import { SaveBar } from "@/components/cms/SaveBar";
import { EditableText } from "@/components/cms/EditableText";
import { EditableGallery } from "@/components/cms/EditableGallery";
import { EditableEmbed } from "@/components/cms/EditableEmbed";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      {/* ফ্লোটিং সেভ বার (শুধুমাত্র অ্যাডমিন দেখতে পাবে) */}
      <SaveBar />

      <Hero />
      <SocialProof />
      
      {/* নতুন যুক্ত করা অ্যাডমিন কন্ট্রোলড ভিডিও সেকশন */}
      <section className="py-16 px-4 max-w-5xl mx-auto w-full font-bangla">
        <div className="text-center mb-8">
          <EditableText as="h2" id="home-video-title" className="text-3xl md:text-4xl font-bold mb-3">
            আমাদের সম্পর্কে বিস্তারিত জানুন
          </EditableText>
          <EditableText as="p" id="home-video-subtitle" className="text-muted-foreground text-lg">
            নিচের ভিডিওটি দেখে আমাদের প্ল্যাটফর্ম সম্পর্কে ধারণা নিন
          </EditableText>
        </div>
        <EditableEmbed slotId="home-intro-video" />
      </section>

      <FeaturedCourses isHomePage />
      <StudentShowcase limit={5} />

      {/* নতুন যুক্ত করা অ্যাডমিন কন্ট্রোলড গ্যালারি সেকশন */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full font-bangla">
        <div className="text-center mb-10">
          <EditableText as="h2" id="home-gallery-title" className="text-3xl md:text-4xl font-bold mb-3">
            ফটো গ্যালারি
          </EditableText>
          <EditableText as="p" id="home-gallery-subtitle" className="text-muted-foreground text-lg">
            অ্যাডমিন প্যানেল থেকে এখানে নতুন ছবি যুক্ত করুন
          </EditableText>
        </div>
        <EditableGallery />
      </section>

      <Instructors />
      <StudentReviews />
      <FAQ />
      <BigCTA />
    </SiteShell>
  );
}
