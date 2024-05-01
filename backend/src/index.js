import { Hono } from "hono";
import { userRoute } from "../routes/userRoutes";
import { blogRoute } from "../routes/blogRoutes";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api/v1");

app.use("/*", cors());
app.route("/user", userRoute);
app.route("/blog", blogRoute);
export default app;
