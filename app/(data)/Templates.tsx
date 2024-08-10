export default [
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
    }
];
