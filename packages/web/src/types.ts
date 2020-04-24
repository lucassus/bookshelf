interface Image {
  url: string;
}

export interface Author {
  id: number;
  name: string;
  photo: Image;
  books: Book[];
}

export interface Book {
  id: number;
  title: string;
  cover: Image;
  author?: Author;
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
