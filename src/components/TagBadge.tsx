
import { cn } from "@/lib/utils";
import { getColorForTag } from "@/utils/comparisonUtils";

interface TagBadgeProps {
  tag: string;
  className?: string;
}

const TagBadge = ({ tag, className }: TagBadgeProps) => {
  const colorClass = getColorForTag(tag);
  
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      colorClass,
      className
    )}>
      {tag}
    </span>
  );
};

export default TagBadge;
