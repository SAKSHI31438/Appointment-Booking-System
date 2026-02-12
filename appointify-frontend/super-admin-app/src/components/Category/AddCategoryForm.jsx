import React, { useEffect, useState } from "react";
import SuperAdminSideBar from "../Sidebar/SuperAdminSideBar";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddCategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isViewMode = Boolean(id);

  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([{ name: "" }]);
  const [loading, setLoading] = useState(false);

  /* -------- FETCH CATEGORY FOR VIEW MODE -------- */
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/category/getCategoryById/${id}`,
        );

        setCategory(res.data.data.category);
        setSubCategories(
          res.data.data.subCategories?.length
            ? res.data.data.subCategories
            : [{ name: "" }],
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to load category");
      }
    };

    if (isViewMode) fetchCategoryDetails();
  }, [id, isViewMode]);

  /* -------- SUB CATEGORY -------- */
  const handleSubCategoryChange = (index, value) => {
    const updated = [...subCategories];
    updated[index].name = value;
    setSubCategories(updated);
  };

  const addSubCategory = () => {
    setSubCategories([...subCategories, { name: "" }]);
  };

  const removeSubCategory = (index) => {
    setSubCategories(subCategories.filter((_, i) => i !== index));
  };

  /* -------- SUBMIT -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewMode) return;

    if (!category.trim()) return toast.error("Category required");

    const filteredSubCategories = subCategories.filter(
      (s) => s.name.trim() !== "",
    );

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/api/category/createCategory", {
        category,
        subCategories: filteredSubCategories,
      });

      toast.success("Category added successfully ✅");
      navigate("/category");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SuperAdminSideBar />

      <div className="flex-1 md:ml-64 py-8">
        <div className="max-w-7xl mx-auto px-6 py-5">
          {/* Header */}
          <div className="px-8 py-6 border-b">
            <h1 className="text-2xl font-semibold text-gray-800">
              {isViewMode ? "View Category" : "Add Category"}
            </h1>
            <p className="text-sm text-gray-500">
              Create category with sub-categories
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-8">
            {/* CATEGORY */}
            <div>
              <label className="label">Category Name</label>
              <input
                type="text"
                value={category}
                disabled={isViewMode}
                onChange={(e) => setCategory(e.target.value)}
                className={`input-soft ${
                  isViewMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* SUB CATEGORY */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="label">Sub Categories</label>

                {!isViewMode && (
                  <button
                    type="button"
                    onClick={addSubCategory}
                    className="flex gap-2 text-sm text-[#540863] font-semibold"
                  >
                    <Plus size={16} /> Add
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {subCategories.map((sub, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={sub.name}
                      disabled={isViewMode}
                      onChange={(e) =>
                        handleSubCategoryChange(index, e.target.value)
                      }
                      className={`input-soft flex-1 ${
                        isViewMode ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />

                    {!isViewMode && subCategories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSubCategory(index)}
                        className="p-2 rounded-lg bg-red-50 text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            {!isViewMode && (
              <div className="flex justify-end gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2.5 rounded-xl bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-2.5 rounded-xl bg-[#540863] text-white"
                >
                  {loading ? "Saving..." : "Save Category"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
