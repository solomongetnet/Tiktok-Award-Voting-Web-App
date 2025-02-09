import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllCategoriesForClientAction } from "@/server/actions";
import Link from "next/link";

const CategoriesContainer = async () => {
  const categories = await getAllCategoriesForClientAction();

  if (categories.length === 0) {
    return (
      <Card className="md:w-[450px] mt-20 mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">No Categories Found</h2>
        <p className="text-gray-600 mb-6">
          It looks like there are no categories available at the moment.
        </p>
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <div key={index} data-aos="fade-up">
          <Link
            href={`/categories/${category.id}`}
            className="block h-[210px] md:h-[270px]"
          >
            <Card
              className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[101%] h-full"
              style={{
                background: `linear-gradient(45deg, ${category.color}, ${category.color}CC)`,
              }}
            >
              <div className="overflow-hidden p-6 flex flex-col justify-between h-full">
                <div className="flex flex-col ">
                  <span className="text-base text-gray-200/80">{2025}</span>
                  <h2 className="text-white text-lg md:text-xl font-bold line-clamp-2 ">
                    {category.name}
                  </h2>
                  <p className="text-white/75 text-xs md:text-sm font-bold mt-2">
                    {category._count.creatorSubmission} Participants
                  </p>
                </div>

                <div className= "bottom-0 right-0 bg-white grid place-content-center translate-x-8 translate-y-8  min-h-24 max-h-24 max-w-24 min-w-24   self-end overflow-hidden rounded-sm transform rotate-[18deg] shadow-xl">
                  <span className="text-5xl ">{category.icon || ""}</span>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoriesContainer;
