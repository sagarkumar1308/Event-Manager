import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";

const Manager = () => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", location: "", description: "", category: "" });
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDel, setIddel] = useState();
  const [editId, setEditId] = useState(null);

  const fetchEvents = async () => {
    try {
      const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
      setEvents(savedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const showPassword = () => {
    if (!show) {
      ref.current.src = "./icons/hide.svg";
    } else {
      ref.current.src = "./icons/view.svg";
    }
    setShow(!show);
  };

  const saveEvent = () => {
    if (!form.title || !form.date || !form.location || !form.description || !form.category) {
      toast.error("Please fill all fields");
      return;
    }

    if (editId) {
      const updatedEvents = events.map(event => 
        event.id === editId ? { ...form, id: editId } : event
      );
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEditId(null);
      toast.success("Event updated successfully!");
    } else {
      const newEvent = { ...form, id: uuidv4() };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      toast.success("Event added successfully!");
    }
    
    setForm({ title: "", date: "", location: "", description: "", category: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(event => event.category === filter);

  const deleteHandler = async () => {
    try {
      const updatedEvents = events.filter((item) => item.id !== idDel);
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setIsModalOpen(false);
      toast("🦄 Deleted Event", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event");
    }
  };

  const editHandler = (id) => {
    const selectedItem = events.find((item) => item.id === id);
    if (!selectedItem) return;

    setForm({
      title: selectedItem.title,
      date: selectedItem.date,
      location: selectedItem.location,
      description: selectedItem.description,
      category: selectedItem.category,
    });
    setEditId(id);
  };

  const handleDelete = (id) => {
    setIddel(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="block"
              >
                Event Manager
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="block text-indigo-600"
              >
                Your Personal Event Organizer
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl rounded-lg p-6 mb-8"
          >
            <div className="flex flex-col gap-4">
              <input
                value={form.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="rounded-lg border-2 w-full outline-indigo-500 text-gray-700 border-indigo-500 px-4 py-2"
                type="text"
                name="title"
              />
              <input
                value={form.date}
                onChange={handleChange}
                className="rounded-lg border-2 w-full outline-indigo-500 text-gray-700 border-indigo-500 px-4 py-2"
                type="date"
                name="date"
              />
              <input
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="rounded-lg border-2 w-full outline-indigo-500 text-gray-700 border-indigo-500 px-4 py-2"
                type="text"
                name="location"
              />
              <textarea
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="rounded-lg border-2 w-full outline-indigo-500 text-gray-700 border-indigo-500 px-4 py-2"
                name="description"
              />
              <select
                value={form.category}
                onChange={handleChange}
                name="category"
                className="rounded-lg border-2 w-full outline-indigo-500 text-gray-700 border-indigo-500 px-4 py-2"
              >
                <option value="">Select Category</option>
                <option value="Religious">Religious</option>
                <option value="Social">Social</option>
                <option value="Charity">Charity</option>
              </select>
              <button
                onClick={saveEvent}
                className="bg-indigo-600 p-3 text-white font-medium rounded-md hover:bg-indigo-700"
              >
                {editId ? "Update Event" : "Add Event"}
              </button>
              
              <div className="flex gap-2 justify-center mt-4">
                <button 
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter("Religious")}
                  className={`px-4 py-2 rounded-md ${filter === "Religious" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  Religious
                </button>
                <button 
                  onClick={() => setFilter("Social")}
                  className={`px-4 py-2 rounded-md ${filter === "Social" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  Social
                </button>
                <button 
                  onClick={() => setFilter("Charity")}
                  className={`px-4 py-2 rounded-md ${filter === "Charity" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  Charity
                </button>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {filteredEvents.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl text-center mt-3 text-gray-700"
              >
                No Events Available
              </motion.div>
            ) : (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-x-auto"
              >
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <AnimatePresence>
                      {filteredEvents.map((event) => (
                        <motion.tr 
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-2 px-4 text-center">{event.title}</td>
                          <td className="py-2 px-4 text-center">{event.date}</td>
                          <td className="py-2 px-4 text-center">{event.location}</td>
                          <td className="py-2 px-4 text-center">{event.category}</td>
                          <td className="py-2 px-4 text-center">{event.description}</td>
                          <td className="py-2 px-4 text-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => editHandler(event.id)}
                              className="bg-indigo-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-indigo-700 transition-colors duration-200"
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(event.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors duration-200"
                            >
                              Delete
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteHandler}
        message="Are you sure you want to delete?"
      />
    </>
  );
};

export default Manager;
