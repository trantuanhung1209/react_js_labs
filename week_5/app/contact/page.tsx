"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-light text-gray-900 mb-8">Liên hệ</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact information */}
        <div>
          <div className="bg-white rounded-3xl p-8" style={{
            boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
          }}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Thông tin liên hệ</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">contact@example.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Điện thoại</h3>
                <p className="text-gray-600">+84 123 456 789</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ</h3>
                <p className="text-gray-600">Hà Nội, Việt Nam</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Mạng xã hội</h3>
                <div className="flex gap-6">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition font-medium text-sm"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition font-medium text-sm"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition font-medium text-sm"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white rounded-3xl p-8" style={{
          boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
        }}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Gửi tin nhắn</h2>

          {isSubmitted && (
            <div className="mb-4 bg-gray-100 text-gray-800 px-4 py-3 rounded-xl text-sm">
              Tin nhắn đã được gửi thành công!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 text-sm">
                Tên của bạn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:bg-white transition"
                placeholder="Nhập tên của bạn"
                style={{
                  boxShadow: 'inset 2px 2px 4px #e5e7eb, inset -2px -2px 4px #ffffff'
                }}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:bg-white transition"
                placeholder="Nhập email của bạn"
                style={{
                  boxShadow: 'inset 2px 2px 4px #e5e7eb, inset -2px -2px 4px #ffffff'
                }}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2 text-sm">
                Tin nhắn
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:bg-white transition resize-none"
                placeholder="Viết tin nhắn của bạn..."
                style={{
                  boxShadow: 'inset 2px 2px 4px #e5e7eb, inset -2px -2px 4px #ffffff'
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-200 text-gray-900 font-semibold py-3 rounded-2xl hover:bg-gray-300 transition"
              style={{
                boxShadow: '4px 4px 8px #d1d5db, -4px -4px 8px #ffffff'
              }}
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
