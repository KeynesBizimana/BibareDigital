"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addData, displayData } from "./actions";
import { CheckCircle, XCircle,Loader2 } from "lucide-react";

export default function Home({onAddEntry, onLogout }: any) {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const[isLoadingData,setisLoadingData]=useState(false);
  const [formData, setFormData] = useState({
    chorale: "",
    musanze: "",
    date: "",

    ahantu: "",
  });

  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState<
    Array<{
      id: string;
      created_at: string;
      chorale: string;
      uwabikoze: string;
      ahobagiye: string;
      itariki: string;
      umwanzuro: boolean;
    }>
  >([]);

 

  const choraleOptions = ["Inkurunziza", "El shaddai", "Abarobyi", "The Promise ", "Ibisonga "];
  useEffect(() => {
    
    const fetchData = async () => {
      setisLoadingData(true);
      try {
        const result = await displayData();
        if (Array.isArray(result)) {
          setEntries(result);
        } else if (result&&result.success === false) {
          alert(result.message);
        } else if (result && result.success === true) {
          setEntries([]);
          alert(result.message);
        }
      } catch (error) {
        console.log("Data fetching error ", error);
      } finally {
        setisLoadingData(false);
      }
      
    };
    fetchData()
  },[]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const formDataObject = new FormData(e.currentTarget);
      await addData(formDataObject);
      const result = await addData(formDataObject);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log("Submission error ", error);
    } finally {
      setisLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            Bibare Digital
          </h1>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Sohoka
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-3 px-8 rounded-full transition-colors"
          >
            {showForm ? "Funga Ifishi" : "Injiza Ubutumire"}
          </button>
        </div>

        {showForm && (
          <div className="bg-slate-700/90 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 mb-8">
            <form
              onSubmit={handleSubmit}
              // action={async (formDate) => {
              //   const result = await addData(formDate);
              //   if (result.success) {
              //     alert(result.message);
              //   } else {
              //     alert(result.message);
              //   }
              // }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-white font-semibold mb-2">
                    <span>Hitamo Chorale :</span>
                  </label>
                  <select
                    id="chorale"
                    name="chorale"
                    disabled={isLoading}
                    required
                    value={formData.chorale}
                    onChange={(e) =>
                      setFormData({ ...formData, chorale: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-300/70 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
                  >
                    <option value="">Hitamo...</option>
                    {choraleOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-white font-semibold mb-2">
                    <span>Bikozwe na:</span>
                  </label>
                  <input
                    type="text"
                    id="uwabikoze"
                    disabled={isLoading}
                    name="uwabikoze"
                    required
                    className="w-full px-4 py-3 bg-slate-300/70 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <div>
                  <label className="flex items-center text-white font-semibold mb-2">
                    <span>Aho Bagiye</span>
                  </label>
                  <input
                    type="text"
                    id="ahobagiye"
                    name="ahobagiye"
                    required
                    className="w-full px-4 py-3 bg-slate-300/70 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <div>
                  <label className="flex items-center text-white font-semibold mb-2">
                    <span>Itariki</span>
                  </label>
                  <input
                    type="date"
                    id="itariki"
                    name="itariki"
                    required
                    className="w-full px-4 py-3 bg-slate-300/70 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-3 px-12 rounded-full transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      "Tegereza..."
                    </>
                  ) : (
                    "INJIZA UBUTUMIRE"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {isLoadingData ? (
            <div className="text-center text-white py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
              <p>Gutangiza amakuru...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-4 hidden md:grid md:grid-cols-5 gap-4 font-bold text-slate-800">
              <div>CHORALE</div>
              <div>AHO BAGIYE</div>
              <div>ITARIKI</div>
              <div>UMWANZURO</div>
              {/* <div>IGIKORWA</div> */}
            </div>
          )}

          {entries.map((entry: any) => (
            <div
              key={entry.id}
              className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
            >
              <div className="font-semibold">
                <span className="md:hidden text-slate-600">Chorale: </span>
                {entry.chorale}
              </div>
              <div>
                <span className="md:hidden text-slate-600">Aho Bagiye: </span>
                {entry.ahobagiye}
              </div>
              <div>
                <span className="md:hidden text-slate-600">Itariki: </span>
                {entry.itariki}
              </div>
              <div>
                <span className="md:hidden text-slate-600">Umwanzuro: </span>
                <span
                  className={`inline-block px-4 py-1 rounded font-bold text-white ${
                    entry.umwanzuro === "yego" ? "bg-blue-600" : "bg-red-500"
                  }`}
                >
                  {entry.umwanzuro===false?"OYA":"YEGO"}
                </span>
              </div>
              <div className="flex gap-2">
                {/* <button className="p-2 bg-green-500 hover:bg-green-600 rounded text-white transition-colors">
                  <CheckCircle size={20} />
                </button>
                <button className="p-2 bg-red-500 hover:bg-red-600 rounded text-white transition-colors">
                  <XCircle size={20} />
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
