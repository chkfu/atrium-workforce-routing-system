export default function SectImgTextLayoutReuse({
  img,
  img_alt,
  title,
  content,
}: {
  img: string;
  img_alt: string;
  title: string;
  content: JSX.Element;
}) {
  return (
    <div className="flex flex-col justify-evenly lg:flex-row flex-wrap gap-4 py-8">
      <div className="flex-3 rounded-3xl bg-gray-100/70 flex justify-center items-center overflow-hidden">
        <img src={img} alt={img_alt} className="w-full h-full object-cover" />
      </div>
      <div className="flex-4 h-[26em] p-12 rounded-3xl bg-teal-50/70">
        <h4 className="text-2xl font-bold text-teal-900 py-2 mb-4">{title}</h4>
        {content}
      </div>
    </div>
  );
}
