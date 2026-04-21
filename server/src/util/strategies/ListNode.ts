export default class ListNode<T> {
  //  Attribute
  weight: number;
  data: T;
  next: ListNode<T> | null = null;

  //  Constructor
  constructor(weight: number, data: T) {
    this.weight = weight;
    this.data = data;
  }

  //  Methods
}
