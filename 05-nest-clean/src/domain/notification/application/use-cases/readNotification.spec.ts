import { makeNotification } from 'test/factories/makeNotification'
import { InMemoryNotificationsRepository } from 'test/repositories/inMemoryNotificationsRepository'
import { ReadNotificationUseCase } from './readNotification'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import { NotAllowedError } from '@/core/errors/notAllowedError'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const newNotification = makeNotification({
      recipientId: new UniqueEntityID('any_id'),
    })

    await inMemoryNotificationsRepository.create(newNotification)

    const result = await sut.execute({
      recipientId: 'any',
      notificationId: newNotification.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
