import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  className?: string;
}

export function MetricCard({
  icon: Icon,
  value,
  label,
  change,
  className,
}: MetricCardProps) {
  const isPositive = change?.trend === "up";
  const changeValue = change ? Math.abs(change.value) : null;

  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="bg-primary/5 self-start p-3 rounded-full">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold tracking-tight">{value}</span>
              {change && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {isPositive ? "+" : "-"}
                  {changeValue}%
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
