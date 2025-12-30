export interface CaseStudyData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  heroImage: string;
  industry: string;
  businessFunction: string;
  description: string;
  clientInfo: {
    name: string;
    industry: string;
    market: string;
    technology: string;
  };
  nutshell: {
    challenge: string;
    solution: string;
    benefits: string;
  };
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const caseStudiesData: CaseStudyData[] = [
  {
    id: "1",
    slug: "dynamic-pricing-engine-personalized-fare-optimization",
    title: "Dynamic Pricing Engine for Personalized Fare Optimization",
    subtitle: "A leading ride-hailing and mobility platform in South Asia",
    image: "/images/case-studies/1.png",
    heroImage: "/images/case-studies/1.png",
    industry: "Ride-hailing, Mobility",
    businessFunction: "Pricing & Revenue",
    description: "This project implemented a machine-learning–based dynamic pricing engine to optimize fares in real time by combining market-level demand–supply signals with customer-level personalization. By replacing static pricing with demand-responsive and user-aware fare adjustments, the solution improved marketplace balance, reduced revenue leakage, and strengthened ride completion rates while preserving affordability and user trust.",
    clientInfo: {
      name: "A leading ride-hailing and mobility platform in South Asia",
      industry: "Ride-hailing, Mobility",
      market: "South Asia",
      technology: "Machine Learning, Predictive Analytics",
    },
    nutshell: {
      challenge: "The platform relied on largely static pricing structures that failed to adapt to real-time market conditions or differences in customer behavior. During peak demand or supply shortages, this led to unfulfilled rides, driver disengagement, and customer churn, while during low-demand periods inefficient pricing resulted in revenue leakage. In addition, treating all customers identically ignored differences in willingness to pay, usage frequency, and price sensitivity, leaving meaningful value unrealized. The client needed a pricing mechanism that could dynamically balance demand, supply, and customer heterogeneity without degrading user trust or perceived fairness.",
      solution: "We developed a machine-learning–based dynamic pricing engine embedded directly into the live ride allocation flow. The solution continuously evaluated real-time marketplace conditions, including demand intensity, temporal patterns, driver availability, proximity, trip urgency, and contextual signals, to inform base pricing decisions. On top of this, the engine incorporated customer-level personalization using historical spending, ride frequency, engagement patterns, geographic and socio-demographic proxies, and observed price sensitivity. Pricing decisions were applied programmatically at the point of ride matching, enabling controlled, user-aware fare adjustments with immediate operational impact.",
      benefits: "The dynamic pricing engine improved both revenue efficiency and overall marketplace health. Drivers experienced better utilization during peak periods, customers saw improved ride availability and completion rates, and the platform captured incremental value through personalization without introducing aggressive or opaque price changes. The solution strengthened pricing effectiveness while maintaining platform stability and user trust.",
    },
  },
  {
    id: "2",
    slug: "location-based-fraud-detection-mobility-operations",
    title: "Location-Based Fraud Detection System for Mobility Operations",
    subtitle: "A leading ride-hailing and delivery platform",
    image: "/images/case-studies/case-2.jpg",
    heroImage: "/images/case-studies/case-2-hero.jpg",
    industry: "Ride-hailing, Logistics, Mobility",
    businessFunction: "Fraud Detection",
    description: "This project implemented a real-time, location-aware fraud detection system to prevent GPS spoofing, fake rides, and promotion abuse. By combining streaming location data with machine-learning–based anomaly detection, the solution shifted fraud control from reactive, post-payout review to proactive, in-flight prevention, protecting revenue and platform trust at scale.",
    clientInfo: {
      name: "A leading ride-hailing and delivery platform",
      industry: "Ride-hailing, Logistics, Mobility",
      market: "South Asia",
      technology: "Streaming Analytics, Machine Learning, Geospatial Intelligence",
    },
    nutshell: {
      challenge: "As the platform scaled across dense urban environments, location-based fraud emerged as a significant source of financial loss and trust degradation. Traditional rule-based controls were unable to capture increasingly sophisticated spatial abuse patterns such as fake rides, GPS spoofing, and incentive farming. Fraud detection was largely reactive, occurring after trips were completed and payouts or promotions had already been issued, making recovery difficult and costly. The client needed a system capable of identifying spatial fraud behaviors in real time, assessing risk before payouts, and surfacing actionable signals directly to operations teams.",
      solution: "We developed a real-time, location-based fraud detection pipeline that analyzed live GPS signals and trip behavior as events occurred. The system continuously ingested streaming location and trip data from the mobile application, engineered spatial and behavioral features in real time, and applied machine-learning–based anomaly detection to identify suspicious activity. Fraud risk signals were surfaced through operational dashboards, enabling intervention before incentives and payouts were issued rather than correcting losses after the fact.",
      benefits: "The solution significantly reduced recurring fraud losses, improved operational response times, and strengthened trust across the platform. Operations teams gained real-time visibility into emerging fraud patterns, allowing faster and more targeted interventions without relying on manual discovery or post-hoc investigation.",
    },
  },
  {
    id: "3",
    slug: "rfm-voucher-marketing-optimization",
    title: "RFM-Based Voucher and Marketing Optimization",
    subtitle: "A leading ride-hailing and mobility platform",
    image: "/images/case-studies/case-3.jpg",
    heroImage: "/images/case-studies/case-3-hero.jpg",
    industry: "Ride-hailing, Mobility, On-Demand Services",
    businessFunction: "Marketing & Sales",
    description: "This project transformed voucher distribution from broad, rule-based spending into a data-driven, cohort-level incentive strategy. By applying RFM (Recency, Frequency, Monetary) analysis at scale, the platform improved marketing return on investment, reduced discount leakage, and increased user engagement without relying on black-box machine learning models.",
    clientInfo: {
      name: "A leading ride-hailing and mobility platform",
      industry: "Ride-hailing, Mobility, On-Demand Services",
      market: "South Asia",
      technology: "Behavioral Analytics, RFM Segmentation, SQL-Based Data Pipelines",
    },
    nutshell: {
      challenge: "Marketing vouchers were distributed using broad rules that failed to account for differences in user behavior. High-value and loyal users frequently received unnecessary discounts, while low-quality or churn-prone users consumed a disproportionate share of promotional budgets. The marketing team lacked a cohort-level view of return on investment, making it difficult to separate genuinely incremental demand from behavior driven purely by promotions. This resulted in discount leakage to loyal users, incentives attracting promo-only behavior, and redemptions that did not translate into incremental rides.",
      solution: "We implemented an RFM-based behavioral segmentation framework to guide voucher design and distribution. Users were grouped into interpretable cohorts based on how recently they used the platform, how frequently they transacted, and how much value they generated. Each cohort was mapped to a differentiated voucher strategy, with controlled discount depth, eligibility criteria, expiry windows, and issuance frequency aligned to expected behavioral impact.",
      benefits: "The solution improved budget efficiency and decision clarity for the marketing team. Incentives could be targeted to users where discounts were most likely to change behavior, waste was reduced on loyal users who did not require incentives, and promotional spend was redirected toward cohorts with measurable incremental impact.",
    },
  },
  {
    id: "4",
    slug: "demand-forecasting-fulfillment-optimization",
    title: "Demand Forecasting and Fulfillment Optimization",
    subtitle: "A leading ride-hailing and mobility platform",
    image: "/images/case-studies/case-4.jpg",
    heroImage: "/images/case-studies/case-4-hero.jpg",
    industry: "Ride-hailing, Mobility, On-Demand Services",
    businessFunction: "Operations",
    description: "This project implemented a short-term demand forecasting system to proactively balance rider demand and driver supply. By providing operations teams with a forward-looking, city-level demand signal, the solution shifted fulfillment management from reactive firefighting to predictive planning, resulting in sustained improvements in ride fulfillment and operational efficiency.",
    clientInfo: {
      name: "A leading ride-hailing and mobility platform",
      industry: "Ride-hailing, Mobility, On-Demand Services",
      market: "South Asia",
      technology: "Time-Series Forecasting, Predictive Analytics",
    },
    nutshell: {
      challenge: "The platform operated in a highly stochastic, time-sensitive marketplace where rider demand fluctuated sharply by hour, day, city conditions, weather, and pay cycles, while driver supply remained semi-elastic with partners logging in and out unpredictably. Even small mismatches between demand and supply led to lower fulfillment rates, longer estimated arrival times, idle driver capacity, and rider churn. Prior to this initiative, operations teams responded only after shortages emerged, with static or delayed incentive deployment and no reliable short-term demand signal to support proactive decision-making.",
      solution: "We developed a short-term demand forecasting system designed specifically for operational use rather than offline analysis. The model predicted ride demand at a city and time-bucket level and refreshed frequently enough to support live operations, driver positioning, and incentive planning. The approach prioritized speed, interpretability, and decision relevance, ensuring forecasts could be acted on directly by operations teams within tight execution windows.",
      benefits: "Operations teams gained early visibility into upcoming demand spikes and potential shortage periods, enabling proactive driver positioning, earlier incentive activation, and improved peak-hour coverage. This reduced reactive interventions, improved fulfillment consistency, and increased overall operational efficiency across the marketplace.",
    },
  },
  {
    id: "5",
    slug: "real-time-delivery-operations-intelligence",
    title: "Real-Time Delivery and Operations Intelligence Platform",
    subtitle: "A leading ride-hailing and delivery platform",
    image: "/images/case-studies/case-5.jpg",
    heroImage: "/images/case-studies/case-5-hero.jpg",
    industry: "Ride-hailing, Logistics, On-Demand Services",
    businessFunction: "Operations",
    description: "This project built a near-real-time operations intelligence platform that provided operations, customer experience, and leadership teams with live visibility into fulfillment performance, rider efficiency, and service-level risk. By combining streaming event data with a purpose-built dashboard and an AI-powered chatbot for metrics retrieval, the solution shifted operations from reactive firefighting to proactive, signal-driven decision-making.",
    clientInfo: {
      name: "A leading ride-hailing and delivery platform",
      industry: "Ride-hailing, Logistics, On-Demand Services",
      market: "South Asia",
      technology: "Real-Time Analytics, BI Dashboards, SQL, Event Streaming, AI Chat Interface",
    },
    nutshell: {
      challenge: "Prior to this initiative, operations relied on lagged reports refreshed on hourly or daily cycles, with no unified view of live order status, rider availability, or service-level breaches as they occurred. Escalations were driven primarily by customer complaints rather than operational signals, resulting in issues being detected only after service impact had already occurred. This limited the organization's ability to intervene during peak demand windows, led to inefficient rider utilization, increased cancellations and refunds, and reduced visibility for leadership during high-pressure operational periods.",
      solution: "We developed a real-time delivery and operations intelligence platform that ingested live event streams and translated them into intervention-ready performance signals. The system surfaced near-real-time operational KPIs through a centralized dashboard used by operations, customer experience, and city teams, and introduced an AI-powered chatbot that enabled natural-language queries against live metrics. Together, these capabilities transformed raw event data into timely, actionable insights that could be acted on while rides and deliveries were still in progress.",
      benefits: "Operations teams gained the ability to identify bottlenecks as they emerged, rebalance rider supply proactively, and intervene before service-level commitments were breached. Customer experience teams received early warning signals to act before issues escalated into complaints, while leadership benefited from a single, trusted source of real-time operational visibility during critical demand periods.",
    },
  },
  {
    id: "6",
    slug: "customer-service-performance-cost-optimization",
    title: "Customer Service Performance and Cost Optimization",
    subtitle: "A leading ride-hailing and delivery platform",
    image: "/images/case-studies/case-6.jpg",
    heroImage: "/images/case-studies/case-6-hero.jpg",
    industry: "Ride-hailing, Logistics, On-Demand Services",
    businessFunction: "Customer Support",
    description: "This project transformed customer support operations by applying decision-grade analytics to reduce costs while improving service quality. By identifying where human effort was essential and where self-service could replace manual handling, the solution optimized agent utilization, reduced support spend, and accelerated resolution times without compromising customer experience.",
    clientInfo: {
      name: "A leading ride-hailing and delivery platform",
      industry: "Ride-hailing, Logistics, On-Demand Services",
      market: "South Asia",
      technology: "Customer Support Analytics, SQL-Based BI, Operational Dashboards",
    },
    nutshell: {
      challenge: "The customer support organization managed a high daily volume of tickets spanning rides, deliveries, payments, and complaints, ranging from high-impact issues such as fraud, safety, and failed deliveries to low-complexity, repetitive queries. Limited agent capacity resulted in rising support costs, slower resolution times, and overloaded queues during peak periods. Leadership needed to reduce costs without degrading customer experience, ensure skilled agents focused on high-impact cases, and shift repetitive interactions toward self-service channels.",
      solution: "We developed a support performance and cost optimization framework that combined Pareto analysis, agent productivity diagnostics, and query classification to redesign how tickets were prioritized, routed, and resolved. The work extended beyond reporting, with insights translated directly into updated routing logic and operational policy changes to improve efficiency and decision execution.",
      benefits: "Support costs were reduced, agent workloads became more balanced, and customers experienced faster resolution times, particularly for simple issues. High-risk and high-impact cases received more focused human attention, improving both operational efficiency and overall service quality.",
    },
  },
  {
    id: "7",
    slug: "real-time-platform-intelligence-ecosystem-monitoring",
    title: "Real-Time Platform Intelligence and Ecosystem Monitoring",
    subtitle: "A leading ride-hailing and delivery platform",
    image: "/images/case-studies/case-7.jpg",
    heroImage: "/images/case-studies/case-7-hero.jpg",
    industry: "Ride-hailing, Logistics, On-Demand Services",
    businessFunction: "Analytics & Reporting",
    description: "This project built a real-time platform intelligence system that provided a unified, live view of the entire operating ecosystem, including users, drivers, marketing flows, product experience, backend systems, and customer support. By tracking meaningful user and system events as they occurred, the solution enabled teams to identify whether issues originated from experience friction, supply constraints, system failures, marketing quality, or support gaps, often before customer impact surfaced.",
    clientInfo: {
      name: "A leading ride-hailing and delivery platform",
      industry: "Ride-hailing, Logistics, On-Demand Services",
      market: "South Asia",
      technology: "Real-Time Event Tracking, Streaming Analytics, SQL, BI Dashboards, AI-Assisted Querying",
    },
    nutshell: {
      challenge: "Prior to this initiative, the organization lacked a live, end-to-end view of platform health across the user journey and supporting systems. Teams relied on delayed reports and siloed dashboards, making it difficult to understand why issues were occurring rather than simply observing their outcomes. Blind spots existed around the root causes of demand drops, cancellations, marketing quality, and customer support escalations, limiting the ability to intervene early. The organization needed a single real-time lens into how the full customer and system journey was functioning.",
      solution: "We developed a real-time platform tracking and intelligence layer that continuously observed user behavior across the application, driver supply and movement, system and dispatch health, marketing funnel quality, and customer support risk signals. Each interaction was treated as a live signal within a connected ecosystem rather than as an isolated metric, allowing teams to understand how changes in one part of the platform affected outcomes elsewhere in real time.",
      benefits: "Teams gained a coherent, real-time view of platform performance that enabled earlier diagnosis of emerging issues and more precise intervention. The system supported causal reasoning across the ecosystem rather than retrospective analysis, improving the organization's ability to address experience, operational, and system risks before they escalated into customer-facing problems.",
    },
  },
  {
    id: "8",
    slug: "wealth-income-segmentation-geospatial-intelligence",
    title: "Wealth and Income Segmentation Using Geospatial Intelligence",
    subtitle: "A national telecommunications and digital services provider",
    image: "/images/case-studies/case-8.jpg",
    heroImage: "/images/case-studies/case-8-hero.jpg",
    industry: "Telecommunications, Digital Services",
    businessFunction: "Analytics & Reporting",
    description: "This project built a large-scale, data-driven wealth and income segmentation framework to estimate socioeconomic status and propensity to pay in a market where traditional income data is limited or unreliable. By combining geospatial intelligence, spending behavior, and lifestyle proxy signals, the solution created a consistent, population-level economic view that could be used by enterprises, financial institutions, and development organizations for decision-making at scale.",
    clientInfo: {
      name: "A national telecommunications and digital services provider",
      industry: "Telecommunications, Digital Services",
      market: "Global",
      technology: "Geospatial Analytics, Predictive Modeling, Large-Scale Data Engineering",
    },
    nutshell: {
      challenge: "The market lacked comprehensive, reliable, and frequently updated income and wealth data at an individual or household level. Traditional indicators such as tax records or census data were incomplete, outdated, or unavailable for large portions of the population, limiting their usefulness for decision-making. This created challenges for organizations assessing creditworthiness and financial inclusion, selecting locations and targeting customers, planning public or development interventions, and designing differentiated pricing and marketing strategies. A practical, scalable proxy for wealth and income was needed that could operate at national scale and be refreshed continuously.",
      solution: "We developed a geospatial and behavioral segmentation framework that estimated relative wealth and propensity to pay by combining multiple proxy signals, including customer spending patterns, mobility and location intelligence, land and locality-level indicators, and device or lifestyle attributes. The model classified a large population base into interpretable wealth and income bands, enabling consistent segmentation across cities, districts, and neighborhoods using a single standardized methodology.",
      benefits: "The wealth and income index became a standardized economic signal that could be applied across industries and institutions. It enabled more precise customer targeting, better location and expansion decisions, improved financial inclusion strategies, and data-driven socioeconomic analysis, filling a critical gap in population-level economic intelligence.",
    },
  },
  {
    id: "9",
    slug: "credit-risk-lifestyle-stability-index",
    title: "Credit Risk and Lifestyle Stability Index",
    subtitle: "A national telecommunications and digital services provider",
    image: "/images/case-studies/case-9.jpg",
    heroImage: "/images/case-studies/case-9-hero.jpg",
    industry: "Telecommunications, Digital Financial Services",
    businessFunction: "Analytics & Reporting",
    description: "This project developed a machine-learning–based credit risk and lifestyle stability index to estimate individual financial reliability using behavioral, geospatial, and mobility signals. By moving beyond traditional ARPU-based heuristics, the solution enabled more accurate risk assessment, supported financial inclusion initiatives, and informed the design of differentiated financial products in an underbanked market.",
    clientInfo: {
      name: "A national telecommunications and digital services provider",
      industry: "Telecommunications, Digital Financial Services",
      market: "Global",
      technology: "Machine Learning, Geospatial Analytics, Behavioral Modeling",
    },
    nutshell: {
      challenge: "A large portion of the population lacked formal credit histories, limiting the effectiveness of traditional credit assessment methods. Financial institutions and digital lenders relied on coarse proxies such as ARPU, tenure, or basic demographics, which often failed to capture true financial reliability or lifestyle stability. This resulted in inaccurate risk assessment, exclusion of creditworthy but underbanked individuals, and limited ability to design differentiated financial products. The market required a richer, behavior-driven risk signal that could operate at national scale.",
      solution: "We developed a credit risk and lifestyle stability index that combined behavioral, geospatial, and mobility signals into a single, interpretable framework. The model assessed patterns such as location stability, movement regularity, spending behavior, and lifestyle or device proxies to estimate financial reliability rather than directly predicting default. Outputs were structured into clear risk bands that could be safely applied across lending decisions, credit limits, and product personalization use cases.",
      benefits: "The index enabled more nuanced and accurate credit decisions while reducing reliance on blunt ARPU thresholds. It expanded access to financial products for previously underserved populations, supported financial inclusion objectives, and provided a scalable foundation for personalized financial offerings without increasing operational risk.",
    },
  },
  {
    id: "10",
    slug: "global-gender-analytics-inference-deployment",
    title: "Global Gender Analytics and Inference Deployment",
    subtitle: "A multi-country telecommunications and digital services ecosystem",
    image: "/images/case-studies/case-10.jpg",
    heroImage: "/images/case-studies/case-10-hero.jpg",
    industry: "Telecommunications, Digital Services",
    businessFunction: "Analytics & Reporting",
    description: "This project deployed and operationalized a global gender inference model across large-scale telecommunications data pipelines, enabling reliable and privacy-preserving gender analytics at national scale. The solution supported gender-aware marketing, product design, and inclusion initiatives while maintaining responsible data use, resulting in improved engagement and measurable commercial impact.",
    clientInfo: {
      name: "A multi-country telecommunications and digital services ecosystem",
      industry: "Telecommunications, Digital Services",
      market: "Global",
      technology: "Machine Learning Inference, Containerization, Linux Infrastructure, Large-Scale Data Pipelines",
    },
    nutshell: {
      challenge: "In many emerging markets, gender-disaggregated data was incomplete or unavailable, limiting the ability of organizations to design inclusive products, measure gender gaps, and target audiences responsibly. Existing approaches were often country-specific, inconsistent across data sources, and difficult to operationalize at scale. The organization required a globally consistent, production-ready gender inference capability that could be deployed across regions while respecting privacy, regulatory, and ethical constraints.",
      solution: "We collaborated with ecosystem stakeholders to deploy and productionize a global gender inference model designed to operate consistently across multiple markets. The solution integrated a containerized inference pipeline into existing large-scale data infrastructure, enabling probabilistic gender estimation using behavioral and network-level signals rather than explicit personal identifiers. The deployment supported downstream analytics, segmentation, and targeting use cases while maintaining privacy-preserving design principles.",
      benefits: "The deployment enabled organizations to design gender-aware marketing, user experience, and product strategies at scale. Teams gained a reliable foundation for inclusion measurement and audience understanding, supporting more responsible decision-making while improving engagement and commercial outcomes across the ecosystem.",
    },
  },
  {
    id: "11",
    slug: "4g-customer-churn-prediction-model",
    title: "4G Customer Churn Prediction Model",
    subtitle: "A national telecommunications and digital services provider",
    image: "/images/case-studies/case-11.jpg",
    heroImage: "/images/case-studies/case-11-hero.jpg",
    industry: "Telecommunications, Digital Services",
    businessFunction: "Customer Support",
    description: "This project developed a machine-learning–based churn prediction system to identify customers at risk of disengagement before churn occurred. By embedding predictive signals directly into engagement and retention workflows, the solution enabled earlier and more targeted interventions, improving engagement outcomes and reducing preventable churn.",
    clientInfo: {
      name: "A national telecommunications and digital services provider",
      industry: "Telecommunications, Digital Services",
      market: "Global",
      technology: "Machine Learning, Predictive Analytics, Customer Lifecycle Modeling",
    },
    nutshell: {
      challenge: "As next-generation mobile adoption scaled, customer churn became an increasing risk, particularly among users showing early signs of declining engagement, service dissatisfaction, or competitive pressure. Existing retention efforts were largely reactive, triggered only after churn signals became visible, and relied on broad, untargeted incentives that led to inefficient spend. The organization needed a forward-looking churn signal capable of identifying high-risk customers early and enabling precise, timely retention actions.",
      solution: "We developed a machine-learning–based churn prediction model that analyzed customer behavior, usage trends, and engagement patterns to estimate churn risk in advance. The model generated individual-level risk scores and classification outputs designed for direct integration into CRM systems and retention workflows, ensuring predictions could be acted on as part of ongoing engagement and campaign execution rather than remaining an isolated analytical output.",
      benefits: "The churn prediction system enabled more targeted and timely retention efforts focused on customers most likely to disengage. This reduced unnecessary incentives for stable users, improved intervention timing for at-risk segments, and strengthened overall retention effectiveness without increasing operational complexity.",
    },
  },
  {
    id: "12",
    slug: "customer-pulse-sentiment-intelligence-dashboard",
    title: "Customer Pulse and Sentiment Intelligence Dashboard",
    subtitle: "A national telecommunications and digital services provider",
    image: "/images/case-studies/case-12.jpg",
    heroImage: "/images/case-studies/case-12-hero.jpg",
    industry: "Telecommunications, Digital Services",
    businessFunction: "Customer Support",
    description: "This project delivered a real-time customer sentiment and pulse intelligence platform that unified signals from digital channels and customer support interactions into a single, actionable view. By surfacing sentiment trends, sudden shifts, and underlying drivers, the solution enabled customer experience teams and leadership to respond faster, make data-backed decisions, and proactively manage experience-related risks.",
    clientInfo: {
      name: "A national telecommunications and digital services provider",
      industry: "Telecommunications, Digital Services",
      market: "Global",
      technology: "Sentiment Analysis, Real-Time Analytics, BI Dashboards, Natural Language Processing",
    },
    nutshell: {
      challenge: "Customer sentiment data was fragmented across social media, call center logs, and customer support tickets, making it difficult to form a coherent, real-time view of customer experience. While large volumes of feedback existed, insights were disconnected across systems, surfaced too late after churn or escalation had already occurred, and were difficult to summarize clearly for leadership. Customer experience teams needed a live, consolidated pulse that could highlight emerging issues, explain shifts in sentiment, and support immediate action.",
      solution: "We developed a customer pulse and sentiment intelligence dashboard that continuously aggregated and analyzed feedback from digital channels and customer support interactions. Natural language processing techniques were used to classify sentiment and group feedback into interpretable themes, with results surfaced in real time through dashboards designed for customer experience teams, campaign managers, and senior leadership to support timely decision-making.",
      benefits: "Teams gained early visibility into emerging customer experience risks, campaign reactions, and service issues, enabling faster response, clearer prioritization, and more confident decision-making during critical operational periods.",
    },
  },
  {
    id: "13",
    slug: "llm-powered-customer-support-chatbot",
    title: "LLM-Powered Customer Support Chatbot",
    subtitle: "A national telecommunications and digital services provider",
    image: "/images/case-studies/case-13.jpg",
    heroImage: "/images/case-studies/case-13-hero.jpg",
    industry: "Telecommunications, Digital Services",
    businessFunction: "Customer Support",
    description: "This project delivered a production-ready, LLM-powered customer support chatbot built on a Retrieval-Augmented Generation architecture. By combining structured customer data with approved internal knowledge bases, the solution automated a large share of repetitive support queries at scale, reducing call volumes, lowering support costs, and improving response speed without degrading customer experience.",
    clientInfo: {
      name: "A national telecommunications and digital services provider",
      industry: "Telecommunications, Digital Services",
      market: "Global",
      technology: "Large Language Models, RAG Architecture, Natural Language Processing, Conversational AI",
    },
    nutshell: {
      challenge: "Customer support operations handled very high volumes of inbound queries each year, many of which were repetitive, informational, and easily answerable from existing documentation. These queries consumed expensive live agent capacity and slowed response times for more complex issues. Although extensive internal knowledge bases and customer data existed, they were not accessible through conversational interfaces, limiting their operational value. Leadership needed a way to deflect common queries, reduce support costs, and improve response times while maintaining accuracy and customer trust.",
      solution: "We developed and deployed an LLM-powered customer support chatbot using a Retrieval-Augmented Generation approach. The system retrieved answers from approved internal knowledge sources, incorporated structured customer data where relevant, and generated natural-language responses using prompt-engineered language models. Confidence-based escalation ensured that queries outside defined thresholds were seamlessly handed off to human agents, with the overall design focused on telco-scale reliability, governance, and controlled automation rather than generic chat functionality.",
      benefits: "The chatbot absorbed a significant portion of inbound support volume, enabling live agents to focus on complex and high-impact cases. Customers received faster and more consistent responses, while the organization achieved recurring reductions in support costs and improved operational efficiency without compromising service quality.",
    },
  },
  {
    id: "14",
    slug: "automated-email-response-ticket-handling",
    title: "Automated Email Response and Ticket Handling System",
    subtitle: "A national telecommunications and digital services provider",
    image: "/images/case-studies/case-14.jpg",
    heroImage: "/images/case-studies/case-14-hero.jpg",
    industry: "Telecommunications, Digital Services",
    businessFunction: "Customer Support",
    description: "This project delivered a fully automated, zero-touch email handling system that classified, responded to, and routed customer emails without human intervention. Built using workflow automation and cloud services, the solution eliminated multiple manual support steps, significantly improved response times, and reduced recurring operational costs at enterprise scale.",
    clientInfo: {
      name: "A national telecommunications and digital services provider",
      industry: "Telecommunications, Digital Services",
      market: "Global",
      technology: "Workflow Automation, Natural Language Processing, Cloud Services, Email Automation",
    },
    nutshell: {
      challenge: "Customer support teams managed a high volume of inbound emails related to billing, service issues, complaints, and general inquiries. Each message required manual review, categorization, response drafting, and ticket routing, resulting in high operational costs, slow first-response times, inconsistent replies across agents, and bottlenecks during peak periods. Leadership needed a way to remove human effort from repetitive email handling while maintaining accuracy, safe escalation, and customer experience quality.",
      solution: "We developed a zero-touch automated email response and ticket handling system that continuously ingested inbound emails, classified intent and urgency, generated context-aware responses, and routed or escalated cases only when human intervention was required. The system operated end to end with minimal oversight, effectively replacing multiple layers of manual triage and response handling through automated workflows.",
      benefits: "The automation reduced support staffing requirements, improved response speed and consistency, and delivered substantial recurring cost savings. Human agents were freed to focus on complex and high-risk cases, improving both operational efficiency and overall service quality.",
    },
  },
  {
    id: "15",
    slug: "ai-agents-talent-matching",
    title: "AI Agents for Talent Matching",
    subtitle: "A global consulting and professional services platform",
    image: "/images/case-studies/case-15.jpg",
    heroImage: "/images/case-studies/case-15-hero.jpg",
    industry: "Professional Services, Consulting, Talent Platforms",
    businessFunction: "HR & Recruitment",
    description: "This project delivered AI-powered talent matching agents that automatically mapped large talent pools to incoming project and role requirements. By replacing manual screening and ad hoc matching with structured AI-driven decisioning, the solution improved placement speed, consistency, and talent utilization across high-volume staffing workflows.",
    clientInfo: {
      name: "A global consulting and professional services platform",
      industry: "Professional Services, Consulting, Talent Platforms",
      market: "Global",
      technology: "AI Agents, Natural Language Processing, Large Language Models, Workflow Automation",
    },
    nutshell: {
      challenge: "The organization managed a growing pool of consultants and specialists spanning multiple skill domains and geographies, making talent-to-project matching increasingly difficult at scale. Matching incoming project requirements to suitable profiles was largely manual, dependent on individual judgment, slow to execute, and inconsistent across teams. This resulted in missed placement opportunities, suboptimal utilization of available talent, and high operational overhead for staffing teams. The client needed a scalable and objective matching capability that could operate continuously without increasing headcount.",
      solution: "We developed AI-based talent matching agents that automatically analyzed project descriptions and role requirements alongside consultant profiles, experience histories, and availability. The system generated scored and ranked candidate recommendations with explainable rationale, enabling staffing teams to review and approve matches efficiently. The agents operated as decision-support tools, accelerating matching while keeping humans in the loop for final selection.",
      benefits: "Staffing teams were able to process a higher volume of roles with less manual effort, reduce time-to-match, and improve overall talent utilization. The system increased placement consistency and operational efficiency without requiring additional staffing resources.",
    },
  },
  {
    id: "16",
    slug: "ai-voice-agents-sales-enablement",
    title: "AI Voice Agents for Sales Enablement",
    subtitle: "A services and solutions provider",
    image: "/images/case-studies/case-16.jpg",
    heroImage: "/images/case-studies/case-16-hero.jpg",
    industry: "B2B Services, Sales Operations",
    businessFunction: "Marketing & Sales",
    description: "This project deployed AI voice agents within sales workflows to automate lead qualification, routing, and follow-ups. By handling repetitive pre-sales interactions autonomously, the solution improved response speed, increased conversion efficiency, and allowed sales teams to focus on higher-value opportunities.",
    clientInfo: {
      name: "A services and solutions provider",
      industry: "B2B Services, Sales Operations",
      market: "Global",
      technology: "AI Voice Agents, Large Language Models, Speech-to-Text, Workflow Automation",
    },
    nutshell: {
      challenge: "Sales teams spent a significant portion of their time on initial lead qualification, repeated follow-up calls, and manually routing prospects to the appropriate sales owner. This led to slow response times, missed or cold leads, and inefficient use of senior sales capacity. The organization needed a scalable, always-on capability to engage inbound leads consistently and without delay.",
      solution: "We developed AI voice agents that autonomously conducted initial qualification calls, asked structured discovery questions, captured key attributes such as intent, urgency, and fit, and routed qualified leads to the appropriate sales representatives. The agents also executed automated follow-ups and integrated directly into existing sales workflows, ensuring continuous lead engagement without manual intervention.",
      benefits: "Sales teams were able to concentrate on high-intent prospects while routine qualification and follow-up tasks were handled automatically. The system ensured consistent engagement across all inbound leads, improved pipeline responsiveness, and increased overall sales efficiency without expanding headcount.",
    },
  },
  {
    id: "17",
    slug: "ai-first-operations-transformation",
    title: "AI-First Operations Transformation",
    subtitle: "A services-led organization",
    image: "/images/case-studies/case-17.jpg",
    heroImage: "/images/case-studies/case-17-hero.jpg",
    industry: "Professional Services, Operations-Heavy Business",
    businessFunction: "Operations",
    description: "This project transformed fragmented, manually coordinated operations into an AI-first operating model. By redesigning workflows around AI agents and automation rather than human handoffs, the solution reduced operational friction, eliminated repetitive work, and enabled the organization to scale output without increasing headcount.",
    clientInfo: {
      name: "A services-led organization",
      industry: "Professional Services, Operations-Heavy Business",
      market: "Global",
      technology: "AI Agents, Workflow Automation, Low-Code and No-Code Platforms",
    },
    nutshell: {
      challenge: "Core operational workflows relied on manual coordination across spreadsheets, documents, task boards, and messaging platforms. This created delays driven by handoffs and follow-ups, increased error rates due to duplicate data entry, limited visibility into work in progress, and constrained scalability without adding staff. Leadership needed a way to scale operations while improving reliability and speed without expanding headcount.",
      solution: "We redesigned core operations around an AI-first execution layer that orchestrated work end to end using AI agents and automation. The operating model centralized operational state, automated data movement and task coordination across existing tools, and replaced manual triggers and reminders with event-driven execution. Systems coordinated routine work by default, with human involvement reserved for judgment-driven decisions.",
      benefits: "Teams moved faster with fewer errors, operational overhead declined significantly, and throughput scaled without additional headcount. The organization achieved sustained productivity gains while improving reliability and operational transparency.",
    },
  },
  {
    id: "18",
    slug: "operational-bottleneck-diagnosis-ai-automation",
    title: "Operational Bottleneck Diagnosis and AI Automation",
    subtitle: "A services-led organization",
    image: "/images/case-studies/case-18.jpg",
    heroImage: "/images/case-studies/case-18-hero.jpg",
    industry: "Professional Services, Operations-Intensive Business",
    businessFunction: "Operations",
    description: "This project focused on identifying and removing hidden operational bottlenecks that slowed execution, increased error rates, and constrained scalability. By combining end-to-end process diagnostics with targeted AI and automation, the solution reduced cycle times and unlocked significant operational capacity without requiring structural reorganization or headcount growth.",
    clientInfo: {
      name: "A services-led organization",
      industry: "Professional Services, Operations-Intensive Business",
      market: "Global",
      technology: "Process Diagnostics, AI Automation, Workflow Orchestration",
    },
    nutshell: {
      challenge: "Despite capable teams and modern tools, critical workflows suffered from hidden handoffs between teams and systems, manual approvals and rework loops, limited visibility into where time was actually being lost, and long, unpredictable cycle times. Leadership recognized inefficiencies but lacked a clear, data-backed view of where friction truly existed and which problems were most valuable to automate.",
      solution: "We conducted a diagnostic-first operational analysis, mapping workflows end to end before introducing any automation. The approach focused on understanding time spent in each stage, identifying handoff and decision bottlenecks, and distinguishing execution delays from approval-related constraints. Only after isolating high-impact friction points were targeted AI agents and workflow automation applied to remove delays, eliminate manual coordination, and streamline execution.",
      benefits: "By automating the right parts of the workflow rather than applying blanket automation, the organization achieved substantial cycle-time reduction, improved throughput, and unlocked meaningful operational capacity. These gains were realized without adding complexity, restructuring teams, or increasing headcount.",
    },
  },
  {
    id: "19",
    slug: "ai-powered-hiring-candidate-assessment",
    title: "AI-Powered Hiring and Candidate Assessment System",
    subtitle: "A fast-scaling organization",
    image: "/images/case-studies/case-19.jpg",
    heroImage: "/images/case-studies/case-19-hero.jpg",
    industry: "Professional Services, Technology-Enabled Business",
    businessFunction: "HR & Recruitment",
    description: "This project delivered a fully automated, AI-driven hiring and onboarding system that transformed the candidate lifecycle from initial application through first-day onboarding. By combining LLM-based candidate evaluation with workflow automation and ATS integration, the solution removed manual bottlenecks, improved hiring consistency, and significantly accelerated hiring cycles at scale.",
    clientInfo: {
      name: "A fast-scaling organization",
      industry: "Professional Services, Technology-Enabled Business",
      market: "Global",
      technology: "Large Language Models, ATS Integration, Workflow Automation, APIs",
    },
    nutshell: {
      challenge: "Early-stage hiring and candidate evaluation depended heavily on manual processes, with CV screening varying by recruiter, assessments and interviews requiring constant coordination, fragmented candidate communication, and onboarding involving repetitive, error-prone steps. As hiring volume increased, these constraints led to slow screening and hiring cycles, inconsistent evaluation standards, recruiter bottlenecks, and a degraded candidate experience. The organization needed to standardize, accelerate, and scale hiring without increasing recruiter headcount.",
      solution: "We designed and implemented an AI-powered hiring, assessment, and onboarding system that automated the candidate journey end to end. Screening, assessments, interviews, decisions, offers, and onboarding were orchestrated automatically through integrated workflows, with LLM-based evaluation supporting consistent assessment of candidate quality and fit. Human involvement was reserved for high-value judgment and final decision points, creating a system-driven hiring pipeline with minimal coordination overhead.",
      benefits: "Recruiters were able to focus on judgment and final decisions rather than administrative coordination. Hiring cycles shortened substantially, candidate experience improved, and the organization scaled hiring with greater consistency, speed, and operational efficiency.",
    },
  },
  {
    id: "20",
    slug: "customer-virtual-assistant-voice-humanoid",
    title: "Customer Virtual Assistant with Voice-Enabled Humanoid Interface",
    subtitle: "A digital-first financial services organization",
    image: "/images/case-studies/case-20.jpg",
    heroImage: "/images/case-studies/case-20-hero.jpg",
    industry: "Digital Banking, Financial Services",
    businessFunction: "Customer Support",
    description: "This project delivered a voice-enabled, 3D humanoid customer virtual assistant that transformed how users interact with a digital banking website. By combining conversational AI, voice interaction, and a realistic visual presence, the solution replaced static discovery journeys with a human-like, trust-building front-desk experience available instantly and at scale.",
    clientInfo: {
      name: "A digital-first financial services organization",
      industry: "Digital Banking, Financial Services",
      market: "Global",
      technology: "Voice AI, Conversational AI, Large Language Models, 3D Web Rendering",
    },
    nutshell: {
      challenge: "Digital banking websites struggled to engage users beyond static pages and text-based chat while clearly explaining products to first-time or hesitant customers. Building trust without human interaction remained difficult, and early-stage journeys continued to rely heavily on call centers and support teams. Existing chatbot solutions felt robotic, transactional, and impersonal, limiting their effectiveness as a primary engagement layer. The organization needed a more intuitive and human interaction model for users exploring banking products online.",
      solution: "We designed and implemented a voice-enabled, 3D humanoid customer virtual assistant embedded directly within the public website. The assistant listened to users through voice, responded verbally rather than through text, and used a realistic visual presence to convey attention and understanding. It guided users conversationally through product discovery, functioning as a digital front desk available immediately upon site entry.",
      benefits: "The solution improved user engagement, strengthened trust, and increased product understanding during early-stage journeys. It reduced friction in digital discovery and supported a more scalable, human-like customer experience without increasing reliance on live support resources.",
    },
  },
  {
    id: "21",
    slug: "ai-investment-optimization-short-term-rentals",
    title: "AI-Driven Investment and Optimization Engine for Short-Term Rentals",
    subtitle: "A global short-term rental analytics platform",
    image: "/images/case-studies/case-21.jpg",
    heroImage: "/images/case-studies/case-21-hero.jpg",
    industry: "Real Estate Analytics, Short-Term Rentals",
    businessFunction: "Analytics & Reporting",
    description: "This project delivered an AI-powered investment and optimization engine that transformed how short-term rental investors and operators make capital-intensive decisions. By combining market data, computer vision, and LLM-based reasoning, the solution moved beyond descriptive analytics to provide prescriptive guidance across geography selection, property configuration, and listing design, reducing risk and improving return potential.",
    clientInfo: {
      name: "A global short-term rental analytics platform",
      industry: "Real Estate Analytics, Short-Term Rentals",
      market: "Global",
      technology: "Machine Learning, Computer Vision, Large Language Models, Recommendation Systems",
    },
    nutshell: {
      challenge: "Short-term rental investors faced fragmented, high-stakes decisions across the investment lifecycle, including where to invest, which unit types perform best in specific markets, how interior design and furnishing affect bookings and pricing, and how to scale portfolios without costly trial and error. Existing analytics tools primarily surfaced historical metrics that required manual interpretation, offered little guidance on design or visual quality, and failed to connect location, unit configuration, and aesthetics into a single, actionable decision framework. This left investors making capital decisions with partial insight, leading to suboptimal returns and inconsistent guest experiences.",
      solution: "We designed and built an AI-powered decision intelligence system that converted structured market data, visual inputs, and behavioral patterns into clear investment and optimization recommendations. Rather than relying on static dashboards, the platform delivered prescriptive answers to core investor questions around market selection, unit mix, and listing design, enabling more confident and consistent decision-making across portfolios.",
      benefits: "Investors shifted from intuition-driven decisions to AI-guided strategy, reducing investment risk, improving capital allocation, and increasing listing performance across growing portfolios without relying on manual analysis or experimentation.",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return caseStudiesData.find((study) => study.slug === slug);
}

export function getAllCaseSlugs(): string[] {
  return caseStudiesData.map((study) => study.slug);
}
