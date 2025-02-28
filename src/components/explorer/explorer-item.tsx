import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export function ExplorerItem({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <ul>
      <li>
        <div
          className="cursor-pointer flex gap-1 items-center bg-neutral-400"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <span>
            {isExpanded ? (
              <ChevronDown size={"1em"} />
            ) : (
              <ChevronRight size={"1em"} />
            )}
          </span>
          <span>{title}</span>
        </div>
        {isExpanded && children}
      </li>
    </ul>
  );
}
