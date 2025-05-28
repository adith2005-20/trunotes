# `TRUNOTES`

_Empower your notes, enhance your creativity effortlessly._

![last-commit](https://img.shields.io/github/last-commit/adith2005-20/trunotes?style=flat&logo=git&logoColor=white&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/adith2005-20/trunotes?style=flat&color=0080ff)
![repo-language-count](https://img.shields.io/github/languages/count/adith2005-20/trunotes?style=flat&color=0080ff)

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)

---

## Overview

**Trunotes** is a modern note-taking application built for developers and creators who want performance, simplicity, and flexibility. It’s designed with a mobile-first mindset and leverages full-stack type safety and real-time rendering.

### 🔥 Key Features

- **Next.js + tRPC Architecture:** Fully server-side rendered with type safety across client and server using TypeScript and tRPC.
- **TipTap-Based Editor:** Rich-text editing experience using TipTap, supporting formatting, markdown-style shortcuts, and more.
- **Neon PostgreSQL:** Backed by a scalable PostgreSQL database hosted on [Neon](https://neon.tech).
- **Google OAuth Authentication:** Log in quickly using Google accounts with NextAuth integration.
- **Mobile Responsive:** Seamless usage on both desktop and mobile devices.

---

## Getting Started

### Prerequisites

- **Bun** as the package manager
- **Node.js** v18+ recommended

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/adith2005-20/trunotes
    ```

2. **Navigate to the project directory:**

   ```sh
   cd trunotes
   ```

3. **Install dependencies with Bun:**

   ```sh
   bun install
   ```

### Usage

Start the development server:

```sh
bun run dev
```

> Note: A .env file has to be configured with the required environment variables as given in `src/env.js`.

