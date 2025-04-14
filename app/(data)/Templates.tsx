/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
import { TEMPLATE } from "../dashboard/_component/TemplateCard";

const Templates: TEMPLATE[] = [
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
];

export default Templates;