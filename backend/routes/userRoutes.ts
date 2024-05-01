import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { middleware } from "../src/authMIddleware";
import { singinInput, singupInput } from "@techamit/medium-common";
import { cors } from "hono/cors";
export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    user: any;
  };
}>();
userRoute.use("/*", cors());
userRoute.post("/signup", async (c) => {
  const body = await c.req.json();
  console.log(body);
  const { success } = singupInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({
      error: "Invalid input",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user) {
      return c.json({
        err: "user already registered, please login",
      });
    }
    const res = await prisma.user.create({
      data: body,
    });
    console.log(res);
    const token = await sign({ userId: res.id }, c.env.JWT_SECRET);

    return c.json({
      Token: token,
      name: res.name,
    });
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({
      error: "error while signing up",
    });
  }
});

userRoute.post("/signin", async (c) => {
  const body = await c.req.json();

  const { success } = singinInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({
      error: "Invalid input",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    c.status(411);
    return c.json({
      err: "User not found",
    });
  }
  const jwt = await sign({ userId: user.id }, c.env.JWT_SECRET);

  return c.json({
    Token: jwt,
    name: user.name,
  });
});

userRoute.get("/blog", middleware, async (c) => {
  const prism = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const res = await prism.post.findMany({
    where: {
      authorId: c.get("userId"),
    },
  });

  return c.json({
    userBlog: res,
  });
});

userRoute.get("verify", middleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: c.get("userId"),
      },
      include: {
        posts: true,
      },
    });
    if (!user) {
      c.status(404);
      return c.json({
        check: false,
      });
    } else {
      c.status(200);
      return c.json({
        check: true,
        name: user.name,
        posts: user.posts,
      });
    }
  } catch (error) {
    c.status(500);
    return c.json({
      err: "error while verifying user",
    });
  }
});
{
  /*
userRoute.get("/user/:token", middleware, async (c) => {
  const token = c.req.params.token;
  const { userId } = await verify(token, c.env.JWT_SECRET);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    c.status(404);
    return c.json({
      check: false,
    });
  }
  return c.json({
    check: true,
  });
});*/
}
