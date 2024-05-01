import { verify } from 'hono/jwt';
export const middleware = async (c, next) => {
    const header = await c.req.header("authorization");
    try {
        const { userId } = await verify(header.authorization, c.env.JWT_SECRET);
        console.log("middleware passed");
        c.set("userId", userId);
        await next();
        return;
    }
    catch (e) {
        console.log(e);
        c.status(403);
        return c.json({
            err: "you are not a valid user/ please login"
        });
    }
};
