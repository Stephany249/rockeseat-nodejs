import { InMemoryNotificationsRepository } from 'test/repositories/inMemoryNotificationsRepository'
import { SendNotificationUseCase } from './sendNotification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: 'any_id',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.notifications[0]).toEqual(
      result.value?.notification,
    )
  })
})
