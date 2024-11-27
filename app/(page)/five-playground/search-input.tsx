import Fuse from "fuse.js";
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  searchListData: string[];
}

export default forwardRef(function SearchInput(
  props: Props,
  ref: React.Ref<HTMLInputElement | null>
) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputForSearch, setInputForSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => inputRef.current)
  const { searchListData, ...inputProps } = props

  const fuse = useMemo(() => {
    return new Fuse(searchListData, {
      threshold: 0.5,
    })
  }, [searchListData])

  const filteredVersions = useMemo(() => {
    if (!inputForSearch) return searchListData
    return fuse.search(inputForSearch).map(v => v.item)
  }, [fuse, inputForSearch, searchListData])
  
  return (
    <div className="inline-block p-px rounded-lg shadow-lg bg-vc-border-gradient shadow-black/20">
    <div className="relative bg-black rounded-lg">
      <input
        ref={inputRef}
        type="text"
        className={`p-2 border-none rounded-lg h-7 bg-inherit w-60 ${inputProps.className}`}
        onChange={(e) => {
          inputProps.onChange?.(e);
          setInputForSearch(e.target.value);
        }}
        onFocus={(e) => {
          inputProps.onFocus?.(e);
          setIsOpen(true)
        }}
        onBlur={(e) => {
          inputProps.onBlur?.(e);
          setTimeout(() => {
            setIsOpen(false);
          }, 200);
        }}
        {...inputProps}
      />

      <div
        data-open={isOpen}
        className="absolute z-10 w-60 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg transition-all duration-300 transform data-[open=true]:scale-y-100 data-[open=true]:opacity-100 opacity-0 scale-y-0 origin-top"
      >
        <ul className="overflow-y-auto max-h-60">
          {filteredVersions.map((v) => {
            return (
              <li
                key={v}
                className="p-1 hover:bg-blue-600 hover:text-white"
                onClick={() => {
                  inputRef.current!.value = v;
                  setInputForSearch(v);
                }}
              >
                {v}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
  );
});
