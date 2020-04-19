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
  bookIds?: Book["id"][];
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
