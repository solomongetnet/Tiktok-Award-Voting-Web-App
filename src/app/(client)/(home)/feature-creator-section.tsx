import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const nominees = [
  { id: 1, name: "Creator 1", category: "Best Dance", votes: 1234 },
  { id: 2, name: "Creator 2", category: "Best Comedy", votes: 5678 },
  { id: 3, name: "Creator 3", category: "Best Music", votes: 9012 },
];

export default function VotingSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Vote for Your Favorite Creators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nominees.map((nominee) => (
            <Card key={nominee.id}>
              <CardHeader>
                <CardTitle>{nominee.name}</CardTitle>
                <CardDescription>{nominee.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-center">
                  {nominee.votes.toLocaleString()} votes
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Vote Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
