import React, { useEffect, useRef, useState } from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({
  label = 'Menu',
  items = [],
  accentColor = '#7fb800',
  width = 260,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover)');
    setCanHover(media.matches);
    const handler = (event) => setCanHover(event.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const focusItem = (index) => {
    const clampedIndex = (index + items.length) % items.length;
    itemRefs.current[clampedIndex]?.focus();
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      requestAnimationFrame(() => focusItem(0));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
      requestAnimationFrame(() => focusItem(items.length - 1));
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  const handleMenuKeyDown = (event, index) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusItem(index + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusItem(index - 1);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
    }
  };

  return (
    <div
      className="dropdown-menu"
      ref={containerRef}
      style={{
        '--dropdown-accent': accentColor,
        '--dropdown-width': typeof width === 'number' ? `${width}px` : width,
      }}
      onMouseEnter={() => canHover && setIsOpen(true)}
      onMouseLeave={() => canHover && setIsOpen(false)}
    >
      <button
        type="button"
        className="dropdown-trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
      >
        {label}
        <span aria-hidden="true" className={`dropdown-caret ${isOpen ? 'open' : ''}`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="dropdown-panel" role="menu">
          <ul>
            {items.map((item, index) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  role="menuitem"
                  tabIndex={0}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  onKeyDown={(event) => handleMenuKeyDown(event, index)}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;


