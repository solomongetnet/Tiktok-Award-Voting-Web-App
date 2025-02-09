export interface ICategory {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  maxEntries: number;
  isActive: boolean;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewCategory {
  name: string;
  description: string;
  icon: string;
  maxEntries: number;
  isActive: boolean;
  color: string;
}

export interface IUpdateCategory {
  name: string;
  description: string;
  icon: string;
  maxEntries: number;
  isActive: boolean;
  color: string;
}
