1. Cấu trúc thư mục
   src/
   ├── app/ # App Router: pages & layouts
   ├── components/ # Shared components
   ├── hooks/ # Custom hooks
   ├── lib/ # Helper, API clients
   ├── types/ # TypeScript types
   ├── styles/ # CSS/SCSS or Tailwind config
   └── utils/ # Utility functions

2. Quy tắc giao diện (UI)

   Sử dụng Tailwind CSS cho toàn bộ style.

   Component dùng chung đặt trong components/.

   Giữ component nhỏ, tái sử dụng, có kiểu rõ ràng.

   Ưu tiên dùng shadcn/ui và icon từ lucide-react để đồng bộ thiết kế.

3. Quy tắc đặt tên

| Loại            | Quy tắc                   | Ví dụ                 |
| --------------- | ------------------------- | --------------------- |
| Component       | PascalCase                | `VideoCard.tsx`       |
| Hook            | camelCase + tiền tố `use` | `useFetchData.ts`     |
| Thư mục         | kebab-case                | `video-list/`         |
| Biến môi trường | CHỮ HOA + GẠCH DƯỚI       | `NEXT_PUBLIC_API_URL` |

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
