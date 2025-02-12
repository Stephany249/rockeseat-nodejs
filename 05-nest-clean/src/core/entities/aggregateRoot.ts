import { Entity } from './entity'
import { DomainEvent } from '../events/domainEvent'
import { DomainEvents } from '../events/domainEvents'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents(): void {
    this._domainEvents = []
  }
}
