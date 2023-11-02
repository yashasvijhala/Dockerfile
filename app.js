const express = require('express')
const { generatePdf } = require('@ejekanshjain/html-pdf')

const app = express()

app.get('/pdf', async (req, res) => {
  console.log('Generating PDF')

  const serverless = process.env.SERVERLESS === 'true'

  const htmlContent = require('fs').readFileSync('test.html', 'utf-8')
  const pdfBuffer = await generatePdf(
    {
      content: htmlContent
    },
    {
      format: 'A4'
    },
    serverless
      ? {
          executablePath: '/usr/bin/google-chrome',
          args: ['--no-sandbox', '--disable-gpu', '--disable-setuid-sandbox'],
          headless: 'new'
        }
      : {
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
  )

  res.send(pdfBuffer)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
