export type User = {
  _id: string,
  name: string,
  email: string,
  password: string,
  position: 'admin' | 'waiter',
}