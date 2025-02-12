/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import { AnswerComment, AnswerCommentProps } from '@/domain/forum/enterprise/entities/answerComment'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const answer = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
