# 🧠 Contentify – AI-Powered Content Generation Platform

**Contentify** is your all-in-one AI content generation platform designed for creators, professionals, and businesses who need fast, editable, and intelligent content. Whether you're drafting documents, generating marketing copy, creating AI images, or using voice to prompt rich text, Contentify makes it seamless, powerful, and user-friendly.

---

## 🚀 Features

- ✍️ **AI-Powered Text Generation** – Generate custom, SEO-friendly content with just a prompt.
- 🎨 **AI Image Generation** – Turn words into visuals using prompt-based image generation.
- 🗣️ **Voice-to-Content** – Speak your ideas; Contentify transcribes and generates content instantly.
- 🔮 **Magic Prompting** – Choose from pre-defined creative templates or build your own.
- 🧠 **Grammar & Style Checking** – Instantly enhance the quality of your writing.
- 📝 **Rich Text Editing** – Edit, format, and enhance output using an intuitive WYSIWYG editor.
- 📦 **Multi-Format Export** – Export to DOCX, TXT, or HTML with a click.
- 🗂️ **Content History** – Track and manage your previously generated content, linked to your email.
- 👤 **User-Based Dashboard** – Secure, personalized dashboard with Clerk authentication.
- 📊 **Word Count & Metadata Logging** – Keep track of your writing output and activity.
- 🌐 **Multilingual Translation** – Translate generated content into various global languages.

---

## 🧩 Tech Stack

> You can skip this section if you're not a developer.

- **Frontend**: React, TailwindCSS, ShadCN/UI, Clerk (Authentication)
- **Backend**: Node.js (or your backend of choice), Firebase/Firestore (optional), Gemini AI API
- **AI Model**: Google Gemini Pro via API
- **Hosting**: Vercel or any static deployment platform

---

## ⚙️ How It Works

1. **Sign In** securely using Clerk.
2. **Access Dashboard** – Choose from AI content generation, image generation, or voice-based prompting.
3. **Input Prompt** – Type or speak your idea.
4. **AI Generation** – Gemini API handles intelligent generation in real-time.
5. **Edit or Copy** – Use the rich text editor or simply copy the output.
6. **Export or Save** – Save to history or export in DOCX, TXT, or HTML.

---

## 📦 Local Setup

```bash
git clone https://github.com/Nawazwariya182/CONTENTIFY-2.git
cd contentify
npm install or npm install --force
```

### 🔑 Add Environment Variables

Create a `.env` file in the root directory and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= YOUR CLECK PUBLISHABLE KEY
CLERK_SECRET_KEY=YOUR CLERK SECRET KEY
ANALYZE=true
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY= YOUR GEMINI AI API KEY
NEXT_PUBLIC_DRIZZLE_DB_URL= YOUR DRIZZLE DB URL
```

### 📁 Project Structure

```
/components     → Reusable UI components
/pages          → Route-based pages
/utils          → Helper functions and Gemini API logic
/styles         → Global and module styles
/public         → Static assets
```

## 🛡️ Security & Auth

- All routes are protected using Clerk.
- User content is stored with user-linked metadata for security and history retrieval.
- Only authenticated users can generate, edit, or view content.

## 📌 Roadmap

- [x] Text & Image Generation
- [x] Voice Input Integration
- [x] Custom Template Builder
- [x] History Dashboard
- [x] Export Functionality
- [ ] Collaboration Mode (Coming Soon)
- [ ] Mobile App (Planned)

## 🤝 Contributing

Contributions, ideas, and feature requests are welcome!

1. Fork the repo
2. Create your branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

Copyright © 2025 Nawaz & Tabish. All rights reserved.

## Project: Contentify (Proprietary Software)

This software is the exclusive property of the copyright holders.
Unauthorized copying, modification, redistribution, or use of any part
of this project — including the name "Contentify" — is strictly prohibited.

This software is confidential and proprietary. By accessing, using, or viewing
this repository, you agree to comply with the terms outlined in the LICENSE file.
For more details, refer to the LICENSE file in this repository.

## 📬 Contact

Have questions or suggestions? Reach out at: wariyanawaz@gmail.com

---

Built with ❤️ using AI, React, and a vision for the future of content creation.
