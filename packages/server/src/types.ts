interface Image {
  url: string;
}

export interface Book {
  id: number;
  authorId: Author["id"];
  title: string;
  cover: Image;
}

export interface Author {
  id: number;
  name: string;
  photo: Image;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: {
    image: Image;
    color: string;
  };
}
