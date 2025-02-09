import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto container py-[120px] min-h-screen">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">About TikTok Awards</h1>
        <p className="px-8 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Celebrating creativity, innovation, and the vibrant community that
          makes TikTok extraordinary.
        </p>
      </header>

      <section className="items-center mb-20">
        <div className="mx-auto w-full sm:w-[70%] text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The TikTok Awards aim to recognize and celebrate the incredible
            talent, creativity, and impact of content creators on the platform.
            We believe in the power of short-form video to inspire, educate, and
            entertain, and we're here to shine a spotlight on the best of the
            best.
          </p>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Why TikTok Awards Matter
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Award className="w-12 h-12 text-purple-500" />,
              title: "Recognition",
              description:
                "We provide a platform to acknowledge and celebrate the hard work and creativity of TikTok creators.",
            },
            {
              icon: <Users className="w-12 h-12 text-pink-500" />,
              title: "Community",
              description:
                "The awards foster a sense of community and encourage collaboration among creators.",
            },
            {
              icon: <Zap className="w-12 h-12 text-yellow-500" />,
              title: "Inspiration",
              description:
                "By showcasing outstanding content, we inspire the next generation of creators to push boundaries.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Join the Celebration
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Whether you're a creator, a fan, or just love great content, the
          TikTok Awards have something for everyone. Get involved, vote for your
          favorites, and be part of this exciting celebration of creativity!
        </p>
        <Button size="lg" className="group">
          Explore Categories
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </section>
    </div>
  );
}
