import { AnswerAttachment } from './answerAttachment'
import { WatchedList } from '@/core/entities/watchedList'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
