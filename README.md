# Sisva

## Stack

- Next.js 13
- BE written in Golang (separate repo)

## UI Tools

- [MUI v5](https://v5.mui.com/material-ui/getting-started/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Ant Design](https://ant.design/)

## Some usefull libraries, please use if possible

### [Mantine Hooks](https://mantine.dev/hooks/use-debounced-callback/)

Beberapa custom hook yang sering digunakan

- [useDebouncedCallback](https://mantine.dev/hooks/use-debounced-callback/)
- [useDebouncedState](https://mantine.dev/hooks/use-debounced-state/)
- [useDebouncedValue](https://mantine.dev/hooks/use-debounced-value/)
- [useMounted](https://mantine.dev/hooks/use-mounted/)
- [useLocalStorage](https://mantine.dev/hooks/use-local-storage/)

Please avoid using ~~useFootGun~~ useEffect as much as possible.

### [nuqs v1](https://nuqs.47ng.com/)

Type-safe search params state manager for React frameworks - Like useState, but stored in the URL query string.

### [fast-sort](https://github.com/snovakovic/fast-sort)

Blazing fast array sorting with TypeScript support.

### [fuse-js](https://www.fusejs.io/)

Powerful, lightweight fuzzy-search library, with zero dependencies.

### [reack-hook-form](https://www.react-hook-form.com/)

Performant, flexible and extensible forms with easy-to-use validation.

#### [yup](https://github.com/jquense/yup)

Ada yup untuk schema validation

#### [formik](https://formik.org/)

Sebelumnya pakai formik, tapi untuk fitur baru lebih baik pakai react-hook-form

### [axios](https://axios-http.com/)

Promise based HTTP client for the browser and node.js

### [Tanstack Query](https://tanstack.com/query/latest)

Powerful asynchronous state management for TS/JS, React, Solid, Vue, Svelte and Angular

### [Redux](https://redux.js.org/) with [Redux Toolkit](https://redux-toolkit.js.org/)

A JS library for predictable and maintainable global state management

### Others

`dayjs`, `clsx`, `xlsx`, See [package.json](package.json) for more.

## Typescript, Eslint, Prettier

Project ini awalnya didevelop tanpa Typescript dan Eslint, jadi banyak technical debt nya.
Jika ada ada config yang serasa kurang cocok bisa didiskusi dulu,
misalnya rule `react-hooks/exhaustive-deps`

### Typescript

Untuk fitur baru, lebih baik mulai pakai Typescript `.ts` atau `.tsx`, supaya dapat code intellisense dan linting.

### Eslint

Ada [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) untuk ngerapihin import. Pengguna VSCode bisa pasang setting ini untuk auto fix import saat save.

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "svelte"
  ]
}
```

## Script

See [package.json](package.json) for more.

### `npm run dev`

Start the development server.

### `npm run lint`

Check code style and linting.

### `npm run knip`

Check unused code.

### `npx next lint --fix`

Fix linting error.
