import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Flower_11 } from "./svg";

const HeroSection = () => {
  return (
    <section className="pb-14 pt-[100px] lg:pt-[150px] relative gradient-bg h-[80vh]  rounded-b-3xl  ">
      <div className="max-md:hidden absolute right-28 top-28">
        <Flower_11 />
      </div>
      <div className="mx-auto container flex flex-col justify-center items-center  text-center">
        <div
          className="border border-primary p-1 px-4 w-fit rounded-full flex items-center justify-between mb-4"
          data-aos="fade-right"
        >
          <span className="font-inter text-xs font-medium text-gray-900 ml-3">
            Vote your favorite tiktoker.
          </span>
        </div>

        <div className="text-center mx-auto mb-9" data-aos="fade-up">
          <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-5xl lg:text-7xl font-sans z-20 font-bold tracking-tight ">
            TikTok Creative Awards{" "}
            <span className="text-primary font-bold">2025</span>
          </h1>

          <p className="px-10 text-base font-normal leading-2 text-gray-500 ">
            Celebrating the most innovative creators across the platform.{" "}
          </p>
        </div>

        <div
          className="max-sm:w-full flex flex-col gap-2 "
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="max-sm:w-full flex items-center max-md:flex-col gap-2">
            <Link passHref href={"/categories"} className="max-sm:w-[70%]">
              <Button
                className="w-full px-12 py-6 rounded-full text-base font-semibold"
                variant={"outline"}
              >
                Vote now
              </Button>
            </Link>

            <Link href={"/results"} passHref className="max-sm:w-[70%]">
              <Button className="w-full px-12 py-6 rounded-full text-base font-semibold">
                See results
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
