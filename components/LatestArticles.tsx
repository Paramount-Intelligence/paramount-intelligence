import Image from "next/image";
import Link from "next/link";

export default function LatestArticles() {
  const articles = [
    {
      title: "Off-the-shelf AI platform or Custom AI Agent solution?",
      imageSrc:
        "/images/Off-the-shelf-platform-article-thumbnail-graphic-2.png",
      tag: "ARTICLE",
      link: "#article-1",
    },
    {
      title: "Choosing the right LLM model for the job",
      imageSrc: "/images/cover-choosing-LLM.png",
      tag: "ARTICLE",
      link: "#article-2",
    },
    {
      title: "What Is Retrieval-Augmented Generation (RAG) for LLMs",
      imageSrc: "/images/Vstorm-operating-5-1.jpg",
      tag: "ARTICLE",
      link: "#article-3",
    },
    {
      title:
        "Vstorm: Leader in LLMs solutions recognized by Deloitte Technology Fast 50",
      imageSrc: "/images/Deloitte-pdf.jpg",
      tag: "ARTICLE",
      link: "#article-4",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Our latest articles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={article.imageSrc}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 leading-snug">
                  {article.title}
                </h3>
                <Link
                  href={article.link}
                  className="inline-flex items-center text-red-500 font-medium hover:text-red-600 transition-colors"
                >
                  <span className="mr-2">/</span>
                  Read article
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
