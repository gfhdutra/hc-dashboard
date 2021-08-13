import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default async function updateUsers(req: NextApiRequest, res: NextApiResponse) {
  const { id, active } = req.body

  await notion.pages.update({
    page_id: id,
    archived: false,
    properties: {
      active: {
        type: 'checkbox',
        checkbox: active
      }
    }
  })
    .then(() => {
      res.status(201).json({ message: 'Sucesso!' })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Ops, algo deu errado!' })
    })
}
