import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'

interface AttachmentProps {
  title: string
  url: string
}

export class Attachment extends Entity<AttachmentProps> {
  get title(): string {
    return this.props.title
  }

  get url(): string {
    return this.props.url
  }

  static create(props: AttachmentProps, id?: UniqueEntityID): Attachment {
    return new Attachment(props, id)
  }
}
