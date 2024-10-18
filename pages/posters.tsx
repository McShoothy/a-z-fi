import Image from 'next/image';
import { posters } from '../components/a-z-fi';
import { Poster } from '@/types';

export default function Posters() {
  return (
    <div className="flex-grow flex flex-col">
      <h2 className="text-2xl font-bold mb-4">{`>`} Posters</h2>
      <div className="flex-grow flex flex-col gap-8 mb-8 overflow-y-auto">
        {posters.map((poster: Poster, index: number) => (
          <div key={index} className="border-4 border-blue-700 p-4 rounded-lg flex flex-col items-center relative max-w-md mx-auto w-full">
            <div className={`w-full relative mb-4`} style={{ paddingBottom: `${100 / poster.aspectRatio}%` }}>
              <Image 
                src={poster.src} 
                alt={`Poster ${index + 1}`} 
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="w-full flex flex-col items-start">
              <p className="font-bold text-lg mb-2">{poster.name}</p>
              <a 
                href={poster.src} 
                download 
                className="bg-blue-700 text-[#F0EAD6] px-3 py-2 rounded-md font-bold hover:bg-blue-600 transition-colors duration-200"
              >
                Download Poster
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
