import z, { string } from "zod";

export const singupInput = z.object({
  email: string().email(),
  password: string().min(6),
  name: string(),
});

export const singinInput = z.object({
  email: string().email(),
  password: string().min(6),
});

export const createBlogInput = z.object({
  title: string(),
  content: string(),
});

export const updateBlogInput = z.object({
  title: string(),
  content: string(),
  id: string(),
});

export type SingupInput = z.infer<typeof singupInput>;
export type SigninInput = z.infer<typeof singinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
