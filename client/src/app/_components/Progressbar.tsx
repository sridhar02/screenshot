"use client";

type ownProps = {
  progress?: number;
  max?: number;
};

export const ProgressBar = ({ progress = 0, max = 300 }: ownProps) => {
  // Ensure progress is between 0 and 100
  //   const validProgress = Math.min(Math.max(progress, 0), max);
  const validMax = Math.max(max, 1); // Avoid division by zero
  // Calculate progress as a percentage of max
  const percentage = Math.min(Math.max((progress / validMax) * 100, 0), 100);

  return (
    <div className="w-full rounded-full bg-gray-200 ">
      <div
        className="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
        style={{ width: `${percentage}%` }}
      >
        {`${Math.round(percentage)}%`}
      </div>
    </div>
  );
};
