import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'


const notion = new Client({ auth: process.env.NOTION_API_KEY })
export default async function setUsers(req: NextApiRequest, res: NextApiResponse) {
  const { user, email, password } = req.body
  let newClientDatabaseId

  async function updateClientDB(newUserPageId, newClientDatabaseId) {
    await notion.pages.update({
      page_id: newUserPageId,
      archived: false,
      properties: {
        clientDB: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: newClientDatabaseId
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

  async function createClientDatabase(newUserPageId) {
    await notion.databases.create({
      parent: {
        page_id: newUserPageId
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
        id: {
          title: {}
        },
        name: {
          rich_text: {}
        },
        cpf: {
          rich_text: {}
        },
        email: {
          rich_text: {}
        },
        phone: {
          rich_text: {}
        },
        adress: {
          rich_text: {}
        },
        createdAt: {
          created_time: {}
        },
      }
    })
      .then(response => {
        newClientDatabaseId = response.id
        updateClientDB(newUserPageId, newClientDatabaseId)
        // res.status(201).json({ message: 'Sucesso!' })
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
      clientDB: {
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
      active: {
        type: "checkbox",
        checkbox: false
      }
    }
  })
    .then(response => {
      let newUserPageId = response.id
      createClientDatabase(newUserPageId)
      // res.status(201).json({ message: 'Sucesso!' })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Ops, algo deu errado!' })
    })
}
