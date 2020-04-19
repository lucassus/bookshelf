export interface DbRecord {
  id: number;
}

export interface Book extends DbRecord {
  authorId: Author["id"];
  title: string;
  cover: {
    url: string;
  };
}

export interface Author extends DbRecord {
  bookIds?: Book["id"][];
  name: string;
  photo: {
    url: string;
  };
}

export interface User extends DbRecord {
  name: string;
  email: string;
  avatar: {
    image: {
      url: string;
    };
    color: string;
  };
}
