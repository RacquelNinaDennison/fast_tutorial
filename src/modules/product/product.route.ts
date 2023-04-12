// import { FastifyInstance } from "fastify";
// import { createProductHandler, getProductsHandler } from "./product.controller";
// import { $ref } from "./product.schema";
// import { createProductSchema, productResponseSchema } from "./product.schema";

// async function productsRoutes(server: FastifyInstance) {
//   server.post(
//     "/",
//     {
//       preHandler: function () {
//         server.authenticate();
//       },
//       schema: {
//         body: createProductSchema,
//         response: {
//           201: productResponseSchema,
//         },
//       },
//     },
//     createProductHandler
//   );

//   server.get(
//     "/",
//     {
//       schema: {
//         response: {
//           200: $ref("productsResponseSchema"),
//         },
//       },
//     },

//     getProductsHandler
//   );
// }

// export default productsRoutes;

// productsRoutes.ts

// import { FastifyInstance } from "fastify";
// import { createProductHandler, getProductsHandler } from "./product.controller";
// import { $ref, productSchemas } from "./product.schema";

// async function productsRoutes(server: FastifyInstance) {
//   server.post(
//     "/",
//     {
//       preHandler: function () {
//         server.authenticate();
//       },
//       schema: {
//         body: productSchemas.createProductSchema,
//         response: {
//           201: productSchemas.productResponseSchema,
//         },
//       },
//     },
//     createProductHandler
//   );

//   server.get(
//     "/",
//     {
//       schema: {
//         response: {
//           200: $ref("ProductsSchema#/productResponseSchema"), // Use the correct schema here
//         },
//       },
//     },

//     getProductsHandler
//   );
// }

// export default productsRoutes;

// productsRoutes.ts

import { FastifyInstance } from "fastify";
import { createProductHandler } from "./product.controller";
import { createProductSchema, productResponseSchema } from "./product.schema";

async function productsRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: function () {
        server.authenticate();
      },
      schema: {
        body: createProductSchema,
        response: {
          201: productResponseSchema,
        },
      },
    },
    createProductHandler
  );
}
export default productsRoutes;
