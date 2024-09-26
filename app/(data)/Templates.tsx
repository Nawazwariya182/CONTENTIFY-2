import { TEMPLATE } from "../dashboard/_component/TemplateCard";

const Templates: TEMPLATE[] =[
    {
        "name": "AI Translator",
        "desc": "A tool that translates text from one language to another based on user input.",
        "category": "Translation",
        "icon": "https://cdn-icons-png.flaticon.com/128/482/482631.png",
        "aiprompt": "Translate the provided text from the source language to the target language with its pronunciation in english character and display the result in a rich text editor format.",
        "slug": "AI-Translator",
        "form": [
            {
                "label": "Enter the text to translate",
                "field": "textarea",
                "name": "text",
                "required": true
            },
            {
                "label": "Enter the source language",
                "field": "input",
                "name": "source_language",
                "required": false
            },
            {
                "label": "Enter the target language",
                "field": "input",
                "name": "target_language",
                "required": true
            }
        ]
    },
    {
        "name": "AI Text Summarizer",
        "desc": "A tool that summarizes text based on user input.",
        "category": "Summarization",
        "icon": "https://cdn-icons-png.flaticon.com/128/1387/1387672.png",
        "aiprompt": "Summarize the provided text and display the result in a rich text editor format.",
        "slug": "AI-Text-Summarizer",
        "form": [
            {
                "label": "Enter the text to summarize",
                "field": "textarea",
                "name": "text",
                "required": true
            }
        ]
    },    
    {
        "name": "Paraphrasing and Rewriting Tool",
        "desc": "A tool that rewrites or paraphrases text based on user input.",
        "category": "Paraphrasing",
        "icon": "https://cdn-icons-png.flaticon.com/128/2211/2211342.png",
        "aiprompt": "Paraphrase or rewrite the provided text and display the result in a rich text editor format.",
        "slug": "Paraphrasing-Rewriting-Tool",
        "form": [
            {
                "label": "Enter the text to paraphrase or rewrite",
                "field": "textarea",
                "name": "text",
                "required": true
            }
        ]
    },    
    {
        "name": "Grammar and Style Checker",
        "desc": "A tool that checks grammar and allows the user to choose a writing style for improvement.",
        "category": "Writing Assistant",
        "icon": "https://cdn-icons-png.flaticon.com/128/753/753345.png",
        "aiprompt": "Check the grammar of the provided text and improve the style based on the selected option. Display the result in a rich text editor format.",
        "slug": "Grammar-Style-Checker",
        "form": [
            {
                "label": "Enter the text for grammar and style check",
                "field": "textarea",
                "name": "text",
                "required": true
            },
            {
                "label": "Choose the style e.g., formal, casual, creative) for rewriting",
                "field": "input",
                "name": "style",
                "required": true,
                // "placeholder": "Enter style (e.g., formal, casual, creative)"
            }
        ]
    },    
    {
        "name": "Data-Driven Content Generator",
        "desc": "A tool that generates charts, tables, and other data visualizations based on the provided data.",
        "category": "Data Visualization",
        "icon": "https://cdn-icons-png.flaticon.com/128/888/888879.png",
        "aiprompt": "Generate a data-driven visualization table based on the provided data and display it in a rich text editor format.",
        "slug": "Data-Driven-Content",
        "form": [
            {
                "label": "Enter the data (CSV or JSON format)",
                "field": "textarea",
                "name": "data",
                "required": true,
                // "placeholder": "e.g., name,value\nApples,50\nBananas,30"
            },
        ]
    },    
    {
        name: "Blog Title",
        desc: "An AI tool that generates blog titles based on your blog information.",
        category: "Blog",
        icon: "https://cdn-icons-png.flaticon.com/128/2799/2799932.png",
        aiprompt: "Give me 5 blog topic ideas in bullet points based on the given niche and outline, and provide the result in a rich text editor format.",
        slug: "Generate-Blog-Title",
        form: [
            {
                label: "Enter your blog niche",
                field: "input",
                name: "niche",
                required: true
            },
            {
                label: "Enter blog outline",
                field: "textarea",
                name: "outline",
            }
        ]
    },
    {
        name: "Blog Introduction",
        desc: "An AI tool that generates an introduction for your blog post based on your niche and outline.",
        category: "Blog",
        icon: "https://cdn-icons-png.flaticon.com/128/14149/14149933.png",
        aiprompt: "Generate an engaging introduction for a blog post based on the given niche and outline. Provide the result in a rich text editor format.",
        slug: "Generate-Blog-Introduction",
        form: [
            {
                label: "Enter your blog niche",
                field: "input",
                name: "niche",
                required: true
            },
            {
                label: "Enter blog outline",
                field: "textarea",
                name: "outline",
                required: true
            }
        ]
    },
    {
        name: "Product Description",
        desc: "An AI tool that generates product descriptions based on the product details provided.",
        category: "E-commerce",
        icon: "https://cdn-icons-png.flaticon.com/128/1356/1356321.png",
        aiprompt: "Generate a detailed and engaging product description based on the given product name, features, and benefits. Provide the result in a rich text editor format.",
        slug: "Generate-Product-Description",
        form: [
            {
                label: "Enter product name",
                field: "input",
                name: "productName",
                required: true
            },
            {
                label: "Enter product features",
                field: "textarea",
                name: "features",
                required: true
            },
            {
                label: "Enter product benefits",
                field: "textarea",
                name: "benefits",
                required: true
            }
        ]
    },
    {
        name: "Social Media Post",
        desc: "An AI tool that generates social media posts based on the given topic and tone.",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/4612/4612349.png",
        aiprompt: "Generate a compelling social media post based on the given topic and tone. Provide the result in a rich text editor format.",
        slug: "Generate-Social-Media-Post",
        form: [
            {
                label: "Enter post topic",
                field: "input",
                name: "topic",
                required: true
            },
            {
                label: "Enter preferred tone (e.g., casual, professional, humorous)",
                field: "input",
                name: "tone",
                required: true
            }
        ]
    },
    {
        name: "Email Newsletter",
        desc: "An AI tool that generates email newsletters based on the provided information.",
        category: "Email",
        icon: "https://cdn-icons-png.flaticon.com/128/5825/5825572.png",
        aiprompt: "Generate an engaging email newsletter based on the given topic, key points, and audience. Provide the result in a rich text editor format.",
        slug: "Generate-Email-Newsletter",
        form: [
            {
                label: "Enter email topic",
                field: "input",
                name: "topic",
                required: true
            },
            {
                label: "Enter key points to cover",
                field: "textarea",
                name: "keyPoints",
                required: true
            },
            {
                label: "Enter target audience",
                field: "input",
                name: "audience",
                required: true
            }
        ]
    },
    {
        name: "SEO Meta Description",
        desc: "An AI tool that generates SEO meta descriptions based on the provided content.",
        category: "SEO",
        icon: "https://cdn-icons-png.flaticon.com/128/6515/6515170.png",
        aiprompt: "Generate an SEO-friendly meta description based on the given content. Provide the result in a rich text editor format.",
        slug: "Generate-SEO-Meta-Description",
        form: [
            {
                label: "Enter content",
                field: "textarea",
                name: "content",
                required: true
            }
        ]
    },
    {
        name: "Landing Page Copy",
        desc: "An AI tool that generates landing page copy based on the provided product or service details.",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/15763/15763976.png",
        aiprompt: "Generate persuasive landing page copy based on the given product or service details. Provide the result in a rich text editor format.",
        slug: "Generate-Landing-Page-Copy",
        form: [
            {
                label: "Enter product/service name",
                field: "input",
                name: "productServiceName",
                required: true
            },
            {
                label: "Enter product/service features",
                field: "textarea",
                name: "features",
                required: true
            },
            {
                label: "Enter target audience",
                field: "input",
                name: "audience",
                required: true
            }
        ]
    },
    {
        name: "Ad Copy",
        desc: "An AI tool that generates ad copy based on the provided product or service details.",
        category: "Advertising",
        icon: "https://cdn-icons-png.flaticon.com/128/5357/5357939.png",
        aiprompt: "Generate compelling ad copy based on the given product or service details. Provide the result in a rich text editor format.",
        slug: "Generate-Ad-Copy",
        form: [
            {
                label: "Enter product/service name",
                field: "input",
                name: "productServiceName",
                required: true
            },
            {
                label: "Enter key benefits",
                field: "textarea",
                name: "benefits",
                required: true
            },
            {
                label: "Enter target audience",
                field: "input",
                name: "audience",
                required: true
            }
        ]
    },
    {
        name: "Video Script",
        desc: "An AI tool that generates video scripts based on the provided topic and outline.",
        category: "Video",
        icon: "https://cdn-icons-png.flaticon.com/128/4081/4081388.png",
        aiprompt: "Generate an engaging video script based on the given topic and outline. Provide the result in a rich text editor format.",
        slug: "Generate-Video-Script",
        form: [
            {
                label: "Enter video topic",
                field: "input",
                name: "topic",
                required: true
            },
            {
                label: "Enter video outline",
                field: "textarea",
                name: "outline",
                required: true
            }
        ]
    },
    {
        name: "Podcast Script",
        desc: "An AI tool that generates podcast scripts based on the provided topic and outline.",
        category: "Podcast",
        icon: "https://cdn-icons-png.flaticon.com/128/8004/8004056.png",
        aiprompt: "Generate an engaging podcast script based on the given topic and outline. Provide the result in a rich text editor format.",
        slug: "Generate-Podcast-Script",
        form: [
            {
                label: "Enter podcast topic",
                field: "input",
                name: "topic",
                required: true
            },
            {
                label: "Enter podcast outline",
                field: "textarea",
                name: "outline",
                required: true
            }
        ]
    },
    {
        name: "Press Release",
        desc: "An AI tool that generates press releases based on the provided information.",
        category: "Public Relations",
        icon: "https://cdn-icons-png.flaticon.com/128/5395/5395809.png",
        aiprompt: "Generate a professional press release based on the given information. Provide the result in a rich text editor format.",
        slug: "Generate-Press-Release",
        form: [
            {
                label: "Enter press release topic",
                field: "input",
                name: "topic",
                required: true
            },
            {
                label: "Enter key points",
                field: "textarea",
                name: "keyPoints",
                required: true
            }
        ]
    },
    {
        name: "White Paper",
        desc: "An AI tool that generates white papers based on the provided information.",
        category: "Business",
        icon: "https://cdn-icons-png.flaticon.com/128/2377/2377960.png",
        aiprompt: "Generate a comprehensive white paper based on the given topic and key points. Provide the result in a rich text editor format.",
        slug: "Generate-White-Paper",
        form: [
            {
                label: "Enter white paper topic",
                field: "input",
                name: "topic",
                required: true
            },
            {
                label: "Enter key points",
                field: "textarea",
                name: "keyPoints",
                required: true
            }
        ]
    },
    {
        name: "Case Study",
        desc: "An AI tool that generates case studies based on the provided information.",
        category: "Business",
        icon: "https://cdn-icons-png.flaticon.com/128/5738/5738486.png",
        aiprompt: "Generate a detailed case study based on the given topic and key points. Provide the result in a rich text editor format.",
        slug: "Generate-Case-Study",
        form: [
            {
                label: "Enter case study topic",
                field: "input",
                name: "topic",
                required: true
            },
            {
                label: "Enter key points",
                field: "textarea",
                name: "keyPoints",
                required: true
            }
        ]
    },
    {
        name: "Resume",
        desc: "An AI tool that generates resumes based on the provided personal and professional information.",
        category: "Career",
        icon: "https://cdn-icons-png.flaticon.com/128/2815/2815429.png",
        aiprompt: "Generate a professional resume based on the given personal and professional information. Provide the result in a rich text editor format.",
        slug: "Generate-Resume",
        form: [
            {
                label: "Enter your name",
                field: "input",
                name: "name",
                required: true
            },
            {
                label: "Enter your contact information",
                field: "textarea",
                name: "contactInfo",
                required: true
            },
            {
                label: "Enter your professional summary",
                field: "textarea",
                name: "summary",
                required: true
            },
            {
                label: "Enter your work experience",
                field: "textarea",
                name: "experience",
                required: true
            },
            {
                label: "Enter your education",
                field: "textarea",
                name: "education",
                required: true
            },
            {
                label: "Enter your skills",
                field: "textarea",
                name: "skills",
                required: true
            }
        ]
    },
    {
        name: "Cover Letter",
        desc: "An AI tool that generates cover letters based on the provided personal and professional information.",
        category: "Career",
        icon: "https://cdn-icons-png.flaticon.com/128/10488/10488917.png",
        aiprompt: "Generate a professional cover letter based on the given personal and professional information. Provide the result in a rich text editor format.",
        slug: "Generate-Cover-Letter",
        form: [
            {
                label: "Enter your name",
                field: "input",
                name: "name",
                required: true
            },
            {
                label: "Enter your contact information",
                field: "textarea",
                name: "contactInfo",
                required: true
            },
            {
                label: "Enter the job title you are applying for",
                field: "input",
                name: "jobTitle",
                required: true
            },
            {
                label: "Enter your professional summary",
                field: "textarea",
                name: "summary",
                required: true
            },
            {
                label: "Enter your work experience",
                field: "textarea",
                name: "experience",
                required: true
            },
            {
                label: "Enter your education",
                field: "textarea",
                name: "education",
                required: true
            },
            {
                label: "Enter your skills",
                field: "textarea",
                name: "skills",
                required: true
            }
        ]
    },
    {
        name: "Thank You Note",
        desc: "An AI tool that generates thank you notes based on the provided details.",
        category: "Personal",
        icon: "https://cdn-icons-png.flaticon.com/128/5960/5960054.png",
        aiprompt: "Generate a sincere thank you note based on the given details. Provide the result in a rich text editor format.",
        slug: "Generate-Thank-You-Note",
        form: [
            {
                label: "Enter recipient's name",
                field: "input",
                name: "recipientName",
                required: true
            },
            {
                label: "Enter the reason for thanking",
                field: "textarea",
                name: "reason",
                required: true
            }
        ]
    },
    {
        name: "Invitation",
        desc: "An AI tool that generates invitations based on the provided event details.",
        category: "Personal",
        icon: "https://cdn-icons-png.flaticon.com/128/2357/2357448.png",
        aiprompt: "Generate a formal invitation based on the given event details. Provide the result in a rich text editor format.",
        slug: "Generate-Invitation",
        form: [
            {
                label: "Enter event name",
                field: "input",
                name: "eventName",
                required: true
            },
            {
                label: "Enter event date and time",
                field: "input",
                name: "eventDateTime",
                required: true
            },
            {
                label: "Enter event location",
                field: "input",
                name: "eventLocation",
                required: true
            },
            {
                label: "Enter additional details",
                field: "textarea",
                name: "additionalDetails",
            }
        ]
    },
    {
        name: "Event Announcement",
        desc: "An AI tool that generates event announcements based on the provided event details.",
        category: "Events",
        icon: "https://cdn-icons-png.flaticon.com/128/4367/4367908.png",
        aiprompt: "Generate an engaging event announcement based on the given event details. Provide the result in a rich text editor format.",
        slug: "Generate-Event-Announcement",
        form: [
            {
                label: "Enter event name",
                field: "input",
                name: "eventName",
                required: true
            },
            {
                label: "Enter event date and time",
                field: "input",
                name: "eventDateTime",
                required: true
            },
            {
                label: "Enter event location",
                field: "input",
                name: "eventLocation",
                required: true
            },
            {
                label: "Enter additional details",
                field: "textarea",
                name: "additionalDetails",
            }
        ]
    },
    {
        name: "Workout Plan",
        desc: "An AI tool that generates workout plans based on the provided fitness goals and preferences.",
        category: "Fitness",
        icon: "https://cdn-icons-png.flaticon.com/128/7118/7118261.png",
        aiprompt: "Generate a detailed workout plan based on the given fitness goals and preferences. Provide the result in a rich text editor format.",
        slug: "Generate-Workout-Plan",
        form: [
            {
                label: "Enter your fitness goals",
                field: "textarea",
                name: "fitnessGoals",
                required: true
            },
            {
                label: "Enter your workout preferences",
                field: "textarea",
                name: "preferences",
                required: true
            }
        ]
    },
    {
        name: "Job Description",
        desc: "An AI tool that generates job descriptions based on the provided role and requirements.",
        category: "Human Resources",
        icon: "https://cdn-icons-png.flaticon.com/128/3862/3862643.png",
        aiprompt: "Generate a detailed job description based on the given role and requirements. Provide the result in a rich text editor format.",
        slug: "Generate-Job-Description",
        form: [
            {
                label: "Enter job title",
                field: "input",
                name: "jobTitle",
                required: true
            },
            {
                label: "Enter job requirements",
                field: "textarea",
                name: "requirements",
                required: true
            },
            {
                label: "Enter job responsibilities",
                field: "textarea",
                name: "responsibilities",
                required: true
            }
        ]
    },
    {
        name: "Employee Handbook",
        desc: "An AI tool that generates employee handbooks based on the provided company policies and guidelines.",
        category: "Human Resources",
        icon: "https://cdn-icons-png.flaticon.com/128/15325/15325623.png",
        aiprompt: "Generate a comprehensive employee handbook based on the given company policies and guidelines. Provide the result in a rich text editor format.",
        slug: "Generate-Employee-Handbook",
        form: [
            {
                label: "Enter company name",
                field: "input",
                name: "companyName",
                required: true
            },
            {
                label: "Enter company policies",
                field: "textarea",
                name: "policies",
                required: true
            },
            {
                label: "Enter company guidelines",
                field: "textarea",
                name: "guidelines",
                required: true
            }
        ]
    },
    {
        name: "Meeting Agenda",
        desc: "An AI tool that generates meeting agendas based on the provided details.",
        category: "Business",
        icon: "https://cdn-icons-png.flaticon.com/128/7341/7341878.png",
        aiprompt: "Generate a detailed meeting agenda based on the given details. Provide the result in a rich text editor format.",
        slug: "Generate-Meeting-Agenda",
        form: [
            {
                label: "Enter meeting topic",
                field: "input",
                name: "topic",
                required: true
            },
            {
                label: "Enter meeting date and time",
                field: "input",
                name: "dateTime",
                required: true
            },
            {
                label: "Enter meeting location",
                field: "input",
                name: "location",
                required: true
            },
            {
                label: "Enter key points to discuss",
                field: "textarea",
                name: "keyPoints",
                required: true
            }
        ]
    },
    {
        name: "Speech",
        desc: "An AI tool that generates speeches based on the provided topic and key points.",
        category: "Public Speaking",
        icon: "https://cdn-icons-png.flaticon.com/128/2298/2298249.png",
        aiprompt: "Generate a compelling speech based on the given topic and key points. Provide the result in a rich text editor format.",
        slug: "Generate-Speech",
        form: [
            {
                label: "Enter speech topic",
                field: "input",
                name: "topic",
                required: true
            },
            {
                label: "Enter key points to cover",
                field: "textarea",
                name: "keyPoints",
                required: true
            }
        ]
    },
    {
        name: "Motivational Quote",
        desc: "An AI tool that generates motivational quotes based on the provided theme.",
        category: "Inspiration",
        icon: "https://cdn-icons-png.flaticon.com/128/13380/13380513.png",
        aiprompt: "Generate a motivational quote based on the given theme. Provide the result in a rich text editor format.",
        slug: "Generate-Motivational-Quote",
        form: [
            {
                label: "Enter theme",
                field: "input",
                name: "theme",
                required: true
            }
        ]
    },
    {
        name: "Book Summary",
        desc: "An AI tool that generates book summaries based on the provided book title and key points.",
        category: "Literature",
        icon: "https://cdn-icons-png.flaticon.com/128/4693/4693900.png",
        aiprompt: "Generate a concise book summary based on the given book title and key points. Provide the result in a rich text editor format.",
        slug: "Generate-Book-Summary",
        form: [
            {
                label: "Enter book title",
                field: "input",
                name: "bookTitle",
                required: true
            },
            {
                label: "Enter key points",
                field: "textarea",
                name: "keyPoints",
                required: true
            }
        ]
    },
    {
        name: "FAQ",
        desc: "An AI tool that generates FAQs based on the provided product or service details.",
        category: "Customer Service",
        icon: "https://cdn-icons-png.flaticon.com/128/2618/2618540.png",
        aiprompt: "Generate a comprehensive FAQ section based on the given product or service details. Provide the result in a rich text editor format.",
        slug: "Generate-FAQ",
        form: [
            {
                label: "Enter product/service name",
                field: "input",
                name: "productServiceName",
                required: true
            },
            {
                label: "Enter frequently asked questions",
                field: "textarea",
                name: "faqs",
                required: true
            }
        ]
    },
    {
        name: "Slogan",
        desc: "An AI tool that generates slogans based on the provided brand name and key message.",
        category: "Branding",
        icon: "https://cdn-icons-png.flaticon.com/128/7778/7778446.png",
        aiprompt: "Generate a catchy slogan based on the given brand name and key message. Provide the result in a rich text editor format.",
        slug: "Generate-Slogan",
        form: [
            {
                label: "Enter brand name",
                field: "input",
                name: "brandName",
                required: true
            },
            {
                label: "Enter key message",
                field: "textarea",
                name: "keyMessage",
                required: true
            }
        ]
    },
    {
        name: "Product Review",
        desc: "An AI tool that generates product reviews based on the provided product details.",
        category: "E-commerce",
        icon: "https://cdn-icons-png.flaticon.com/128/10209/10209729.png",
        aiprompt: "Generate a detailed product review based on the given product details. Provide the result in a rich text editor format.",
        slug: "Generate-Product-Review",
        form: [
            {
                label: "Enter product name",
                field: "input",
                name: "productName",
                required: true
            },
            {
                label: "Enter product features",
                field: "textarea",
                name: "features",
                required: true
            },
            {
                label: "Enter product benefits",
                field: "textarea",
                name: "benefits",
                required: true
            }
        ]
    },
    {
        name: "User Manual",
        desc: "An AI tool that generates user manuals based on the provided product details.",
        category: "Technical Writing",
        icon: "https://cdn-icons-png.flaticon.com/128/5194/5194529.png",
        aiprompt: "Generate a comprehensive user manual based on the given product details. Provide the result in a rich text editor format.",
        slug: "Generate-User-Manual",
        form: [
            {
                label: "Enter product name",
                field: "input",
                name: "productName",
                required: true
            },
            {
                label: "Enter product features",
                field: "textarea",
                name: "features",
                required: true
            },
            {
                label: "Enter product instructions",
                field: "textarea",
                name: "instructions",
                required: true
            }
        ]
    },
    {
        name: "Technical Specification",
        desc: "An AI tool that generates technical specifications based on the provided product details.",
        category: "Technical Writing",
        icon: "https://cdn-icons-png.flaticon.com/128/16684/16684073.png",
        aiprompt: "Generate detailed technical specifications based on the given product details. Provide the result in a rich text editor format.",
        slug: "Generate-Technical-Specification",
        form: [
            {
                label: "Enter product name",
                field: "input",
                name: "productName",
                required: true
            },
            {
                label: "Enter technical details",
                field: "textarea",
                name: "technicalDetails",
                required: true
            }
        ]
    },
    {
        name: "Sales Pitch",
        desc: "An AI tool that generates sales pitches based on the provided product or service details.",
        category: "Sales",
        icon: "https://cdn-icons-png.flaticon.com/128/11131/11131688.png",
        aiprompt: "Generate a persuasive sales pitch based on the given product or service details. Provide the result in a rich text editor format.",
        slug: "Generate-Sales-Pitch",
        form: [
            {
                label: "Enter product/service name",
                field: "input",
                name: "productServiceName",
                required: true
            },
            {
                label: "Enter key benefits",
                field: "textarea",
                name: "benefits",
                required: true
            },
            {
                label: "Enter target audience",
                field: "input",
                name: "audience",
                required: true
            }
        ]
    },
    {
        name: "Mission Statement",
        desc: "An AI tool that generates mission statements based on the provided company values and goals.",
        category: "Branding",
        icon: "https://cdn-icons-png.flaticon.com/128/15103/15103551.png",
        aiprompt: "Generate a powerful mission statement based on the given company values and goals. Provide the result in a rich text editor format.",
        slug: "Generate-Mission-Statement",
        form: [
            {
                label: "Enter company name",
                field: "input",
                name: "companyName",
                required: true
            },
            {
                label: "Enter company values",
                field: "textarea",
                name: "values",
                required: true
            },
            {
                label: "Enter company goals",
                field: "textarea",
                name: "goals",
                required: true
            }
        ]
    },
    {
        name: "Vision Statement",
        desc: "An AI tool that generates vision statements based on the provided company goals and future outlook.",
        category: "Branding",
        icon: "https://cdn-icons-png.flaticon.com/128/10989/10989236.png",
        aiprompt: "Generate an inspiring vision statement based on the given company goals and future outlook. Provide the result in a rich text editor format.",
        slug: "Generate-Vision-Statement",
        form: [
            {
                label: "Enter company name",
                field: "input",
                name: "companyName",
                required: true
            },
            {
                label: "Enter company goals",
                field: "textarea",
                name: "goals",
                required: true
            },
            {
                label: "Enter future outlook",
                field: "textarea",
                name: "futureOutlook",
                required: true
            }
        ]
    },
    {
        name: "Code Snippet",
        desc: "An AI tool that generates code snippets based on the provided programming language and task.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/11548/11548099.png",
        aiprompt: "Generate a code snippet in the specified programming language that accomplishes the given task. Provide the result in a rich text editor format.",
        slug: "Generate-Code-Snippet",
        form: [
            {
                label: "Enter programming language",
                field: "input",
                name: "language",
                required: true
            },
            {
                label: "Enter task description",
                field: "textarea",
                name: "task",
                required: true
            }
        ]
    },
    {
        name: "Algorithm Explanation",
        desc: "An AI tool that generates explanations for algorithms based on the provided algorithm name and details.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/1119/1119005.png",
        aiprompt: "Generate a detailed explanation for the specified algorithm, including its purpose, steps, and example. Provide the result in a rich text editor format.",
        slug: "Generate-Algorithm-Explanation",
        form: [
            {
                label: "Enter algorithm name",
                field: "input",
                name: "algorithmName",
                required: true
            },
            {
                label: "Enter algorithm details",
                field: "textarea",
                name: "details",
                required: true
            }
        ]
    },
    {
        name: "Programming Tutorial",
        desc: "An AI tool that generates programming tutorials based on the provided language and topic.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/15189/15189604.png",
        aiprompt: "Generate a comprehensive programming tutorial for the specified language and topic. Provide the result in a rich text editor format.",
        slug: "Generate-Programming-Tutorial",
        form: [
            {
                label: "Enter programming language",
                field: "input",
                name: "language",
                required: true
            },
            {
                label: "Enter tutorial topic",
                field: "textarea",
                name: "topic",
                required: true
            }
        ]
    },
    {
        name: "Debugging Tips",
        desc: "An AI tool that generates debugging tips based on the provided programming language and issue description.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/1541/1541504.png",
        aiprompt: "Generate a list of debugging tips for the specified programming language and issue description. Provide the result in a rich text editor format.",
        slug: "Generate-Debugging-Tips",
        form: [
            {
                label: "Enter programming language",
                field: "input",
                name: "language",
                required: true
            },
            {
                label: "Enter issue description",
                field: "textarea",
                name: "issue",
                required: true
            }
        ]
    },
    {
        name: "Code Review Checklist",
        desc: "An AI tool that generates a code review checklist based on the provided programming language and project details.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/4248/4248106.png",
        aiprompt: "Generate a comprehensive code review checklist for the specified programming language and project details. Provide the result in a rich text editor format.",
        slug: "Generate-Code-Review-Checklist",
        form: [
            {
                label: "Enter programming language",
                field: "input",
                name: "language",
                required: true
            },
            {
                label: "Enter project details",
                field: "textarea",
                name: "project",
                required: true
            }
        ]
    },
    {
        name: "Software Design Patterns",
        desc: "An AI tool that generates explanations of software design patterns based on the provided pattern name and context.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/2010/2010990.png",
        aiprompt: "Generate a detailed explanation of the specified software design pattern, including its context and examples. Provide the result in a rich text editor format.",
        slug: "Generate-Software-Design-Patterns",
        form: [
            {
                label: "Enter design pattern name",
                field: "input",
                name: "patternName",
                required: true
            },
            {
                label: "Enter context",
                field: "textarea",
                name: "context",
                required: true
            }
        ]
    },
    {
        name: "API Documentation",
        desc: "An AI tool that generates API documentation based on the provided API details.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/10492/10492931.png",
        aiprompt: "Generate comprehensive API documentation based on the given API details. Provide the result in a rich text editor format.",
        slug: "Generate-API-Documentation",
        form: [
            {
                label: "Enter API name",
                field: "input",
                name: "apiName",
                required: true
            },
            {
                label: "Enter API endpoints",
                field: "textarea",
                name: "endpoints",
                required: true
            },
            {
                label: "Enter API parameters",
                field: "textarea",
                name: "parameters",
                required: true
            },
            {
                label: "Enter API responses",
                field: "textarea",
                name: "responses",
                required: true
            }
        ]
    },
    {
        name: "Code Optimization Tips",
        desc: "An AI tool that generates code optimization tips based on the provided programming language and code snippet.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/11676/11676549.png",
        aiprompt: "Generate a list of code optimization tips for the specified programming language and code snippet. Provide the result in a rich text editor format.",
        slug: "Generate-Code-Optimization-Tips",
        form: [
            {
                label: "Enter programming language",
                field: "input",
                name: "language",
                required: true
            },
            {
                label: "Enter code snippet",
                field: "textarea",
                name: "code",
                required: true
            }
        ]
    },
    {
        name: "Unit Test Cases",
        desc: "An AI tool that generates unit test cases based on the provided programming language and function description.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/10435/10435197.png",
        aiprompt: "Generate unit test cases for the specified programming language and function description. Provide the result in a rich text editor format.",
        slug: "Generate-Unit-Test-Cases",
        form: [
            {
                label: "Enter programming language",
                field: "input",
                name: "language",
                required: true
            },
            {
                label: "Enter function description",
                field: "textarea",
                name: "function",
                required: true
            }
        ]
    },
    {
        name: "Database Schema",
        desc: "An AI tool that generates database schema based on the provided requirements and data model.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/9627/9627179.png",
        aiprompt: "Generate a database schema based on the given requirements and data model. Provide the result in a rich text editor format.",
        slug: "Generate-Database-Schema",
        form: [
            {
                label: "Enter requirements",
                field: "textarea",
                name: "requirements",
                required: true
            },
            {
                label: "Enter data model",
                field: "textarea",
                name: "dataModel",
                required: true
            }
        ]
    },
    {
        name: "Code Comments",
        desc: "An AI tool that generates detailed code comments based on the provided programming language and code snippet.",
        category: "Programming",
        icon: "https://cdn-icons-png.flaticon.com/128/8637/8637209.png",
        aiprompt: "Generate detailed code comments for the specified programming language and code snippet. Provide the result in a rich text editor format.",
        slug: "Generate-Code-Comments",
        form: [
            {
                label: "Enter programming language",
                field: "input",
                name: "language",
                required: true
            },
            {
                label: "Enter code snippet",
                field: "textarea",
                name: "code",
                required: true
            }
        ]
    },{
        name: "Video Title Generator",
        desc: "An AI tool that generates video titles based on keywords and content type.",
        category: "YouTube",
        icon: "https://cdn-icons-png.flaticon.com/128/8089/8089962.png",
        aiprompt: "Generate a compelling video title based on the keywords and type of content. Provide the result in a rich text editor format.",
        slug: "Generate-Video-Title",
        form: [
            {
                label: "Enter keywords",
                field: "input",
                name: "keywords",
                required: true
            },
            {
                label: "Enter content type (e.g., tutorial, vlog)",
                field: "input",
                name: "contentType",
                required: true
            }
        ]
    },
    {
        name: "Channel Name Generator",
        desc: "An AI tool that suggests unique names for YouTube channels based on preferences and niche.",
        category: "YouTube",
        icon: "https://cdn-icons-png.flaticon.com/128/12531/12531345.png",
        aiprompt: "Generate a catchy and unique name suggestion for a YouTube channel based on your preferences and niche. Provide the result in a rich text editor format.",
        slug: "Generate-Channel-Name",
        form: [
            {
                label: "Enter preferences (e.g., fun, educational)",
                field: "input",
                name: "preferences",
                required: true
            },
            {
                label: "Enter niche or topic",
                field: "input",
                name: "niche",
                required: true
            }
        ]
    },
    {
        name: "Video Description Generator",
        desc: "An AI tool that generates video descriptions based on the video title and key points.",
        category: "YouTube",
        icon: "https://cdn-icons-png.flaticon.com/128/1907/1907518.png",
        aiprompt: "Create a detailed video description for a YouTube video based on the title and key points. Provide the result in a rich text editor format.",
        slug: "Generate-Video-Description",
        form: [
            {
                label: "Enter video title",
                field: "input",
                name: "videoTitle",
                required: true
            },
            {
                label: "Enter key points",
                field: "textarea",
                name: "keyPoints",
                required: true
            }
        ]
    },
    {
        name: "Thumbnail Design Suggestions",
        desc: "An AI tool that suggests thumbnail designs for YouTube videos based on video content and style preferences.",
        category: "YouTube",
        icon: "https://cdn-icons-png.flaticon.com/128/4906/4906362.png",
        aiprompt: "Suggest thumbnail designs for a YouTube video based on its content and your style preferences. Provide the result in a rich text editor format.",
        slug: "Generate-Thumbnail-Design",
        form: [
            {
                label: "Enter video content",
                field: "textarea",
                name: "videoContent",
                required: true
            },
            {
                label: "Enter style preferences",
                field: "textarea",
                name: "stylePreferences"
            }
        ]
    },
    {
        name: "Social Media Video Idea",
        desc: "An AI tool that generates ideas for social media video content based on specified topics.",
        category: "YouTube",
        icon: "https://cdn-icons-png.flaticon.com/128/1997/1997928.png",
        aiprompt: "Generate creative ideas for social media video content based on specified topics. Provide the result in a rich text editor format.",
        slug: "Generate-Social-Media-Video-Idea",
        form: [
            {
                label: "Enter topics of interest",
                field: "textarea",
                name: "topics",
                required: true
            }
        ]
    },
    {
        name: "Live Streaming Topic Generator",
        desc: "An AI tool that generates topics for live streaming sessions based on audience interests.",
        category: "YouTube",
        icon: "https://cdn-icons-png.flaticon.com/128/2177/2177994.png",
        aiprompt: "Generate engaging topics for live streaming sessions based on audience interests. Provide the result in a rich text editor format.",
        slug: "Generate-Live-Streaming-Topic",
        form: [
            {
                label: "Enter audience interests",
                field: "textarea",
                name: "audienceInterests",
                required: true
            }
        ]
    },
    {
        name: "YouTube Video SEO Tips",
        desc: "An AI tool that provides SEO tips for optimizing YouTube videos based on content and target audience.",
        category: "YouTube",
        icon: "https://cdn-icons-png.flaticon.com/128/1077/1077186.png",
        aiprompt: "Provide SEO tips for optimizing YouTube videos based on content and target audience. Provide the result in a rich text editor format.",
        slug: "Generate-YouTube-SEO-Tips",
        form: [
            {
                label: "Enter video content",
                field: "textarea",
                name: "videoContent",
                required: true
            },
            {
                label: "Enter target audience",
                field: "textarea",
                name: "targetAudience",
                required: true
            }
        ]
    },
    {
        name: "Podcast Episode Title Generator",
        desc: "An AI tool that generates titles for podcast episodes based on specified themes or topics.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/12301/12301185.png",
        aiprompt: "Generate catchy titles for podcast episodes based on specified themes or topics. Provide the result in a rich text editor format.",
        slug: "Generate-Podcast-Episode-Title",
        form: [
            {
                label: "Enter themes or topics",
                field: "textarea",
                name: "themes",
                required: true
            }
        ]
    },
    {
        name: "Blog Post Idea Generator",
        desc: "An AI tool that generates ideas for blog posts based on selected categories or keywords.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/3131/3131473.png",
        aiprompt: "Generate creative ideas for blog posts based on selected categories or keywords. Provide the result in a rich text editor format.",
        slug: "Generate-Blog-Post-Idea",
        form: [
            {
                label: "Enter categories or keywords",
                field: "textarea",
                name: "categories",
                required: true
            }
        ]
    },
    {
        name: "Resume Writing Tips",
        desc: "An AI tool that provides tips for writing effective resumes based on career goals and experiences.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/4115/4115804.png",
        aiprompt: "Provide tips for writing effective resumes based on career goals and experiences. Provide the result in a rich text editor format.",
        slug: "Generate-Resume-Writing-Tips",
        form: [
            {
                label: "Enter career goals",
                field: "textarea",
                name: "careerGoals",
                required: true
            },
            {
                label: "Enter relevant experiences",
                field: "textarea",
                name: "experiences",
                required: true
            }
        ]
    },
    {
        name: "Study Schedule Generator",
        desc: "An AI tool that generates personalized study schedules based on subjects and available time.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/9567/9567719.png",
        aiprompt: "Create a study schedule tailored to your subjects and available time. Provide the result in a rich text editor format.",
        slug: "Generate-Study-Schedule",
        form: [
            {
                label: "Enter subjects",
                field: "textarea",
                name: "subjects",
                required: true
            },
            {
                label: "Enter available time (e.g., hours per day)",
                field: "input",
                name: "availableTime",
                required: true
            }
        ]
    },
    {
        name: "Flashcard Generator",
        desc: "An AI tool that generates interactive flashcards for studying based on topics and keywords.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/3813/3813696.png",
        aiprompt: "Generate interactive flashcards for studying based on topics and keywords. Provide the result in a rich text editor format.",
        slug: "Generate-Flashcards",
        form: [
            {
                label: "Enter topics",
                field: "textarea",
                name: "topics",
                required: true
            },
            {
                label: "Enter keywords or definitions",
                field: "textarea",
                name: "keywords"
            }
        ]
    },
    {
        name: "Essay Outline Generator",
        desc: "An AI tool that creates outlines for essays based on topics and key points.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/1760/1760560.png",
        aiprompt: "Generate an essay outline based on topics and key points. Provide the result in a rich text editor format.",
        slug: "Generate-Essay-Outline",
        form: [
            {
                label: "Enter essay topics",
                field: "textarea",
                name: "essayTopics",
                required: true
            },
            {
                label: "Enter key points",
                field: "textarea",
                name: "keyPoints"
            }
        ]
    },
    {
        name: "Math Problem Solver",
        desc: "An AI tool that solves mathematical problems based on equations or word problems.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/9528/9528494.png",
        aiprompt: "Solve a mathematical problem based on equations or word problems. Provide the result in a rich text editor format.",
        slug: "Solve-Math-Problem",
        form: [
            {
                label: "Enter math problem",
                field: "textarea",
                name: "mathProblem",
                required: true
            }
        ]
    },
    {
        name: "Language Learning Tips",
        desc: "An AI tool that provides personalized tips for learning a new language based on user preferences.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/3898/3898840.png",
        aiprompt: "Provide personalized tips for learning a new language based on your preferences. Provide the result in a rich text editor format.",
        slug: "Language-Learning-Tips",
        form: [
            {
                label: "Enter language of interest",
                field: "input",
                name: "language",
                required: true
            },
            {
                label: "Enter learning preferences",
                field: "textarea",
                name: "learningPreferences"
            }
        ]
    },
    {
        name: "Science Experiment Ideas",
        desc: "An AI tool that generates ideas for science experiments based on grade level and topic.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/2854/2854701.png",
        aiprompt: "Generate ideas for science experiments based on grade level and topic. Provide the result in a rich text editor format.",
        slug: "Science-Experiment-Ideas",
        form: [
            {
                label: "Enter grade level",
                field: "input",
                name: "gradeLevel",
                required: true
            },
            {
                label: "Enter science topic",
                field: "textarea",
                name: "scienceTopic",
                required: true
            }
        ]
    },
    {
        name: "History Quiz Questions",
        desc: "An AI tool that generates quiz questions on historical topics based on selected era or event.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/5731/5731927.png",
        aiprompt: "Generate quiz questions on historical topics based on selected era or event. Provide the result in a rich text editor format.",
        slug: "History-Quiz-Questions",
        form: [
            {
                label: "Enter historical era or event",
                field: "input",
                name: "historicalEvent",
                required: true
            },
            {
                label: "Enter number of questions",
                field: "input",
                name: "numQuestions"
            }
        ]
    },
    {
        name: "Geography Facts Generator",
        desc: "An AI tool that generates interesting facts about countries or geographical regions.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/3879/3879738.png",
        aiprompt: "Generate interesting facts about countries or geographical regions. Provide the result in a rich text editor format.",
        slug: "Geography-Facts-Generator",
        form: [
            {
                label: "Enter country or region",
                field: "input",
                name: "countryRegion",
                required: true
            }
        ]
    },
    {
        name: "Art History Timeline",
        desc: "An AI tool that creates a timeline of art history based on selected movements or artists.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/7416/7416907.png",
        aiprompt: "Create a timeline of art history based on selected movements or artists. Provide the result in a rich text editor format.",
        slug: "Art-History-Timeline",
        form: [
            {
                label: "Enter art movements or artists",
                field: "textarea",
                name: "artDetails",
                required: true
            }
        ]
    },
    {
        name: "Vocabulary Builder",
        desc: "An AI tool that suggests vocabulary words and definitions based on selected language and proficiency level.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/5560/5560319.png",
        aiprompt: "Suggest vocabulary words and definitions based on selected language and proficiency level. Provide the result in a rich text editor format.",
        slug: "Vocabulary-Builder",
        form: [
            {
                label: "Select language",
                field: "input",
                name: "language",
                required: true
            },
            {
                label: "Select proficiency level",
                field: "input",
                name: "proficiencyLevel"
            }
        ]
    },
    {
        name: "Chemistry Equation Solver",
        desc: "An AI tool that solves chemistry equations based on chemical formulas or reactions.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/14833/14833935.png",
        aiprompt: "Solve chemistry equations based on chemical formulas or reactions. Provide the result in a rich text editor format.",
        slug: "Chemistry-Equation-Solver",
        form: [
            {
                label: "Enter chemical formulas or reactions",
                field: "textarea",
                name: "chemicalEquations",
                required: true
            }
        ]
    },
    {
        name: "Music Theory Quiz",
        desc: "An AI tool that generates quiz questions on music theory topics such as notes, scales, and chords.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/2402/2402461.png",
        aiprompt: "Generate quiz questions on music theory topics such as notes, scales, and chords. Provide the result in a rich text editor format.",
        slug: "Music-Theory-Quiz",
        form: [
            {
                label: "Enter music theory topics",
                field: "textarea",
                name: "musicTopics",
                required: true
            },
            {
                label: "Enter number of questions",
                field: "input",
                name: "numQuestions"
            }
        ]
    },
    {
        name: "Psychology Case Study Generator",
        desc: "An AI tool that generates case studies on psychological theories or disorders.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/1491/1491214.png",
        aiprompt: "Generate case studies on psychological theories or disorders. Provide the result in a rich text editor format.",
        slug: "Psychology-Case-Study-Generator",
        form: [
            {
                label: "Enter psychological theories or disorders",
                field: "textarea",
                name: "psychologyTopics",
                required: true
            }
        ]
    },
    {
        name: "Environmental Science Research Topic",
        desc: "An AI tool that suggests research topics in environmental science based on current issues or trends.",
        category: "Education",
        icon: "https://cdn-icons-png.flaticon.com/128/10065/10065228.png",
        aiprompt: "Suggest research topics in environmental science based on current issues or trends. Provide the result in a rich text editor format.",
        slug: "Environmental-Science-Research-Topic",
        form: [
            {
                label: "Enter environmental issues or trends",
                field: "textarea",
                name: "environmentalTopics",
                required: true
            }
        ]
    },
    {
        name: "Recipe Generator",
        desc: "An AI tool that generates recipes based on ingredients and dietary preferences.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/5402/5402931.png",
        aiprompt: "Generate recipes based on ingredients and dietary preferences. Provide the result in a rich text editor format.",
        slug: "Generate-Recipe",
        form: [
            {
                label: "Enter ingredients",
                field: "textarea",
                name: "ingredients",
                required: true
            },
            {
                label: "Enter dietary preferences (e.g., vegan, gluten-free)",
                field: "input",
                name: "dietaryPreferences"
            }
        ]
    },
    {
        name: "Workout Routine Generator",
        desc: "An AI tool that generates personalized workout routines based on fitness goals and equipment availability.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/12646/12646173.png",
        aiprompt: "Generate personalized workout routines based on fitness goals and equipment availability. Provide the result in a rich text editor format.",
        slug: "Generate-Workout-Routine",
        form: [
            {
                label: "Enter fitness goals",
                field: "textarea",
                name: "fitnessGoals",
                required: true
            },
            {
                label: "Enter available equipment",
                field: "input",
                name: "equipment"
            }
        ]
    },
    {
        name: "Travel Itinerary Generator",
        desc: "An AI tool that creates travel itineraries based on destination preferences and duration.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/854/854996.png",
        aiprompt: "Create travel itineraries based on destination preferences and duration. Provide the result in a rich text editor format.",
        slug: "Generate-Travel-Itinerary",
        form: [
            {
                label: "Enter destination preferences",
                field: "textarea",
                name: "destinationPreferences",
                required: true
            },
            {
                label: "Enter duration of travel",
                field: "input",
                name: "travelDuration",
                required: true
            }
        ]
    },
    {
        name: "Financial Advice Generator",
        desc: "An AI tool that provides financial advice based on income, expenses, and savings goals.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/9504/9504868.png",
        aiprompt: "Provide financial advice based on income, expenses, and savings goals. Provide the result in a rich text editor format.",
        slug: "Financial-Advice-Generator",
        form: [
            {
                label: "Enter income details",
                field: "textarea",
                name: "incomeDetails",
                required: true
            },
            {
                label: "Enter savings goals",
                field: "input",
                name: "savingsGoals"
            }
        ]
    },
    {
        name: "Event Planning Checklist",
        desc: "An AI tool that generates a checklist for planning events based on event type and requirements.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/5207/5207761.png",
        aiprompt: "Generate a checklist for planning events based on event type and requirements. Provide the result in a rich text editor format.",
        slug: "Generate-Event-Planning-Checklist",
        form: [
            {
                label: "Enter event type",
                field: "input",
                name: "eventType",
                required: true
            },
            {
                label: "Enter event requirements",
                field: "textarea",
                name: "eventRequirements",
                required: true
            }
        ]
    },
    {
        name: "Pet Care Tips",
        desc: "An AI tool that provides tips for pet care based on pet type and specific needs.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/3737/3737711.png",
        aiprompt: "Provide tips for pet care based on pet type and specific needs. Provide the result in a rich text editor format.",
        slug: "Pet-Care-Tips",
        form: [
            {
                label: "Enter pet type",
                field: "input",
                name: "petType",
                required: true
            },
            {
                label: "Enter specific needs or concerns",
                field: "textarea",
                name: "specificNeeds"
            }
        ]
    },
    {
        name: "Gardening Tips",
        desc: "An AI tool that provides gardening tips based on plant types and seasonal considerations.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/1544/1544052.png",
        aiprompt: "Provide gardening tips based on plant types and seasonal considerations. Provide the result in a rich text editor format.",
        slug: "Gardening-Tips",
        form: [
            {
                label: "Enter plant types",
                field: "textarea",
                name: "plantTypes",
                required: true
            },
            {
                label: "Enter seasonal considerations",
                field: "textarea",
                name: "seasonalConsiderations"
            }
        ]
    },
    {
        name: "DIY Home Improvement Ideas",
        desc: "An AI tool that suggests DIY home improvement projects based on room type and budget.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/14620/14620730.png",
        aiprompt: "Suggest DIY home improvement projects based on room type and budget. Provide the result in a rich text editor format.",
        slug: "DIY-Home-Improvement-Ideas",
        form: [
            {
                label: "Enter room type",
                field: "input",
                name: "roomType",
                required: true
            },
            {
                label: "Enter budget range",
                field: "input",
                name: "budgetRange"
            }
        ]
    },
    {
        name: "Car Maintenance Tips",
        desc: "An AI tool that provides maintenance tips for cars based on make, model, and mileage.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/11133/11133669.png",
        aiprompt: "Provide maintenance tips for cars based on make, model, and mileage. Provide the result in a rich text editor format.",
        slug: "Car-Maintenance-Tips",
        form: [
            {
                label: "Enter car make and model",
                field: "input",
                name: "carMakeModel",
                required: true
            },
            {
                label: "Enter current mileage",
                field: "input",
                name: "currentMileage"
            }
        ]
    },
    {
        name: "Healthy Eating Tips",
        desc: "An AI tool that provides tips for healthy eating based on dietary preferences and lifestyle.",
        category: "Others",
        icon: "https://cdn-icons-png.flaticon.com/128/7196/7196633.png",
        aiprompt: "Provide tips for healthy eating based on dietary preferences and lifestyle. Provide the result in a rich text editor format.",
        slug: "Healthy-Eating-Tips",
        form: [
            {
                label: "Enter dietary preferences",
                field: "input",
                name: "dietaryPreferences",
                required: true
            },
            {
                label: "Enter lifestyle (e.g., active, sedentary)",
                field: "input",
                name: "lifestyle"
            }
        ]
    },
{
    name: "Email Campaign",
    desc: "An AI tool that drafts email campaigns tailored to your product and target audience.",
    category: "Marketing",
    icon: "https://cdn-icons-png.flaticon.com/128/732/732200.png",
    aiprompt: "Draft an email campaign based on the given product details and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Email-Campaign",
    form: [
        {
            label: "Enter product details",
            field: "textarea",
            name: "productDetails",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
            required: true
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Brand Slogan Generator",
    desc: "An AI tool that generates catchy slogans for brands.",
    category: "Marketing & Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/2566/2566427.png",
    aiprompt: "Generate a catchy slogan for the given brand name and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Brand-Slogan",
    form: [
        {
            label: "Enter brand name",
            field: "input",
            name: "brandName",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Product Feature List",
    desc: "An AI tool that generates a detailed list of product features.",
    category: "Marketing & Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/2000/2000052.png",
    aiprompt: "Create a detailed list of product features based on the provided product information. Provide the result in a rich text editor format.",
    slug: "Generate-Product-Feature-List",
    form: [
        {
            label: "Enter product name",
            field: "input",
            name: "productName",
            required: true
        },
        {
            label: "Enter product description",
            field: "textarea",
            name: "description",
            required: true
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Customer Testimonial",
    desc: "An AI tool that drafts customer testimonials based on provided feedback.",
    category: "Marketing & Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/2942/2942637.png",
    aiprompt: "Generate a customer testimonial based on the given feedback. Provide the result in a rich text editor format.",
    slug: "Generate-Customer-Testimonial",
    form: [
        {
            label: "Enter customer feedback",
            field: "textarea",
            name: "feedback",
            required: true
        },
        {
            label: "Enter product/service name",
            field: "input",
            name: "productName",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Lead Nurturing Email Sequence",
    desc: "An AI tool that generates a sequence of emails to nurture leads.",
    category: "Marketing & Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/2951/2951343.png",
    aiprompt: "Create a sequence of lead nurturing emails based on the provided details. Provide the result in a rich text editor format.",
    slug: "Generate-Lead-Nurturing-Emails",
    form: [
        {
            label: "Enter lead details",
            field: "textarea",
            name: "leadDetails",
            required: true
        },
        {
            label: "Enter product/service information",
            field: "textarea",
            name: "productInfo",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Sales Pitch",
    desc: "An AI tool that generates persuasive sales pitches for products or services.",
    category: "Marketing & Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/3580/3580428.png",
    aiprompt: "Create a persuasive sales pitch based on the provided product/service details. Provide the result in a rich text editor format.",
    slug: "Generate-Sales-Pitch",
    form: [
        {
            label: "Enter product/service details",
            field: "textarea",
            name: "productServiceDetails",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Marketing Plan Outline",
    desc: "An AI tool that generates a comprehensive marketing plan outline.",
    category: "Marketing & Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/2916/2916133.png",
    aiprompt: "Create a comprehensive marketing plan outline based on the provided business and marketing goals. Provide the result in a rich text editor format.",
    slug: "Generate-Marketing-Plan-Outline",
    form: [
        {
            label: "Enter business goals",
            field: "textarea",
            name: "businessGoals",
            required: true
        },
        {
            label: "Enter marketing objectives",
            field: "textarea",
            name: "marketingObjectives",
            required: true
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Campaign Budget Estimator",
    desc: "An AI tool that creates a budget estimate for marketing campaigns.",
    category: "Marketing & Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/2636/2636387.png",
    aiprompt: "Generate a budget estimate for a marketing campaign based on the provided details. Provide the result in a rich text editor format.",
    slug: "Generate-Campaign-Budget-Estimate",
    form: [
        {
            label: "Enter campaign details",
            field: "textarea",
            name: "campaignDetails",
            required: true
        },
        {
            label: "Enter estimated costs",
            field: "input",
            name: "estimatedCosts",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Social Media Calendar",
    desc: "An AI tool that generates a social media posting calendar.",
    category: "Marketing & Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/3037/3037156.png",
    aiprompt: "Create a social media calendar based on the provided content strategy. Provide the result in a rich text editor format.",
    slug: "Generate-Social-Media-Calendar",
    form: [
        {
            label: "Enter content strategy",
            field: "textarea",
            name: "contentStrategy",
            required: true
        },
        {
            label: "Enter social media platforms",
            field: "input",
            name: "platforms",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Influencer Outreach Email",
    desc: "An AI tool that drafts an email template for reaching out to influencers.",
    category: "Marketing & Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/1534/1534346.png",
    aiprompt: "Generate an influencer outreach email template based on the provided campaign and influencer details. Provide the result in a rich text editor format.",
    slug: "Generate-Influencer-Outreach-Email",
    form: [
        {
            label: "Enter campaign details",
            field: "textarea",
            name: "campaignDetails",
            required: true
        },
        {
            label: "Enter influencer details",
            field: "textarea",
            name: "influencerDetails",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Client Proposal",
    desc: "An AI tool that generates a detailed client proposal based on the project scope.",
    category: "Marketing & Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/4102/4102173.png",
    aiprompt: "Create a detailed client proposal based on the provided project scope and client requirements. Provide the result in a rich text editor format.",
    slug: "Generate-Client-Proposal",
    form: [
        {
            label: "Enter project scope",
            field: "textarea",
            name: "projectScope",
            required: true
        },
        {
            label: "Enter client requirements",
            field: "textarea",
            name: "clientRequirements",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Video Description",
    desc: "An AI tool that generates descriptions for YouTube videos or other platforms.",
    category: "Content Creation",
    icon: "https://cdn-icons-png.flaticon.com/128/482/482112.png",
    aiprompt: "Generate a video description based on the provided video title and content summary. Provide the result in a rich text editor format.",
    slug: "Generate-Video-Description",
    form: [
        {
            label: "Enter video title",
            field: "input",
            name: "videoTitle",
            required: true
        },
        {
            label: "Enter content summary",
            field: "textarea",
            name: "contentSummary",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Podcast Episode Ideas",
    desc: "An AI tool that generates a list of podcast episode ideas.",
    category: "Content Creation",
    icon: "https://cdn-icons-png.flaticon.com/128/3313/3313793.png",
    aiprompt: "Generate a list of podcast episode ideas based on the provided niche and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Podcast-Episode-Ideas",
    form: [
        {
            label: "Enter podcast niche",
            field: "input",
            name: "podcastNiche",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Content Calendar",
    desc: "An AI tool that generates a content calendar for blogs, videos, and social media.",
    category: "Content Creation",
    icon: "https://cdn-icons-png.flaticon.com/128/3127/3127336.png",
    aiprompt: "Create a content calendar based on the provided content strategy and frequency. Provide the result in a rich text editor format.",
    slug: "Generate-Content-Calendar",
    form: [
        {
            label: "Enter content strategy",
            field: "textarea",
            name: "contentStrategy",
            required: true
        },
        {
            label: "Enter posting frequency",
            field: "input",
            name: "frequency",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Blog Post Outline",
    desc: "An AI tool that generates a detailed outline for blog posts.",
    category: "Content Creation",
    icon: "https://cdn-icons-png.flaticon.com/128/3032/3032057.png",
    aiprompt: "Create a detailed blog post outline based on the provided topic and keywords. Provide the result in a rich text editor format.",
    slug: "Generate-Blog-Post-Outline",
    form: [
        {
            label: "Enter blog topic",
            field: "input",
            name: "blogTopic",
            required: true
        },
        {
            label: "Enter keywords",
            field: "textarea",
            name: "keywords",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Case Study",
    desc: "An AI tool that generates a case study based on client success stories.",
    category: "Content Creation",
    icon: "https://cdn-icons-png.flaticon.com/128/3421/3421058.png",
    aiprompt: "Create a case study based on the provided client success story and data. Provide the result in a rich text editor format.",
    slug: "Generate-Case-Study",
    form: [
        {
            label: "Enter client success story",
            field: "textarea",
            name: "successStory",
            required: true
        },
        {
            label: "Enter relevant data",
            field: "textarea",
            name: "data",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "E-book Outline",
    desc: "An AI tool that generates an outline for an e-book on a given topic.",
    category: "Content Creation",
    icon: "https://cdn-icons-png.flaticon.com/128/3062/3062653.png",
    aiprompt: "Create an e-book outline based on the provided topic and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-E-book-Outline",
    form: [
        {
            label: "Enter e-book topic",
            field: "input",
            name: "ebookTopic",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Whitepaper",
    desc: "An AI tool that generates a whitepaper based on industry research and trends.",
    category: "Content Creation",
    icon: "https://cdn-icons-png.flaticon.com/128/3314/3314494.png",
    aiprompt: "Create a whitepaper based on the provided research and industry trends. Provide the result in a rich text editor format.",
    slug: "Generate-Whitepaper",
    form: [
        {
            label: "Enter research data",
            field: "textarea",
            name: "researchData",
            required: true
        },
        {
            label: "Enter industry trends",
            field: "textarea",
            name: "trends",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Webinar Script",
    desc: "An AI tool that generates a script for hosting webinars.",
    category: "Content Creation",
    icon: "https://cdn-icons-png.flaticon.com/128/2921/2921826.png",
    aiprompt: "Create a webinar script based on the provided topic and audience. Provide the result in a rich text editor format.",
    slug: "Generate-Webinar-Script",
    form: [
        {
            label: "Enter webinar topic",
            field: "input",
            name: "webinarTopic",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Interactive Quiz",
    desc: "An AI tool that generates quiz questions and results based on a specific topic.",
    category: "Content Creation",
    icon: "https://cdn-icons-png.flaticon.com/128/3061/3061927.png",
    aiprompt: "Create an interactive quiz based on the provided topic and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Interactive-Quiz",
    form: [
        {
            label: "Enter quiz topic",
            field: "input",
            name: "quizTopic",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter number of questions",
            field: "input",
            name: "numQuestions",
            required: true
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Course Module Outline",
    desc: "An AI tool that generates an outline for an educational course module.",
    category: "Content Creation",
    icon: "https://cdn-icons-png.flaticon.com/128/4320/4320538.png",
    aiprompt: "Create a course module outline based on the provided course topic and learning objectives. Provide the result in a rich text editor format.",
    slug: "Generate-Course-Module-Outline",
    form: [
        {
            label: "Enter course topic",
            field: "input",
            name: "courseTopic",
            required: true
        },
        {
            label: "Enter learning objectives",
            field: "textarea",
            name: "learningObjectives",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Product Tagline Generator",
    desc: "An AI tool that generates catchy taglines for products.",
    category: "E-commerce",
    icon: "https://cdn-icons-png.flaticon.com/128/3063/3063716.png",
    aiprompt: "Generate a catchy tagline for the given product based on the product description and target market. Provide the result in a rich text editor format.",
    slug: "Generate-Product-Tagline",
    form: [
        {
            label: "Enter product name",
            field: "input",
            name: "productName",
            required: true
        },
        {
            label: "Enter product description",
            field: "textarea",
            name: "description",
        },
        {
            label: "Enter target market",
            field: "input",
            name: "targetMarket",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Product Description Generator",
    desc: "An AI tool that generates detailed product descriptions.",
    category: "E-commerce",
    icon: "https://cdn-icons-png.flaticon.com/128/3659/3659871.png",
    aiprompt: "Generate a detailed product description based on the provided product information and target market. Provide the result in a rich text editor format.",
    slug: "Generate-Product-Description",
    form: [
        {
            label: "Enter product name",
            field: "input",
            name: "productName",
            required: true
        },
        {
            label: "Enter product features",
            field: "textarea",
            name: "features",
        },
        {
            label: "Enter target market",
            field: "input",
            name: "targetMarket",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Email Newsletter",
    desc: "An AI tool that generates email newsletters based on the provided content.",
    category: "Email Marketing",
    icon: "https://cdn-icons-png.flaticon.com/128/3544/3544729.png",
    aiprompt: "Generate an email newsletter based on the provided content and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Email-Newsletter",
    form: [
        {
            label: "Enter newsletter content",
            field: "textarea",
            name: "newsletterContent",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Cold Email Template",
    desc: "An AI tool that generates a cold email template for reaching out to potential clients.",
    category: "Email Marketing",
    icon: "https://cdn-icons-png.flaticon.com/128/3523/3523063.png",
    aiprompt: "Generate a cold email template for reaching out to potential clients based on the provided business and offer details. Provide the result in a rich text editor format.",
    slug: "Generate-Cold-Email-Template",
    form: [
        {
            label: "Enter business details",
            field: "textarea",
            name: "businessDetails",
            required: true
        },
        {
            label: "Enter offer details",
            field: "textarea",
            name: "offerDetails",
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Press Release",
    desc: "An AI tool that generates a press release based on the provided event or product launch details.",
    category: "Public Relations",
    icon: "https://cdn-icons-png.flaticon.com/128/2562/2562783.png",
    aiprompt: "Generate a press release based on the provided event or product launch details. Provide the result in a rich text editor format.",
    slug: "Generate-Press-Release",
    form: [
        {
            label: "Enter event/product launch details",
            field: "textarea",
            name: "eventDetails",
            required: true
        },
        {
            label: "Enter company name",
            field: "input",
            name: "companyName",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Social Media Bio Generator",
    desc: "An AI tool that generates a social media bio for platforms like Twitter, LinkedIn, etc.",
    category: "Social Media",
    icon: "https://cdn-icons-png.flaticon.com/128/733/733585.png",
    aiprompt: "Generate a social media bio based on the provided personal or business information. Provide the result in a rich text editor format.",
    slug: "Generate-Social-Media-Bio",
    form: [
        {
            label: "Enter personal/business information",
            field: "textarea",
            name: "info",
            required: true
        },
        {
            label: "Enter target platform",
            field: "input",
            name: "platform",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Video Script",
    desc: "An AI tool that generates a script for creating a video based on a provided topic.",
    category: "Video Production",
    icon: "https://cdn-icons-png.flaticon.com/128/2601/2601999.png",
    aiprompt: "Generate a video script based on the provided topic and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Video-Script",
    form: [
        {
            label: "Enter video topic",
            field: "input",
            name: "videoTopic",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Customer Survey",
    desc: "An AI tool that generates a customer survey to gather feedback.",
    category: "Customer Service",
    icon: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    aiprompt: "Generate a customer survey based on the provided product/service and survey objectives. Provide the result in a rich text editor format.",
    slug: "Generate-Customer-Survey",
    form: [
        {
            label: "Enter product/service name",
            field: "input",
            name: "productName",
            required: true
        },
        {
            label: "Enter survey objectives",
            field: "textarea",
            name: "surveyObjectives",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Customer Onboarding Email",
    desc: "An AI tool that generates an email template for onboarding new customers.",
    category: "Customer Service",
    icon: "https://cdn-icons-png.flaticon.com/128/2667/2667274.png",
    aiprompt: "Generate a customer onboarding email template based on the provided product/service details and onboarding process. Provide the result in a rich text editor format.",
    slug: "Generate-Customer-Onboarding-Email",
    form: [
        {
            label: "Enter product/service details",
            field: "textarea",
            name: "productServiceDetails",
            required: true
        },
        {
            label: "Enter onboarding process",
            field: "textarea",
            name: "onboardingProcess",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Product FAQ",
    desc: "An AI tool that generates a list of frequently asked questions for a product or service.",
    category: "Customer Service",
    icon: "https://cdn-icons-png.flaticon.com/128/3199/3199142.png",
    aiprompt: "Generate a list of frequently asked questions based on the provided product/service details and customer inquiries. Provide the result in a rich text editor format.",
    slug: "Generate-Product-FAQ",
    form: [
        {
            label: "Enter product/service name",
            field: "input",
            name: "productName",
            required: true
        },
        {
            label: "Enter common customer inquiries",
            field: "textarea",
            name: "inquiries",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "User Manual",
    desc: "An AI tool that generates a user manual based on product details.",
    category: "Technical Writing",
    icon: "https://cdn-icons-png.flaticon.com/128/1524/1524715.png",
    aiprompt: "Generate a user manual based on the provided product details and user instructions. Provide the result in a rich text editor format.",
    slug: "Generate-User-Manual",
    form: [
        {
            label: "Enter product name",
            field: "input",
            name: "productName",
            required: true
        },
        {
            label: "Enter user instructions",
            field: "textarea",
            name: "instructions",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Website Copy",
    desc: "An AI tool that generates website copy based on the provided content strategy.",
    category: "Web Development",
    icon: "https://cdn-icons-png.flaticon.com/128/3563/3563400.png",
    aiprompt: "Generate website copy based on the provided content strategy and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Website-Copy",
    form: [
        {
            label: "Enter content strategy",
            field: "textarea",
            name: "contentStrategy",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Website Landing Page",
    desc: "An AI tool that generates copy for a website landing page.",
    category: "Web Development",
    icon: "https://cdn-icons-png.flaticon.com/128/893/893131.png",
    aiprompt: "Generate a landing page copy based on the provided content strategy and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Website-Landing-Page",
    form: [
        {
            label: "Enter content strategy",
            field: "textarea",
            name: "contentStrategy",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Landing Page Wireframe",
    desc: "An AI tool that generates a wireframe for a website landing page.",
    category: "Web Development",
    icon: "https://cdn-icons-png.flaticon.com/128/3143/3143460.png",
    aiprompt: "Generate a wireframe for a landing page based on the provided content strategy and user experience goals. Provide the result in a wireframe editor format.",
    slug: "Generate-Landing-Page-Wireframe",
    form: [
        {
            label: "Enter content strategy",
            field: "textarea",
            name: "contentStrategy",
            required: true
        },
        {
            label: "Enter user experience goals",
            field: "textarea",
            name: "uxGoals",
        }
    ]
},
{
    name: "App User Flow",
    desc: "An AI tool that generates a user flow diagram for a mobile or web application.",
    category: "Web Development",
    icon: "https://cdn-icons-png.flaticon.com/128/3453/3453757.png",
    aiprompt: "Generate a user flow diagram based on the provided app features and user journey. Provide the result in a diagram editor format.",
    slug: "Generate-App-User-Flow",
    form: [
        {
            label: "Enter app features",
            field: "textarea",
            name: "appFeatures",
            required: true
        },
        {
            label: "Enter user journey",
            field: "textarea",
            name: "userJourney",
        }
    ]
},
{
    name: "App Wireframe",
    desc: "An AI tool that generates a wireframe for a mobile or web application.",
    category: "Web Development",
    icon: "https://cdn-icons-png.flaticon.com/128/3039/3039471.png",
    aiprompt: "Generate a wireframe for an application based on the provided app features and user experience goals. Provide the result in a wireframe editor format.",
    slug: "Generate-App-Wireframe",
    form: [
        {
            label: "Enter app features",
            field: "textarea",
            name: "appFeatures",
            required: true
        },
        {
            label: "Enter user experience goals",
            field: "textarea",
            name: "uxGoals",
        }
    ]
},
{
    name: "Code Review",
    desc: "An AI tool that performs a code review and provides suggestions for improvement.",
    category: "Programming",
    icon: "https://cdn-icons-png.flaticon.com/128/2809/2809383.png",
    aiprompt: "Perform a code review based on the provided code snippet and coding standards. Provide the result in a code editor format.",
    slug: "Generate-Code-Review",
    form: [
        {
            label: "Enter code snippet",
            field: "textarea",
            name: "codeSnippet",
            required: true
        },
        {
            label: "Enter coding standards",
            field: "textarea",
            name: "codingStandards",
        }
    ]
},
{
    name: "API Documentation",
    desc: "An AI tool that generates API documentation based on provided code and endpoints.",
    category: "Programming",
    icon: "https://cdn-icons-png.flaticon.com/128/2913/2913775.png",
    aiprompt: "Generate API documentation based on the provided code and endpoints. Provide the result in a rich text editor format.",
    slug: "Generate-API-Documentation",
    form: [
        {
            label: "Enter code snippet",
            field: "textarea",
            name: "codeSnippet",
            required: true
        },
        {
            label: "Enter endpoints",
            field: "textarea",
            name: "endpoints",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
            required: true
        }
    ]
},
{
    name: "Bug Report",
    desc: "An AI tool that generates a detailed bug report based on user input.",
    category: "Programming",
    icon: "https://cdn-icons-png.flaticon.com/128/3114/3114808.png",
    aiprompt: "Generate a bug report based on the provided bug description and steps to reproduce. Provide the result in a rich text editor format.",
    slug: "Generate-Bug-Report",
    form: [
        {
            label: "Enter bug description",
            field: "textarea",
            name: "bugDescription",
            required: true
        },
        {
            label: "Enter steps to reproduce",
            field: "textarea",
            name: "stepsToReproduce",
        },
        {
            label: "Enter expected outcome",
            field: "input",
            name: "expectedOutcome",
            required: true
        },
        {
            label: "Enter actual outcome",
            field: "input",
            name: "actualOutcome",
            required: true
        }
    ]
},
{
    name: "Tech Stack Recommendation",
    desc: "An AI tool that recommends a technology stack for web or mobile applications.",
    category: "Programming",
    icon: "https://cdn-icons-png.flaticon.com/128/3064/3064435.png",
    aiprompt: "Recommend a technology stack for the given web or mobile application based on the provided project requirements and development goals. Provide the result in a rich text editor format.",
    slug: "Generate-Tech-Stack-Recommendation",
    form: [
        {
            label: "Enter project requirements",
            field: "textarea",
            name: "projectRequirements",
            required: true
        },
        {
            label: "Enter development goals",
            field: "textarea",
            name: "developmentGoals",
        }
    ]
},
{
    name: "User Persona",
    desc: "An AI tool that generates user personas based on the target audience.",
    category: "User Experience",
    icon: "https://cdn-icons-png.flaticon.com/128/3872/3872626.png",
    aiprompt: "Generate user personas based on the provided target audience and user behavior data. Provide the result in a rich text editor format.",
    slug: "Generate-User-Persona",
    form: [
        {
            label: "Enter target audience",
            field: "textarea",
            name: "audience",
            required: true
        },
        {
            label: "Enter user behavior data",
            field: "textarea",
            name: "userBehavior",
        }
    ]
},
{
    name: "Wireframe Analysis",
    desc: "An AI tool that analyzes wireframes for usability and design effectiveness.",
    category: "User Experience",
    icon: "https://cdn-icons-png.flaticon.com/128/3520/3520709.png",
    aiprompt: "Analyze the provided wireframe for usability and design effectiveness based on the provided design principles and user experience goals. Provide the result in a wireframe editor format.",
    slug: "Generate-Wireframe-Analysis",
    form: [
        {
            label: "Enter wireframe design",
            field: "textarea",
            name: "wireframeDesign",
            required: true
        },
        {
            label: "Enter design principles",
            field: "textarea",
            name: "designPrinciples",
        },
        {
            label: "Enter user experience goals",
            field: "textarea",
            name: "uxGoals",
        }
    ]
},
{
    name: "A/B Test Hypothesis",
    desc: "An AI tool that generates a hypothesis for A/B testing based on the provided experiment details.",
    category: "User Experience",
    icon: "https://cdn-icons-png.flaticon.com/128/2542/2542099.png",
    aiprompt: "Generate a hypothesis for A/B testing based on the provided experiment details and user experience goals. Provide the result in a rich text editor format.",
    slug: "Generate-AB-Test-Hypothesis",
    form: [
        {
            label: "Enter experiment details",
            field: "textarea",
            name: "experimentDetails",
            required: true
        },
        {
            label: "Enter user experience goals",
            field: "textarea",
            name: "uxGoals",
        }
    ]
},
{
    name: "UX Design Critique",
    desc: "An AI tool that provides a critique of UX design based on usability principles.",
    category: "User Experience",
    icon: "https://cdn-icons-png.flaticon.com/128/3064/3064437.png",
    aiprompt: "Provide a critique of the provided UX design based on usability principles and design effectiveness. Provide the result in a rich text editor format.",
    slug: "Generate-UX-Design-Critique",
    form: [
        {
            label: "Enter UX design",
            field: "textarea",
            name: "uxDesign",
            required: true
        },
        {
            label: "Enter usability principles",
            field: "textarea",
            name: "usabilityPrinciples",
        }
    ]
},
{
    name: "User Journey Map",
    desc: "An AI tool that generates a user journey map based on user personas and user experience goals.",
    category: "User Experience",
    icon: "https://cdn-icons-png.flaticon.com/128/1239/1239396.png",
    aiprompt: "Generate a user journey map based on the provided user personas and user experience goals. Provide the result in a diagram editor format.",
    slug: "Generate-User-Journey-Map",
    form: [
        {
            label: "Enter user personas",
            field: "textarea",
            name: "userPersonas",
            required: true
        },
        {
            label: "Enter user experience goals",
            field: "textarea",
            name: "uxGoals",
        }
    ]
},
{
    name: "Event Invitation Generator",
    desc: "An AI tool that generates event invitations based on the event details.",
    category: "Event Management",
    icon: "https://cdn-icons-png.flaticon.com/128/875/875548.png",
    aiprompt: "Generate an event invitation based on the provided event details and theme. Provide the result in a rich text editor format.",
    slug: "Generate-Event-Invitation",
    form: [
        {
            label: "Enter event name",
            field: "input",
            name: "eventName",
            required: true
        },
        {
            label: "Enter event date and time",
            field: "input",
            name: "eventDateTime",
        },
        {
            label: "Enter event location",
            field: "input",
            name: "eventLocation",
        },
        {
            label: "Enter theme or style",
            field: "input",
            name: "eventTheme",
        }
    ]
},
{
    name: "Podcast Script Generator",
    desc: "An AI tool that generates a script for podcasts based on the topic and target audience.",
    category: "Podcasting",
    icon: "https://cdn-icons-png.flaticon.com/128/3673/3673892.png",
    aiprompt: "Generate a podcast script based on the provided topic and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Podcast-Script",
    form: [
        {
            label: "Enter podcast topic",
            field: "input",
            name: "podcastTopic",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired duration",
            field: "input",
            name: "duration",
        }
    ]
},
{
    name: "Sales Pitch Generator",
    desc: "An AI tool that creates compelling sales pitches for products or services.",
    category: "Sales",
    icon: "https://cdn-icons-png.flaticon.com/128/3201/3201827.png",
    aiprompt: "Generate a sales pitch based on the provided product/service details and target market. Provide the result in a rich text editor format.",
    slug: "Generate-Sales-Pitch",
    form: [
        {
            label: "Enter product/service name",
            field: "input",
            name: "productName",
            required: true
        },
        {
            label: "Enter product/service features",
            field: "textarea",
            name: "features",
        },
        {
            label: "Enter target market",
            field: "input",
            name: "targetMarket",
        },
        {
            label: "Enter desired pitch length",
            field: "input",
            name: "pitchLength",
        }
    ]
},
{
    name: "Job Description Generator",
    desc: "An AI tool that creates job descriptions based on the role and company details.",
    category: "Human Resources",
    icon: "https://cdn-icons-png.flaticon.com/128/892/892781.png",
    aiprompt: "Generate a job description based on the provided role and company details. Provide the result in a rich text editor format.",
    slug: "Generate-Job-Description",
    form: [
        {
            label: "Enter role name",
            field: "input",
            name: "roleName",
            required: true
        },
        {
            label: "Enter company name",
            field: "input",
            name: "companyName",
        },
        {
            label: "Enter role responsibilities",
            field: "textarea",
            name: "responsibilities",
        },
        {
            label: "Enter required qualifications",
            field: "textarea",
            name: "qualifications",
        }
    ]
},
{
    name: "Customer Testimonial Generator",
    desc: "An AI tool that generates customer testimonials based on feedback.",
    category: "Customer Service",
    icon: "https://cdn-icons-png.flaticon.com/128/2859/2859375.png",
    aiprompt: "Generate a customer testimonial based on the provided feedback and product/service details. Provide the result in a rich text editor format.",
    slug: "Generate-Customer-Testimonial",
    form: [
        {
            label: "Enter customer feedback",
            field: "textarea",
            name: "feedback",
            required: true
        },
        {
            label: "Enter product/service name",
            field: "input",
            name: "productName",
        },
        {
            label: "Enter customer name (optional)",
            field: "input",
            name: "customerName",
        }
    ]
},
{
    name: "Recipe Generator",
    desc: "An AI tool that generates recipes based on available ingredients.",
    category: "Food & Beverage",
    icon: "https://cdn-icons-png.flaticon.com/128/2921/2921828.png",
    aiprompt: "Generate a recipe based on the provided ingredients and desired cuisine. Provide the result in a rich text editor format.",
    slug: "Generate-Recipe",
    form: [
        {
            label: "Enter available ingredients",
            field: "textarea",
            name: "ingredients",
            required: true
        },
        {
            label: "Enter desired cuisine",
            field: "input",
            name: "cuisine",
        },
        {
            label: "Enter serving size",
            field: "input",
            name: "servingSize",
        }
    ]
},
{
    name: "Daily Planner Generator",
    desc: "An AI tool that generates daily plans based on tasks and goals.",
    category: "Productivity",
    icon: "https://cdn-icons-png.flaticon.com/128/2945/2945364.png",
    aiprompt: "Generate a daily planner based on the provided tasks and goals. Provide the result in a rich text editor format.",
    slug: "Generate-Daily-Planner",
    form: [
        {
            label: "Enter tasks",
            field: "textarea",
            name: "tasks",
            required: true
        },
        {
            label: "Enter daily goals",
            field: "textarea",
            name: "goals",
        },
        {
            label: "Enter time availability",
            field: "input",
            name: "timeAvailability",
        }
    ]
},
{
    name: "Meditation Script Generator",
    desc: "An AI tool that creates meditation scripts based on themes and objectives.",
    category: "Health & Wellness",
    icon: "https://cdn-icons-png.flaticon.com/128/2173/2173852.png",
    aiprompt: "Generate a meditation script based on the provided themes and objectives. Provide the result in a rich text editor format.",
    slug: "Generate-Meditation-Script",
    form: [
        {
            label: "Enter meditation theme",
            field: "input",
            name: "theme",
            required: true
        },
        {
            label: "Enter meditation objective",
            field: "textarea",
            name: "objective",
        },
        {
            label: "Enter desired duration",
            field: "input",
            name: "duration",
        }
    ]
},
{
    name: "Workshop Agenda Generator",
    desc: "An AI tool that generates a detailed workshop agenda based on the topic and participants.",
    category: "Event Planning",
    icon: "https://cdn-icons-png.flaticon.com/128/3114/3114193.png",
    aiprompt: "Generate a workshop agenda based on the provided topic and participants. Provide the result in a rich text editor format.",
    slug: "Generate-Workshop-Agenda",
    form: [
        {
            label: "Enter workshop topic",
            field: "input",
            name: "topic",
            required: true
        },
        {
            label: "Enter participant details",
            field: "textarea",
            name: "participants",
        },
        {
            label: "Enter desired duration",
            field: "input",
            name: "duration",
        }
    ]
},
{
    name: "Affiliate Marketing Copy",
    desc: "An AI tool that generates marketing copy for affiliate products.",
    category: "Affiliate Marketing",
    icon: "https://cdn-icons-png.flaticon.com/128/2529/2529956.png",
    aiprompt: "Generate marketing copy for the provided affiliate product based on the target audience and product features. Provide the result in a rich text editor format.",
    slug: "Generate-Affiliate-Marketing-Copy",
    form: [
        {
            label: "Enter product name",
            field: "input",
            name: "productName",
            required: true
        },
        {
            label: "Enter product features",
            field: "textarea",
            name: "features",
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
        }
    ]
},
{
    name: "Training Module Generator",
    desc: "An AI tool that generates training modules based on the subject matter.",
    category: "Education",
    icon: "https://cdn-icons-png.flaticon.com/128/3287/3287136.png",
    aiprompt: "Generate a training module based on the provided subject matter and learning objectives. Provide the result in a rich text editor format.",
    slug: "Generate-Training-Module",
    form: [
        {
            label: "Enter subject matter",
            field: "input",
            name: "subjectMatter",
            required: true
        },
        {
            label: "Enter learning objectives",
            field: "textarea",
            name: "objectives",
        },
        {
            label: "Enter desired duration",
            field: "input",
            name: "duration",
        }
    ]
},
{
    name: "Social Media Calendar",
    desc: "An AI tool that generates a social media content calendar.",
    category: "Social Media Marketing",
    icon: "https://cdn-icons-png.flaticon.com/128/1384/1384063.png",
    aiprompt: "Generate a social media content calendar based on the provided content strategy and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Social-Media-Calendar",
    form: [
        {
            label: "Enter content strategy",
            field: "textarea",
            name: "contentStrategy",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter time frame (e.g., weekly, monthly)",
            field: "input",
            name: "timeFrame",
        }
    ]
},
{
    name: "Press Release Generator",
    desc: "An AI tool that generates press releases based on the event or announcement.",
    category: "Public Relations",
    icon: "https://cdn-icons-png.flaticon.com/128/875/875526.png",
    aiprompt: "Generate a press release based on the provided event or announcement details. Provide the result in a rich text editor format.",
    slug: "Generate-Press-Release",
    form: [
        {
            label: "Enter event or announcement details",
            field: "textarea",
            name: "eventDetails",
            required: true
        },
        {
            label: "Enter company name",
            field: "input",
            name: "companyName",
        },
        {
            label: "Enter contact information",
            field: "input",
            name: "contactInfo",
        }
    ]
},
{
    name: "Fashion Lookbook Generator",
    desc: "An AI tool that generates fashion lookbooks based on the season and style.",
    category: "Fashion",
    icon: "https://cdn-icons-png.flaticon.com/128/4387/4387197.png",
    aiprompt: "Generate a fashion lookbook based on the provided season and style preferences. Provide the result in a rich text editor format.",
    slug: "Generate-Fashion-Lookbook",
    form: [
        {
            label: "Enter season",
            field: "input",
            name: "season",
            required: true
        },
        {
            label: "Enter style preferences",
            field: "textarea",
            name: "stylePreferences",
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        }
    ]
},
{
    name: "Real Estate Listing Description",
    desc: "An AI tool that generates descriptions for real estate listings.",
    category: "Real Estate",
    icon: "https://cdn-icons-png.flaticon.com/128/893/893255.png",
    aiprompt: "Generate a real estate listing description based on the provided property details and target market. Provide the result in a rich text editor format.",
    slug: "Generate-Real-Estate-Listing-Description",
    form: [
        {
            label: "Enter property details",
            field: "textarea",
            name: "propertyDetails",
            required: true
        },
        {
            label: "Enter target market",
            field: "input",
            name: "targetMarket",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
        }
    ]
},
{
    name: "Financial Report Generator",
    desc: "An AI tool that generates financial reports based on the provided data.",
    category: "Finance",
    icon: "https://cdn-icons-png.flaticon.com/128/2635/2635728.png",
    aiprompt: "Generate a financial report based on the provided financial data and report type. Provide the result in a rich text editor format.",
    slug: "Generate-Financial-Report",
    form: [
        {
            label: "Enter financial data",
            field: "textarea",
            name: "financialData",
            required: true
        },
        {
            label: "Enter report type (e.g., quarterly, annual)",
            field: "input",
            name: "reportType",
        },
        {
            label: "Enter desired word count",
            field: "input",
            name: "wordCount",
        }
    ]
},
{
    name: "Personalized Gift Ideas",
    desc: "An AI tool that generates personalized gift ideas based on recipient details.",
    category: "Gift Giving",
    icon: "https://cdn-icons-png.flaticon.com/128/2342/2342066.png",
    aiprompt: "Generate personalized gift ideas based on the provided recipient details and occasion. Provide the result in a rich text editor format.",
    slug: "Generate-Personalized-Gift-Ideas",
    form: [
        {
            label: "Enter recipient details (age, interests, etc.)",
            field: "textarea",
            name: "recipientDetails",
            required: true
        },
        {
            label: "Enter occasion",
            field: "input",
            name: "occasion",
        },
        {
            label: "Enter budget",
            field: "input",
            name: "budget",
        }
    ]
},
{
    name: "Resume Builder",
    desc: "An AI tool that generates a resume based on user input.",
    category: "Career Development",
    icon: "https://cdn-icons-png.flaticon.com/128/4712/4712312.png",
    aiprompt: "Generate a resume based on the provided user input and job role. Provide the result in a rich text editor format.",
    slug: "Generate-Resume",
    form: [
        {
            label: "Enter personal information",
            field: "textarea",
            name: "personalInfo",
            required: true
        },
        {
            label: "Enter job role",
            field: "input",
            name: "jobRole",
        },
        {
            label: "Enter work experience",
            field: "textarea",
            name: "workExperience",
        },
        {
            label: "Enter education details",
            field: "textarea",
            name: "education",
        }
    ]
},
{
    name: "Email Campaign Generator",
    desc: "An AI tool that generates email campaigns based on the marketing strategy.",
    category: "Email Marketing",
    icon: "https://cdn-icons-png.flaticon.com/128/732/732200.png",
    aiprompt: "Generate an email campaign based on the provided marketing strategy and target audience. Provide the result in a rich text editor format.",
    slug: "Generate-Email-Campaign",
    form: [
        {
            label: "Enter marketing strategy",
            field: "textarea",
            name: "marketingStrategy",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter campaign goal",
            field: "input",
            name: "campaignGoal",
        }
    ]
},
{
    name: "Market Research Report",
    desc: "An AI tool that generates market research reports based on the provided data.",
    category: "Market Research",
    icon: "https://cdn-icons-png.flaticon.com/128/3050/3050217.png",
    aiprompt: "Generate a market research report based on the provided data and industry insights. Provide the result in a rich text editor format.",
    slug: "Generate-Market-Research-Report",
    form: [
        {
            label: "Enter research data",
            field: "textarea",
            name: "researchData",
            required: true
        },
        {
            label: "Enter industry insights",
            field: "textarea",
            name: "industryInsights",
        },
        {
            label: "Enter report type (e.g., SWOT analysis, trend analysis)",
            field: "input",
            name: "reportType",
        }
    ]
},
{
    name: "Virtual Tour Script",
    desc: "An AI tool that generates scripts for virtual tours based on the location or property.",
    category: "Tourism",
    icon: "https://cdn-icons-png.flaticon.com/128/2944/2944790.png",
    aiprompt: "Generate a virtual tour script based on the provided location or property details. Provide the result in a rich text editor format.",
    slug: "Generate-Virtual-Tour-Script",
    form: [
        {
            label: "Enter location or property details",
            field: "textarea",
            name: "propertyDetails",
            required: true
        },
        {
            label: "Enter target audience",
            field: "input",
            name: "audience",
        },
        {
            label: "Enter desired tour duration",
            field: "input",
            name: "tourDuration",
        }
    ]
},
];

export default Templates;