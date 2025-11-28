export interface Comment {
  commentId: string;
  videoId: string;
  userId: string;
  userName: string;
  userAvatarUrl: string;
  content: string;
  parentCommentId: string | null;
  likeCount: number;
  replyCount: number;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string | null;
  replies: Comment[] | null;
}

export interface CommentVideo {
  videoId: string;
  comments: Comment[];
  totalCount: number;
  rootCommentsCount: number;
  repliesCount: number;
}

export interface CommentVideoForm {
  videoId: string;
  sortBy: string | undefined;
  limit: number;
  offset: number;
  includeReplies: boolean;
  parentCommentId: string | undefined;
}

export interface PostCommentForm {
  content: string;
  parentCommentId: string | "";
}