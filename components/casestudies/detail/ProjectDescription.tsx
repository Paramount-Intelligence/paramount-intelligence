interface ProjectDescriptionProps {
  description: string;
}

export default function ProjectDescription({
  description,
}: ProjectDescriptionProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 xl:px-16">
        <p className="text-lg text-gray-800 leading-relaxed max-w-5xl">
          {description}
        </p>
      </div>
    </section>
  );
}
