import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'


const notion = new Client({ auth: process.env.NOTION_API_KEY })
export default async function setUsers(req: NextApiRequest, res: NextApiResponse) {
  const { user, email, password } = req.body

  async function createClientDatabase(pageId) {
    await notion.databases.create({
      parent: {
        page_id: pageId
      },
      title: [
        {
          type: "text",
          text: {
            content: "Clientes",
            link: null
          }
        }
      ],
      properties: {
        "Id": {
          "title": {}
        },
        "Nome Completo": {
          "rich_text": {}
        },
        "Cpf": {
          "rich_text": {}
        },
        "E-mail": {
          "rich_text": {}
        },
        "Telefone": {
          "rich_text": {}
        },
        "Endereço": {
          "rich_text": {}
        },
      }
    })
      .then(() => {
        res.status(201).json({ message: "criado com sucesso" })
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Ops, algo deu errado!' })
      })
  }

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
      },
      active: {
        type: "checkbox",
        checkbox: true
      }
    }
  })
    .then(response => {
      createClientDatabase(response.id)
      res.status(201).json({ message: 'Sucesso!' })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Ops, algo deu errado!' })
    })
}
