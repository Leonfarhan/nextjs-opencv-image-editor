"use client";

import React, { useState, useRef } from 'react';
import { applyGrayscale, cropImage } from '@/utils/opencv';
import Image from 'next/image';

export default function ImageEditor() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("File size is too large. Maximum 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProcessImage = async (processFn: (image: HTMLImageElement, canvas: HTMLCanvasElement) => Promise<void>) => {
        if (!selectedImage || !imageRef.current || !canvasRef.current) return;

        setIsLoading(true);
        try {
            await processFn(imageRef.current, canvasRef.current);
            setProcessedImage(canvasRef.current.toDataURL());
        } catch (error) {
            console.error("Error processing image:", error);
            alert("An error occurred while processing the image.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyGrayscale = async () => {
        await handleProcessImage(applyGrayscale);
    };

    const handleCropImage = async () => {
        await handleProcessImage(cropImage);
    };

    const downloadImage = () => {
        if (processedImage) {
            const link = document.createElement('a');
            link.href = processedImage;
            link.download = 'processed_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="p-6 flex flex-col items-center mt-14 space-y-4 bg-white w-3/4 text-black rounded-2xl md:w-2/4 md:mt-8">
            <div className="w-full max-w-xl space-y-4">
                <label className="block text-xl md:text-2xl font-semibold mb-2 text-center">Upload Your Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-900 border-2 border-indigo-300 rounded-lg cursor-pointer bg-white focus:outline-none p-2 md:p-3 transition-all duration-300 hover:bg-gray-100 hover:border-indigo-500"
                />
            </div>

            {selectedImage && (
                <div className="relative w-full max-w-lg flex justify-center items-center">
                    <Image
                        src={selectedImage}
                        alt="Selected"
                        width={400}
                        height={400}
                        className={`rounded-xl shadow-xl transition-all duration-500 transform ${processedImage ? 'hidden' : 'block'} object-contain hover:scale-105 max-w-full h-auto`}
                        onLoadingComplete={(img) => { imageRef.current = img; }}
                        style={{width: '100%', maxWidth: '400px', height: 'auto'}}
                    />
                    <canvas
                        ref={canvasRef}
                        className={`max-w-full h-auto border rounded-xl shadow-xl ${processedImage ? 'block' : 'hidden'} transition-all duration-500`}
                        style={{width: '100%', maxWidth: '400px', height: 'auto'}}
                    />
                    {isLoading && (
                        <div className="absolute inset-0 bg-gray-200 bg-opacity-80 flex items-center justify-center rounded-xl">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full justify-center">
                <button
                    onClick={handleApplyGrayscale}
                    disabled={!selectedImage || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 w-full md:w-auto"
                >
                    Apply Grayscale
                </button>
                <button
                    onClick={handleCropImage}
                    disabled={!selectedImage || isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 w-full md:w-auto"
                >
                    Crop Image
                </button>
            </div>

            {processedImage && (
                <button
                    onClick={downloadImage}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 w-full md:w-auto"
                >
                    Download Image
                </button>
            )}
        </div>
    );
}