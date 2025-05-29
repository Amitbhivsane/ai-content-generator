"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "./dashboard/_components/Header";

export default function Home() {
  const router = useRouter();

  const features = [
    {
      icon: "📄",
      title: "25+ templates",
      desc: "Responsive, and mobile-first project on the web",
    },
    {
      icon: "⚙️",
      title: "Customizable",
      desc: "Components are easily customized and extendable",
    },
    {
      icon: "📚",
      title: "Free to Use",
      desc: "Every component and plugin is well documented",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      desc: "Contact us 24 hours a day, 7 days a week",
    },
  ];

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      <section className="bg-white text-center py-20 px-4 md:px-20 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/hex-bg.svg')] opacity-10 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            AI Content <span className="text-indigo-600">Generator</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-4">
            Revolutionize your content creation with our AI-powered app,
            delivering engaging and high-quality text in seconds.
          </p>

          <button
            onClick={handleClick}
            className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
          >
            Get started <span className="ml-2">&rarr;</span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center space-y-3">
            <div className="text-4xl">{f.icon}</div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

// "use client";

// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";

// export default function Home() {
//   const router = useRouter();
//   const { isSignedIn } = useUser();

//   const features = [
//     {
//       icon: "📄",
//       title: "25+ templates",
//       desc: "Responsive, mobile-first design",
//     },
//     { icon: "⚙️", title: "Customizable", desc: "Easily extendable components" },
//     { icon: "📚", title: "Free to Use", desc: "Everything is well documented" },
//     { icon: "💬", title: "24/7 Support", desc: "Contact us any time" },
//   ];

//   const handleClick = () => {
//     if (isSignedIn) {
//       router.push("/dashboard");
//     } else {
//       router.push("/sign-in");
//     }
//   };

//   return (
//     <div>
//       <section className="bg-white text-center py-20 px-4 md:px-20 relative">
//         <div className="absolute inset-0 bg-[url('/hex-bg.svg')] opacity-10 z-0" />
//         <div className="relative z-10 max-w-4xl mx-auto">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//             AI Content <span className="text-indigo-600">Generator</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600 mt-4">
//             Revolutionize your content creation with our AI-powered tools.
//           </p>
//           <button
//             onClick={handleClick}
//             className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
//           >
//             Get started <span className="ml-2">&rarr;</span>
//           </button>
//         </div>
//       </section>

//       <section className="py-16 bg-white px-4 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
//         {features.map((f, i) => (
//           <div key={i} className="flex flex-col items-center space-y-3">
//             <div className="text-4xl">{f.icon}</div>
//             <h3 className="font-semibold text-lg">{f.title}</h3>
//             <p className="text-gray-600 text-sm">{f.desc}</p>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }
