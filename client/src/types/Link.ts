export interface Link {
  readonly _id: string;
  title?: string;
  pathname: string;
  url: string;
  description?: string;
  tags?: string[];
  user: string;
  linkId: string;
}

export interface Tag {
  readonly _id: string;
  title?: string;
  description?: string;
  tagId: string;
  user: string;
}
