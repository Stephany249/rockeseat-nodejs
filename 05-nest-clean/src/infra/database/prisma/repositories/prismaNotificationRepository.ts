import { Injectable } from '@nestjs/common'
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper'
import { PrismaService } from '../prisma.service'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notificationsRepository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    })

    if (!notification) {
      return null
    }

    return PrismaNotificationMapper.toDomain(notification)
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification)

    await this.prisma.notification.create({
      data,
    })
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification)

    await this.prisma.notification.update({
      where: {
        id: notification.id.toString(),
      },
      data,
    })
  }
}
