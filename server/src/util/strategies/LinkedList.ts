import ValueError from '../errors/ValueError';
import loggers from '../../infra/loggers';
import ListNode from './ListNode';

export default abstract class LinkedList<T> {
  //  Attributes
  name: string = 'LinkedList';
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;

  //  Methods = validation

  public validate_input_node(input: any) {
    if (!input) {
      const err_msg: string = `[${this.name}] error: empty object cannot be processed.`;
      loggers.app_logger.warn(err_msg);
      throw new ValueError(400, err_msg);
    }
  }

  //  Methods - update data structure

  public dequeue_node(): void {
    if (!this.head) return;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
  }

  public enqueue_node(node: ListNode<T>): void {
    this.validate_input_node(node);
    node.next = null;
    if (!this.tail) this.head = this.tail = node;
    else this.tail.next = node;
    this.tail = node;
  }

  //  Methods - input and output

  public get_head(): ListNode<T> | null {
    return this.head;
  }

  public convert_from_array(array: ListNode<T>[]): void {
    this.validate_input_node(array);
    this.head = this.tail = null;
    for (const node of array) this.enqueue_node(node);
  }

  public convert_to_array(): ListNode<T>[] {
    const output: ListNode<T>[] = [];
    let curr = this.head;
    while (curr) {
      output.push(curr);
      curr = curr.next;
    }
    return output;
  }
}
