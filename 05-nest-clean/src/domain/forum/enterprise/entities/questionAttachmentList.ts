import { QuestionAttachment } from './questionAttachment'
import { WatchedList } from '@/core/entities/watchedList'

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
