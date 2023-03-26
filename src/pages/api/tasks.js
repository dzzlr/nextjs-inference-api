// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    { 
      _id: 1,
      name: 'Indonesia News Title',
      task: 'Text Classification',
      category: 'NLP',
      status: 'Ready',
      url: '/predict-news-title'
    },
    { 
      _id: 2,
      name: 'ABSA Casa',
      task: 'Text Classification',
      category: 'NLP',
      status: 'On Develop',
      url: '/predict-news-title'
    },
    { 
      _id: 3,
      name: 'e-KYC',
      task: 'Object Detection',
      category: 'OCR',
      status: 'On Develop',
      url: '/predict-news-title'
    },
  ])
}
