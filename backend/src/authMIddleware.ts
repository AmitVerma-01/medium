import { verify } from "hono/jwt";

export const middleware = async (c: any, next: any) => {
  try {
    const header = c.req.header("authorization");
    console.log("middleware started " + header);

    if (!header) {
      throw new Error("Authorization header not found");
    }

    const token = header;
    const { userId } = await verify(token, c.env.JWT_SECRET);
    console.log(userId);

    c.set("userId", userId);
    await next();
    return;
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({
      err: "you are not a valid user/ please login",
    });
  }
};
