import faker from 'faker';
faker.seed(0); // so that mocks are always equal

export default [
  ...Array.from({ length: 100 })
    .fill('')
    .map(() => ({
      id: `HBPM${faker.phone.phoneNumber('###')}`,
      patient: {
        name: faker.name.findName(),
        ssn: faker.phone.phoneNumber('#########'),
      },
      physician: {
        name: faker.name.findName(),
      },
      status: faker.random.arrayElement(['draft', 'pending', 'pre-registered']),
      startDate: faker.date.between(
        new Date('01/01/2000'),
        new Date('01/01/2021')
      ),
    })),
];
