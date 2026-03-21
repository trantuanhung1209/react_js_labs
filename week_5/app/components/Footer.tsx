export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Về tôi</h3>
            <p className="text-gray-600 text-sm">Lập trình viên Full-stack với đam mê học tập</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Liên kết nhanh</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-900 transition">GitHub</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Thông tin liên hệ</h3>
            <p className="text-gray-600 text-sm">Email: info@example.com</p>
            <p className="text-gray-600 text-sm">Phone: +84 123 456 789</p>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 My Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
