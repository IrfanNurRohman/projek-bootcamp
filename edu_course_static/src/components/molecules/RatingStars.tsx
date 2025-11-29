import { Star, StarHalf, StarOff } from 'lucide-react'

interface RatingStarsProps {
  rating?: number // 0 to 5, can be decimal
  reviewCount?: number
  className?: string
}

export const RatingStars = ({ rating, reviewCount, className = '' }: RatingStarsProps) => {
  const stars = []

  const totalStars = 5
  const fullStars = Math.floor(rating || 0)
  const hasHalfStar = (rating || 0) % 1 >= 0.5
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0)

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-500 text-yellow-500" />)
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarOff key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
  }

  return (
    <div className={`flex items-center gap-1 text-yellow-500 mb-2 ${className}`}>
      {stars}
      {reviewCount !== undefined && (
        <span className="text-xs text-gray-500 ml-2">({reviewCount})</span>
      )}
    </div>
  )
}