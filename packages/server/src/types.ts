export interface Book {
  id: number;
  authorId: Author["id"];
  title: string;
  cover: {
    url: string;
  };
}

export interface Author {
  id: number;
  name: string;
  photo: {
    url: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: {
    image: {
      url: string;
    };
    color: string;
  };
}
