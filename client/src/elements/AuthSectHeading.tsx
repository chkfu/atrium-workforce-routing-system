export const AuthSectHeading = ({title, description}: {title: string, description?: string}) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-teal-800 text-center">{title}</h1>
      <p className="text-sm text-gray-500 text-left mt-4">{description}</p>
    </div>
  );
};