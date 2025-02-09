import { ICategory } from "./category.interface";
import { ICreator } from "./creator.interface";



export interface ICreatorSubmission {
  id: string;
  creatorId: string;
  creator: ICreator;
  categoryId: string;
  category: ICategory;
  _count?: {
    votes?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  id: string;
  userId: string;
  user: any;
  creatorId: string;
  creator: ICreator;
  creatorSubmissionId?: string;
  creatorSubmission?: ICreatorSubmission;
  createdAt: Date;
  updatedAt: Date;
}
