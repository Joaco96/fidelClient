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
      <label className="block my-2 text-sm font-medium pt-2">
        {label}
      </label>
      <select
        ref={ref}
        id="countries"
        className=" border-1 border-[#72727260] text-sm rounded-lg  block w-full p-2"
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
