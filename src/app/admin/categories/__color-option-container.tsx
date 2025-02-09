import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUnavailableCategoryColorsAction } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction } from "react";

const ColorPicker = ({
  availableColors,
  selectedColor,
  setSelectedColor,
}: {
  availableColors: string[];
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}) => {
  const { data: unavailableColors, isPending } = useQuery({
    queryKey: ["unavailableColors"],
    queryFn: () => getUnavailableCategoryColorsAction(),
  });

  return (
    <div className="grid grid-cols-1 gap-1">
      <Label htmlFor="color">Color Theme</Label>
      <div className="col-span-3 flex flex-wrap gap-2">
        {availableColors.map((colorOption) => (
          <button
            key={colorOption}
            type="button"
            className={`w-6 h-6 rounded-full ${
              selectedColor === colorOption
                ? "ring-2 ring-offset-2 ring-black"
                : ""
            } ${
              unavailableColors?.includes(colorOption)
                ? "opacity-90 ring-4"
                : ""
            }`}
            style={{ backgroundColor: colorOption }}
            onClick={() => setSelectedColor(colorOption)}
            disabled={isPending || unavailableColors?.includes(colorOption)}
          />
        ))}
        <Input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-6 h-6 p-0 border-0"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
