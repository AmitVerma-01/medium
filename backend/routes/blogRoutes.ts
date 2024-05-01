import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { middleware } from "../src/authMIddleware";
import { createBlogInput, updateBlogInput } from "@techamit/medium-common";
import { cors } from "hono/cors";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
blogRoute.use(cors());
blogRoute.post("/post", middleware, async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
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
    const userId = c.get("userId");
    const res = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        published: body?.published,
      },
    });
    return c.json({
      blogId: res.id,
      msg: "post created succesfully",
    });
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.text("failed");
  }
});

blogRoute.put("/update/:id", middleware, async (c) => {
  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      messege: "Invalid Inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");

    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: body?.title,
        content: body?.content,
        published: body?.published,
      },
    });

    return c.json({
      msg: "post is update successfully",
    });
  } catch (error) {
    c.status(400);
    return c.json({
      msg: "Post updation failed",
    });
  }
});

blogRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const res = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      id: true,
      author: {
        select: { name: true },
      },
    },
  });
  console.log(res);
  return c.json({
    blogs: res,
  });
});

blogRoute.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  const res = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      title: true,
      content: true,
      author: {
        select: { name: true },
      },
    },
  });
  return c.json(res);
});
