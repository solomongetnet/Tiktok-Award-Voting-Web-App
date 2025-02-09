import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AboutSection = () => {
  return (
    <section className="py-8" data-aos='fade-up'>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <header className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              About Tiktok Award
            </h2>
          </header>
          <p className="text-lg text-gray-700 mb-6">
            The TikTok Awards celebrate creativity, innovation, and the vibrant
            community that makes TikTok an incredible platform. Our mission is
            to recognize and honor the most talented creators who inspire
            millions every day.
          </p>

          <Link href={"/about"} passHref>
            <Button className="px-8 py-6">Learn More</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
