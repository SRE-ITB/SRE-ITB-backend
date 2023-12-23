# SRE-ITB-backend

## Project Setup (Skip this because it's already done)

1. Initialize Project and Install Dependencies

```bash
npm init -y
npm i express dotenv cors express-validator @prisma/client
npm i -D typescript @types/node @types/express @types/dotenv @types/cors
npm i --save-dev prisma esbuild-register nodemon
```

2. Initialize Prisma

```bash
npx prisma init --datasource-provider mysql
```

## How to run

0. Seed the database

```bash
npx prisma db seed
```

1. Make sure the database is up to date

```bash
npx prisma db push
```

2. Install dependencies

```bash
npm install
```

3. Run the server

```bash
npm run dev
```
