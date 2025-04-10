import { BADGE_CRITERIA } from "@/constants";
import { IUser } from "@/models/user.model";
import { Schema } from "mongoose";
export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}
export interface Job {
  id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}
export interface Country {
  name: {
    common: string;
  };
}
export interface ParamsProps {
  params: { id: string };
}
export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}
export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}
export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateAnswerParams {
  content: string;
  author: string; // User ID
  question: string; // Question ID
  path: string;
}
export interface GetAnswersParams {
  questionId: string;

  sortBy?: string;
  page?: number;
  pageSize?: number;
}
export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}
export interface DeleteAnswerParams {
  answerId: string;
  path: string;
}
export interface SearchParams {
  query?: string | null;
  type?: string | null;
}
export interface RecommendedParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface JobFilterParams {
  query: string;
  page: string;
}
export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}
export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}
export interface GetQuestionByIdParams {
  questionId: string;
}
export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}
export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}
export interface EditQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}
export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
export interface GetQuestionsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}
export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}
export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}
export interface GetUserByIdParams {
  userId: string;
}
export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}
export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}
export interface ToggleSaveQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}
export interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}
export interface DeleteUserParams {
  clerkId: string;
}

export interface GetUserByIdParams {
  userId: string;
}
export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}
export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}
export interface ToggleSaveQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}
export interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}
export interface DeleteUserParams {
  clerkId: string;
}

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  picture: string;
  name: string;
  bio: string;
  reputation: number;
  saved: string[]; // assuming saved is an array of question IDs or similar
  createdAt: Date;
  updatedAt: Date;
  joinedAt: Date;
  __v: number;
}
