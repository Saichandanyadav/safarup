"use client";

import { useState } from "react";

const initialReviews = [
  {
    id: 1,
    title: "Bodh Gaya Spiritual Journey",
    rating: 5,
    description:
      "Visiting Mahabodhi Temple was a serene experience. The peaceful ambiance and local guidance made it unforgettable.",
    user: "Aarav Mehta",
    location: "Bodh Gaya",
    date: "2 days ago"
  },
  {
    id: 2,
    title: "Rajgir Hills Trek",
    rating: 4,
    description:
      "Trekking the hills of Rajgir was amazing! The views from the top and the hot springs were refreshing.",
    user: "Priya Sharma",
    location: "Rajgir",
    date: "1 week ago"
  },
  {
    id: 3,
    title: "Patna City Walk",
    rating: 5,
    description:
      "Explored the historic sites of Patna including Golghar and Gandhi Maidan. Loved the street food and local markets.",
    user: "Rohan Verma",
    location: "Patna",
    date: "3 days ago"
  },
  {
    id: 4,
    title: "Nalanda University Visit",
    rating: 4,
    description:
      "The ruins of Nalanda University are awe-inspiring. Great guided tour and informative storytelling by our local guide.",
    user: "Meera Kapoor",
    location: "Nalanda",
    date: "5 days ago"
  }
];

const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Incredible"];

export default function Share() {
  const [reviews, setReviews] = useState(initialReviews);
  const [form, setForm] = useState({
    destination: "",
    rating: 0,
    experience: ""
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.destination || !form.rating || !form.experience) return;

    const newReview = {
      id: Date.now(),
      title: `${form.destination} Experience`,
      rating: form.rating,
      description: form.experience,
      user: "Guest Traveler",
      location: form.destination,
      date: "Just now"
    };

    setReviews([newReview, ...reviews]);
    setForm({ destination: "", rating: 0, experience: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="relative h-[45vh] sm:h-[55vh] overflow-hidden">
        <img
          src="/share-hero-bihar.jpg"
          alt="Bihar Travel Experience"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-950"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Share Your
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Bihar Travel Story
            </span>
          </h1>
          <p className="mt-4 text-gray-300 max-w-xl">
            Inspire explorers with authentic experiences and hidden gems across Bihar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Destination
                </label>
                <input
                  type="text"
                  value={form.destination}
                  onChange={(e) =>
                    setForm({ ...form, destination: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-0 outline-none transition"
                  placeholder="Which Bihar city did you visit?"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Your Experience
                </label>
                <textarea
                  rows={5}
                  maxLength={300}
                  value={form.experience}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 outline-none resize-none transition"
                  placeholder="Tell your Bihar story..."
                />
                <div className="text-right text-xs text-gray-500 mt-2">
                  {form.experience.length}/300
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400 mb-3">
                  Rate Your Experience
                </p>
                <div className="flex justify-center gap-4 text-4xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setForm({ ...form, rating: star })}
                      className={`cursor-pointer transition ${
                        star <= form.rating
                          ? "text-yellow-400 scale-125"
                          : "text-gray-600 hover:text-yellow-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {form.rating > 0 && (
                  <p className="mt-3 text-sm text-cyan-400 font-medium">
                    {ratingLabels[form.rating]}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-lg active:scale-95 transition"
              >
                Publish Experience
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Community Stories
            </h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:border-cyan-400/40 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {review.title}
                      </h3>
                      <div className="text-yellow-400 text-sm mt-1">
                        {"★".repeat(review.rating)}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                    {review.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                    <span>{review.user}</span>
                    <span>{review.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
