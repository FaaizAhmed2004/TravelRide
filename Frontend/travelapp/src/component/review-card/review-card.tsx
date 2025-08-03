import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

interface ReviewCardProps {
  quote: string
  text: string
  author: string
  location: string
  rating: number
  image: string
}

export function ReviewCard({ quote, text, author, location, rating, image }: ReviewCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-3">&quot;{quote}&quot;</h3>
        <p className="text-gray-600 text-sm mb-4">{text}</p>
        <Button variant="ghost" size="sm" className="text-[#65b599] p-0 h-auto">
          View more
        </Button>

        <div className="flex items-center gap-1 my-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <div className="mb-4">
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-600">{location}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-6 h-6 bg-[#4285f4] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-sm text-gray-600">Google</span>
          </div>
        </div>

        <div className="relative h-32 rounded-lg overflow-hidden">
          <Image
            src={image || "/placeholder.svg?height=128&width=300"}
            alt="Review location"
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
    </Card>
  )
}
export default ReviewCard
