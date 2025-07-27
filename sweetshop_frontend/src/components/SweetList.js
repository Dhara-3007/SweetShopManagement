import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SweetCard from './SweetCard';
import './SweetList.css';

function SweetList() {
  const [sweets, setSweets] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/categories/');
        setCategories(['All', ...response.data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const url =
          selectedCategory === 'All'
            ? 'http://localhost:8000/api/auth/sweets/'
            : `http://localhost:8000/api/auth/sweets/?category=${selectedCategory}`;

        const response = await axios.get(url);
        let fetchedSweets = response.data;

        // Apply sorting
        if (sortOrder === 'low') {
          fetchedSweets.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'high') {
          fetchedSweets.sort((a, b) => b.price - a.price);
        }

        setSweets(fetchedSweets);
      } catch (error) {
        console.error("Error fetching sweets:", error);
      }
    };

    fetchSweets();
  }, [selectedCategory, sortOrder]);

  // 🔍 Filter sweets by search term
  const filteredSweets = sweets.filter((sweet) =>
    sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sweet-page-container">
      {/* Hero Section */}
      <div className="sweet-hero-banner">
        <h1>Welcome to शाही मिठाई</h1>
        <p>Where sweetness meets heritage, and every bite tells a story.</p>
      </div>

      {/* 🔍 Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Mithai..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </div>

      {/* 🧁 Category Tabs */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔃 Sort Dropdown */}
      <div className="sort-container">
        <label htmlFor="sort-select" style={{ marginRight: '8px' }}>Sort by Price:</label>
        <select
          id="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="">None</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Sweet Grid */}
      {filteredSweets.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No sweets found..</p>
      ) : (
        <div className="sweet-list-container">
          {filteredSweets.map((sweet) => (
            <SweetCard key={sweet.id} sweet={sweet} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SweetList;
