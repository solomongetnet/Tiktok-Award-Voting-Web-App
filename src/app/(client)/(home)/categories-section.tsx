import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllCategoriesForClientAction } from "@/server/actions";

export default async function CategoriesSection() {
  const categories = await getAllCategoriesForClientAction();
  const displayCategories = categories.slice(0, 6); // Limit to 6 categories for homepage

  if (categories.length === 0) {
    return <div className="min-h-20"></div>;
  }

  return (
    <section className="py-12 bg-gray-50" >
      <div className="container mx-auto px-4">
        <header className="mb-10" data-aos='fade-up'>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Top Categories
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((category, index) => (
            <Link
              href={`/categories/${category.id}`}
              key={index}
              className="group"
              data-aos="fade-right"
              data-aos-delay={50 * (index + 1)}
            >
              <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-lg h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category._count.creatorSubmission} Participants
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl transform group-hover:rotate-12 transition-transform duration-300"
                      style={{ backgroundColor: category.color + "33" }} // Adding some transparency
                    >
                      {"🏆"}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="h-2 rounded-full transition-all duration-500 ease-out group-hover:w-full"
                      style={{
                        width: `100%`,
                        backgroundColor: category.color,
                      }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
