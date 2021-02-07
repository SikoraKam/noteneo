import EventEmitter from 'eventemitter3';

interface EventHandler {
  (...args: any): void;
}

const bus = new EventEmitter();

/**
 * Wrapper around eventemitter library
 * Enables easier usage with React hooks
 */
export const EventBus = Object.freeze({
  on: (event: string, handler: EventHandler) => {
    bus.on(event, handler);
    return () => bus.off(event, handler);
  },
  once: (event: string, handler: EventHandler) => bus.once(event, handler),
  off: (event: string, handler: EventHandler) => bus.off(event, handler),
  emit: (event: string, payload?: unknown) => bus.emit(event, payload),
});
