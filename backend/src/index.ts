import { Hono } from 'hono'
import { userRoute } from '../routes/userRoutes'
import { blogRoute } from '../routes/blogRoutes'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET : string
	}
}>().basePath('/api/v1')


app.route('/user',userRoute)
app.route('/blog',blogRoute)
export default app
