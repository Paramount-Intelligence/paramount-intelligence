import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

// Complete job data
const jobsData: { [key: string]: any } = {
  "senior-ai-engineer": {
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    openPositions: 1,
    overview:
      "We are seeking a Senior AI Engineer to lead the design, architecture, and deployment of enterprise-grade AI systems across client environments. This role goes beyond experimentation. You will build production-ready LLM applications, Retrieval-Augmented Generation systems, agentic architectures, and advanced machine learning pipelines that integrate directly into business-critical workflows.\nYou will work at the intersection of AI Solutions & Engineering, AI Studio & Platform Engineering, Data & Analytics, and Cloud Services ensuring that intelligent systems are secure, scalable, and operationally reliable.",
    responsibilities: [
      "Lead the end-to-end development of LLM-powered applications and intelligent agent systems",
      "Design secure and scalable RAG architectures grounded in enterprise data",
      "Architect model orchestration, prompt engineering strategies, and memory frameworks",
      "Build production-grade ML pipelines with monitoring, retraining, and performance controls",
      "Collaborate with cloud and data engineering teams to ensure system integration",
      "Implement LLMOps and MLOps best practices for reliability and governance",
      "Optimize systems for latency, cost efficiency, and enterprise security standards",
      "Mentor junior engineers and contribute to internal AI capability development",
    ],
    requirements: [
      "5+ years of experience in AI/ML engineering roles",
      "Hands-on experience building and deploying LLM applications",
      "Strong experience with RAG systems and vector databases",
      "Advanced Python expertise with clean, production-ready coding practices",
      "Experience deploying models into cloud-native environments",
      "Solid understanding of system design and distributed architectures",
    ],
    preferred: [
      "Experience designing multi-agent AI systems",
      "Exposure to enterprise data platforms and integration patterns",
      "Familiarity with AI governance and security considerations",
      "Experience working in consulting or client-facing environments",
    ],
    whatWeValue: [
      "Structured thinking and architectural discipline",
      "Ownership of outcomes, not just code delivery",
      "Ability to translate ambiguous requirements into scalable systems",
      "Clear communication across technical and business stakeholders",
    ],
    whatYouGain: [
      "Exposure to enterprise-scale AI deployments across industries",
      "Leadership role in complex, high-impact projects",
      "Direct involvement in AI Studio & Platform Engineering initiatives",
      "Opportunity to shape internal engineering standards and architecture practices",
    ],
  },
  "machine-learning-engineer": {
    title: "Machine Learning Engineer",
    department: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    openPositions: 1,
    overview:
      "We are looking for a Machine Learning Engineer to design, develop, and deploy scalable ML models that operate reliably in production environments. This role focuses on translating structured and unstructured data into intelligent systems that power enterprise workflows across industries.\nYou will work closely with AI engineers, data engineers, and cloud teams to ensure models are not only accurate but also production-ready, observable, and scalable. This role sits at the core of our AI Solutions & Engineering and Data & Analytics practice.",
    responsibilities: [
      "Design and implement machine learning models for real-world applications",
      "Develop robust model training, evaluation, and validation pipelines",
      "Deploy models into production environments with monitoring and retraining workflows",
      "Optimize model performance, latency, and cost efficiency",
      "Collaborate with data engineering teams to ensure clean, scalable data pipelines",
      "Integrate ML models into cloud-native architectures",
      "Contribute to MLOps practices, including versioning and lifecycle management",
    ],
    requirements: [
      "3+ years of experience in machine learning roles",
      "Strong experience with TensorFlow or PyTorch",
      "Solid understanding of model evaluation metrics and optimization techniques",
      "Experience working with cloud platforms",
      "Strong Python proficiency and data handling skills",
      "Experience deploying ML systems into production",
    ],
    preferred: [
      "Experience with large-scale data environments",
      "Familiarity with distributed training frameworks",
      "Exposure to enterprise data governance practices",
      "Experience integrating ML models with APIs and enterprise applications",
    ],
    whatWeValue: [
      "Engineering rigor and clean implementation",
      "Accountability for model performance in production",
      "Structured experimentation and validation discipline",
      "Clear communication of technical trade-offs",
    ],
    whatYouGain: [
      "Experience deploying ML systems across multiple industries",
      "Exposure to enterprise-scale production environments",
      "Hands-on experience in integrating ML with AI platforms and cloud infrastructure",
      "Opportunity to grow into advanced AI system architecture roles",
    ],
  },
  "ai-product-manager": {
    title: "AI Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    openPositions: 1,
    overview:
      "We are seeking an AI Product Manager to define and drive the strategy, roadmap, and execution of AI-enabled solutions across client engagements. This role operates at the intersection of business strategy, engineering capability, and client objectives.\nYou will work closely with consulting teams, AI engineers, data specialists, and executive stakeholders to translate business priorities into clearly defined product requirements and scalable technical delivery plans. The focus is not experimentation, but measurable business impact.\nThis role is central to our AI Strategy & Consulting and AI Solutions & Engineering practices.",
    responsibilities: [
      "Define product vision and roadmap for AI-enabled solutions",
      "Translate business requirements into structured technical specifications",
      "Prioritize features based on ROI, feasibility, and strategic alignment",
      "Coordinate cross-functional execution across engineering and consulting teams",
      "Drive stakeholder alignment across clients and internal teams",
      "Define KPIs and success metrics for AI initiatives",
      "Ensure delivery timelines, scope control, and production readiness",
    ],
    requirements: [
      "4+ years of product management experience",
      "Strong understanding of AI and machine learning systems",
      "Experience in B2B environments",
      "Ability to operate across technical and business stakeholders",
      "Strong communication and structured documentation skills",
    ],
    preferred: [
      "Experience managing AI or data-driven products",
      "Exposure to enterprise client environments",
      "Familiarity with cloud-based architectures",
      "Experience in consulting or technology services firms",
    ],
    whatWeValue: [
      "Structured product thinking and prioritization discipline",
      "Ability to connect strategy to execution",
      "Strong ownership mindset",
      "Clear communication across technical and executive audiences",
    ],
    whatYouGain: [
      "Ownership of AI-enabled product initiatives across industries",
      "Direct collaboration with senior leadership and enterprise clients",
      "Exposure to cross-industry transformation programs",
      "Opportunity to shape scalable AI product practices within a consulting-driven environment",
    ],
  },
  "data-scientist": {
    title: "Data Scientist",
    department: "Data Science",
    location: "Remote",
    type: "Full-time",
    openPositions: 1,
    overview:
      "We are seeking a Data Scientist to extract structured insight from complex datasets and build predictive models that directly support strategic and operational decision-making.\nThis role sits at the intersection of Data & Analytics, AI Strategy, and client-facing consulting engagements. You will work on real business problems across industries including technology, telecom, fintech, mobility, industrial, and digital commerce — translating fragmented data into measurable impact.\nThis is not academic modeling. It is production-oriented, business-aligned data science.",
    responsibilities: [
      "Perform exploratory data analysis across structured and unstructured datasets",
      "Develop predictive and statistical models to solve business problems",
      "Design validation frameworks and performance metrics",
      "Collaborate with engineering teams to operationalize models",
      "Build dashboards and data visualizations for decision-makers",
      "Support client-facing analytics initiatives and executive reporting",
      "Contribute to data governance and quality improvement efforts",
    ],
    requirements: [
      "3+ years of experience in data science or applied analytics roles",
      "Strong statistical modeling and hypothesis testing expertise",
      "Advanced SQL and Python proficiency",
      "Experience working with large datasets",
      "Ability to translate analytical findings into business insight",
    ],
    preferred: [
      "Experience deploying models into production environments",
      "Familiarity with cloud-based data platforms",
      "Exposure to forecasting, anomaly detection, or segmentation use cases",
      "Experience in consulting or cross-functional environments",
    ],
    whatWeValue: [
      "Analytical rigor and structured thinking",
      "Ability to communicate insights clearly to non-technical stakeholders",
      "Ownership of model performance and business relevance",
      "Discipline in documentation and reproducibility",
    ],
    whatYouGain: [
      "Exposure to cross-industry analytics programs",
      "Real-world impact through production deployment",
      "Experience operating in consulting-led data engagements",
      "Opportunity to expand into advanced AI and ML initiatives",
    ],
  },
  "ai-solutions-architect": {
    title: "AI Solutions Architect",
    department: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    openPositions: 1,
    overview:
      "We are seeking an AI Solutions Architect to design end-to-end intelligent systems for enterprise clients. This role is responsible for translating strategic requirements into scalable, secure, and production-grade architectures across AI, data, cloud, automation, and AI Studio & Platform Engineering initiatives.\nYou will operate at the intersection of consulting and engineering, leading architecture design, guiding implementation teams, and ensuring that deployed systems perform reliably in complex enterprise environments.\nThis is a senior role requiring architectural discipline and business alignment.",
    responsibilities: [
      "Design end-to-end AI solution architectures across application, data, and infrastructure layers",
      "Lead technical design workshops with clients and internal teams",
      "Define scalable RAG, LLM, and ML system architectures",
      "Ensure secure integration with enterprise systems such as ERP, CRM, and data platforms",
      "Establish governance, observability, and performance standards",
      "Guide engineering teams through implementation phases",
      "Evaluate trade-offs across scalability, latency, cost, and security",
      "Contribute to AI Studio & Platform Engineering capability development",
    ],
    requirements: [
      "6+ years of experience in solution architecture roles",
      "Strong expertise in cloud platforms and distributed systems",
      "Experience designing AI/ML system architectures",
      "Enterprise integration experience across data and application layers",
      "Strong understanding of scalability and performance optimization",
    ],
    preferred: [
      "Experience with LLM applications and RAG architectures",
      "Exposure to MLOps and LLMOps practices",
      "Experience in consulting or enterprise client-facing roles",
      "Familiarity with multi-cloud and hybrid architectures",
    ],
    whatWeValue: [
      "Strategic system thinking",
      "Clear architectural documentation and communication",
      "Ownership of technical outcomes",
      "Ability to bridge executive strategy and engineering execution",
    ],
    whatYouGain: [
      "Leadership role in enterprise AI and data transformation programs",
      "Exposure to multi-industry architectural challenges",
      "Direct collaboration with executive stakeholders",
      "Influence over technical direction and platform standards",
    ],
  },
  "ai-automation-intern": {
    title: "AI & Automation Intern",
    department: "Engineering",
    location: "On-site Preferred",
    type: "Internship",
    openPositions: 3,
    overview:
      "We are seeking highly motivated AI & Automation Interns to support engineering and consulting teams on real-world AI, data, and workflow automation initiatives.\nThis is not a shadow role. You will contribute to structured experimentation, prototyping, automation workflows, and research initiatives across active client engagements and internal AI Studio & Platform Engineering efforts.\nWe are looking for individuals who are serious about building technical depth and gaining exposure to production-grade systems.",
    responsibilities: [
      "Assist in developing prototypes involving LLMs and ML models",
      "Support design and testing of automation workflows",
      "Conduct research on emerging AI techniques and tooling",
      "Help evaluate model performance and refine prompts or workflows",
      "Contribute to documentation and internal knowledge assets",
      "Collaborate with engineers on structured testing and validation",
    ],
    requirements: [
      "Currently pursuing final-year Bachelor's or Master's degree",
      "Strong understanding of machine learning fundamentals",
      "Familiarity with Python",
      "Research experience through academic or independent projects",
      "Strong analytical thinking skills",
    ],
    preferred: [
      "Exposure to LLMs or generative AI systems",
      "Experience with data preprocessing or model experimentation",
      "Interest in production system design",
      "High ownership mindset and curiosity",
    ],
    whatWeValue: [
      "Discipline in learning and execution",
      "Clear communication",
      "Ability to take feedback and iterate",
      "Long-term growth orientation",
    ],
    whatYouGain: [
      "Exposure to enterprise-grade AI and automation projects",
      "Mentorship from senior engineers",
      "Real-world application of ML concepts",
      "Practical experience across AI, data, and automation systems",
    ],
  },
  "business-consulting-intern": {
    title: "Business Consulting Intern",
    department: "Consulting",
    location: "On-site Preferred",
    type: "Internship",
    openPositions: 1,
    overview:
      "Paramount Intelligence is a technology consulting and engineering firm delivering data-driven and technology-enabled transformation programs to global clients, including Fortune 1000 organizations.\nThe Business Consulting Intern will support live engagements across strategy, analytics, digital transformation, and technology-enabled execution initiatives. This role provides structured exposure to real consulting environments where business strategy, data insights, and engineering execution intersect.\nThis is a high-responsibility internship designed for individuals serious about building a long-term career in consulting and strategy.",
    responsibilities: [
      "Support consulting engagements across strategy, analytics, and transformation initiatives",
      "Conduct structured market research and competitive analysis",
      "Assist in data compilation, synthesis, and insight development",
      "Contribute to client-ready presentations, proposals, and executive summaries",
      "Coordinate with cross-functional teams across AI, data, and engineering functions",
      "Maintain documentation accuracy and ensure structured deliverable quality",
      "Assist in translating complex information into actionable recommendations",
    ],
    requirements: [
      "Final-year student or recent graduate in Business, Economics, Finance, Computer Science, IT, Engineering, or related fields",
      "Strong analytical thinking and structured problem-solving skills",
      "Excellent written communication and presentation abilities",
      "Proficiency in MS Excel and PowerPoint",
      "Ability to manage multiple tasks in a deadline-driven environment",
      "High ownership mindset and strong willingness to learn",
    ],
    preferred: [],
    whatWeValue: [
      "Analytical rigor and structured thinking",
      "Strong work ethic and ownership mindset",
      "Clear communication and presentation skills",
      "Ability to learn quickly and adapt to consulting environments",
    ],
    whatYouGain: [
      "Exposure to live consulting engagements involving Fortune 1000 clients",
      "Direct experience supporting executive-level deliverables",
      "Structured understanding of consulting methodologies and problem framing",
      "Cross-functional exposure across AI, data, cloud, and automation practices",
      "Professional mentorship and structured performance feedback",
      "Market-competitive compensation",
    ],
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = jobsData[slug];

  if (!job) {
    return (
      <div className="min-h-screen mt-16 bg-white">
        <Header />
        <div className="py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Job Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The position you're looking for doesn't exist.
          </p>
          <Link
            href="/careers/open-positions"
            className="inline-block bg-[#17599d] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#144a75]"
          >
            Back to Careers
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-white">
      <Header />

      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16 py-16">
        {/* Back Link */}
        <Link
          href="/careers/open-positions"
          className="inline-flex items-center text-[#17599d] font-semibold mb-8 hover:underline"
        >
          ← Back to All Positions
        </Link>

        {/* Job Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-[#17599d] text-white px-4 py-2 rounded-full font-semibold">
              {job.department}
            </span>
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">
              📍 {job.location}
            </span>
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">
              ⏰ {job.type}
            </span>
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">
              {job.openPositions} Open{" "}
              {job.openPositions === 1 ? "Position" : "Positions"}
            </span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Role Overview */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Role Overview
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {job.overview
                  .split("\n")
                  .map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
              </div>
            </section>

            {/* Key Responsibilities */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Key Responsibilities
              </h2>
              <ul className="space-y-3 text-gray-700">
                {job.responsibilities.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#17599d] mr-3 mt-1 font-bold">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Required Qualifications */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Required Qualifications
              </h2>
              <ul className="space-y-3 text-gray-700">
                {job.requirements.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#17599d] mr-3 mt-1 font-bold">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Preferred Experience */}
            {job.preferred.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Preferred Experience
                </h2>
                <ul className="space-y-3 text-gray-700">
                  {job.preferred.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#17599d] mr-3 mt-1 font-bold">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* What We Value */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What We Value
              </h2>
              <ul className="space-y-3 text-gray-700">
                {job.whatWeValue.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#17599d] mr-3 mt-1 font-bold">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What You'll Gain */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What You'll Gain
              </h2>
              <ul className="space-y-3 text-gray-700">
                {job.whatYouGain.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#17599d] mr-3 mt-1 font-bold">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-8 sticky top-24 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Department
                </h3>
                <p className="text-xl font-bold text-gray-900">
                  {job.department}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Location
                </h3>
                <p className="text-xl font-bold text-gray-900">
                  {job.location}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Employment Type
                </h3>
                <p className="text-xl font-bold text-gray-900">{job.type}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Open Positions
                </h3>
                <p className="text-xl font-bold text-gray-900">
                  {job.openPositions}
                </p>
              </div>

              <Link
                href="/careers/apply-now"
                className="w-full block bg-[#17599d] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#144a75] transition-colors"
              >
                Apply Now
              </Link>

              <Link
                href="/careers/open-positions"
                className="w-full block bg-gray-200 text-gray-900 text-center py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                View All Positions
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
