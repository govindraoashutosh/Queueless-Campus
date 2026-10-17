import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = 'Search services, locations...' }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Ctrl + K global shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 18px',
        borderRadius: '9999px',
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        width: '100%',
        maxWidth: '440px',
        transition: 'all 0.2s ease'
      }}
      className="dashboard-search-container"
    >
      <Search size={18} color="#64748b" style={{ flexShrink: 0 }} />

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search campus services"
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: '14px',
          fontWeight: '500',
          color: '#0f172a',
          minWidth: 0
        }}
      />

      {query ? (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            color: '#64748b'
          }}
        >
          <X size={16} />
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
          <kbd
            style={{
              padding: '2px 6px',
              borderRadius: '6px',
              background: 'rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              fontSize: '11px',
              fontWeight: '600',
              color: '#64748b',
              fontFamily: 'inherit'
            }}
          >
            Ctrl
          </kbd>
          <kbd
            style={{
              padding: '2px 6px',
              borderRadius: '6px',
              background: 'rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              fontSize: '11px',
              fontWeight: '600',
              color: '#64748b',
              fontFamily: 'inherit'
            }}
          >
            K
          </kbd>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
