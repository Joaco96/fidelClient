const Select = ({
  items,
  label,
  placeholder = "Seleccionar",
  ref,
}: {
  items?: Array<{ id: string; name: string }>;
  label: string;
  placeholder?: string;
  ref: React.RefObject<HTMLSelectElement | null>;
}) => {
  return (
    <>
      <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        ref={ref}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" defaultValue="">{placeholder}</option>
        {items?.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
