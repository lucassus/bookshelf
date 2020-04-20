import { PORT } from "./config";
import { server } from "./server";

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
