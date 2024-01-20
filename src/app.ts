import express, { Request, Response } from 'express'
import routes from './routes'
import { ZodError } from 'zod'
import cors from 'cors'

const app = express()
app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:5173',
}
app.use(cors(corsOptions))

app.use(routes)

// TODO: adjust middleware
app.use((error: unknown, _req: Request, res: Response) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ message: 'Validation error.', issues: error.issues })
  } else {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
})

export default app
