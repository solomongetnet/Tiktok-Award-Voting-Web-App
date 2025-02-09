import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  // log: ["query", "info", "warn", "error"],
});

// // Middleware for logging queries
// prisma.$use(async (params, next) => {
//   const before = Date.now();
//   const result = await next(params);
//   const after = Date.now();

//   console.log(
//     `Query ${params.model}.${params.action} took ${after - before}ms`
//   );

//   return result;
// });

// // Middleware for error handling
// prisma.$use(async (params, next) => {
//   try {
//     return await next(params);
//   } catch (error) {
//     console.error(`Error in query ${params.model}.${params.action}:`, error);
//     throw error;
//   }
// });

export default prisma;
