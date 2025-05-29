/** @type {import ("drizzle-kit").Config} */

export default {
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://AIData_owner:npg_XDyABcnP6Ea1@ep-falling-wildflower-a1v1wre2-pooler.ap-southeast-1.aws.neon.tech/AIData?sslmode=require",
  },
};
