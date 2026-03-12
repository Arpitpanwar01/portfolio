const portfolioData = `
portfolio_data = {
    "personal_info": {
        "name": "Arpit Panwar",
        "role": "Software Engineer / Full Stack Developer",
        "location": "Baghpat, Uttar Pradesh, India",
        "email": "arpitpanwar971@gamil.com",
        "phone": "+91 8755913134",
        "linkedin": "https://linkedin.com/in/arpit-panwar-537a34323"
    },

    "about": """
    Arpit Panwar is a full-stack developer specializing in React, Node.js,
    and real-time data-driven applications. He builds scalable web platforms,
    IoT dashboards, and mobile applications.

    He is currently pursuing an M.Tech while working as a software developer,
    focusing on advanced system design, backend architecture, and modern
    frontend technologies.
    """,

    "education": [

        {
            "degree": "Master of Technology (M.Tech)",
            "field": "Computer Science / Software Engineering",
            "university": "Dr. A.P.J. Abdul Kalam Technical University",
            "location": "Lucknow, India",
            "status": "Currently Pursuing"
        },

        {
            "degree": "Bachelor of Technology (B.Tech)",
            "field": "Computer Science",
            "university": "Dr. A.P.J. Abdul Kalam Technical University",
            "location": "Lucknow, India",
            "duration": "2021 - 2025"
        },

        {
            "degree": "Senior Secondary (Class XII - Science)",
            "school": "Sarvodaya Public School",
            "location": "Tatiri, Baghpat",
            "duration": "2019 - 2021"
        }
    ],

    "experience": [
        {
            "company": "Eastman Auto & Power Limited",
            "role": "Full Stack Software Developer",
            "location": "Delhi, India",
            "duration": "Oct 2025 - Present",
            "description": [
                "Developing full-stack applications for IoT-enabled automotive systems",
                "Processing real-time device data using MQTT",
                "Optimizing backend services and database performance",
                "Building energy monitoring dashboards"
            ]
        },
        {
            "company": "GeeksforGeeks",
            "role": "Full Stack Development Intern",
            "location": "Noida, India",
            "duration": "Aug 2024 - Feb 2025",
            "description": [
                "Completed a 6-month full-stack development training program",
                "Built responsive web applications",
                "Developed RESTful APIs",
                "Implemented authentication systems and database design"
            ]
        }
    ],

    "skills": {
        "frontend": [
            "React",
            "JavaScript",
            "Tailwind CSS",
            "Redux",
            "HTML",
            "CSS"
        ],

        "backend": [
            "Node.js",
            "Express",
            "Python",
            "Flask",
            "Socket.io",
            "REST API"
        ],

        "database": [
            "MySQL",
            "MongoDB",
            "SQL"
        ],

        "mobile": [
            "React Native",
            "Expo"
        ],

        "devops": [
            "Docker",
            "Git",
            "GitHub"
        ],

        "integrations": [
            "Payment Gateway",
            "MQTT",
            "Real-time Systems"
        ]
    },

    "projects": [
        {
            "title": "IoT Monitoring Dashboard",
            "description": "Real-time IoT monitoring platform that collects device data from MQTT brokers and visualizes it using interactive dashboards.",
            "tech_stack": [
                "React",
                "Tailwind CSS",
                "Node.js",
                "Express",
                "MQTT",
                "MySQL",
                "Chart.js"
            ]
        },
        {
            "title": "Solar Merchant App",
            "description": "Mobile application for solar merchants to monitor installations, track KPIs, and manage customers.",
            "tech_stack": [
                "React Native",
                "Expo",
                "Node.js",
                "REST API"
            ]
        },
        {
            "title": "Solar User Mobile App",
            "description": "Mobile app allowing solar users to monitor energy production and solar panel performance.",
            "tech_stack": [
                "React Native",
                "Expo",
                "Node.js"
            ]
        },
        {
            "title": "Multi-User Real-Time Chat System",
            "description": "Real-time chat application supporting group messaging and live updates.",
            "tech_stack": [
                "React",
                "Node.js",
                "Socket.io",
                "Express"
            ]
        },
        {
            "title": "Payment Gateway System",
            "description": "Secure payment module for transaction verification and payment processing.",
            "tech_stack": [
                "Node.js",
                "Express",
                "Payment API",
                "MySQL"
            ]
        },
        {
            "title": "Authentication API System",
            "description": "Backend authentication system with JWT security and protected APIs.",
            "tech_stack": [
                "Node.js",
                "Express",
                "JWT",
                "MySQL"
            ]
        }
    ],

    "certifications": [
        "GeeksforGeeks Full Stack Development Training",
        "Kryptora Infotech Python Training",
        "Kryptora Infotech C Programming Training"
    ]
};`

export default portfolioData;