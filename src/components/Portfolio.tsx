import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Github, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Download,
  Code,
  Database,
  Globe,
  Smartphone,
  Server,
  Palette,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

interface Skill {
  name: string;
  category: string;
  level: number;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    category: "fullstack",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Modern task management application with real-time collaboration, drag-and-drop functionality, and team workspaces.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    tags: ["React", "TypeScript", "Firebase", "Tailwind"],
    category: "frontend",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true
  },
  {
    id: "3",
    title: "AI Chat Bot",
    description: "Intelligent chatbot powered by OpenAI GPT-4, with context awareness and multi-language support.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    tags: ["Python", "OpenAI", "FastAPI", "Docker"],
    category: "backend",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    id: "4",
    title: "Mobile Weather App",
    description: "Cross-platform weather application with location-based forecasts, interactive maps, and weather alerts.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    tags: ["React Native", "Expo", "Weather API"],
    category: "mobile",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    id: "5",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for business analytics with real-time data processing and customizable charts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["D3.js", "React", "Python", "MongoDB"],
    category: "fullstack",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true
  },
  {
    id: "6",
    title: "Blockchain Voting System",
    description: "Secure voting platform built on Ethereum blockchain with smart contracts and transparent vote counting.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    tags: ["Solidity", "Web3.js", "React", "Ethereum"],
    category: "blockchain",
    githubUrl: "https://github.com",
    featured: false
  }
];

const skills: Skill[] = [
  { name: "JavaScript", category: "frontend", level: 95, icon: <Code className="w-5 h-5" /> },
  { name: "TypeScript", category: "frontend", level: 90, icon: <Code className="w-5 h-5" /> },
  { name: "React", category: "frontend", level: 95, icon: <Code className="w-5 h-5" /> },
  { name: "Next.js", category: "frontend", level: 85, icon: <Globe className="w-5 h-5" /> },
  { name: "Vue.js", category: "frontend", level: 80, icon: <Code className="w-5 h-5" /> },
  { name: "Tailwind CSS", category: "frontend", level: 90, icon: <Palette className="w-5 h-5" /> },
  
  { name: "Node.js", category: "backend", level: 90, icon: <Server className="w-5 h-5" /> },
  { name: "Python", category: "backend", level: 85, icon: <Server className="w-5 h-5" /> },
  { name: "Express.js", category: "backend", level: 88, icon: <Server className="w-5 h-5" /> },
  { name: "FastAPI", category: "backend", level: 80, icon: <Server className="w-5 h-5" /> },
  
  { name: "PostgreSQL", category: "database", level: 85, icon: <Database className="w-5 h-5" /> },
  { name: "MongoDB", category: "database", level: 80, icon: <Database className="w-5 h-5" /> },
  { name: "Redis", category: "database", level: 75, icon: <Database className="w-5 h-5" /> },
  
  { name: "React Native", category: "mobile", level: 80, icon: <Smartphone className="w-5 h-5" /> },
  { name: "Flutter", category: "mobile", level: 70, icon: <Smartphone className="w-5 h-5" /> },
];

