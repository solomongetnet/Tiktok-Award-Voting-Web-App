import RevealCoutdownContainer from "./_reveal-countdown-container";

export default function AwardResults() {
  return (
    <>
      <div className="py-[120px] min-h-screen ">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              TikTok Awards Winners Results
            </h1>
            <p className="max-md:hidden text-lg text-gray-600 dark:text-gray-300">
              Explore and vote for your favorite creators in these exciting
              categories!
            </p>
          </header>

          <RevealCoutdownContainer />
        </div>
      </div>
    </>
  );
}
