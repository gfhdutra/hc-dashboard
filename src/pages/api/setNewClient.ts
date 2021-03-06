import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'


const notion = new Client({ auth: process.env.NOTION_API_KEY })
export default async function setNewClient(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, cpf, email, phone, adress, clientDB } = req.body

  async function updateClient(clientPageId) {
    await notion.pages.update({
      page_id: clientPageId,
      archived: false,
      properties: {
        id: {
          type: "title",
          title: [
            {
              type: 'text',
              text: {
                content: clientPageId
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

  await notion.pages.create({
    parent: {
      database_id: clientDB,
    },
    properties: {
      id: {
        type: "title",
        title: [
          {
            type: 'text',
            text: {
              content: ''
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
              content: name
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
              content: cpf
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
              content: email
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
              content: phone
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
              content: adress
            }
          }
        ]
      },
      createdAt: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: ''
            }
          }
        ]
      },
    }
  })
    .then(response => {
      updateClient(response.id)
      // res.status(201).json({ message: 'Sucesso!' })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Ops, algo deu errado!' })
    })
}
