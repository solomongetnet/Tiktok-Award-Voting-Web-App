"use client";

import { useState, useTransition, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SearchBarProps {
  initialQuery: string;
}

export default function SearchBar({ initialQuery }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e?: FormEvent) => {
    e?.preventDefault();
    
    if (query.trim()) {
      startTransition(() => {
        router.push(`?search=${encodeURIComponent(query)}`);
      });
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    startTransition(() => {
      router.push(window.location.pathname);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="sticky top-[160px]"
        >
          <Search className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg w-[90%] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Creators</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              id="search-input"
              type="text"
              placeholder="Search creators..."
              value={query}
              onChange={handleInputChange}
              className="flex-1"
              autoFocus
            />
            {query && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={handleClear}
                disabled={isPending}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={!query.trim() || isPending}>
            Search
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
