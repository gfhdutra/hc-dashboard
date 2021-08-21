import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default async function updateClient(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, cpf, email, phone, adress, archived } = req.body

  await notion.pages.update({
    page_id: id,
    archived: archived,
    properties: {
      id: {
        type: "title",
        title: [
          {
            type: 'text',
            text: {
              content: id
            }
          }
        ]
      },
      name: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: name ? name : ''
            }
          }
        ]
      },
      cpf: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: cpf ? cpf : ''
            }
          }
        ]
      },
      email: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: email ? email : ''
            }
          }
        ]
      },
      phone: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: phone ? phone : ''
            }
          }
        ]
      },
      adress: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: adress ? adress : ''
            }
          }
        ]
      },
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
