

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16">
        <h1 className="text-5xl font-light text-gray-900 mb-6">Xin chào</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Tôi là một lập trình viên React/Next.js đam mê tạo các ứng dụng web hiện đại
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition" style={{
          boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
        }}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Web Development</h2>
          <p className="text-gray-600 leading-relaxed">
            Chuyên sâu về React, Next.js và JavaScript hiện đại
          </p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition" style={{
          boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
        }}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Responsive Design</h2>
          <p className="text-gray-600 leading-relaxed">
            Tạo các trang web responsive với Tailwind CSS
          </p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition" style={{
          boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
        }}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance</h2>
          <p className="text-gray-600 leading-relaxed">
            Tối ưu hóa hiệu suất và trải nghiệm người dùng
          </p>
        </div>
      </section>

      <section className="bg-white rounded-3xl p-12" style={{
        boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
      }}>
        <h2 className="text-3xl font-light text-gray-900 mb-8">Kĩ năng chính</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-gray-700">React & Next.js</div>
          <div className="text-gray-700">JavaScript/TypeScript</div>
          <div className="text-gray-700">Tailwind CSS</div>
          <div className="text-gray-700">Git & Version Control</div>
        </div>
      </section>
    </div>
  );
}
