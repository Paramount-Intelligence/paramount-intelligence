"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import CaseStudyForm from "./CaseStudyForm";
import { getApiUrl } from "@/lib/api";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  heroImage: string;
  industry: string;
  businessFunction: string;
  description: string;
  clientName: string;
  clientIndustry: string;
  clientMarket: string;
  clientTechnology: string;
  challenge: string;
  solution: string;
  benefits: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(
    null
  );

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch(`api/admin/case-studies`,{
  credentials: "include" // ✅ send HTTP-only cookies
});
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setCaseStudies(data);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    try {
      const response = await fetch(
        `${getApiUrl()}/api/admin/case-studies/${id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );
      if (!response.ok) throw new Error("Failed to delete");
      fetchCaseStudies();
    } catch (error) {
      console.error("Error deleting case study:", error);
      alert("Failed to delete case study");
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCaseStudy(caseStudy);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingCaseStudy(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCaseStudy(null);
    fetchCaseStudies();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-16 px-6 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  // inside AdminDashboard component
const handleLogout = async () => {
  try {
    const res = await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include', // important to clear httpOnly cookie
    });

    if (!res.ok) throw new Error('Logout failed');

    // Redirect to login after logout
    window.location.href = '/admin/login';
  } catch (err) {
    console.error(err);
    alert('Failed to logout');
  }
};

  return (
    <div className="max-w-7xl mt-16 mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Case Studies Management
        </h1>
        <div className="flex items-center gap-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#17599d] text-white px-6 py-3 rounded-lg hover:bg-[#144a75] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Case Study
        </button>
        <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors"
    >
      Log Out
    </button>
    
        
      </div>
       </div>

      

      {showForm && (
        <CaseStudyForm caseStudy={editingCaseStudy} onClose={handleFormClose} />
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Title
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Industry
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Business Function
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Created
              </th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {caseStudies.map((caseStudy) => (
              <tr key={caseStudy.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xs font-medium text-gray-900">
                    {caseStudy.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {caseStudy.subtitle}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                  {caseStudy.industry}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                  {caseStudy.businessFunction}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                  {new Date(caseStudy.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                  <button
                    onClick={() => handleEdit(caseStudy)}
                    className="text-[#17599d] hover:text-[#144a75] mr-4"
                    title="Edit case study"
                    aria-label="Edit case study"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(caseStudy.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete case study"
                    aria-label="Delete case study"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
