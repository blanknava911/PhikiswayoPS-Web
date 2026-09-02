import { publicAssetPath } from './assets';

export const ADMISSION_FORM_PATH = publicAssetPath('admission-form.pdf');
export const ADMISSION_FORM_FILENAME = 'Phikiswayo_Primary_School_Admission_Form.pdf';

/**
 * Robust cross-browser PDF downloader.
 * Handles sandboxed iframe restrictions, Chrome download blockers,
 * and falls back cleanly to opening the PDF in a new tab if direct download is intercepted.
 */
export async function downloadAdmissionForm(): Promise<void> {
  try {
    // Attempt blob fetch to force true binary download if supported
    const response = await fetch(ADMISSION_FORM_PATH);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = ADMISSION_FORM_FILENAME;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    }, 1000);
  } catch (err) {
    console.warn('Direct blob download unavailable, opening PDF in a new tab fallback:', err);
    openAdmissionForm();
  }
}

/**
 * Opens the official PDF file directly in a new tab where Chrome's native PDF reader can view, save, or print it.
 */
export function openAdmissionForm(): void {
  const newWindow = window.open(ADMISSION_FORM_PATH, '_blank', 'noopener,noreferrer');
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    // If popup blocker triggered, direct navigation fallback
    window.location.href = ADMISSION_FORM_PATH;
  }
}
