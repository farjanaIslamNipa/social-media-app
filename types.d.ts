import { Connection } from "mongoose"

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    connection: Connection | null
    promise: Promise<Connection> | null
  }
}

export {}