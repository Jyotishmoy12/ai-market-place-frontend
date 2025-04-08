export default function FilterBar({ filters, setFilters, allTypes }) {
    const handleChange = (e) => {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Source Filter */}
        <select
          name="source"
          value={filters.source}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">All Sources</option>
          <option value="HuggingFace">HuggingFace</option>
          <option value="Replicate">Replicate</option>
          {/* Add more sources here as you support them */}
        </select>
  
        {/* Type Filter */}
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">All Types</option>
          {allTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    );
  }
  