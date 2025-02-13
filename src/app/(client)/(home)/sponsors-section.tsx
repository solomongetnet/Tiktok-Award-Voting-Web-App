import Marquee from "@/components/ui/marquee";
import React from "react";
import Image from "next/image";

// Sponsor images
import sponsorOne from "@/assets/images/sponsor-1.png";
import sponsorTwo from "@/assets/images/sponsor-2.png";
import sponsorThree from "@/assets/images/sponsor-2.jpg";
import sponsorFour from "@/assets/images/sponsor-4.png";
import sponsorSix from "@/assets/images/sponsor-7.jpg";

const sponsors = [
  { src: sponsorOne, alt: "Sponsor 1" },
  { src: sponsorTwo, alt: "Sponsor 2" },
  { src: sponsorThree, alt: "Sponsor 3" },
  { src: sponsorFour, alt: "Sponsor 4" },
  { src: sponsorSix, alt: "Sponsor 5" },
];

const SponsorsSection = () => {
  return (
    <section className="mt-14 md:mt-18 mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Our Sponsors</h2>
      </header>

      <div >
        <Marquee className="[--duration:20s]" pauseOnHover>
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="w-[130px] md:w-[160px] aspect-square md:ml-5 rounded-2xl bg-white shadow-sm flex justify-center items-center"
            >
              <Image
                alt={sponsor.alt}
                width={500}
                height={500}
                src={sponsor.src}
                className="w-[50%]"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default SponsorsSection;
