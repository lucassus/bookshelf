interface Image {
  url: string;
}

export interface Author {
  name: string;
  photo: Image;
}

export interface User {
  name: string;
  email: string;
  avatar: {
    image: Image;
    color: string;
  };
}
