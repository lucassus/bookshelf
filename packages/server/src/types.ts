export interface DbRecord {
  id: number;
}

export interface Book extends DbRecord {
  title: string;
  cover: {
    url: string;
  };
}

export interface Author extends DbRecord {
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
