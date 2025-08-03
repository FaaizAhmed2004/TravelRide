import { Button } from "@/components/ui/button"
import { ReviewCard } from "../review-card/review-card"

const reviews = [
  {
    quote: "A real sense of community, nurtured",
    text: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for...",
    author: "Olga",
    location: "Weave Studios – Kai Tak",
    rating: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    quote: "The facilities are superb. Clean, slick, bright.",
    text: "A real sense of community, nurtured Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for...",
    author: "Thomas",
    location: "Weave Studios – Olympic",
    rating: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    quote: "A real sense of community, nurtured",
    text: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for...",
    author: "Eliot",
    location: "Weave Studios – Kai Tak",
    rating: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h2>
            <p className="text-gray-600">What people say about Golobe facilities</p>
          </div>
          <Button variant="ghost" className="text-[#65b599]">
            See All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              quote={review.quote}
              text={review.text}
              author={review.author}
              location={review.location}
              rating={review.rating}
              image={review.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
export default ReviewsSection
// export default ReviewsSection