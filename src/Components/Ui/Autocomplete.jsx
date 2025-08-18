import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function Autocomplete({
  name,
  value,
  onChange,
  onBlur,
  className, 
  placeholder,  
  items = [], 
  showDescriptions = false,
  disabled = false,
  loading = false,
  onSearch,
  debounceMs = 300,
  minSearchLength = 1,
  maxResults = 50,
  allowCustomValue = false,
  searchPlaceholder = "Type to search...",
  noResultsText = "No results found",
  loadingText = "Searching..."
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);
  const optionRefs = useRef([]);

  // Sync with parent component's value
  useEffect(() => {
    if (value) {
      const selectedItem = items.find(item => item.value === value);
      if (selectedItem) {
        setInputValue(selectedItem.label);
      } else if (allowCustomValue) {
        setInputValue(value);
      }
    } else {
      setInputValue('');
    }
  }, [value, items, allowCustomValue]);

  // Filter items locally or trigger API search
  const performSearch = useCallback(async (term) => {
    if (!term || term.length < minSearchLength) {
      setFilteredItems(items.slice(0, maxResults));
      setIsSearching(false);
      return;
    }

    if (onSearch) {
      // API-based search
      setIsSearching(true);
      try {
        const results = await onSearch(term);
        setFilteredItems(Array.isArray(results) ? results.slice(0, maxResults) : []);
      } catch (error) {
        console.error('Search error:', error);
        setFilteredItems([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      // Local search
      const filtered = items.filter(item => 
        item.label.toLowerCase().includes(term.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(term.toLowerCase()))
      ).slice(0, maxResults);
      setFilteredItems(filtered);
    }
  }, [items, onSearch, minSearchLength, maxResults]);

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      performSearch(searchTerm);
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm, performSearch, debounceMs]);

  // Reset active index when filtered items change
  useEffect(() => {
    setActiveIndex(-1);
  }, [filteredItems]);

  // Scroll active item into view
  const scrollActiveItemIntoView = useCallback(() => {
    if (activeIndex >= 0 && optionRefs.current[activeIndex]) {
      optionRefs.current[activeIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  // Scroll effect
  useEffect(() => {
    scrollActiveItemIntoView();
  }, [scrollActiveItemIntoView]);

  const handleSelect = useCallback((item) => {
    const selectedValue = item ? item.value : inputValue;
    const selectedLabel = item ? item.label : inputValue;
    
    setInputValue(selectedLabel);
    setIsOpen(false);
    setActiveIndex(-1);
    setSearchTerm('');
    
    // Call parent's onChange
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: selectedValue
        }
      });
    }
    
    // Return focus to input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputValue, onChange, name]);

  const handleKeyDown = useCallback((e) => {
    if (!isOpen && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      e.preventDefault();
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => {
          const newIndex = prev < filteredItems.length - 1 ? prev + 1 : 0;
          return newIndex;
        });
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : filteredItems.length - 1;
          return newIndex;
        });
        break;
        
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredItems.length) {
          handleSelect(filteredItems[activeIndex]);
        } else if (allowCustomValue && inputValue.trim()) {
          handleSelect(null);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        if (inputRef.current) {
          inputRef.current.blur();
        }
        break;
        
      case 'Tab':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
        
      default:
        break;
    }
  }, [isOpen, filteredItems, activeIndex, handleSelect, allowCustomValue, inputValue]);

  const handleInputChange = useCallback((e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setSearchTerm(newValue);
    
    if (!isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  const handleInputFocus = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
      // Trigger initial search if input has value
      if (inputValue && !searchTerm) {
        setSearchTerm(inputValue);
      }
    }
  }, [disabled, inputValue, searchTerm]);

  const handleInputBlur = useCallback((e) => {
    // Delay to allow click events on dropdown items
    setTimeout(() => {
      setIsOpen(false);
      setActiveIndex(-1);
      
      if (onBlur) {
        onBlur({ target: { name } });
      }
    }, 150);
  }, [onBlur, name]);

  const handleMouseEnter = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  const handleItemClick = useCallback((item, index) => {
    handleSelect(item);
  }, [handleSelect]);

  // Clean up refs array
  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, filteredItems.length);
  }, [filteredItems.length]);

  const showDropdown = isOpen && !disabled;
  const showLoading = loading || isSearching;
  const showNoResults = !showLoading && filteredItems.length === 0 && searchTerm.length >= minSearchLength;
  const showResults = !showLoading && filteredItems.length > 0;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder || searchPlaceholder}
          disabled={disabled}
          className={`w-full rounded-md border border-gray-300 p-3 pr-10 shadow-sm transition-all duration-200 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 ${
            disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'
          }`}
          aria-haspopup="listbox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${name}-option-${activeIndex}` : undefined}
          autoComplete="off"
        />
        
        {/* Loading/Dropdown indicator */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {showLoading ? (
            <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </div>
      
      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto"
          role="listbox"
          aria-label={`${name} options`}
        >
          {showLoading && (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{loadingText}</span>
              </div>
            </div>
          )}
          
          {showResults && filteredItems.map((item, index) => (
            <div
              key={`${item.value}-${index}`}
              ref={el => optionRefs.current[index] = el}
              id={`${name}-option-${index}`}
              onClick={() => handleItemClick(item, index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-150 ${
                index === activeIndex 
                  ? 'bg-yellow-50 text-yellow-900 border-l-2 border-yellow-500' 
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
              role="option"
              aria-selected={index === activeIndex}
            >
              <div className="font-medium">{item.label}</div>
              {showDescriptions && item.description && (
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</div>
              )}
            </div>
          ))}
          
          {showNoResults && (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              {noResultsText}
            </div>
          )}
          
          {allowCustomValue && inputValue.trim() && !filteredItems.some(item => item.label.toLowerCase() === inputValue.toLowerCase()) && (
            <div
              onClick={() => handleSelect(null)}
              onMouseEnter={() => handleMouseEnter(filteredItems.length)}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-3 text-sm cursor-pointer border-t transition-colors duration-150 ${
                filteredItems.length === activeIndex 
                  ? 'bg-yellow-50 text-yellow-900 border-l-2 border-yellow-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              role="option"
              aria-selected={filteredItems.length === activeIndex}
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Use "<span className="font-medium">{inputValue}</span>"
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



// import React, { useState, useRef, useEffect, useCallback } from 'react';

// export default function AutocompleteDemo() {
//   // Sample data for testing
//   const sampleItems = [
//     { value: 'apple', label: 'Apple', description: 'A sweet red or green fruit' },
//     { value: 'banana', label: 'Banana', description: 'A long yellow fruit' },
//     { value: 'cherry', label: 'Cherry', description: 'A small red fruit' },
//     { value: 'date', label: 'Date', description: 'A sweet brown fruit' },
//     { value: 'elderberry', label: 'Elderberry', description: 'A dark purple berry' },
//     { value: 'fig', label: 'Fig', description: 'A sweet purple or green fruit' },
//     { value: 'grape', label: 'Grape', description: 'Small round fruits in clusters' },
//     { value: 'honeydew', label: 'Honeydew', description: 'A sweet green melon' },
//     { value: 'kiwi', label: 'Kiwi', description: 'A brown fuzzy fruit with green flesh' },
//     { value: 'lemon', label: 'Lemon', description: 'A sour yellow citrus fruit' }
//   ];

//   const [selectedValue, setSelectedValue] = useState('');

//   const handleChange = (e) => {
//     setSelectedValue(e.target.value);
//     console.log('Selected:', e.target.value);
//   };

//   return (
//     <div className="p-8 w-full mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Autocomplete Demo</h1>
      
//       <div className="mb-4">
       
//         <Autocomplete
//           name="fruit"
//           value={selectedValue}
//           onChange={handleChange}
//           placeholder="Type to search fruits..."
//           items={sampleItems}
//           showDescriptions={true}
//           allowCustomValue={true}
//           className="mb-4"
//         />
//       </div>



     
//     </div>
//   );
// }

// function Autocomplete({
//   name,
//   value,
//   onChange,
//   onBlur,
//   className, 
//   placeholder,  
//   items = [], 
//   showDescriptions = false,
//   disabled = false,
//   loading = false,
//   onSearch,
//   debounceMs = 300,
//   minSearchLength = 1,
//   maxResults = 50,
//   allowCustomValue = false,
//   searchPlaceholder = "Type to search...",
//   noResultsText = "No results found",
//   loadingText = "Searching..."
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
  
//   const inputRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const debounceRef = useRef(null);
//   const optionRefs = useRef([]);
//   const mouseOverRef = useRef(false);

//   // Sync with parent component's value
//   useEffect(() => {
//     if (value) {
//       const selectedItem = items.find(item => item.value === value);
//       if (selectedItem) {
//         setInputValue(selectedItem.label);
//       } else if (allowCustomValue) {
//         setInputValue(value);
//       }
//     } else {
//       setInputValue('');
//     }
//   }, [value, items, allowCustomValue]);

//   // Filter items locally or trigger API search
//   const performSearch = useCallback(async (term) => {
//     if (!term || term.length < minSearchLength) {
//       const initialItems = items.slice(0, maxResults);
//       setFilteredItems(initialItems);
//       setIsSearching(false);
//       return;
//     }

//     if (onSearch) {
//       // API-based search
//       setIsSearching(true);
//       try {
//         const results = await onSearch(term);
//         setFilteredItems(Array.isArray(results) ? results.slice(0, maxResults) : []);
//       } catch (error) {
//         console.error('Search error:', error);
//         setFilteredItems([]);
//       } finally {
//         setIsSearching(false);
//       }
//     } else {
//       // Local search
//       const filtered = items.filter(item => 
//         item.label.toLowerCase().includes(term.toLowerCase()) ||
//         (item.description && item.description.toLowerCase().includes(term.toLowerCase()))
//       ).slice(0, maxResults);
//       setFilteredItems(filtered);
//     }
//   }, [items, onSearch, minSearchLength, maxResults]);

//   // Debounced search effect
//   useEffect(() => {
//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }

//     debounceRef.current = setTimeout(() => {
//       performSearch(searchTerm);
//     }, debounceMs);

//     return () => {
//       if (debounceRef.current) {
//         clearTimeout(debounceRef.current);
//       }
//     };
//   }, [searchTerm, performSearch, debounceMs]);

//   // Initialize filtered items when component mounts
//   useEffect(() => {
//     if (items.length > 0 && filteredItems.length === 0 && !searchTerm) {
//       setFilteredItems(items.slice(0, maxResults));
//     }
//   }, [items, filteredItems.length, searchTerm, maxResults]);

//   // Reset active index when filtered items change, but only if not using mouse
//   useEffect(() => {
//     if (!mouseOverRef.current) {
//       setActiveIndex(-1);
//     }
//   }, [filteredItems]);

//   // Scroll active item into view
//   const scrollActiveItemIntoView = useCallback(() => {
//     if (activeIndex >= 0 && optionRefs.current[activeIndex]) {
//       optionRefs.current[activeIndex].scrollIntoView({
//         block: 'nearest',
//         behavior: 'smooth'
//       });
//     }
//   }, [activeIndex]);

//   // Scroll effect
//   useEffect(() => {
//     scrollActiveItemIntoView();
//   }, [scrollActiveItemIntoView]);

//   const handleSelect = useCallback((item) => {
//     const selectedValue = item ? item.value : inputValue;
//     const selectedLabel = item ? item.label : inputValue;
    
//     setInputValue(selectedLabel);
//     setIsOpen(false);
//     setActiveIndex(-1);
//     setSearchTerm('');
//     mouseOverRef.current = false;
    
//     // Call parent's onChange
//     if (onChange) {
//       onChange({
//         target: {
//           name: name,
//           value: selectedValue
//         }
//       });
//     }
    
//     // Return focus to input after a brief delay
//     setTimeout(() => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, 10);
//   }, [inputValue, onChange, name]);

//   const handleKeyDown = useCallback((e) => {
//     if (!isOpen && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
//       e.preventDefault();
//       setIsOpen(true);
//       if (e.key === 'ArrowDown') {
//         setActiveIndex(0);
//       }
//       return;
//     }

//     if (!isOpen) return;

//     mouseOverRef.current = false; // Keyboard navigation takes precedence

//     switch (e.key) {
//       case 'ArrowDown':
//         e.preventDefault();
//         setActiveIndex(prev => {
//           const maxIndex = allowCustomValue && inputValue.trim() && 
//             !filteredItems.some(item => item.label.toLowerCase() === inputValue.toLowerCase()) 
//             ? filteredItems.length : filteredItems.length - 1;
//           return prev < maxIndex ? prev + 1 : 0;
//         });
//         break;
        
//       case 'ArrowUp':
//         e.preventDefault();
//         setActiveIndex(prev => {
//           const maxIndex = allowCustomValue && inputValue.trim() && 
//             !filteredItems.some(item => item.label.toLowerCase() === inputValue.toLowerCase()) 
//             ? filteredItems.length : filteredItems.length - 1;
//           return prev > 0 ? prev - 1 : maxIndex;
//         });
//         break;
        
//       case 'Enter':
//         e.preventDefault();
//         if (activeIndex >= 0 && activeIndex < filteredItems.length) {
//           handleSelect(filteredItems[activeIndex]);
//         } else if (activeIndex === filteredItems.length && allowCustomValue && inputValue.trim()) {
//           handleSelect(null);
//         } else if (allowCustomValue && inputValue.trim()) {
//           handleSelect(null);
//         }
//         break;
        
//       case 'Escape':
//         e.preventDefault();
//         setIsOpen(false);
//         setActiveIndex(-1);
//         mouseOverRef.current = false;
//         if (inputRef.current) {
//           inputRef.current.blur();
//         }
//         break;
        
//       case 'Tab':
//         setIsOpen(false);
//         setActiveIndex(-1);
//         mouseOverRef.current = false;
//         break;
        
//       default:
//         break;
//     }
//   }, [isOpen, filteredItems, activeIndex, handleSelect, allowCustomValue, inputValue]);

//   const handleInputChange = useCallback((e) => {
//     const newValue = e.target.value;
//     setInputValue(newValue);
//     setSearchTerm(newValue);
    
//     if (!isOpen) {
//       setIsOpen(true);
//     }
//   }, [isOpen]);

//   const handleInputFocus = useCallback(() => {
//     if (!disabled) {
//       setIsOpen(true);
//       // Trigger initial search if input has value
//       if (inputValue && !searchTerm) {
//         setSearchTerm(inputValue);
//       } else if (!inputValue && items.length > 0) {
//         setFilteredItems(items.slice(0, maxResults));
//       }
//     }
//   }, [disabled, inputValue, searchTerm, items, maxResults]);

//   const handleInputBlur = useCallback((e) => {
//     // Delay to allow click events on dropdown items
//     setTimeout(() => {
//       setIsOpen(false);
//       setActiveIndex(-1);
//       mouseOverRef.current = false;
      
//       if (onBlur) {
//         onBlur({ target: { name } });
//       }
//     }, 200);
//   }, [onBlur, name]);

//   const handleMouseEnter = useCallback((index) => {
//     mouseOverRef.current = true;
//     setActiveIndex(index);
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     mouseOverRef.current = false;
//     setActiveIndex(-1);
//   }, []);

//   const handleItemClick = useCallback((item, index) => {
//     handleSelect(item);
//   }, [handleSelect]);

//   // Clean up refs array
//   useEffect(() => {
//     optionRefs.current = optionRefs.current.slice(0, filteredItems.length + (allowCustomValue ? 1 : 0));
//   }, [filteredItems.length, allowCustomValue]);

//   const showDropdown = isOpen && !disabled;
//   const showLoading = loading || isSearching;
//   const showNoResults = !showLoading && filteredItems.length === 0 && searchTerm.length >= minSearchLength;
//   const showResults = !showLoading && filteredItems.length > 0;
//   const showCustomOption = allowCustomValue && inputValue.trim() && 
//     !filteredItems.some(item => item.label.toLowerCase() === inputValue.toLowerCase());

//   return (
//     <div className={`relative ${className}`}>
//       <div className="relative">
//         <input
//           ref={inputRef}
//           type="text"
//           name={name}
//           value={inputValue}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           onFocus={handleInputFocus}
//           onBlur={handleInputBlur}
//           placeholder={placeholder || searchPlaceholder}
//           disabled={disabled}
//           className={`w-full rounded-md border border-gray-300 p-3 pr-10 shadow-sm transition-all duration-200 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 ${
//             disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'
//           }`}
//           aria-haspopup="listbox"
//           aria-expanded={showDropdown}
//           aria-autocomplete="list"
//           aria-activedescendant={activeIndex >= 0 ? `${name}-option-${activeIndex}` : undefined}
//           autoComplete="off"
//         />
        
//         {/* Loading/Dropdown indicator */}
//         <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//           {showLoading ? (
//             <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//           ) : (
//             <svg className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//             </svg>
//           )}
//         </div>
//       </div>
      
//       {/* Dropdown */}
//       {showDropdown && (
//         <div
//           ref={dropdownRef}
//           className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto"
//           role="listbox"
//           aria-label={`${name} options`}
//         >
//           {showLoading && (
//             <div className="px-4 py-3 text-sm text-gray-500 text-center">
//               <div className="flex items-center justify-center space-x-2">
//                 <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <span>{loadingText}</span>
//               </div>
//             </div>
//           )}
          
//           {showResults && filteredItems.map((item, index) => (
//             <div
//               key={`${item.value}-${index}`}
//               ref={el => optionRefs.current[index] = el}
//               id={`${name}-option-${index}`}
//               onClick={() => handleItemClick(item, index)}
//               onMouseEnter={() => handleMouseEnter(index)}
//               onMouseLeave={handleMouseLeave}
//               className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-150 ${
//                 index === activeIndex 
//                   ? 'bg-yellow-50 text-yellow-900 border-l-4 border-yellow-500' 
//                   : 'text-gray-900 hover:bg-gray-50'
//               }`}
//               role="option"
//               aria-selected={index === activeIndex}
//             >
//               <div className="font-medium">{item.label}</div>
//               {showDescriptions && item.description && (
//                 <div className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</div>
//               )}
//             </div>
//           ))}
          
//           {showNoResults && (
//             <div className="px-4 py-3 text-sm text-gray-500 text-center">
//               {noResultsText}
//             </div>
//           )}
          
//           {showCustomOption && (
//             <div
//               ref={el => optionRefs.current[filteredItems.length] = el}
//               onClick={() => handleSelect(null)}
//               onMouseEnter={() => handleMouseEnter(filteredItems.length)}
//               onMouseLeave={handleMouseLeave}
//               className={`px-4 py-3 text-sm cursor-pointer border-t transition-colors duration-150 ${
//                 filteredItems.length === activeIndex 
//                   ? 'bg-yellow-50 text-yellow-900 border-l-4 border-yellow-500' 
//                   : 'text-gray-700 hover:bg-gray-50'
//               }`}
//               role="option"
//               aria-selected={filteredItems.length === activeIndex}
//             >
//               <div className="flex items-center">
//                 <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//                 Use "<span className="font-medium">{inputValue}</span>"
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }