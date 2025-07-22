"use client"

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/dubai.mp4" type="video/mp4" />
        {/* Fallback image if video fails to load */}
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/assets/lake.jpg')]" />
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <p className="text-lg mb-4 opacity-90">Helping Others</p>
        <h1 className="text-6xl font-bold mb-6 tracking-wide">LIVE & TRAVEL</h1>
        <p className="text-lg opacity-90">Special offers to suit your plan</p>
      </div>
    </section>
  )
}
export default Hero
