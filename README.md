## Porject test Fullstack di PT Bukit Asam

### clone project ini

### untuk Client jalankan dengan comment

```bash
npm run dev
```

### siapkan database PostgreSQL dan buat database dengan nama Tokoku

##

### siapkan file .env pada server dan kasih nilai

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/tokoku?schema=public"
```

### lalu lakukan comment untuk migration database

```bash
npx prisma db push
```

### untuk Server jalankan dengan comment

```bash
npm run start:dev
```

### untuk melihat documentasi API Swagger

#### ke url [gttp://localhost:3600/docs](http://localhost:3600/docs)
