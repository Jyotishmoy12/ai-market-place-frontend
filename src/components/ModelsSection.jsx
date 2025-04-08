import FilterBar from "../components/FilterBar";
import { useEffect, useState } from "react";
import axios from "axios";
import ModelCard from "../components/ModelCard";

const API_BASE = "https://ai-market-place-backend.onrender.com/api/models";

const ModelsSection=() =>{
  const [models, setModels] = useState([]);
  const [filters, setFilters] = useState({ source: "", type: "" });
  const [allTypes, setAllTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_BASE, {
          params: { ...filters, page, limit: 12 },
        });

        const fetched = res.data;
        setModels(fetched);

        // Dynamically extract all types
        const typesSet = new Set(fetched.map((m) => m.type).filter(Boolean));
        setAllTypes(Array.from(typesSet).sort());

        setLoading(false);
      } catch (err) {
        console.error("Error fetching models:", err);
        setLoading(false);
      }
    };

    fetchModels();
  }, [filters, page]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🧠 Latest AI Model Drops</h1>
      <FilterBar filters={filters} setFilters={setFilters} allTypes={allTypes} />
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, idx) => (
            <ModelCard key={idx} model={model} />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          ⬅ Prev
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default ModelsSection
