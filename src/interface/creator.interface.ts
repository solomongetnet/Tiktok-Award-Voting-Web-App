import { ICategory } from "./category.interface";

export interface ICreator {
  id: string;
  name: string;
  description: string;
  username: string;
  followers: string;
  profilePic: string;
  votes?: Vote[];
  submissions?: Submission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateCreator {
  name: string;
  description: string;
  username: string;
  followers: string;
  profilePic?: string;
}

export interface INewCreator {
  name: string;
  description: string;
  username: string;
  followers: string;
}

interface Submission {
  id: string;
  creatorId: string;
  creator: ICreator;
  categoryId: string;
  category: ICategory;
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
}

interface Vote {
  id: string;
  userId: string;
  user: any;
  creatorId: string;
  creator: ICreator;
  submissionId?: string;
  submission?: Submission;
  createdAt: Date;
  updatedAt: Date;
}
