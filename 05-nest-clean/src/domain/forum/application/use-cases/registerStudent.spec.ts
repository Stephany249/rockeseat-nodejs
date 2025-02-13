import { FakeHasher } from 'test/cryptography/fakeHasher'

import { InMemoryStudentsRepository } from 'test/repositories/inMemoryStudentsRepository'
import { RegisterStudentUseCase } from './registerStudent'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.students[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    const hashedPassword = await fakeHasher.hash('password123')

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryStudentsRepository.students[0].password).toEqual(
      hashedPassword,
    )
  })
})
