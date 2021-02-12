import faker from "faker"

export default [
  ...Array.from({ length: 100 })
    .fill("")
    .map(() => ({
      id: `HBPM${faker.phone.phoneNumber("###")}`,
      patient: {
        name: faker.name.findName(),
        ssn: faker.phone.phoneNumber("#########"),
      },
      physician: {
        name: faker.name.findName(),
      },
      status: faker.random.arrayElement(["draft", "pending", "pre-registered"]),
      startDate: faker.date.past(),
    })),
]
