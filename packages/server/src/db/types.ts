export interface Book {
  id: number;
  authorId: Author["id"];
  title: string;
  coverPath: string;
}

export interface Author {
  id: number;
  name: string;
  photoPath: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: {
    imagePath: string;
    color: string;
  };
}
