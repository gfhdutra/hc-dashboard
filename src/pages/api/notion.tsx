// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, email, password } = req.body

  await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID || '',
    },
    properties: {
      user: {
        type: "title",
        title: [
          {
            type: 'text',
            text: {
              content: user
            }
          }
        ]
      },
      email: {
        type: 'email',
        email: email
      },
      password: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: password
            }
          }
        ]
      }
    }
  }).then(() => {
    res.status(201).json({ message: 'Sucesso!' })
  }).catch((error) => {
    console.log(error)
    res.status(500).json({ message: 'Ops, algo deu errado!' })
  })
}