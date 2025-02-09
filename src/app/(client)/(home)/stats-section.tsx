"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

const stats = [
  { label: "Total Participants", value: 1000000 },
  { label: "Total Categories", value: 20 },
  { label: "Total Sponsors", value: 50 },
  { label: "Total Votes Cast", value: 5000000 },
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section data-aos='fade-up' id="stats-section" className="rounded-tl-3xl rounded-br-3xl bg-[#1c1c1c] text-white mt-8 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-5xl font-bold mb-2">
                {isVisible && (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                )}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