export function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "mobile", label: "Mobile" },
    { id: "blockchain", label: "Blockchain" }
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const skillCategories = [
    { id: "frontend", label: "Frontend", color: "neon-green" },
    { id: "backend", label: "Backend", color: "neon-blue" },
    { id: "database", label: "Database", color: "neon-pink" },
    { id: "mobile", label: "Mobile", color: "neon-green" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! I'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gradient-neon"
            >
              Portfolio
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "projects", "skills", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-[var(--neon-green)] ${
                    activeSection === section ? "text-[var(--neon-green)]" : ""
                  }`}
                >
                  {section}
                </button>
              ))}
              <Button
                variant="outline"
                className="neon-border-green hover:neon-glow-green transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-border pt-4"
            >
              <div className="flex flex-col space-y-4">
                {["home", "about", "projects", "skills", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize text-left transition-all duration-300 hover:text-[var(--neon-green)] ${
                      activeSection === section ? "text-[var(--neon-green)]" : ""
                    }`}
                  >
                    {section}
                  </button>
                ))}
                <Button
                  variant="outline"
                  className="neon-border-green hover:neon-glow-green transition-all duration-300 w-fit"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark"></div>
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-[var(--neon-green)] rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--neon-pink)] rounded-full opacity-10 blur-3xl"
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm{" "}
              <span className="text-gradient-neon">Alex Johnson</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Full-Stack Developer & UI/UX Designer passionate about creating 
              innovative digital experiences that make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="neon-glow-green bg-[var(--neon-green)] text-black hover:bg-[var(--neon-green)]/90"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="neon-border-blue hover:neon-glow-blue"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient-neon">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] rounded-2xl blur opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face"
                  alt="Alex Johnson"
                  className="relative rounded-2xl w-full max-w-md mx-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-[var(--neon-green)]">
                Passionate Developer & Designer
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 5 years of experience in full-stack development, I specialize in 
                creating modern, scalable web applications that deliver exceptional user experiences. 
                My journey began with a curiosity for how things work, which led me to explore 
                the endless possibilities of code.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm proficient in modern technologies like React, Node.js, Python, and cloud 
                platforms. I believe in writing clean, maintainable code and staying up-to-date 
                with the latest industry trends and best practices.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 gradient-card rounded-lg neon-border-green">
                  <div className="text-3xl font-bold text-[var(--neon-green)]">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center p-4 gradient-card rounded-lg neon-border-blue">
                  <div className="text-3xl font-bold text-[var(--neon-blue)]">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient-neon">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-blue)] mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development.
            </p>
          </motion.div>

          {/* Project Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "neon-glow-green bg-[var(--neon-green)] text-black"
                    : "neon-border-green hover:neon-glow-green"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="gradient-card border-border hover:neon-border-blue transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="neon-border-green">
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="sm" variant="outline" className="neon-border-blue">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {project.featured && (
                      <Badge className="absolute top-4 right-4 bg-[var(--neon-pink)] text-black">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-[var(--neon-green)] transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient-neon">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-pink)] mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life.
            </p>
          </motion.div>

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              {skillCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:neon-glow-green"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {skills
                    .filter((skill) => skill.category === category.id)
                    .map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="gradient-card p-6 rounded-lg neon-border-green hover:neon-glow-green transition-all duration-300"
                      >
                        <div className="flex items-center mb-4">
                          <div className="text-[var(--neon-green)] mr-3">
                            {skill.icon}
                          </div>
                          <h3 className="font-semibold">{skill.name}</h3>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] h-2 rounded-full"
                          />
                        </div>
                        <div className="text-right text-sm text-muted-foreground mt-2">
                          {skill.level}%
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get In <span className="text-gradient-neon">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-pink)] mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[var(--neon-green)]">
                Let's Work Together
              </h3>
              <p className="text-muted-foreground mb-8">
                Whether you have a project in mind or just want to chat about technology, 
                I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">alex.johnson@email.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-pink)] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-green)] rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="gradient-card neon-border-blue">
                <CardHeader>
                  <CardTitle>Send Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <Input
                          required
                          placeholder="Your name"
                          className="neon-border-green focus:neon-glow-green"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          className="neon-border-green focus:neon-glow-green"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <Input
                        required
                        placeholder="Project inquiry"
                        className="neon-border-green focus:neon-glow-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea
                        required
                        placeholder="Tell me about your project..."
                        rows={5}
                        className="neon-border-green focus:neon-glow-green"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full neon-glow-blue bg-[var(--neon-blue)] text-black hover:bg-[var(--neon-blue)]/90"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gradient-neon mb-2">Alex Johnson</h3>
              <p className="text-muted-foreground">Full-Stack Developer & UI/UX Designer</p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[var(--neon-green)] transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="mailto:alex.johnson@email.com"
                className="text-muted-foreground hover:text-[var(--neon-blue)] transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-muted-foreground">
              © 2024 Alex Johnson. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}