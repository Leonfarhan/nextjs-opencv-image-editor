# Responsive Image Editor with OpenCV

This project demonstrates a responsive image editor built with Next.js, Tailwind CSS, and OpenCV (using a Javascript implementation). It leverages TypeScript for improved type safety and developer experience.  The editor allows users to upload an image, apply grayscale, and crop the image. The processed image can then be downloaded.

## Features

* **Responsive Design:** The UI adapts seamlessly to different screen sizes.
* **Image Upload:** Users can upload images directly from their device.
* **Grayscale Conversion:** Applies grayscale filter to the uploaded image using OpenCV.
* **Cropping:** Allows cropping of the image.  (Implementation details can be added here later if a specific cropping method is used.)
* **Image Download:** The processed image can be downloaded.
* **Loading Indicator:** Displays a loading spinner while image processing operations are in progress.
* **Client-side Processing:** Image processing is done client-side using OpenCV.js for responsiveness. For larger workloads or needing to persist images at all via filesystem on the host, an API endpoint should provide larger scaling capacity, depending on needs of course.
* **TypeScript:** Uses TypeScript for improved type safety, code maintainability, and a better developer experience.

## Technologies Used

* **Next.js:** React framework for server-rendered React applications.
* **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
* **OpenCV.js:** Javascript implementation of OpenCV for image processing within the web browser.
* **TypeScript:** Superset of JavaScript that adds static typing.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Leonfarhan/nextjs-opencv-image-editor.git
```

2. Install dependencies:

```bash
cd nextjs-opencv-image-editor
npm install
```


## Usage

1. Start the development server:

```bash
npm run dev
```

2. Open the application in your browser: `http://localhost:3000`
3. Use the file input to upload an image.
4. Use the buttons to process the image. Loading animations display until finished.
5. Download edited images with the Download button.


## Project Structure
*   **`pages/index.tsx`**: The main application page.
*   **`components/ImageEditor.tsx`**: The image editor component.


## Further Development
* **Additional Image Processing Features:** Implement additional image processing features.
* **API integration:** for increased scaling capability to manage client-side loads at scale with appropriate host side or separate scaling strategies.
