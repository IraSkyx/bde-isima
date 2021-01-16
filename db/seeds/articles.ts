import faker from "faker"

const articles = async (db) => {
  for (let i = 0; i < 5; ++i) {
    await db.article.create({
      data: {
        name: faker.lorem.word(),
        price: parseFloat(faker.finance.amount()),
        member_price: parseFloat(faker.finance.amount()),
        image: faker.image.imageUrl(100, 100, undefined, false, true),
      },
    })
  }
}

export default articles
