"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// removed category Tabs from Projects section
import { Github, Globe, Linkedin, Twitter, Code2, Brain, Database, Mail, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ContactForm } from "@/components/contact-form";
import { Particles } from "@/components/particles";
// removed radial progress for a cleaner about section
import { Typewriter } from "@/components/typewriter";
import { Waves } from "@/components/waves";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollAnimation, StaggerAnimation } from "@/components/scroll-animation";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { AchievementModal } from "@/components/achievement-modal";
import { ExperienceModal } from "@/components/experience-modal";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { SocialDock } from "@/components/social-dock";
import { WelcomePopup } from "@/components/welcome-popup";

type Project = {
  id: number;
  title: string;
  description: string;
  category: "web" | "mobile" | "design";
};

import { projects as PROJECTS } from "@/lib/data";

export default function Home() {
  const [imgError, setImgError] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  const handleProjectClick = (project: typeof PROJECTS[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleAchievementClick = (achievement: any) => {
    setSelectedAchievement(achievement);
    setIsAchievementModalOpen(true);
  };

  const handleCloseAchievementModal = () => {
    setIsAchievementModalOpen(false);
    setSelectedAchievement(null);
  };

  const handleExperienceClick = (experience: any) => {
    setSelectedExperience(experience);
    setIsExperienceModalOpen(true);
  };

  const handleCloseExperienceModal = () => {
    setIsExperienceModalOpen(false);
    setSelectedExperience(null);
  };

  return (
    <SmoothScroll>
      <ScrollProgress />
      <ScrollToTop />
      <WelcomePopup />
    <main className="min-h-screen bg-background text-foreground pt-16">
      <section id="hero" className="relative grid place-items-center min-h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,oklch(0.35_0.15_260_/_35%)_0,transparent_70%),radial-gradient(800px_300px_at_80%_10%,oklch(0.6_0.2_200_/_25%)_0,transparent_60%)]" />
        <Particles density={100} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full px-6">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div className="text-left">
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">Hi, I'm Pruthviraj <span className="select-none">👋</span></h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground">Developer & Problem Solver | Empowering projects & growth | Consistent delivery & logical thinking</p>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                <Typewriter words={["B.Tech CSE Student", "Data Science Explorer", "Programming Enthusiast", "Driven by Insights & Innovation"]} />
              </p>
              <div className="mt-8 flex items-center gap-3">
                <Button asChild className="rounded-2xl shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_30px_4px_hsl(260_80%_60%_/0.25)] transition-transform hover:scale-[1.03]">
                  <a href="#projects">View Projects</a>
                </Button>
                <Button asChild variant="secondary" className="rounded-2xl transition-transform hover:scale-[1.03]">
                  <a href="/resume.pdf" download>Download Resume</a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              {!imgError ? (
                <div className="relative h-40 w-40 md:h-52 md:w-52 overflow-hidden rounded-full ring-2 ring-primary/40 shadow-xl">
                  <Image src="/profile.jpg" alt="Pruthviraj Thorbole" fill sizes="208px" className="object-cover transition-transform duration-300 hover:scale-105" onError={() => setImgError(true)} />
                </div>
              ) : (
                <div className="h-40 w-40 md:h-52 md:w-52 rounded-full ring-2 ring-primary/40 shadow-xl grid place-items-center bg-[radial-gradient(circle_at_30%_30%,hsl(260_80%_60%/.35),transparent_60%)] text-xl md:text-2xl">PT</div>
              )}
            </div>
        </div>
        </motion.div>
          {/* Floating gradient blobs for extra dynamics */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -z-10 left-[10%] top-[20%] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(260_80%_60%/.6),transparent_60%)] blur-2xl"
            animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -z-10 right-[12%] bottom-[10%] h-56 w-56 rounded-full bg-[radial-gradient(circle_at_70%_70%,hsl(200_90%_55%/.6),transparent_60%)] blur-2xl"
            animate={{ y: [0, 12, 0], x: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        <Waves />
      </section>
      
      

      

      

      

      <section id="about" className="container mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid gap-8 place-items-center">
          <Card className="rounded-2xl w-full max-w-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10">
            <CardContent className="p-8 md:p-10 flex flex-col items-center text-center gap-4 backdrop-blur-sm border border-white/10">
              <div>
                <h3 className="text-2xl font-semibold flex items-center justify-center gap-2">🚀 About Me</h3>
                <motion.div className="text-muted-foreground mt-2 space-y-3 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                  <p>
                    I’m a third-year B.Tech CSE student with strong foundations in OOPs, DBMS, OS, CN, and COA, and hands-on
                    experience in C, C++, Java, and Python. Skilled in Git & GitHub, I enjoy building efficient and impactful
                    solutions.
                  </p>
                  <p>
                    My interests span across Data Science, Machine Learning, Deep Learning, and Natural Language Processing, where I
                    aim to apply my skills to real-world, innovative projects. Alongside technology, I’m also learning Spanish,
                    expanding my global perspective.
                  </p>
                  <p>🚀 Driven by curiosity, I strive to grow as a versatile engineer and contribute to meaningful tech advancements.</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section id="achievements" className="container mx-auto px-6 py-20">
        <ScrollAnimation direction="up" delay={0.2}>
          <div className="grid place-items-center">
          <Card className="rounded-2xl w-full max-w-6xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10">
            <CardContent className="p-6 md:p-8 backdrop-blur-sm border border-white/10">
                <ScrollAnimation direction="fade" delay={0.3}>
                  <h2 className="text-2xl font-semibold text-center">Achievements & Milestones</h2>
                  <p className="text-center text-muted-foreground mt-1">Highlights that showcase my technical growth and academic excellence</p>
                </ScrollAnimation>
                                <StaggerAnimation className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
                  {[
                    { 
                      icon: "🎓", 
                      title: "Academic Excellence", 
                      desc: "Achieved 8.72 CPI in Second Year B.Tech CSE, demonstrating strong academic performance and dedication to learning.",
                      color: "from-blue-500/20 to-cyan-500/20",
                      details: "Maintained exceptional academic performance in Computer Science and Engineering, achieving a Cumulative Performance Index (CPI) of 8.72 in the second year. This demonstrates strong analytical thinking, problem-solving abilities, and dedication to academic excellence.",
                      date: "2024-2025",
                      impact: "This academic achievement showcases my ability to handle complex technical subjects and maintain high standards in a competitive engineering environment."
                    },
                    { 
                      icon: "📈", 
                      title: "Data Science Expertise", 
                      desc: "Earned 4 professional certifications in Data Science, Python programming, and Data Visualization from IBM and KNIME, demonstrating comprehensive analytics skills.",
                      color: "from-purple-500/20 to-pink-500/20",
                      details: "Completed comprehensive data science training including Python for Data Science, AI & Development, Data Visualization with Excel and Cognos, Python Project for Data Science, and Data Science Professional Certificate by KNIME. These certifications cover data analysis, machine learning, visualization, and business intelligence.",
                      date: "2025",
                      impact: "These certifications validate my expertise in modern data science tools and techniques, making me well-prepared for data-driven roles in technology and analytics."
                    },
                    { 
                      icon: "☁️", 
                      title: "Google Cloud Facilitator", 
                      desc: "Selected as part of Google Cloud Arcade Facilitator Program 2025, earning exclusive goodies and recognition for community leadership.",
                      color: "from-green-500/20 to-emerald-500/20",
                      details: "Successfully participated in the prestigious Google Cloud Arcade Facilitator Program 2025, where I facilitated cloud computing workshops and helped others learn Google Cloud technologies. This program recognizes community leaders who contribute to the growth of cloud computing knowledge and skills.",
                      date: "2025",
                      impact: "This achievement demonstrates my leadership skills, community involvement, and expertise in cloud computing technologies, making me a valuable asset for organizations looking for cloud-savvy professionals."
                    },
                    { 
                      icon: "📊", 
                      title: "Problem Solving", 
                      desc: "Strong foundation in Data Structures & Algorithms with practical problem-solving skills using Java programming.",
                      color: "from-orange-500/20 to-red-500/20",
                      details: "Developed strong problem-solving skills through systematic study of Data Structures and Algorithms. Implemented various algorithms and data structures in Java, including arrays, linked lists, trees, graphs, sorting algorithms, and dynamic programming solutions.",
                      date: "2023-2025",
                      impact: "These skills are fundamental for software development and are highly valued in technical interviews and real-world programming challenges."
                    },
                    { 
                      icon: "🎯", 
                      title: "Placement & Cell Co-ordinator", 
                      desc: "Serving as Placement and Cell Co-ordinator in CSE Department of Annasaheb Dange College of Engineering and Technology (ADCET), demonstrating leadership and organizational skills.",
                      color: "from-indigo-500/20 to-blue-500/20",
                      details: "Currently serving as the Placement and Cell Co-ordinator in the Computer Science and Engineering Department at Annasaheb Dange College of Engineering and Technology (ADCET). This role involves coordinating placement activities, organizing career development programs, and facilitating connections between students and industry partners.",
                      date: "2024-2025",
                      impact: "This leadership position showcases my organizational abilities, communication skills, and commitment to helping fellow students succeed in their careers. It demonstrates my ability to take responsibility and manage important institutional initiatives."
                    },
                ].map((a, idx) => (
                    <div 
                      key={a.title} 
                      className="rounded-2xl relative overflow-hidden group cursor-pointer"
                      onClick={() => handleAchievementClick(a)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className="relative h-full w-full backdrop-blur-sm bg-background/40 border border-white/10 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-[0_0_30px_0_rgba(99,102,241,.25)]">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{a.icon}</span>
                          <h5 className="font-semibold text-lg">{a.title}</h5>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                      </div>
                    </div>
                ))}
                </StaggerAnimation>
            </CardContent>
          </Card>
          </div>
        </ScrollAnimation>
      </section>

      <section id="technical-skills" className="container mx-auto px-6 py-10">
        <ScrollAnimation direction="up" delay={0.2}>
          <div className="grid place-items-center">
          <Card className="rounded-2xl w-full max-w-6xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10">
            <CardContent className="p-6 md:p-8">
                <ScrollAnimation direction="fade" delay={0.3}>
              <h4 className="text-lg md:text-xl font-semibold text-center">Technical Skills</h4>
              <p className="text-center text-muted-foreground text-sm md:text-base">A colorful snapshot of my stack and strengths</p>
                </ScrollAnimation>
                <StaggerAnimation className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
                {[
                  { icon: "💻", title: "Programming", tags: ["C", "C++", "Java", "Python"], colors: "from-indigo-500 to-sky-500" },
                  { icon: "🔎", title: "Problem Solving", tags: ["DSA", "Algorithms", "Challenges using Java"], colors: "from-fuchsia-500 to-pink-500" },
                  { icon: "🗄️", title: "Databases", tags: ["SQL", "MongoDB"], colors: "from-emerald-500 to-teal-500" },
                  { icon: "🤖", title: "AI / ML", tags: ["Data Science", "Machine Learning", "Deep Learning", "NLP"], colors: "from-purple-500 to-cyan-500" },
                  { icon: "⚙️", title: "Tools", tags: ["Git", "GitHub"], colors: "from-amber-500 to-orange-500" },
                  { icon: "🌍", title: "Other", tags: ["Spanish (Learning)"] , colors: "from-blue-500 to-indigo-500"},
                ].map((group, idx) => (
                    <div
                    key={group.title}
                    className="rounded-2xl relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${group.colors} opacity-30`} />
                    <div className="relative h-full w-full backdrop-blur-sm bg-background/40 border border-white/10 rounded-2xl p-5 md:p-6 transition-transform duration-300 hover:scale-[1.02] shadow-sm hover:shadow-[0_0_30px_0_rgba(99,102,241,.25)]">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{group.icon}</span>
                        <h5 className="font-medium">{group.title}</h5>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {group.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs md:text-sm rounded-full px-3 py-1 text-foreground bg-gradient-to-r from-white/10 to-white/5 border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    </div>
                ))}
                </StaggerAnimation>
            </CardContent>
          </Card>
          </div>
        </ScrollAnimation>
      </section>
      <section id="soft-skills" className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 place-items-center"
        >
          <Card className="w-full max-w-5xl rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10">
            <CardContent className="p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-medium text-center">Non Technical Skills</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: "🧠", text: "Problem-Solving & Critical Thinking – Analyze issues and craft clear, effective solutions." },
                  { icon: "🗣️", text: "Communication Skills – Concise writing and confident speaking." },
                  { icon: "🤝", text: "Collaboration & Teamwork – Contribute, support, and align with team goals." },
                  { icon: "🔄", text: "Adaptability & Continuous Learning – Embrace change and upskill rapidly." },
                  { icon: "⏳", text: "Time Management – Plan, prioritize, and meet deadlines." },
                  { icon: "💡", text: "Creativity & Innovation – Generate fresh ideas and improvements." },
                  { icon: "🚀", text: "Leadership & Initiative – Take ownership and guide outcomes." },
                  { icon: "🌐", text: "Networking & Interpersonal Skills – Build relationships and communities." },
                  { icon: "🎤", text: "Presentation & Storytelling – Explain concepts clearly with impact." },
                  { icon: "🌍", text: "Cultural Awareness & Language Skills – Inclusive mindset; learning Spanish." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }} className="rounded-2xl border border-white/10 bg-background/40 backdrop-blur-sm p-4 hover:scale-[1.02] transition shadow-sm hover:shadow-[0_0_30px_0_rgba(99,102,241,.25)]">
                    <p className="text-sm leading-relaxed"><span className="mr-2">{item.icon}</span>{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section id="projects" className="container mx-auto px-6 py-20">
        <ScrollAnimation direction="up" delay={0.2}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Projects</h2>
            <p className="text-muted-foreground">Showcasing my technical skills and creativity</p>
        </div>
        </ScrollAnimation>
        <StaggerAnimation className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => handleProjectClick(p)} />
          ))}
        </StaggerAnimation>
      </section>

      <section id="certifications" className="container mx-auto px-6 py-20">
        <ScrollAnimation direction="up" delay={0.2}>
          <div className="grid place-items-center">
            <Card className="rounded-2xl w-full max-w-4xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10">
              <CardContent className="p-6 md:p-8 backdrop-blur-sm border border-white/10">
                <ScrollAnimation direction="fade" delay={0.3}>
                  <h2 className="text-2xl font-semibold text-center">Professional Certifications</h2>
                  <p className="text-center text-muted-foreground mt-1">Industry-recognized credentials that validate my expertise</p>
                </ScrollAnimation>
                <StaggerAnimation className="mt-8 grid gap-6" staggerDelay={0.2}>
                  {[
                    {
                      icon: "🐍",
                      title: "Python for Data Science, AI & Development",
                      issuer: "IBM",
                      platform: "Coursera",
                      date: "July 24, 2025",
                      description: "Comprehensive Python programming course covering data science fundamentals, AI development, web scraping, and data manipulation using Pandas, NumPy, and Jupyter Notebooks.",
                      link: "https://coursera.org/share/f52c38332a6f9d89f6f0f1067b0923c7",
                      color: "from-blue-500/20 to-cyan-500/20"
                    },
                    {
                      icon: "📊",
                      title: "Data Visualization and Dashboards with Excel and Cognos",
                      issuer: "IBM",
                      platform: "Coursera",
                      date: "June 21, 2025",
                      description: "Advanced data visualization course covering Excel charts, Cognos Analytics dashboards, data storytelling, and interactive dashboard creation for business intelligence.",
                      link: "https://coursera.org/share/b258d072923d9761fb41a3cfef886f3f",
                      color: "from-green-500/20 to-emerald-500/20"
                    },
                    {
                      icon: "🚀",
                      title: "Python Project for Data Science",
                      issuer: "IBM",
                      platform: "Coursera",
                      date: "July 30, 2025",
                      description: "Hands-on project-based course where I built a complete data science dashboard using Python, Pandas, Beautiful Soup, and Plotly in Jupyter notebooks.",
                      link: "https://coursera.org/share/27ad845d8cbfce1bd67e736a3b33a056",
                      color: "from-orange-500/20 to-red-500/20"
                    },
                    {
                      icon: "📈",
                      title: "Data Science Professional Certificate",
                      issuer: "KNIME",
                      platform: "LinkedIn Learning",
                      date: "January 2025",
                      description: "Comprehensive certification covering data analysis, business intelligence, and data science fundamentals. Completed through LinkedIn Learning's professional development platform.",
                      link: "https://lnkd.in/gasA3fv3",
                      color: "from-purple-500/20 to-pink-500/20"
                    }
                  ].map((cert, idx) => (
                    <div key={cert.title} className="rounded-2xl relative overflow-hidden group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className="relative backdrop-blur-sm bg-background/40 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] shadow-sm hover:shadow-[0_0_30px_0_rgba(99,102,241,.25)]">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <span className="text-3xl">{cert.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-xl">{cert.title}</h3>
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                Verified
                              </Badge>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-2 mb-3 text-sm">
                              <div>
                                <span className="text-muted-foreground">Issuer:</span>
                                <span className="ml-2 font-medium">{cert.issuer}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Platform:</span>
                                <span className="ml-2 font-medium">{cert.platform}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Date:</span>
                                <span className="ml-2 font-medium">{cert.date}</span>
                              </div>
              </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">{cert.description}</p>
                  <Button asChild size="sm" className="rounded-2xl">
                              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Certificate
                    </a>
                  </Button>
                </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </StaggerAnimation>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimation>
      </section>

      <section id="experience" className="container mx-auto px-6 py-20">
        <ScrollAnimation direction="up" delay={0.2}>
          <div className="grid place-items-center">
            <Card className="rounded-2xl w-full max-w-6xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10">
              <CardContent className="p-6 md:p-8 backdrop-blur-sm border border-white/10">
                <ScrollAnimation direction="fade" delay={0.3}>
                  <h2 className="text-2xl font-semibold text-center">Professional Experience</h2>
                  <p className="text-center text-muted-foreground mt-1">My journey in technology and professional development</p>
                </ScrollAnimation>
                <StaggerAnimation className="mt-8 space-y-8" staggerDelay={0.2}>
                  {[
                    {
                      title: "Python Full Stack Development Intern",
                      company: "PrepGrad Technologies",
                      type: "Internship",
                      duration: "June 2026 – August 2026",
                      location: "Remote",
                      description: "Successfully completed a structured internship focused on Python-based full stack development, emphasizing backend programming, database management, and deployment.",
                      achievements: [
                        "Developed server-side applications with Python Flask/Django",
                        "Designed schemas and queries using MySQL",
                        "Created and tested RESTful APIs for data-driven apps",
                        "Worked on user authentication, role management, and CRUD modules",
                        "Learned fundamentals of deploying applications to cloud servers"
                      ],
                      technologies: ["Python", "Flask", "Django", "MySQL", "RESTful APIs", "Authentication", "Role Management", "CRUD Operations", "Cloud Deployment"],
                      icon: "🐍",
                      color: "from-yellow-500/20 to-orange-500/20"
                    },
                    {
                      title: "Google Cloud Arcade Facilitator",
                      company: "Google Cloud",
                      type: "Community Leadership",
                      duration: "2025",
                      location: "Remote",
                      description: "Facilitated cloud computing workshops and helped others learn Google Cloud technologies. Recognized for community leadership and contribution to cloud computing education.",
                      achievements: [
                        "Conducted hands-on workshops on Google Cloud Platform",
                        "Mentored participants in cloud computing fundamentals",
                        "Earned exclusive Google Cloud goodies and recognition",
                        "Contributed to the growth of cloud computing knowledge"
                      ],
                      technologies: ["Google Cloud Platform", "Cloud Computing", "Workshop Facilitation", "Community Building"],
                      icon: "☁️",
                      color: "from-green-500/20 to-emerald-500/20"
                    },
                    {
                      title: "Data Science Learner",
                      company: "IBM & KNIME",
                      type: "Professional Development",
                      duration: "2025",
                      location: "Online",
                      description: "Completed comprehensive data science training programs and earned multiple professional certifications from industry leaders.",
                      achievements: [
                        "Earned 4 professional certifications in Data Science and Analytics",
                        "Completed Python for Data Science, AI & Development course",
                        "Mastered Data Visualization with Excel and Cognos",
                        "Built data science projects and interactive dashboards"
                      ],
                      technologies: ["Python", "Pandas", "NumPy", "Excel", "Cognos Analytics", "Data Visualization"],
                      icon: "📊",
                      color: "from-purple-500/20 to-pink-500/20"
                    }
                  ].map((exp, idx) => (
                    <div 
                      key={exp.title} 
                      className="rounded-2xl relative overflow-hidden group cursor-pointer"
                      onClick={() => handleExperienceClick(exp)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className="relative backdrop-blur-sm bg-background/40 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] shadow-sm hover:shadow-[0_0_30px_0_rgba(99,102,241,.25)]">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{exp.icon}</span>
                          <div>
                            <h3 className="font-semibold text-xl">{exp.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{exp.company}</p>
                            <Badge className="mt-2 bg-blue-500/20 text-blue-300 border-blue-500/30">
                              {exp.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </StaggerAnimation>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimation>
      </section>

      <section id="education" className="container mx-auto px-6 py-20">
        <ScrollAnimation direction="up" delay={0.2}>
          <h2 className="text-2xl font-semibold text-center mb-12">Education</h2>
        </ScrollAnimation>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 rounded" />
          <div className="space-y-8">
            {[
              { 
                y: "2023-2027", 
                degree: "B.Tech in Computer Science And Engineering", 
                institution: "Shivaji University Kolhapur", 
                college: "Annasaheb Dange College Of Engineering And Technology Ashta",
                details: "Pursuing B.Tech Degree In Computer Science And Engineering. Second Year CPI: 8.72 CPI",
                icon: "🎓"
              },
              { 
                y: "2023", 
                degree: "Higher Secondary Education", 
                institution: "Maharashtra State Board", 
                college: "",
                details: "Passed In 2023 From The Maharashtra State Board With 61.33 Percentage",
                icon: "📚"
              },
              { 
                y: "2021", 
                degree: "Secondary School Education", 
                institution: "Maharashtra State Board", 
                college: "",
                details: "Passed In 2021 From The Maharashtra State Board With 69.80 Percentage",
                icon: "🏫"
              }
            ].map((edu, i) => (
              <ScrollAnimation key={i} direction={i % 2 ? "right" : "left"} delay={0.3 + i * 0.1}>
                <div className={`relative grid md:grid-cols-2 ${i % 2 ? "md:pr-[52%]" : "md:pl-[52%]"}`}>
                <div className={`md:col-start-${i % 2 ? 2 : 1} `}>
                    <div className="rounded-2xl border border-white/10 bg-background/40 backdrop-blur-sm p-6 shadow-sm hover:shadow-[0_0_30px_0_rgba(99,102,241,.25)] transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{edu.icon}</span>
                        <p className="text-sm text-muted-foreground font-medium">{edu.y}</p>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{edu.institution}</p>
                      {edu.college && (
                        <p className="text-sm text-muted-foreground mb-2">{edu.college}</p>
                      )}
                      <p className="text-sm text-foreground/80 leading-relaxed">{edu.details}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 h-8 w-8 rounded-full grid place-items-center bg-background border border-white/20 shadow-lg">
                    <span className="text-sm">{edu.icon}</span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="container mx-auto px-6 py-20">
        <ScrollAnimation direction="up">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to start a project or just want to chat? I'd love to hear from you!
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10">
              <CardContent className="p-8 backdrop-blur-sm">
              <ContactForm />
            </CardContent>
          </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Personal Contact */}
            <Card className="rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 border border-white/10">
              <CardContent className="p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>👋</span> Get In Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span className="text-muted-foreground">pruthvirajthorbole96@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-cyan-400" />
                    <span className="text-muted-foreground">+91 8262968845</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-lg">📍</span>
                    <span className="text-muted-foreground">Sangli, Maharashtra, India</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 border border-white/10">
              <CardContent className="p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>🌐</span> Follow Me
                </h3>
                <div className="space-y-3">
                  <a 
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-background/40 backdrop-blur-sm hover:scale-[1.02] hover:shadow-[0_0_30px_0_rgba(99,102,241,.25)] transition-all duration-300 group" 
                    href="https://github.com/pruthvi025" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github size={18} className="text-indigo-400 group-hover:text-indigo-300" /> 
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                  <a 
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-background/40 backdrop-blur-sm hover:scale-[1.02] hover:shadow-[0_0_30px_0_rgba(168,85,247,.25)] transition-all duration-300 group" 
                    href="https://www.linkedin.com/in/pruthviraj-thorbole-b33370294" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={18} className="text-purple-400 group-hover:text-purple-300" /> 
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                  <a 
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-background/40 backdrop-blur-sm hover:scale-[1.02] hover:shadow-[0_0_30px_0_rgba(6,182,212,.25)] transition-all duration-300 group" 
                    href="#" 
                    aria-label="Twitter"
                  >
                    <Twitter size={18} className="text-cyan-400 group-hover:text-cyan-300" /> 
                    <span className="text-sm font-medium">Twitter</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Quick Response */}
            <Card className="rounded-2xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-white/10">
              <CardContent className="p-6 backdrop-blur-sm text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold mb-2">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  I typically respond within 24 hours during business days
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Pruthviraj Thorbole</p>
          <div className="flex gap-4 text-sm">
            <a href="#hero" className="hover:underline">Home</a>
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#experience" className="hover:underline">Experience</a>
            <a href="#certifications" className="hover:underline">Certifications</a>
            <a href="#education" className="hover:underline">Education</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </main>
      
      {/* Project Modal */}
              <ProjectModal 
          project={selectedProject} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
        <AchievementModal 
          achievement={selectedAchievement} 
          isOpen={isAchievementModalOpen} 
          onClose={handleCloseAchievementModal} 
        />
        <ExperienceModal 
          experience={selectedExperience} 
          isOpen={isExperienceModalOpen} 
          onClose={handleCloseExperienceModal} 
        />
      <SocialDock />
      </SmoothScroll>
  );
}
