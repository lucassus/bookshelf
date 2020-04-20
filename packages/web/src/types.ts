interface Image {
  url: string;
}

// TODO: Figure out how to avoid naming collisions
export interface AuthorInterface {
  name: string;
  photo: Image;
}
