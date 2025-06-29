import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to download APK or EXE file
export const downloadApp = async (type: 'apk' | 'exe') => {
  try {
    // Replace these URLs with your actual file URLs
    const fileUrls = {
      apk: '/skillsnap.apk',  // APK file in public folder
      exe: '/skillsnap.exe'   // EXE file in public folder
    };

    const url = fileUrls[type];
    const fileName = type === 'apk' ? 'skillsnap.apk' : 'skillsnap.exe';

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw new Error('Failed to download file. Please try again later.');
  }
};
