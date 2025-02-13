import { FakeEncrypter } from 'test/cryptography/fakeEncrypter'
import { FakeHasher } from 'test/cryptography/fakeHasher'

import { makeStudent } from 'test/factories/makeStudent'
import { InMemoryStudentsRepository } from 'test/repositories/inMemoryStudentsRepository'
import { AuthenticateStudentUseCase } from './authenticateStudent'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'john.doe@example.com',
      password: await fakeHasher.hash('password123'),
    })

    await inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
