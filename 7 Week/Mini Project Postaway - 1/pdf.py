from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'MOIN KHAN', 0, 1, 'C')
        self.set_font('Arial', '', 10)
        self.cell(0, 10, '+91 7987427096 | moink3181@gmail.com', 0, 1, 'C')
        self.cell(0, 10, 'LinkedIn | GitHub | LeetCode | Replit', 0, 1, 'C')
        self.ln(10)

    def section_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, title, 0, 1, 'L')
        self.ln(2)

    def section_body(self, body):
        self.set_font('Arial', '', 10)
        self.multi_cell(0, 10, body)
        self.ln(5)

pdf = PDF()
pdf.add_page()

# Education
pdf.section_title('EDUCATION')
pdf.section_body('''Bachelor of Technology (B.Tech) in Computer Science
School of Information Technology (RGPV) | Oct 2020 - Oct 2024
- CGPA: 8.79

Senior Secondary (XII)
New Betul Higher Secondary School Betul M.P. | Year - 2019
- Percentage: 82.60%

High School (X)
Anjuman High School Betul M.P. | Year - 2017
- Percentage: 82.60%
''')

# Work Experience
pdf.section_title('WORK EXPERIENCE')
pdf.section_body('''Interns Choice | Web Development Intern
July 2023 - Aug 2023
- Designed Netflix UI clone using HTML, CSS, and JavaScript. [Link]
- Developed a static Portfolio Website Page. [Link]

Simplbyte | Web Development Intern
June 2023 - July 2023
- Developed a Quiz WebApp using HTML, CSS, JavaScript, and GSAP for animations. [Link]
- Designed a ToDo WebApp using HTML, CSS, and JavaScript. [Link]
- Developed a Weather App using OpenWeatherAPI and integrated GSAP for animations. [Link]
''')

# Projects
pdf.section_title('PROJECTS')
pdf.section_body('''Online Shopping Platform
- Developed using React, integrated Auth0 for authentication and JWT for verification.
- Used SCSS to design responsive web pages and implemented multiple filters and search functionality.
- [Link]

Departmental ERP System (Full Stack Project)
- Utilized Tailwind CSS and Framer Motion for responsive design and animation.
- Implemented real-time chatting with Socket.io for one-to-one and group conversations.
- Developed user roles: Admin can manage teachers and students, teachers can manage students, and students can view their details.
- Functionalities include attendance and fees management, semester-wise reports, issue resolution with teachers, and availability of notices.

Student Information System
- Technologies: HTML, CSS, JavaScript, PHP, SQL, MySQL
- Developed a system with user-based login and data operations for admins, teachers, and students, including features like attendance management, fees structure, issue resolution, profile updates, and password management.
- First Prize Winner at SBITM 'Project Exhibition 2k24'
- [Video Link]
''')

# Technical Skills
pdf.section_title('TECHNICAL SKILLS')
pdf.section_body('''Languages: C, C++, Python, JavaScript
Web Development: HTML, CSS, SCSS, DOM Manipulation, Async JS, GSAP, APIs, Node.js, Express.js, Mongoose, CRUD Operations, JWT, Git & Version Control, PHP, Swiper JS, Redux, Sanity, SQL, React Icons
Frameworks: Bootstrap, Tailwind CSS, React.js
Databases: MySQL, MongoDB
WebDev Tools: Visual Studio Code (VSCode), GitHub, ThunderClient, Chrome DevTools
''')

# Certifications
pdf.section_title('CERTIFICATIONS')
pdf.section_body('''Data Structures and Algorithms - [Certificate]
Python - [Certificate]
Front End Development - [Certificate]
''')

# Achievements
pdf.section_title('ACHIEVEMENTS')
pdf.section_body('''First Prize Winner, SBITM 'Project Exhibition 2k24'
''')

# Save the PDF
pdf_file_path = "./Moin_Khan_Resume.pdf"
pdf.output(pdf_file_path)

pdf_file_path
