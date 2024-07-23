export interface Link {
  id: string;
  platform: string;
  url: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
}
