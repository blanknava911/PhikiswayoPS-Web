import { publicAssetPath } from './assets';

export const ADMISSION_FORM_PATH = publicAssetPath('admission-form.pdf');
export const ADMISSION_FORM_PREVIEW_PAGES = [
  publicAssetPath('admission-form-page-1.jpg'),
  publicAssetPath('admission-form-page-2.jpg'),
] as const;
export const ADMISSION_FORM_FILENAME = 'Phikiswayo_Primary_School_Admission_Form.pdf';

export function downloadAdmissionForm() {
  const link = document.createElement('a');
  link.href = ADMISSION_FORM_PATH;
  link.download = ADMISSION_FORM_FILENAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function openAdmissionForm() {
  window.open(ADMISSION_FORM_PATH, '_blank', 'noopener,noreferrer');
}
