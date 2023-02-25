import { Client } from "@elastic/elasticsearch";

export const client = new Client({
  cloud: {
    id: "collector:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRhOTMwY2ViNmM4MjE0MGU5ODUzNGVjMzVmZjQ0YTA0MiRiOGQwYThjODg4YmI0NTJhOGY4NjQ2ZmMxYmQyMDIwZQ=="
  },
  auth: {
    username: "elastic",
    password: "oZG3fjQAFIchNryAoWRgmUGa"
  }
});

client.ping().then(res => {
  checkIndeces();
});

const checkIndeces = () => {
  client.indices
    .exists({
      index: "items"
    })
    .then(exists => {
      if (exists === false) {
        client.indices.create({
          index: "items",
          body: {}
        });
      }
    });
};
