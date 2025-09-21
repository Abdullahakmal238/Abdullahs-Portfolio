"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Facebook, Linkedin, Github } from "lucide-react";

const FormField = ({
  name,
  label,
  value,
  onChange,
  type = "text",
  required,
}) => (
  <div className="relative">
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder=" "
      className="block w-full px-4 py-3 text-white rounded-xl appearance-none peer focus:outline-none focus:ring-0 shadow-inner neumorphic-inset transition-shadow duration-300 bg-transparent border-none"
    />
    <label
      htmlFor={name}
      className="absolute text-white duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
    >
      {label}
    </label>
  </div>
);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message || !form.name || !form.email) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "9e8538b0-8436-40da-93ef-c77865ecbe47", // 🔑 Replace with your Web3Forms key
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Your message has been sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Sorry, failed to send your message.");
      }
    } catch (error) {
      console.error("Web3Forms Error:", error);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="container mx-auto px-4 lg:px-20 mt-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 backdrop-blur-md rounded-3xl -z-10" />

      <Toaster position="top-center" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side */}
        <motion.div
          className="p-8 rounded-3xl space-y-6 bg-gray-900/50 border border-gray-700"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-300">
            Feel free to reach out via the form or directly through my contact
            details.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-white" />
              <span className="text-slate-200">abdullahakmal238@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-white" />
              <span className="text-slate-200">+923224768248</span>
            </div>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/abdullah.akmal.733"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook className="w-7 h-7 text-white hover:text-gray-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdullahakmal238/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="w-7 h-7 text-white hover:text-gray-300" />
              </a>
              <a
                href="https://github.com/Abdullahakmal238"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="w-7 h-7 text-white hover:text-gray-300" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side (Form) */}
        <motion.div
          className="p-8 rounded-3xl bg-gray-900/50 border border-gray-700"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-2xl border-white">
                <FormField
                  name="name"
                  label="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="border rounded-2xl border-white">
                <FormField
                  name="email"
                  label="Your Email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder=" "
                className="block w-full px-4 py-3 text-white rounded-xl appearance-none peer focus:outline-none focus:ring-0 resize-none shadow-inner border border-white transition-shadow duration-300 bg-transparent"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute text-white duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Write your valuable message here...
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-lg text-white border border-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </div>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
