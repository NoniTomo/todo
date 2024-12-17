/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string // Пример: добавьте ваши переменные окружения
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
