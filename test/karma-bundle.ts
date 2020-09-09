import '@rxjs-stuff/marbles/karma'

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp,
  ): {
    keys(): string[]
    <T>(id: string): T
  }
}

const context = require.context('../lib', true, /\.spec\.ts$/)
context.keys().map(context)
