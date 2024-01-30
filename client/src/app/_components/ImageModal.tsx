import { useEffect, useRef } from "react";

interface OwnProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal = ({ imageUrl, onClose }: OwnProps) => {
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-80">
      <div
        className="rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        ref={modalRef}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          X
        </button>
        <img src={imageUrl} alt="Modal" className="h-[800px]" />
      </div>
    </div>
  );
};

export default ImageModal;
