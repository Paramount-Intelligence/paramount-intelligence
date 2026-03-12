interface ProjectDescriptionProps {
  description: string;
}

export default function ProjectDescription({
  description,
}: ProjectDescriptionProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-16">
        <p className="text-lg font-bold text-gray-800 leading-relaxed max-w-4xl">
          {description}
        </p>
      </div>
    </section>
  );
}
